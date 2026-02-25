<script lang="ts">
  import ArrowRight from "@lucide/svelte/icons/arrow-right";
  import CalendarDaysIcon from "@lucide/svelte/icons/calendar-days";
  import CircleCheckIcon from "@lucide/svelte/icons/circle-check";
  import Button from "$lib/components/ui/button/button.svelte";
  import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";

  const timeLabels = [
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
    "3 PM",
  ];

  let pulseEventId = $state<number | null>(null);

  let events = $state([
    {
      id: 0,
      title: "Morning Walk",
      time: "8:00 - 9:00 AM",
      top: 0,
      height: 39,
      checked: true,
      classes: "border-l-green-300 bg-green-400/18 text-green-100",
      pulseClass: "bg-green-400/35",
      checkboxClass:
        "!border-green-300 data-[state=checked]:!border-green-300 data-[state=checked]:!bg-green-300 data-[state=checked]:!text-green-950",
    },
    {
      id: 1,
      title: "Deep Work",
      time: "9:00- 12:00 PM",
      top: 42,
      height: 118,
      checked: true,
      classes: "border-l-blue-400 bg-blue-500/30 text-blue-100",
      pulseClass: "bg-blue-500/45",
      checkboxClass:
        "!border-blue-400 data-[state=checked]:!border-blue-400 data-[state=checked]:!bg-blue-400 data-[state=checked]:!text-blue-950",
    },
    {
      id: 2,
      title: "Cook & Eat Lunch",
      time: "12:00 - 1:00 PM",
      top: 163,
      height: 40,
      checked: false,
      classes: "border-l-amber-400 bg-amber-500/20 text-amber-100",
      pulseClass: "bg-amber-500/40",
      checkboxClass:
        "!border-amber-400 data-[state=checked]:!border-amber-400 data-[state=checked]:!bg-amber-400 data-[state=checked]:!text-amber-950",
    },
    {
      id: 3,
      title: "Gym",
      time: "1:00 - 2:30 PM",
      top: 206,
      height: 63,
      checked: false,
      classes: "border-l-red-400 bg-red-500/20 text-red-100",
      pulseClass: "bg-red-500/40",
      checkboxClass:
        "!border-red-400 data-[state=checked]:!border-red-400 data-[state=checked]:!bg-red-400 data-[state=checked]:!text-red-950",
    },
    {
      id: 4,
      title: "Marketing",
      time: "2:30 - 3:30 PM",
      top: 272,
      height: 58,
      checked: false,
      classes: "border-l-blue-400 bg-blue-500/30 text-blue-100",
      pulseClass: "bg-blue-500/45",
      checkboxClass:
        "!border-blue-400 data-[state=checked]:!border-blue-400 data-[state=checked]:!bg-blue-400 data-[state=checked]:!text-blue-950",
    },
  ]);

  function toggleEvent(eventId: number, checked: boolean): void {
    const targetEvent = events.find((event) => event.id === eventId);
    if (!targetEvent) {
      return;
    }

    targetEvent.checked = checked;
    pulseEventId = null;

    requestAnimationFrame(() => {
      pulseEventId = eventId;
      setTimeout(() => {
        if (pulseEventId === eventId) {
          pulseEventId = null;
        }
      }, 220);
    });
  }
</script>

