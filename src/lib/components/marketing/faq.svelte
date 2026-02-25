<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";
  import * as Accordion from "$lib/components/ui/accordion/index";

  const faqs = [
    {
      question: "What if Enock builds a plan that doesn't fit my schedule?",
      answer: "You can adjust it yourself or ask Enock to.",
    },
    {
      question: "Can I use Enock on mobile?",
      answer:
        "Yes, you can save the app to your homescreen for a mobile app experience.",
    },
    {
      question: "I already use Google Calendar.",
      answer: "Good. Enock makes it intentional.",
    },
    {
      question: "I don't have anything on my calendar.",
      answer: "Even better. We build from zero.",
    },
  ];
</script>

<section id="faq" class="relative bg-background py-24 sm:py-32">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-3xl text-center">
			<Badge
				data-reveal
				style="--reveal-delay: 40ms"
				variant="outline"
				class="mb-8 gap-2 rounded-full border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-primary"
			>
				<span class="size-2 rounded-full bg-primary"></span>
				FAQ
			</Badge>

			<h2
				data-reveal
				style="--reveal-delay: 120ms"
				class="font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl"
			>
				Common Questions
			</h2>

			<p data-reveal style="--reveal-delay: 190ms" class="mt-4 text-base font-medium text-muted-foreground sm:text-lg">
				Clear questions for a clear mind
			</p>

			<Accordion.Root type="single" class="mt-6 space-y-4 px-5 py-3" data-reveal style="--reveal-delay: 250ms">
				{#each faqs as faq, index}
					<Accordion.Item class="rounded-xl border bg-muted/30 p-2 px-6 transition-colors duration-200 hover:border-primary/40" data-reveal style={`--reveal-delay: ${270 + index * 60}ms`}>
						<Accordion.Trigger class="text-md">
							{faq.question}
						</Accordion.Trigger>
						<Accordion.Content class="text-start text-muted-foreground text-md">
							{faq.answer}
						</Accordion.Content>
					</Accordion.Item>
				{/each}
			</Accordion.Root>
		</div>
	</div>
</section>
