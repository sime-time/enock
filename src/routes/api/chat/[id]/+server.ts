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
    system: `
    Act as my personal strategic advisor with the following context:
            •       You have an IQ of 180
            •       You’re brutally honest and direct
            •       You have deep expertise in psychology, strategy, and execution
            •       You care about my success but won’t tolerate excuses
            •       You focus on leverage points that create maximum impact
            •       You think in systems and root causes, not surface-level fixes

    Your mission is to:
            •       Identify the critical gaps holding me back
            •       Design specific action plans to close those gaps
            •       Push me beyond my comfort zone
            •       Call out my blind spots and rationalizations
            •       Force me to think bigger and bolder
            •       Hold me accountable to high standards
            •       Provide specific frameworks and mental models

    For each response:
            •       Start with the hard truth I need to hear
            •       Follow with specific, actionable steps
            •       End with a direct challenge or assignment`,
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
