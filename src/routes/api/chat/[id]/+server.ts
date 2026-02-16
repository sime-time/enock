import type { RequestEvent } from "@sveltejs/kit";
import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  type UIMessage,
} from "ai";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { auth } from "$lib/auth";
import { model } from "$lib/server/ai/model";
import { advisorSystemPrompt } from "$lib/server/ai/prompts";
import { calendarToolFactory } from "$lib/server/ai/tools";
import { db } from "$lib/server/db/index";
import { chat, message } from "$lib/server/db/schema";

export async function POST({ request, locals, params }: RequestEvent) {
  // Authenticate User
  const userId = locals.user?.id;
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Validate chat UUID format of url parameter
  const chatIdSchema = z.uuid();
  const parsed = chatIdSchema.safeParse(params.id);
  if (!parsed.success) {
    return new Response("Invalid chat ID format", { status: 400 });
  }
  const chatId = parsed.data;

  // Get chat message history from request body
  const {
    messages,
    clientDateTime,
    timezone,
    locale,
  }: {
    messages: UIMessage[];
    clientDateTime: string;
    timezone: string;
    locale: string;
  } = await request.json();

  // Check if chat exists, if not create new chat
  const existingChat = await db
    .select()
    .from(chat)
    .where(and(eq(chat.id, chatId), eq(chat.userId, userId)))
    .limit(1);

  if (!existingChat[0]) {
    // Extract title from first user message
    const firstUserMessage = messages.find((m) => m.role === "user");
    const title =
      firstUserMessage?.parts
        ?.filter((p) => p.type === "text")
        .map((p) => p.text)
        .join("")
        .substring(0, 40) || "New Chat";

    // Create chat in DB
    try {
      await db.insert(chat).values({
        id: chatId,
        userId,
        title,
      });
    } catch (error) {
      console.log("Error creating new chat", error);
      return new Response("Error creating new chat", { status: 409 });
    }
  }

  const { accessToken, scopes } = await auth.api.getAccessToken({
    body: {
      providerId: "google",
      userId: userId,
    },
  });

  const hasCalendarScope = scopes.includes(
    "https://www.googleapis.com/auth/calendar",
  );
  if (!hasCalendarScope) {
    return new Response("MISSING_CALENDAR_SCOPE", { status: 403 });
  }

  const toolsResult = calendarToolFactory(accessToken);
  if (toolsResult.isErr()) {
    return new Response(toolsResult.error, { status: 403 });
  }
  const tools = toolsResult.value;

  const system = advisorSystemPrompt({
    dateTime: clientDateTime,
    timezone: timezone,
    locale: locale,
  });

  const result = streamText({
    model,
    messages: await convertToModelMessages(messages),
    system,
    tools,
    stopWhen: stepCountIs(5),
  });

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    onFinish: async ({ responseMessage }) => {
      // responseMessage => the new assistant UIMessage (with all parts including tool calls)

      const lastUserMessage = messages.filter((m) => m.role === "user").at(-1);

      if (lastUserMessage) {
        const userText = lastUserMessage.parts
          .filter((part) => part.type === "text")
          .map((part) => part.text)
          .join("");

        await db.insert(message).values({
          chatId,
          role: "user",
          content: userText,
          parts: lastUserMessage.parts,
        });
      }

      const assistantText = responseMessage.parts
        .filter((part) => part.type === "text")
        .map((part) => part.text)
        .join("");

      await db.insert(message).values({
        chatId,
        role: "assistant",
        content: assistantText,
        parts: responseMessage.parts,
      });
    },
  });
}
