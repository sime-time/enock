<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";
	import Button from "$lib/components/ui/button/button.svelte";

	const lines = [
		"You don't fail because you lack goals.",
		"You fail because your goals are never scheduled.",
		"Ideas don't create progress.",
		"Time blocks do.",
		"Most people plan in their head.",
		"Enock plans in their calendar.",
	];
</script>

<section
	id="diagnosis"
	class="relative isolate min-h-screen overflow-hidden bg-background pt-16"
>
	<div
		class="pointer-events-none absolute inset-y-0 left-0 hidden w-[42vw] lg:block"
	>
		<img
			src="/despair.webp"
			alt="Greco-Roman statue in despair"
			class="h-full w-full object-cover object-[left_18%] opacity-45 saturate-0 brightness-55"
		/>
	</div>

	<div
		class="pointer-events-none absolute inset-0 hidden bg-linear-to-l from-background via-background/75 to-background/20 lg:block"
	></div>

	<div
		class="relative h-[42vh] sm:h-[52vh] min-h-70 w-full overflow-hidden lg:hidden"
	>
		<img
			src="/despair.webp"
			alt="Greco-Roman statue in despair"
			class="h-full w-full object-cover object-[56%_3%] sm:object-[54%_1%]"
		/>
		<div
			class="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-background/40 to-background"
		></div>
	</div>

	<div class="relative z-10 mx-auto max-w-7xl px-6 pb-16 lg:px-8 lg:pb-24">
		<div
			class="pt-10 lg:flex lg:min-h-[calc(100vh-4rem)] lg:items-center lg:justify-end lg:pt-0"
		>
			<div class="max-w-3xl">
				<Badge
					variant="outline"
					class="mb-8 gap-2 rounded-full border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-primary"
				>
					<span class="size-2 rounded-full bg-primary"></span>
					Diagnosis
				</Badge>

				<h2
					class="font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl"
				>
					<span class="text-muted-foreground">Ambition</span> without structure
					becomes
					<i class="text-destructive">frustration</i>
				</h2>

				<div class="mt-12 space-y-4 sm:space-y-5">
					{#each lines as line, index (line)}
						<p
							class={index % 2 === 1
								? "text-xl leading-snug font-semibold text-foreground sm:text-2xl"
								: "text-lg leading-snug text-muted-foreground sm:text-xl"}
						>
							{line}
						</p>
					{/each}
				</div>
				<Button
					href="/auth/login"
					size="lg"
					class="h-12 rounded-xl px-8 text-base font-semibold mt-8"
				>
					Plan Your Goals Today
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="ml-1.5 size-4"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg
					>
				</Button>
			</div>
		</div>
	</div>
</section>
