<script lang="ts">
	import ChatInput from "$lib/components/chat-input.svelte";
	import { goto } from "$app/navigation";

	let prompt = $state("");

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!prompt.trim()) return;

		const chatId = crypto.randomUUID();

		// store prompt in sessionStorage to save it across navigation
		sessionStorage.setItem(`pending-prompt-${chatId}`, prompt.trim());

		goto(`/dashboard/chat/${chatId}`);
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
	</div>
</section>
