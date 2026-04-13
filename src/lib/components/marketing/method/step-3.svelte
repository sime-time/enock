<script lang="ts">
  import ArrowRight from "@lucide/svelte/icons/arrow-right";
  import CircleArrowRight from "@lucide/svelte/icons/circle-arrow-right";
  import WeeklyReviewCarousel from "$lib/components/marketing/weekly-review-carousel.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import { PRIMARY_CTA_HREF } from "$lib/config/primary-cta";

  let bullets = [
    "See what you actually followed.",
    "See what you skipped.",
    "See where your time leaked.",
  ];
</script>

<section id="method-step-3" class="relative overflow-hidden py-16 sm:py-20">
  <div
    class="pointer-events-none absolute inset-0 bg-linear-to-b from-background/20 via-background/60 to-background"
  ></div>

  <div
    class="relative mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:items-start lg:gap-12 lg:px-8"
  >
    <div
      class="order-1 max-w-xl lg:order-2"
      data-reveal
      style="--reveal-delay: 70ms"
    >
      <p
        class="mb-6 text-sm font-semibold uppercase tracking-[0.16em] text-primary"
      >
        Step - 03
      </p>

      <h3
        class="font-heading text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl"
      >
        Measure your execution
      </h3>

      <ul class="mt-6 space-y-3">
        {#each bullets as bullet}
          <li class="flex items-start gap-3 text-muted-foreground">
            <CircleArrowRight class="mt-0.5 size-5 shrink-0 text-primary" />
            <span>{bullet}</span>
          </li>
        {/each}
      </ul>

      <Button
        href={PRIMARY_CTA_HREF}
        size="lg"
        class="hover-rise h-12 rounded-xl px-8 text-base font-semibold mt-8"
      >
        Execute with Enock
        <ArrowRight />
      </Button>
    </div>

    <div
      data-reveal
      style="--reveal-delay: 150ms"
      class="order-2 flex items-start justify-center lg:order-1"
    >
      <WeeklyReviewCarousel />
    </div>
  </div>
</section>
