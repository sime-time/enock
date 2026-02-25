<script lang="ts">
  import ArrowRight from "@lucide/svelte/icons/arrow-right";
  import BriefcaseBusinessIcon from "@lucide/svelte/icons/briefcase-business";
  import CheckIcon from "@lucide/svelte/icons/check";
  import DumbbellIcon from "@lucide/svelte/icons/dumbbell";
  import HeartIcon from "@lucide/svelte/icons/heart";
  import MicIcon from "@lucide/svelte/icons/mic";
  import TargetIcon from "@lucide/svelte/icons/target";
  import Button from "$lib/components/ui/button/button.svelte";

  let selected = $state([0]);
  let focusSuccessAnswers = $state<Record<number, string>>({});

  const focusCards = [
    {
      id: 0,
      title: "Fitness",
      description: "Health & vitality",
      icon: DumbbellIcon,
      placeholder: "Have 6 pack abs...",
    },
    {
      id: 1,
      title: "Career",
      description: "Wealth & business",
      icon: BriefcaseBusinessIcon,
      placeholder: "Earn $10k per month...",
    },
    {
      id: 2,
      title: "Discipline",
      description: "Habits & routine",
      icon: TargetIcon,
      placeholder: "Wake up early...",
    },
    {
      id: 3,
      title: "Relationships",
      description: "Family & friends",
      icon: HeartIcon,
      placeholder: "Have a girlfriend...",
    },
  ];

  let selectedFocusCards = $derived(
    focusCards.filter((card) => selected.includes(card.id)),
  );
</script>

<section id="method-step-1" class="relative overflow-hidden py-16 sm:py-20">
  <div
    class="pointer-events-none absolute inset-0 bg-linear-to-b from-background/20 via-background/60 to-background"
  ></div>

  <div
    class="relative mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:items-start lg:gap-12 lg:px-8"
  >
    <div class="max-w-xl" data-reveal style="--reveal-delay: 60ms">
      <p
        class="mb-6 text-sm font-semibold uppercase tracking-[0.16em] text-primary"
      >
        Step - 01
      </p>

      <h3
        class="font-heading text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl"
      >
        Define Your Goals
      </h3>

      <p class="mt-5 text-lg leading-relaxed text-muted-foreground">
        Clarify what success actually looks like. Choose areas that matter and
        define them with intention. Career. Fitness. Relationships. Whatever you
        care about.
      </p>
      <Button
        href="/auth/login"
        size="lg"
        class="hover-rise h-12 rounded-xl px-8 text-base font-semibold mt-8"
      >
        Achieve Your Goals
        <ArrowRight />
      </Button>
    </div>

    <div
      data-reveal
      style="--reveal-delay: 140ms"
      class="rounded-2xl border border-border/70 bg-card/40 p-4 shadow-2xl backdrop-blur-sm sm:p-5"
    >
      <p class="mb-3 text-base font-semibold text-foreground">
        Select Focus Area(s)
      </p>

      <div class="grid gap-3 sm:grid-cols-2">
        {#each focusCards as card (card.title)}
          <button
            type="button"
            onclick={() => {
							selected = selected.includes(card.id)
								? selected.filter((id) => id !== card.id)
								: [...selected, card.id];
						}}
            class={`hover-rise ${selected.includes(card.id)
							? "rounded-xl border border-primary bg-primary/10 p-3"
							: "rounded-xl border border-border/70 bg-background/40 p-3"}`}
          >
            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-3">
                <div
                  class="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary"
                >
                  <!-- biome-ignore format: svelte dotted component name -->
                  <card.icon class="size-4" />
                </div>
                <div class="flex flex-col items-start">
                  <p class="text-xl font-semibold text-foreground">
                    {card.title}
                  </p>
                  <p class="text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </div>
              </div>
              {#if selected.includes(card.id)}
                <div
                  class="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
                >
                  <CheckIcon class="size-4" />
                </div>
              {/if}
            </div>
          </button>
        {/each}
      </div>

      <div class="mt-4 rounded-xl border border-border/70 bg-background/55 p-4">
        <p class="text-sm font-semibold text-foreground">
          Define success for each selected area
        </p>
        <p class="mt-1 text-xs text-muted-foreground">
          Be specific and measurable so your goals are clear.
        </p>

        {#if selectedFocusCards.length === 0}
          <p
            class="mt-3 rounded-lg border border-dashed border-border/70 px-3 py-2 text-sm text-muted-foreground"
          >
            Pick at least one focus area to define success.
          </p>
        {:else}
          <div class="mt-3 space-y-3">
            {#each selectedFocusCards as card (card.id)}
              <div class="space-y-2">
                <label
                  class="block text-sm font-medium text-foreground"
                  for={`focus-success-${card.id}`}
                >
                  What does success mean to you in {card.title}?
                </label>
                <div
                  class="w-full rounded-3xl border border-border bg-input/30 p-1 flex items-center justify-between gap-2"
                >
                  <input
                    id={`focus-success-${card.id}`}
                    type="text"
                    class="w-full bg-transparent px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                    placeholder={card.placeholder}
                    bind:value={focusSuccessAnswers[card.id]}
                  >
                  <Button
                    type="button"
                    size="icon"
                    class="rounded-full shrink-0"
                  >
                    <MicIcon class="size-4" />
                  </Button>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>
