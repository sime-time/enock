import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  type UIMessage,
} from "ai";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { model } from "$lib/server/ai/model";
import { advisorSystemPrompt } from "$lib/server/ai/prompts";
import { calendarToolFactory } from "$lib/server/ai/tools";
import { db } from "$lib/server/db/index";
import { account, chat, message } from "$lib/server/db/schema";

export async function POST({ request, locals, params }) {
  // Authenticate User
  const userId = locals.user?.id;
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Validate chat UUID format
  const chatId = params.id;
  const chatIdSchema = z.string().uuid();
  const parsed = chatIdSchema.safeParse(chatId);
  if (!parsed.success) {
    return new Response("Invalid chat ID format", { status: 400 });
  }

  // Get chat message history from request body
  const { messages }: { messages: UIMessage[] } = await request.json();

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

  // Get the google access token
  const userAccount = await db
    .select()
    .from(account)
    .where(eq(account.userId, userId))
    .limit(1);

  const accessToken = userAccount[0].accessToken ?? undefined;

  const tools = calendarToolFactory(accessToken);

  const result = streamText({
    model,
    messages: await convertToModelMessages(messages),
    system: advisorSystemPrompt,
    tools,
    stopWhen: stepCountIs(5),
    onStepFinish: ({ stepType, toolCalls, toolResults, text }) => {
      console.log("=== Step Finished ===");
      console.log("Step type:", stepType);
      if (toolCalls) {
        console.log("Tool calls:", JSON.stringify(toolCalls, null, 2));
      }
      if (toolResults) {
        console.log("Tool results:", JSON.stringify(toolResults, null, 2));
      }
      if (text) {
        console.log("Text:", text);
      }
    },
  });

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    onFinish: async ({ responseMessage }) => {
      // responseMessage = the new assistant UIMessage (with all parts including tool calls)

      const lastUserMessage = messages.filter((m) => m.role === "user").at(-1); // last message

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
