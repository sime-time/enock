<script lang="ts">
import BellOffIcon from "@lucide/svelte/icons/bell-off";
import CalendarClockIcon from "@lucide/svelte/icons/calendar-clock";
import TimerResetIcon from "@lucide/svelte/icons/timer-reset";
import TrophyIcon from "@lucide/svelte/icons/trophy";
import { Badge } from "$lib/components/ui/badge";

const questions = [
  {
    sentence: "Are you proud of how you spent this week?",
    icon: CalendarClockIcon,
  },
  {
    sentence: "If you repeated this week for 3 years, where would you end up?",
    icon: TimerResetIcon,
  },
  {
    sentence: "Does your calendar reflect your ambition?",
    icon: TrophyIcon,
  },
  {
    sentence: "Or your distractions?",
    icon: BellOffIcon,
  },
];
</script>

<section
  id="problem"
  class="relative isolate overflow-hidden bg-background py-24 sm:py-32"
>
  <div
    class="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
  >
    <div
      class="h-auto w-100 sm:h-245 sm:w-170 max-w-[92vw] opacity-18 mix-blend-screen"
    >
      <img
        alt="Faded Greco-Roman head bust"
        class="h-full w-full object-cover object-center grayscale saturate-0 contrast-110 brightness-60"
        src="/head-bust.webp"
      >
    </div>
  </div>

  <div
    class="pointer-events-none absolute inset-0 bg-linear-to-b from-background via-background/65 to-background"
  ></div>

  <div
    class="pointer-events-none absolute inset-0 bg-linear-to-r from-background/85 via-transparent to-background/85"
  ></div>

  <div
    class="relative z-10 mx-auto flex max-w-full flex-col items-center px-6 text-center lg:px-8"
  >
    <Badge
      data-reveal
      style="--reveal-delay: 40ms"
      variant="outline"
      class="mb-8 gap-2 rounded-full border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-primary"
    >
      <span class="size-2 rounded-full bg-primary"></span>
      The Reality Check
    </Badge>

    <h2
      data-reveal
      style="--reveal-delay: 120ms"
      class="font-heading max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground md:text-6xl"
    >
      You don't have a <span class="text-muted-foreground">motivation</span>
      problem.
      <br>
      <br>
      You have a <span class="text-primary">structure</span> problem.
    </h2>

    <div class="mt-16 w-full space-y-12 sm:mt-20 sm:space-y-14">
      {#each questions as question, index}
        <div
          data-reveal
          style={`--reveal-delay: ${180 + index * 70}ms`}
          class="group mx-auto flex max-w-full flex-col items-center gap-4 will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02]"
        >
          <!-- biome-ignore format: svelte dotted component name -->
          <question.icon
            class="size-9 text-muted-foreground will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:text-primary sm:size-10"
          />
          <p
            class="text-lg leading-tight font-medium text-muted-foreground transition-colors duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-foreground sm:text-2xl"
          >
            "{question.sentence}"
          </p>
        </div>
      {/each}
    </div>
  </div>
</section>
