
# Chat Persistence Implementation Plan

## JSON vs JSONB Decision

**JSON is fine for your use case.** The difference:
- **JSON**: Stores as text, faster inserts, no indexing on JSON fields
- **JSONB**: Binary format, slower inserts, can index/query JSON fields

Since you're just logging messages and won't query inside the parts field (e.g., "find all messages with tool-weather"), JSON is the right choice.

---

## Implementation Overview

### Files to Modify

1. **`chat.remote.ts`** - Save parts array for initial messages
2. **`[id]/+page.server.ts`** - Load messages from DB (new file)
3. **`[id]/+page.svelte`** - Display chat and handle new messages
4. **`api/chat/[id]/+server.ts`** - Save parts in onFinish

---
## 2. Create `[id]/+page.server.ts`

Load messages from DB and convert to UIMessage format:

```typescript
import { error } from "@sveltejs/kit";
import { eq, asc } from "drizzle-orm";
import { db } from "$lib/server/db";
import { chat, message } from "$lib/server/db/schema";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, locals }) => {
  const userId = locals.user?.id;
  if (!userId) {
    error(401, "Unauthorized");
  }

  const chatId = params.id;

  // Verify chat belongs to user
  const chatRecord = await db.query.chat.findFirst({
    where: eq(chat.id, chatId),
  });

  if (!chatRecord || chatRecord.userId !== userId) {
    error(404, "Chat not found");
  }

  // Load messages ordered by creation time
  const dbMessages = await db.query.message.findMany({
    where: eq(message.chatId, chatId),
    orderBy: [asc(message.createdAt)],
  });

  // Convert to UIMessage format for the Chat class
  const messages = dbMessages.map((m) => ({
    id: m.id,
    role: m.role as "user" | "assistant",
    parts: m.parts ?? [{ type: "text", text: m.content }], // fallback if parts is null
  }));

  return {
    chatId,
    messages,
  };
};
```

---

## 3. Update `[id]/+page.svelte`

Display the chat UI with loaded messages and handle new messages:

```svelte
<script lang="ts">
  import { Chat } from "@ai-sdk/svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import ArrowUpIcon from "@lucide/svelte/icons/arrow-up";

  let { data } = $props();

  let input = $state("");

  // Initialize Chat with loaded messages and custom API endpoint
  const chat = new Chat({
    id: data.chatId,
    api: `/api/chat/${data.chatId}`,
    initialMessages: data.messages,
  });

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (!input.trim()) return;
    chat.sendMessage({ text: input });
    input = "";
  }

  function autoResize(e: Event) {
    const textArea = e.target as HTMLTextAreaElement;
    textArea.style.height = "auto";
    textArea.style.height = `${Math.min(textArea.scrollHeight, 192)}px`;
  }
</script>

<section class="flex flex-col h-full">
  <!-- Messages -->
  <div class="flex-1 overflow-y-auto p-4 space-y-4">
    {#each chat.messages as message (message.id)}
      <div class="flex {message.role === 'user' ? 'justify-end' : 'justify-start'}">
        <div class="max-w-[80%] rounded-2xl px-4 py-2 {message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}">
          {#each message.parts as part}
            {#if part.type === "text"}
              <p class="whitespace-pre-wrap">{part.text}</p>
            {/if}
          {/each}
        </div>
      </div>
    {/each}
  </div>

  <!-- Input Form -->
  <div class="p-4 border-t">
    <form onsubmit={handleSubmit} class="w-full bg-muted rounded-3xl p-3 flex flex-col border">
      <textarea
        bind:value={input}
        oninput={autoResize}
        placeholder="Continue the conversation..."
        rows={1}
        class="w-full bg-transparent text-foreground placeholder-neutral-400 resize-none outline-none px-1 max-h-48 overflow-y-auto"
      ></textarea>
      <Button type="submit" size="icon" class="rounded-full self-end">
        <ArrowUpIcon class="size-5" />
      </Button>
    </form>
  </div>
</section>
```

---

## 4. Update `api/chat/[id]/+server.ts`

Complete the onFinish callback to save messages:

```typescript
import { createAnthropic } from "@ai-sdk/anthropic";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { ANTHROPIC_API_KEY } from "$env/static/private";
import { db } from "$lib/server/db/index";
import { message } from "$lib/server/db/schema";

const anthropic = createAnthropic({
  apiKey: ANTHROPIC_API_KEY,
});

export async function POST({ request, locals, params }) {
  const userId = locals.user?.id;
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const chatId = params.id;
  const { messages }: { messages: UIMessage[] } = await request.json();

  const result = streamText({
    model: anthropic("claude-sonnet-4-5"),
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    onFinish: async ({ responseMessage }) => {
      const lastUserMessage = messages.filter((m) => m.role === "user").at(-1);

      if (lastUserMessage) {
        const userText = lastUserMessage.parts
          .filter((part): part is { type: "text"; text: string } => part.type === "text")
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
        .filter((part): part is { type: "text"; text: string } => part.type === "text")
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
```

---

## Complete Flow

1. **User starts new chat** at `/dashboard/chat`
   - Form submits to `initChat`
   - `generateText` gets response
   - Both messages saved with `parts` array
   - Redirect to `/dashboard/chat/[id]`

2. **User lands on `/dashboard/chat/[id]`**
   - `+page.server.ts` loads messages from DB
   - Converts to `UIMessage[]` format
   - Passes to page as `data.messages`

3. **Page renders**
   - `Chat` class initialized with `initialMessages`
   - Displays conversation history
   - User can continue chatting

4. **User sends new message**
   - `chat.sendMessage()` sends to `/api/chat/[id]`
   - `streamText` generates response
   - `onFinish` saves both user and assistant messages
   - UI updates reactively

---

## Verification Steps

1. Create a new chat from `/dashboard/chat`
2. Verify redirect to `/dashboard/chat/[id]`
3. Verify initial 2 messages display
4. Send a new message
5. Verify response streams correctly
6. Refresh the page - verify all messages persist
7. Check database - verify `parts` column has the JSON data
