<script lang="ts">
  import ArrowUpIcon from "@lucide/svelte/icons/arrow-up";
  import Button from "$lib/components/ui/button/button.svelte";
  import { type Attachment } from "svelte/attachments";

  let { input = $bindable(), onsubmit, placeholder } = $props();

  function autoResize(_input: string): Attachment {
    return (element) => {
      const textarea = element as HTMLTextAreaElement;
      const resize = () => {
        textarea.style.height = "auto";
        textarea.style.height = `${Math.min(textarea.scrollHeight, 192)}px`;
      };

      // run immediately to handle initialization and input changes
      resize();

      // listen to input for feedback
      textarea.addEventListener("input", resize);

      return () => textarea.removeEventListener("input", resize);
    };
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
		{@attach autoResize(input)}
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