<section id="method-step-2" class="relative overflow-hidden py-16 sm:py-20">
  <div
    class="pointer-events-none absolute inset-0 bg-linear-to-b from-background/20 via-background/60 to-background"
  ></div>

  <div
    class="relative mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:items-start lg:gap-12 lg:px-8"
  >
    <div
      data-reveal
      style="--reveal-delay: 70ms"
      class="order-2 lg:order-1 overflow-hidden rounded-xl border border-border/70 bg-background/75"
    >
      <div class="flex items-start justify-between px-4 pt-4 pb-3">
        <div class="flex items-center gap-3">
          <CalendarDaysIcon class="size-5 text-muted-foreground" />
          <p class="font-heading text-base font-semibold text-muted-foreground">
            Feb 2026
          </p>
        </div>
        <div class="text-right">
          <p class="text-sm text-muted-foreground">Sun 22</p>
        </div>
      </div>

      <div class="grid grid-cols-[62px_1fr] border-t border-border/60">
        <div class="border-r border-border/60 bg-background/60 px-3 py-8.5">
          {#each timeLabels as label}
            <div
              class="h-10 text-xs font-medium text-muted-foreground/80 text-end"
            >
              {label}
            </div>
          {/each}
        </div>

        <div class="relative bg-background/35">
          {#each timeLabels as _, i}
            <div
              class="absolute right-0 left-0 border-t border-border/35"
              style={`top: ${i * 40}px`}
            ></div>
          {/each}

          {#each events as event (event.id)}
            <div
              class={`absolute right-3 left-2 overflow-hidden rounded-md border border-border/40 border-l-4 px-2.5 py-1 ${event.classes}`}
              style={`top:${event.top}px;height:${event.height}px`}
            >
              <div
                aria-hidden="true"
                class={`pointer-events-none absolute inset-0 ${event.pulseClass} ${pulseEventId === event.id
                  ? "event-pulse"
                  : "opacity-0"}`}
              ></div>

              <div class="relative flex items-start gap-2">
                <Checkbox
                  class={`mt-0.5 bg-white/10 ${event.checkboxClass}`}
                  checked={event.checked}
                  onCheckedChange={(checked) =>
                    toggleEvent(event.id, checked === true)}
                  aria-label={`Mark ${event.title} complete`}
                />
                <div>
                  <p
                    class={`text-sm leading-tight transition-all ${event.checked
                      ? "line-through opacity-70"
                      : ""}`}
                  >
                    {event.title}
                  </p>
                  <p class="text-xs text-current/80">{event.time}</p>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
    <div
      class="order-1 lg:order-2 max-w-xl"
      data-reveal
      style="--reveal-delay: 140ms"
    >
      <p
        class="mb-6 text-sm font-semibold uppercase tracking-[0.16em] text-primary"
      >
        Step - 02
      </p>

      <h3
        class="font-heading text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl"
      >
        Structure the Week
      </h3>

      <p class="mt-5 text-lg leading-relaxed text-muted-foreground">
        Enock builds a focused 7-day plan inside your calendar.
      </p>

      <ul class="mt-6 space-y-3">
        <li class="flex items-start gap-3 text-muted-foreground">
          <CircleCheckIcon class="mt-0.5 size-5 shrink-0 text-primary" />
          <span>Keyboard shortcuts for quick calendar actions</span>
        </li>
        <li class="flex items-start gap-3 text-muted-foreground">
          <CircleCheckIcon class="mt-0.5 size-5 shrink-0 text-primary" />
          <span>Clear separation between work, training, and recovery</span>
        </li>
        <li class="flex items-start gap-3 text-muted-foreground">
          <CircleCheckIcon class="mt-0.5 size-5 shrink-0 text-primary" />
          <span>No empty time - everything is intentional</span>
        </li>
        <li class="flex items-start gap-3 text-muted-foreground">
          <CircleCheckIcon class="mt-0.5 size-5 shrink-0 text-primary" />
          <span>Enock knows how you spend your time</span>
        </li>
      </ul>
      <Button
        href="/auth/login"
        size="lg"
        class="hover-rise h-12 rounded-xl px-8 text-base font-semibold mt-8"
      >
        Build Your Week
        <ArrowRight />
      </Button>
    </div>
  </div>
</section>

<style>
  .event-pulse {
    animation: event-pulse 200ms ease-out;
  }

  @keyframes event-pulse {
    0% {
      opacity: 0;
    }

    35% {
      opacity: 0.75;
    }

    100% {
      opacity: 0;
    }
  }
</style>
