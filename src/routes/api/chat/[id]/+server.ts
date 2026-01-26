import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { OPENAI_API_KEY } from "$env/static/private";
import { db } from "$lib/server/db/index";
import { message } from "$lib/server/db/schema";

const openai = createOpenAI({
  apiKey: OPENAI_API_KEY,
});

export async function POST({ request, locals, params }) {
  const userId = locals.user?.id;
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const chatId = params.id;
  const { messages }: { messages: UIMessage[] } = await request.json();

  const result = streamText({
    model: openai("gpt-3.5-turbo"),
    messages: await convertToModelMessages(messages),
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
