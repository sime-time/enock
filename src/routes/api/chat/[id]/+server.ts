import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { eq } from "drizzle-orm";
import { model } from "$lib/server/ai/model";
import { advisorSystemPrompt } from "$lib/server/ai/prompts";
import { calendarToolFactory } from "$lib/server/ai/tools";
import { db } from "$lib/server/db/index";
import { account, message } from "$lib/server/db/schema";

export async function POST({ request, locals, params }) {
  const userId = locals.user?.id;
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const chatId = params.id;
  const { messages }: { messages: UIMessage[] } = await request.json();

  // get the google access token
  const userAccount = await db
    .select()
    .from(account)
    .where(eq(account.userId, userId))
    .limit(1);
  console.log("account", userAccount);

  const accessToken = userAccount[0].accessToken ?? undefined;

  const tools = calendarToolFactory(accessToken);

  const result = streamText({
    model,
    messages: await convertToModelMessages(messages),
    system: advisorSystemPrompt,
    tools,
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
