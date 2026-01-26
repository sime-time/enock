<script lang="ts">
  import { Chat } from "@ai-sdk/svelte";
  import ChatInput from "$lib/components/chat-input.svelte";
  import { DefaultChatTransport } from "ai";
  import { onMount } from "svelte";

  let { data } = $props(); // from +page.server.ts

  let prompt = $state("");

  let chat = new Chat({
    get transport() {
      return new DefaultChatTransport({ api: `/api/chat/${data.chatId}` });
    },
    get id() {
      return data.chatId;
    },
    get messages() {
      return data.messages;
    },
  });

  onMount(async () => {
    const key = `pending-prompt-${data.chatId}`;
    const pendingPrompt = sessionStorage.getItem(key);

    if (pendingPrompt) {
      sessionStorage.removeItem(key);
      chat.sendMessage({ text: pendingPrompt });
    }
  });

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (!prompt.trim()) return;
    chat.sendMessage({ text: prompt.trim() });
    prompt = "";
  }
</script>

<section class="flex flex-col flex-1 min-h-0">
  <!-- Messages Container -->
  <ul class="flex-1 overflow-y-auto p-4 space-y-4">
    {#each chat.messages as message, messageIndex (messageIndex)}
      <li
        class="flex {message.role === 'user' ? 'justify-end' : 'justify-start'}"
      >
        <div
          class="max-w-[80%] rounded-2xl px-4 py-2 {message.role === 'user'
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted'}"
        >
          {#each message.parts as part, partIndex (partIndex)}
            {#if part.type === "text"}
              <p class="whitespace-pre-wrap">{part.text}</p>
            {/if}
          {/each}
        </div>
      </li>
    {/each}
  </ul>

  <!-- Input Form -->
  <div class="p-4 border-t">
    <ChatInput
      bind:input={prompt}
      onsubmit={handleSubmit}
      placeholder="Continue the conversation..."
    />
  </div>
</section>
