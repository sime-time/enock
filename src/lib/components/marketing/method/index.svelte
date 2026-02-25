<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";
	import Step1 from "$lib/components/marketing/method/step-1.svelte";
	import Step2 from "$lib/components/marketing/method/step-2.svelte";
	import Step3 from "$lib/components/marketing/method/step-3.svelte";
</script>

<section id="method" class="relative bg-background py-24 sm:py-32">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-3xl text-center">
			<Badge
				variant="outline"
				class="mb-8 gap-2 rounded-full border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-primary"
			>
				<span class="size-2 rounded-full bg-primary"></span>
				Method
			</Badge>

			<h2
				class="font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl"
			>
				Turn goals into scheduled <span class="text-primary">execution.</span>
			</h2>

			<p class="mt-4 text-base font-medium text-muted-foreground sm:text-lg">
				Here's how it works.
			</p>
		</div>
	</div>

	<Step1 />
	<Step2 />
	<Step3 />
</section>
