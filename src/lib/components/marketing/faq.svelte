<script lang="ts">
  import * as Accordion from "$lib/components/ui/accordion/index";
  import { Badge } from "$lib/components/ui/badge";

  const faqs = [
    {
      question: "How is Enock different from Google Calendar?",
      answer:
        "Google Calendar is built for meetings and events. Enock is built for personal execution. You time block your day, mark each block as done or missed, and see how you actually spent your week.",
    },
    {
      question: "Do I need to connect my calendar?",
      answer:
        "You don't need to. Enock works on its own. You can optionally connect your existing calendar later, but it’s designed to be a clean system just for execution.",
    },
    {
      question: "What if my schedule changes during the day?",
      answer:
        "It will. You can quickly adjust your blocks. The goal isn’t perfection; it’s visibility. Enock shows what you planned vs what actually happened.",
    },
    {
      question: "Is Enock mobile-first?",
      answer:
        "Yes. It’s designed to be used on your phone throughout the day, not just planned on a desktop and forgotten.",
    },
    {
      question: "Is it for iPhone or Android?",
      answer:
        "Both! Enock will be released on both the Apple and Google Play app stores.",
    },
    {
      question: "What if I already know what I need to do?",
      answer:
        "That’s exactly who Enock is for. It’s for structuring your day and tracking whether you actually did it.",
    },
    {
      question: "Is this just another to-do list?",
      answer:
        "No. To-do lists track intention. Enock tracks time. If it’s not scheduled, it doesn’t exist.",
    },
    {
      question: "What happens at the end of the week?",
      answer:
        "You see the truth. How many blocks you completed, what you missed, and which days you showed up. No guessing.",
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

      <p
        data-reveal
        style="--reveal-delay: 190ms"
        class="mt-4 text-base font-medium text-muted-foreground sm:text-lg"
      >
        Clear questions for a clear mind
      </p>

      <Accordion.Root
        type="single"
        class="mt-6 space-y-4 px-5"
        data-reveal
        style="--reveal-delay: 250ms"
      >
        {#each faqs as faq, index}
          <Accordion.Item
            class="rounded-xl border bg-muted/30 p-2 px-6 transition-colors duration-200 hover:border-primary/40 last:border-b"
            data-reveal
            style={`--reveal-delay: ${270 + index * 60}ms`}
          >
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
