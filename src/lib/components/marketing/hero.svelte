<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";
	import { Button } from "$lib/components/ui/button";
	import TaskMockup from "$lib/components/marketing/task-mockup.svelte";
</script>

<section
	class="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32 lg:pt-48 lg:pb-40"
>
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
			<!-- Left: Copy -->
			<div class="max-w-2xl">
				<!-- Badge -->
				<Badge
					variant="default"
					class="mb-8 gap-2 bg-primary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-primary"
				>
					<span class="size-2 rounded-full bg-primary"></span>
					AI Executive Advisor
				</Badge>

				<!-- Headline -->
				<h1
					class="font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground md:text-5xl lg:text-6xl"
				>
					<span>Your goals mean</span>
					<i class="opacity-50">nothing</i>
					<span>without</span>
					<span class="text-primary">execution.</span>
				</h1>

				<!-- Subtext -->
				<p
					class="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground"
				>
					Enock builds a structured 7-day plan from your goals and tracks
					whether you actually follow through.
				</p>

				<!-- Clarity line -->
				<div class="mt-4 flex items-center gap-2.5">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="size-5 shrink-0 text-primary"
						viewBox="0 0 24 24"
						fill="currentColor"
						><path
							d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
						/></svg
					>
					<p class="text-sm font-medium text-muted-foreground">
						Connect your calendar. Get a 7-day plan. Execute.
					</p>
				</div>

				<!-- CTAs -->
				<div class="mt-10 flex flex-wrap items-center gap-4">
					<Button
						href="/auth/login"
						size="lg"
						class="h-12 rounded-xl px-8 text-base font-semibold"
					>
						Get Your 7-Day Plan
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
					<Button
						href="#how-it-works"
						variant="outline"
						size="lg"
						class="h-12 rounded-xl px-8 text-base font-semibold"
					>
						See How It Works
					</Button>
				</div>
			</div>

			<!-- Right: App mockup -->
			<TaskMockup />
		</div>
	</div>
</section>
