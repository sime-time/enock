import { error } from "@sveltejs/kit";
import type { UIMessage } from "ai";
import { and, asc, eq } from "drizzle-orm";
import { db } from "$lib/server/db";
import { chat, message } from "$lib/server/db/schema";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, locals }) => {
  const userId = locals.user?.id;
  if (!userId) {
    error(401, "Unauthorized");
  }

  const chatId = params.id;

  // verify chat belongs to this user
  const chatRecord = await db
    .select()
    .from(chat)
    .where(and(eq(chat.id, chatId), eq(chat.userId, userId)))
    .limit(1);

  if (!chatRecord[0]) {
    error(404, "Chat not found");
  }

  // load messages ordered by creation time
  const dbMessages = await db
    .select()
    .from(message)
    .where(eq(message.chatId, chatId))
    .orderBy(asc(message.createdAt));

  // convert to UIMessage type for client side UI
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
