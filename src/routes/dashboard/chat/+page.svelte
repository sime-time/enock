<script lang="ts">
  import ChatInput from "$lib/components/chat-input.svelte";
  import { initChat } from "./chat.remote";
  import { goto } from "$app/navigation";

  let prompt = $state("");
  let error = $state("");

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (!prompt.trim()) {
      error = "Message is empty";
      return;
    }
    error = "";

    const result = await initChat({ prompt });

    // store prompt in sessionStorage and navigate
    sessionStorage.setItem(`pending-prompt-${result.chatId}`, prompt);
    goto(`/dashboard/chat/${result.chatId}`);
  }
</script>

<section class="flex flex-col items-center justify-center h-132 gap-6 px-4">
  <!-- Heading -->
  <h1 class="text-2xl font-stretch-semi-expanded font-medium text-foreground">
    Where should we begin?
  </h1>

  <!-- Form Container -->
  <div class="relative w-full max-w-2xl">
    <ChatInput
      bind:input={prompt}
      onsubmit={handleSubmit}
      placeholder="Ask me anything"
    />

    <!-- Error Message -->
    {#if error}
      <p
        class="absolute top-full mt-3 text-center text-destructive text-sm w-full"
      >
        {error}
      </p>
    {/if}
  </div>
</section>
