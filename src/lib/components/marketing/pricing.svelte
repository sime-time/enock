<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";
  import { Button } from "$lib/components/ui/button";
  import CircleCheckIcon from "@lucide/svelte/icons/circle-check";

  const plans = [
    {
      name: "Monthly",
      price: "$12",
      period: "a month",
      subtitle: "Limited AI responses (limits finalized soon)",
      features: [
        "Generate unlimited 7-day execution plans",
        "Full access to Enock AI mentor",
        "Connect and plan inside your calendar",
        "Ongoing updates and improvements",
      ],
    },
    {
      name: "Yearly",
      price: "$49",
      period: "a year",
      subtitle: "Limited AI responses (limits finalized soon)",
      bestValue: true,
      features: [
        "Everything in Monthly",
        "Lower long-term cost",
        "Stay consistent without interruptions",
      ],
    },
    {
      name: "One-Time",
      price: "$97",
      period: "one-time",
      subtitle: "Use your own API key for AI responses",
      features: [
        "Lifetime access to Enock",
        "All current features included",
        "Future updates included",
        "No recurring payments",
      ],
    },
  ];
</script>

<section id="pricing" class="relative bg-background py-24 sm:py-32">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-3xl text-center">
			<Badge
				data-reveal
				style="--reveal-delay: 40ms"
				variant="outline"
				class="mb-8 gap-2 rounded-full border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-primary"
			>
				<span class="size-2 rounded-full bg-primary"></span>
				Pricing
			</Badge>

			<h2
				data-reveal
				style="--reveal-delay: 120ms"
				class="font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl"
			>
				Choose Your Plan
			</h2>
		</div>

		<div class="mt-12 grid gap-6 lg:grid-cols-3">
			{#each plans as plan, index}
				<div
					data-reveal
					style={`--reveal-delay: ${180 + index * 80}ms`}
					class={`hover-rise flex flex-col gap-6 rounded-2xl border p-6 shadow-lg ${plan.bestValue ? "border-primary bg-primary/8 ring-1 ring-primary/40 lg:-translate-y-2" : "border-border/70 bg-card/40"}`}
				>
					<div class="flex items-start justify-between gap-3">
						<div>
							<p class="font-heading text-2xl font-bold text-foreground">
								{plan.name}
							</p>
							<p class="mt-1 text-sm text-muted-foreground">{plan.subtitle}</p>
						</div>
						{#if plan.bestValue}
							<Badge
								variant="default"
								class="rounded-full px-3 py-1 text-xs uppercase tracking-widest"
							>
								best-value
							</Badge>
						{/if}
					</div>

					<div class="flex items-end gap-2">
						<span class="font-heading text-5xl font-extrabold text-foreground"
							>{plan.price}</span
						>
						<span class="pb-1 text-muted-foreground">{plan.period}</span>
					</div>

					<ul class="space-y-3">
						{#each plan.features as feature}
							<li
								class="flex items-start gap-2.5 text-sm text-muted-foreground"
							>
								<CircleCheckIcon class="mt-0.5 size-4 shrink-0 text-primary" />
								<span>{feature}</span>
							</li>
						{/each}
					</ul>

					<Button href="/auth/login" class="hover-rise w-full" size="lg">
						Start Plan
					</Button>
				</div>
			{/each}
		</div>
	</div>
</section>
