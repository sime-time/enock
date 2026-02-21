<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";
  import { Button } from "$lib/components/ui/button";
</script>

<section
	class="relative isolate min-h-screen overflow-hidden bg-background pt-16"
>
	<div
		class="pointer-events-none absolute inset-y-0 right-0 hidden w-[58vw] lg:block"
	>
		<picture>
			<source srcset="/hero.avif" type="image/avif" />
			<img
				src="/hero.webp"
				alt="Back-facing Greco-Roman statue"
				class="h-full w-full object-cover object-[center_24%]"
			/>
		</picture>
	</div>

	<div
		class="pointer-events-none absolute inset-0 hidden bg-linear-to-r from-background via-background/75 to-background/20 lg:block"
	></div>

	<div class="relative h-[42vh] min-h-70 w-full overflow-hidden lg:hidden">
		<picture>
			<source srcset="/hero.avif" type="image/avif" />
			<img
				src="/hero.webp"
				alt="Back-facing Greco-Roman statue"
				class="h-full w-full object-cover object-[center_18%]"
			/>
		</picture>
		<div
			class="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-background/40 to-background"
		></div>
	</div>

	<div class="relative z-10 mx-auto max-w-7xl px-6 pb-16 lg:px-8 lg:pb-24">
		<div
			class="pt-10 lg:flex lg:min-h-[calc(100vh-4rem)] lg:items-center lg:pt-0"
		>
			<div class="max-w-2xl">
				<Badge
					variant="outline"
					class="mb-8 gap-2 rounded-full border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-primary"
				>
					<span class="size-2 rounded-full bg-primary"></span>
					AI Strategic Advisor
				</Badge>

				<h1
					class="font-heading text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground md:text-6xl"
				>
					<span>Your goals mean</span>
					<i class="opacity-60">nothing</i>
					<span>without</span>
					<span class="text-primary">execution.</span>
				</h1>

				<p
					class="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground"
				>
					Enock builds a structured 7-day plan from your goals and tracks
					whether you actually follow through.
				</p>

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
		</div>
	</div>
</section>
