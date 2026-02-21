<script lang="ts" module>
  export interface TypingIndicatorProps {
    size?: "sm" | "md" | "lg";
    class?: string;
  }
</script>

<script lang="ts">
	import { cn } from "$lib/utils";

	let { size = "md", class: className }: TypingIndicatorProps = $props();

	const dotSizes = {
		sm: "h-1 w-1",
		md: "h-1.5 w-1.5",
		lg: "h-2 w-2",
	};

	const containerSizes = {
		sm: "h-4",
		md: "h-5",
		lg: "h-6",
	};
</script>

<div class={cn("flex items-center space-x-1", containerSizes[size], className)}>
	{#each [0, 1, 2] as i}
		<div
			class={cn("bg-foreground/70 rounded-full animate-typing", dotSizes[size])}
			style="animation-delay: {i * 250}ms"
		></div>
	{/each}
	<span class="sr-only">Loading</span>
</div>

<style>
	@keyframes typing {
		0%,
		60%,
		100% {
			opacity: 0.3;
			transform: scale(0.8);
		}
		30% {
			opacity: 1;
			transform: scale(1);
		}
	}

	.animate-typing {
		animation: typing 1s infinite;
	}
</style>
