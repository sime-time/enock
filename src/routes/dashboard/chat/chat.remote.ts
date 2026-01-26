import { error } from "@sveltejs/kit";
import { z } from "zod";
import { command, getRequestEvent } from "$app/server";
import { auth } from "$lib/auth";
import { db } from "$lib/server/db";
import { chat } from "$lib/server/db/schema";

export const initChat = command(
  z.object({
    prompt: z.string().nonempty("Message is empty!"),
  }),
  async ({ prompt }) => {
    const event = getRequestEvent();
    const session = await auth.api.getSession({
      headers: event.request.headers,
    });

    if (!session?.user.id) {
      error(401, "Unauthorized");
    }

    const userId = session?.user.id;

    // create a new chat in DB
    const newChat = await db
      .insert(chat)
      .values({
        userId,
        title: prompt.substring(0, 40),
      })
      .returning();

    return { chatId: newChat[0].id };
  },
);
