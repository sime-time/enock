import { redirect } from "@sveltejs/kit";
import { desc, eq } from "drizzle-orm";
import { db } from "$lib/server/db/index";
import { chat } from "$lib/server/db/schema";

export async function load({ locals }) {
  // go to login page if user is not signed in
  if (!locals.user?.id) {
    throw redirect(302, "/auth/login");
  }

  const userId = locals.user.id;

  const userChats = await db
    .select()
    .from(chat)
    .where(eq(chat.userId, userId))
    .orderBy(desc(chat.createdAt));

  return { userChats };
}
