<script lang="ts">
  import ArrowRight from "@lucide/svelte/icons/arrow-right";
  import Button from "$lib/components/ui/button/button.svelte";
  import { PRIMARY_CTA_HREF } from "$lib/config/primary-cta";
</script>

<section id="method-step-1" class="relative overflow-hidden py-16 sm:py-20">
  <div
    class="pointer-events-none absolute inset-0 bg-linear-to-b from-background/20 via-background/60 to-background"
  ></div>

  <div
    class="relative mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:items-start lg:gap-12 lg:px-8"
  >
    <div
      data-reveal
      style="--reveal-delay: 60ms"
      class="flex items-start justify-center lg:justify-start"
    >
      <div class="h-80 w-full max-w-130 overflow-hidden sm:h-95 lg:h-115">
        <img
          src="/woman-bow-arrow.webp"
          alt="Statue of a woman aiming a bow and arrow to the right"
          class="h-full w-full object-cover object-top"
          loading="lazy"
        >
      </div>
    </div>

    <div class="max-w-xl lg:pt-20" data-reveal style="--reveal-delay: 140ms">
      <p
        class="mb-6 text-sm font-semibold uppercase tracking-[0.16em] text-primary"
      >
        Step - 01
      </p>

      <h3
        class="font-heading text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl"
      >
        Target what matters
      </h3>

      <p class="mt-5 text-lg leading-relaxed text-muted-foreground">
        You don’t need more ideas. You need clarity on where your time should
        go. Work. Training. Health. Life. Anything that matters.
      </p>
      <Button
        href={PRIMARY_CTA_HREF}
        size="lg"
        class="hover-rise h-12 rounded-xl px-8 text-base font-semibold mt-8"
      >
        Define your goals
        <ArrowRight />
      </Button>
    </div>
  </div>
</section>
