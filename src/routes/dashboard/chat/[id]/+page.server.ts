import { error } from "@sveltejs/kit";
import type { UIMessage } from "ai";
import { and, asc, eq } from "drizzle-orm";
import { db } from "$lib/server/db";
import { chat, message } from "$lib/server/db/schema";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, locals }) => {
  const chatId = params.id;

  const userId = locals.user?.id;
  if (!userId) {
    error(401, "Unauthorized");
  }

  // Try to find existing chat
  const chatRecord = await db
    .select()
    .from(chat)
    .where(and(eq(chat.id, chatId), eq(chat.userId, userId)))
    .limit(1);

  // If no chat exists, this is a new chat being created
  if (!chatRecord[0]) {
    return {
      chatId,
      messages: [],
    };
  }

  // Load existing messages ordered by creation time
  const dbMessages = await db
    .select()
    .from(message)
    .where(eq(message.chatId, chatId))
    .orderBy(asc(message.createdAt));

  // Convert to UIMessage type for client side UI
  const messages: UIMessage[] = dbMessages.map((m) => ({
    id: m.id,
    role: m.role as "user" | "assistant" | "system",
    parts: (m.parts ?? [
      { type: "text", text: m.content },
    ]) as UIMessage["parts"],
  }));

  return {
    chatId,
    messages,
  };
};
