<script lang="ts">
  import ArrowRightIcon from "@lucide/svelte/icons/arrow-right";
  import { Button } from "$lib/components/ui/button";
</script>

<section
	id="final-decision"
	class="relative isolate overflow-hidden bg-background py-24 sm:py-32"
>
	<div
		class="pointer-events-none absolute inset-0 flex items-end justify-center"
	>
		<img
			src="/head-bust.webp"
			alt="Subtle Greco-Roman statue background"
			class="h-170 w-auto max-w-[92vw] object-contain opacity-8 saturate-0 brightness-60"
		/>
	</div>

	<div
		class="pointer-events-none absolute inset-0 bg-linear-to-b from-background/70 via-transparent to-background"
	></div>

	<div class="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-8">
		<h2
			data-reveal
			style="--reveal-delay: 60ms"
			class="font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl"
		>
			If <span class="text-muted-foreground">nothing</span> changes,<br />
			<i class="text-primary">nothing changes.</i>
		</h2>

		<p
			data-reveal
			style="--reveal-delay: 150ms"
			class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
		>
			The gap between who you are and who you want to be is built one executed
			day at a time.
		</p>

		<div class="mt-10" data-reveal style="--reveal-delay: 240ms">
			<Button
				href="/auth/login"
				size="lg"
				class="hover-rise h-12 rounded-xl px-8 text-base font-semibold"
			>
				Start Your 7-Day Execution Plan
				<ArrowRightIcon class="size-4" />
			</Button>
		</div>
	</div>
</section>
