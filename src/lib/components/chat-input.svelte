<script lang="ts">
  import ArrowUpIcon from "@lucide/svelte/icons/arrow-up";
  import Button from "$lib/components/ui/button/button.svelte";

  let { input = $bindable(), onsubmit, placeholder } = $props();

  function autoResize(e: Event) {
    const textArea = e.target as HTMLTextAreaElement;
    textArea.style.height = "auto";
    textArea.style.height = `${Math.min(textArea.scrollHeight, 192)}px`;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey && input.trim() !== "") {
      e.preventDefault();
      const form = (e.target as HTMLTextAreaElement).closest("form");
      form?.requestSubmit();
    }
  }
</script>

<form
  {onsubmit}
  class="w-full bg-muted rounded-3xl p-2 flex items-center gap-2 border"
>
  <textarea
    bind:value={input}
    oninput={autoResize}
    {placeholder}
    rows={1}
    onkeydown={handleKeydown}
    class="flex-1 bg-transparent text-foreground placeholder-neutral-400 resize-none outline-none px-2 max-h-48 overflow-y-auto"
  ></textarea>
  <Button
    type="submit"
    size="icon"
    class="rounded-full shrink-0 self-end"
    disabled={input.trim() === ""}
  >
    <ArrowUpIcon class="size-5" />
  </Button>
</form>
