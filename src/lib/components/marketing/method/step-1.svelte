<script lang="ts">
	import BriefcaseBusinessIcon from "@lucide/svelte/icons/briefcase-business";
	import CheckIcon from "@lucide/svelte/icons/check";
	import DumbbellIcon from "@lucide/svelte/icons/dumbbell";
	import HeartIcon from "@lucide/svelte/icons/heart";
	import SparklesIcon from "@lucide/svelte/icons/sparkles";
	import TargetIcon from "@lucide/svelte/icons/target";
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import Button from "$lib/components/ui/button/button.svelte";
	import { Input } from "$lib/components/ui/input/index";

	let selectedCard = $state(0);

	const focusCards = [
		{
			id: 0,
			title: "Fitness",
			description: "Health & vitality",
			icon: DumbbellIcon,
			placeholder: "Get a 6 pack and run a 5k marathon...",
		},
		{
			id: 1,
			title: "Career",
			description: "Wealth & business",
			icon: BriefcaseBusinessIcon,
			placeholder: "Earn $10k per month...",
		},
		{
			id: 2,
			title: "Discipline",
			description: "Habits & routine",
			icon: TargetIcon,
			placeholder: "Wake up early...",
		},
		{
			id: 3,
			title: "Relationships",
			description: "Family & friends",
			icon: HeartIcon,
			placeholder: "Get a girlfriend...",
		},
	];
</script>

<section id="solution-step-1" class="relative overflow-hidden py-16 sm:py-20">
	<div
		class="pointer-events-none absolute inset-0 bg-linear-to-b from-background/20 via-background/60 to-background"
	></div>

	<div
		class="relative mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:items-start lg:gap-12 lg:px-8"
	>
		<div class="max-w-xl">
			<p
				class="mb-6 text-sm font-semibold uppercase tracking-[0.16em] text-primary"
			>
				Step - 01
			</p>

			<h3
				class="font-heading text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl"
			>
				Define Your Goals
			</h3>

			<p class="mt-5 text-lg leading-relaxed text-muted-foreground">
				Clarify what success actually looks like. Choose areas that matter and
				define them with intention. Career. Fitness. Relationships. Whatever you
				care about.
			</p>
			<Button
				href="/auth/login"
				size="lg"
				class="h-12 rounded-xl px-8 text-base font-semibold mt-8"
			>
				Achieve Your Goals
				<ArrowRight />
			</Button>
		</div>

		<div
			class="rounded-2xl border border-border/70 bg-card/40 p-4 shadow-2xl backdrop-blur-sm sm:p-5"
		>
			<p class="mb-3 text-base font-semibold text-foreground">
				Select Focus Area
			</p>

			<div class="grid gap-3 sm:grid-cols-2">
				{#each focusCards as card (card.title)}
					<button
						onclick={() => (selectedCard = card.id)}
						class={card.id === selectedCard
							? "rounded-xl border border-primary bg-primary/10 p-3"
							: "rounded-xl border border-border/70 bg-background/40 p-3"}
					>
						<div class="flex items-center justify-between gap-3">
							<div class="flex items-center gap-3">
								<div
									class="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary"
								>
									<card.icon class="size-4" />
								</div>
								<div class="flex flex-col items-start">
									<p class="text-xl font-semibold text-foreground">
										{card.title}
									</p>
									<p class="text-sm text-muted-foreground">
										{card.description}
									</p>
								</div>
							</div>
							{#if card.id === selectedCard}
								<div
									class="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
								>
									<CheckIcon class="size-4" />
								</div>
							{/if}
						</div>
					</button>
				{/each}
			</div>

			<div
				class="mt-6 mb-3 flex items-center gap-2 text-base font-semibold text-foreground"
			>
				<SparklesIcon class="size-4 text-primary" />
				<p>What does success look like in {focusCards[selectedCard].title}?</p>
			</div>

			<div class="flex w-full items-center gap-2">
				<Input type="text" placeholder={focusCards[selectedCard].placeholder} />
				<Button type="submit"><ArrowRight /></Button>
			</div>

			<p class="mt-3 text-sm text-muted-foreground">
				Be specific. Enock will use this to generate your weekly targets.
			</p>
		</div>
	</div>
</section>
