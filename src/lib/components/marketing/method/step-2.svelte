<script lang="ts">
	import CalendarDaysIcon from "@lucide/svelte/icons/calendar-days";
	import CircleCheckIcon from "@lucide/svelte/icons/circle-check";
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import Button from "$lib/components/ui/button/button.svelte";

	const timeLabels = [
		"8 AM",
		"9 AM",
		"10 AM",
		"11 AM",
		"12 PM",
		"1 PM",
		"2 PM",
		"3 PM",
		"4 PM",
	];

	const events = [
		{
			title: "Morning Routine",
			time: "8:30 - 9:30 AM",
			top: 0,
			height: 63,
			classes: "border-l-blue-400 bg-blue-500/30 text-blue-100",
		},
		{
			title: "Deep Work",
			time: "10:00 - 12:00 PM",
			top: 68,
			height: 106,
			classes: "border-l-green-300 bg-green-400/18 text-green-100",
		},
		{
			title: "Eat Lunch",
			time: "1:00 - 2:30 PM",
			top: 179,
			height: 113,
			classes: "border-l-amber-400 bg-amber-500/20 text-amber-100",
		},
		{
			title: "Workout",
			time: "3:00 - 4:00 PM",
			top: 297,
			height: 69,
			classes: "border-l-red-400 bg-red-500/20 text-red-100",
		},
	];
</script>

<section id="solution-step-2" class="relative overflow-hidden py-16 sm:py-20">
	<div
		class="pointer-events-none absolute inset-0 bg-linear-to-b from-background/20 via-background/60 to-background"
	></div>

	<div
		class="relative mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:items-start lg:gap-12 lg:px-8"
	>
		<div
			class="overflow-hidden rounded-xl border border-border/70 bg-background/75"
		>
			<div class="flex items-start justify-between px-4 pt-4 pb-3">
				<div class="flex items-center gap-3">
					<CalendarDaysIcon class="size-5 text-muted-foreground" />
					<p class="font-heading text-base font-semibold text-muted-foreground">
						Feb 2026
					</p>
				</div>
				<div class="text-right">
					<p class="text-sm text-muted-foreground">Sun 22</p>
				</div>
			</div>

			<div class="grid grid-cols-[72px_1fr] border-t border-border/60">
				<div class="border-r border-border/60 bg-background/60 px-3 py-2">
					{#each timeLabels as label}
						<div class="h-10 text-xs font-medium text-muted-foreground/80">
							{label}
						</div>
					{/each}
				</div>

				<div class="relative h-90 bg-background/35">
					{#each timeLabels as _, i}
						<div
							class="absolute right-0 left-0 border-t border-border/35"
							style={`top: ${i * 40}px`}
						></div>
					{/each}

					{#each events as event}
						<div
							class={`absolute right-3 left-2 rounded-md border border-border/40 border-l-4 px-4 py-3 ${event.classes}`}
							style={`top:${event.top}px;height:${event.height}px`}
						>
							<p class="text-base leading-tight font-semibold">
								{event.title}
							</p>
							<p class="mt-1 text-xs text-current/80">{event.time}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
		<div class="max-w-xl">
			<p
				class="mb-6 text-sm font-semibold uppercase tracking-[0.16em] text-primary"
			>
				Step - 02
			</p>

			<h3
				class="font-heading text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl"
			>
				Structure the Week
			</h3>

			<p class="mt-5 text-lg leading-relaxed text-muted-foreground">
				Enock builds a focused 7-day plan inside your calendar.
			</p>

			<ul class="mt-6 space-y-3">
				<li class="flex items-start gap-3 text-muted-foreground">
					<CircleCheckIcon class="mt-0.5 size-5 shrink-0 text-primary" />
					<span>Keyboard shortcuts for quick calendar actions</span>
				</li>
				<li class="flex items-start gap-3 text-muted-foreground">
					<CircleCheckIcon class="mt-0.5 size-5 shrink-0 text-primary" />
					<span>Clear separation between work, training, and recovery</span>
				</li>
				<li class="flex items-start gap-3 text-muted-foreground">
					<CircleCheckIcon class="mt-0.5 size-5 shrink-0 text-primary" />
					<span>Built-in review and adjustment blocks</span>
				</li>
				<li class="flex items-start gap-3 text-muted-foreground">
					<CircleCheckIcon class="mt-0.5 size-5 shrink-0 text-primary" />
					<span>No empty time - everything is intentional</span>
				</li>
			</ul>
			<Button
				href="/auth/login"
				size="lg"
				class="h-12 rounded-xl px-8 text-base font-semibold mt-8"
			>
				Build Your Week
				<ArrowRight />
			</Button>
		</div>
	</div>
</section>
