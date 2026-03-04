<script lang="ts">
  import ArrowRight from "@lucide/svelte/icons/arrow-right";
  import ArrowUp from "@lucide/svelte/icons/arrow-up";
  import CalendarClockIcon from "@lucide/svelte/icons/calendar-clock";
  import Button from "$lib/components/ui/button/button.svelte";
</script>

<section id="method-step-3" class="relative overflow-hidden py-16 sm:py-20">
  <div
    class="pointer-events-none absolute inset-0 bg-linear-to-b from-background/20 via-background/60 to-background"
  ></div>

  <div
    class="relative mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:items-start lg:gap-12 lg:px-8"
  >
    <div
      data-reveal
      style="--reveal-delay: 150ms"
      class="rounded-2xl border border-border/70 bg-card/50 p-4 shadow-2xl backdrop-blur-sm sm:p-5"
    >
      <div class="space-y-4 border-border/60 bg-background/65 p-4">
        <div class="flex justify-end">
          <div
            class="max-w-[85%] rounded-2xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground sm:text-base"
          >
            I skipped my deep work block today.
          </div>
        </div>

        <div class="flex justify-start">
          <div
            class="max-w-[90%] rounded-2xl bg-muted px-4 py-3 text-sm text-foreground sm:text-base"
          >
            <p>
              You scheduled it at 6 PM. You usually avoid work at that time.
              Move it to morning.
            </p>
            <div
              class="mt-3 inline-flex items-center gap-2 rounded-lg border border-border/70 bg-background/70 px-3 py-2 text-xs text-muted-foreground"
            >
              <CalendarClockIcon class="size-4 text-primary" />
              Suggested: 8:00 AM - 9:00 AM tomorrow
            </div>
          </div>
        </div>

        <div class="flex flex-wrap gap-2">
          <span
            class="rounded-full border border-border/70 bg-background/70 px-3 py-1.5 text-xs text-muted-foreground"
            >Move to 8:00 AM</span
          >
          <span
            class="rounded-full border border-border/70 bg-background/70 px-3 py-1.5 text-xs text-muted-foreground"
            >Cancel</span
          >
        </div>
      </div>

      <div
        class="w-full bg-input/30 rounded-3xl p-1 flex items-center justify-between gap-2 border mt-3"
      >
        <p class="px-3 text-muted-foreground">Continue the coversation...</p>
        <Button
          type="submit"
          size="icon"
          class="rounded-full shrink-0 self-end"
        >
          <ArrowUp class="size-5" />
        </Button>
      </div>
    </div>

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
  </div>
</section>
