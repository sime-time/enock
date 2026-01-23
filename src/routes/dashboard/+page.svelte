<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import ArrowUpIcon from "@lucide/svelte/icons/arrow-up";

  let value = $state("");

  function autoResize(e: Event) {
    const textArea = e.target as HTMLTextAreaElement;
    textArea.style.height = "auto";
    textArea.style.height = `${Math.min(textArea.scrollHeight, 192)}px`;
  }
</script>

<section class="flex flex-col items-center justify-center h-132 gap-6 px-4">
  <!-- Heading -->
  <h1 class="text-2xl font-stretch-semi-expanded font-medium text-foreground">
    Where should we begin?
  </h1>

  <!-- Input Container -->
  <div class="w-full max-w-2xl bg-muted rounded-3xl p-3 flex flex-col border">
    <!-- Text Area -->
    <textarea
      bind:value
      oninput={autoResize}
      placeholder="Ask me anything"
      rows={1}
      class="w-full bg-transparent text-foreground placeholder-neutral-400 resize-none outline-none px-1 max-h-48 overflow-y-auto"
    ></textarea>

    <Button size="icon" class="rounded-full self-end">
      <ArrowUpIcon class="size-5" />
    </Button>
  </div>
</section>
