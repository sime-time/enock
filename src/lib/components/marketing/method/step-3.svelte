<script lang="ts">
  import ArrowRight from "@lucide/svelte/icons/arrow-right";
  import Button from "$lib/components/ui/button/button.svelte";
</script>

<section id="method-step-3" class="relative overflow-hidden py-16 sm:py-20">
  <div
    class="pointer-events-none absolute inset-0 bg-linear-to-b from-background/20 via-background/60 to-background"
  ></div>

  <div
    class="relative mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:items-start lg:gap-12 lg:px-8"
  >
    <div class="max-w-xl" data-reveal style="--reveal-delay: 70ms">
      <p
        class="mb-6 text-sm font-semibold uppercase tracking-[0.16em] text-primary"
      >
        Step - 03
      </p>

      <h3
        class="font-heading text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl"
      >
        Talk to Enock
      </h3>

      <p class="mt-5 text-lg leading-relaxed text-muted-foreground">
        Talk through your plan, refine your thinking, and adjust your next move.
        Enock sees your goals and your calendar, so every response is grounded
        in reality.
      </p>

      <Button
        href="/auth/login"
        size="lg"
        class="hover-rise h-12 rounded-xl px-8 text-base font-semibold mt-8"
      >
        Execute With Enock
        <ArrowRight />
      </Button>
    </div>

    <div
      data-reveal
      style="--reveal-delay: 150ms"
      class="flex items-start justify-center"
    >
      <div class="w-full max-w-70 sm:max-w-80 lg:max-w-95">
        <picture>
          <source srcset="/enock-convo.avif" type="image/avif">
          <img
            src="/enock-convo.webp"
            alt="iPhone conversation with Enock"
            class="h-auto w-full rounded-lg bg-card/40 shadow-2xl"
            loading="lazy"
          >
        </picture>
      </div>
    </div>
  </div>
</section>
