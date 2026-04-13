<script lang="ts">
  import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";
  import Button from "$lib/components/ui/button/button.svelte";
  import type { CarouselAPI } from "$lib/components/ui/carousel/context.js";
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import { PRIMARY_CTA_HREF } from "$lib/config/primary-cta";

  type StorySlide = {
    label: string;
    value?: string;
    subvalue?: string;
    message?: string;
    cardClass: string;
    valueClass?: string;
  };

  const slides: StorySlide[] = [
    {
      label: "Execution Rate",
      value: "68%",
      cardClass:
        "bg-[radial-gradient(circle_at_85%_10%,hsl(var(--primary)/0.25),transparent_45%),linear-gradient(180deg,hsl(207_74%_18%),hsl(216_64%_10%))] text-primary",
      valueClass: "text-[clamp(3.8rem,12vw,6.2rem)]",
    },
    {
      label: "Completed",
      value: "17",
      subvalue: "blocks",
      cardClass:
        "bg-[radial-gradient(circle_at_15%_15%,hsl(142_72%_48%/0.28),transparent_42%),linear-gradient(180deg,hsl(147_62%_16%),hsl(155_62%_10%))] text-white",
      valueClass: "text-[clamp(3.2rem,10.5vw,5.6rem)]",
    },
    {
      label: "Missed",
      value: "8",
      subvalue: "blocks",
      cardClass:
        "bg-[radial-gradient(circle_at_15%_20%,hsl(24_95%_58%/0.33),transparent_46%),linear-gradient(180deg,hsl(20_72%_19%),hsl(17_72%_11%))] text-destructive",
      valueClass: "text-[clamp(3.2rem,10.5vw,5.6rem)]",
    },
    {
      label: "Most Consistent Day",
      value: "Tuesday",
      cardClass:
        "bg-[radial-gradient(circle_at_80%_12%,hsl(192_96%_56%/0.32),transparent_46%),linear-gradient(178deg,hsl(199_68%_17%),hsl(212_74%_10%))] text-white",
      valueClass: "text-[clamp(2.4rem,8.2vw,4.2rem)]",
    },
    {
      label: "Worst Day",
      value: "Friday",
      cardClass:
        "bg-[radial-gradient(circle_at_80%_14%,hsl(358_89%_64%/0.28),transparent_48%),linear-gradient(180deg,hsl(353_53%_18%),hsl(352_60%_10%))] text-destructive",
      valueClass: "text-[clamp(2.4rem,8.2vw,4.2rem)]",
    },
    {
      label: "You said you wanted more.",
      value: "Now you see the truth.",
      cardClass:
        "bg-[radial-gradient(circle_at_90%_10%,hsl(var(--primary)/0.28),transparent_44%),linear-gradient(165deg,hsl(var(--card)),hsl(var(--muted)))] text-primary",
    },
  ];

  let api = $state<CarouselAPI | undefined>();
  let selectedIndex = $state(0);

  function handleApi(nextApi: CarouselAPI | undefined) {
    api = nextApi;
  }

  function goNext() {
    api?.scrollNext();
  }

  function goPrev() {
    api?.scrollPrev();
  }

  $effect(() => {
    if (!api) return;
    const currentApi = api;

    const onSelect = () => {
      selectedIndex = currentApi.selectedScrollSnap();
    };

    currentApi.on("select", onSelect);
    onSelect();

    return () => {
      currentApi.off("select", onSelect);
    };
  });
</script>

<div
  class="relative w-full max-w-70 sm:max-w-80 lg:max-w-95"
  aria-label="Weekly review story"
>
  <div
    class="absolute top-5 left-1/2 z-20 flex w-[82%] -translate-x-1/2 gap-2"
    aria-hidden="true"
  >
    {#each slides as _, i}
      <span class="h-0.5 flex-1 rounded-full bg-black/18">
        <span
          class={`block h-full rounded-full transition-all duration-300 ${i <=
          selectedIndex
            ? "bg-white"
            : "bg-white/35"}`}
        ></span>
      </span>
    {/each}
  </div>

  <Carousel.Root
    setApi={handleApi}
    opts={{ loop: false }}
    class="rounded-[1.6rem] border border-border/60 bg-card/50 p-2 shadow-2xl"
  >
    <Carousel.Content class="ms-0!">
      {#each slides as slide, i}
        <Carousel.Item class="ps-0! rounded-[1.2rem] overflow-hidden ">
          <article
            class={`relative flex h-100 flex-col overflow-hidden rounded-[1.2rem] px-7 pt-16 pb-7 sm:h-110 sm:px-8 sm:pb-8 ${slide.cardClass}`}
            aria-label={`Story ${i + 1} of ${slides.length}`}
          >
            <div
              class="pointer-events-none absolute top-10 right-10 h-22 w-22 rounded-full bg-white/10 blur-2xl"
            ></div>

            <p
              class="text-xs font-semibold uppercase tracking-[0.2em] text-white/80"
            >
              {slide.label}
            </p>

            <div class="mt-6 flex flex-1 flex-col justify-center items-center">
              {#if slide.value}
                <p
                  class={`font-heading leading-none font-black tracking-tight ${slide.valueClass ?? "text-[clamp(3rem,10vw,5rem)]"}`}
                >
                  {slide.value}
                </p>
              {:else}
                <div class="h-24 sm:h-30"></div>
              {/if}

              {#if slide.subvalue}
                <p class="mt-2 text-lg font-medium text-white/90">
                  {slide.subvalue}
                </p>
              {/if}

              {#if slide.message}
                <p
                  class="mt-3 max-w-56 text-pretty text-xl font-semibold leading-tight sm:max-w-62"
                >
                  {slide.message}
                </p>
              {/if}
            </div>

            {#if i === slides.length - 1}
              <Button
                href={PRIMARY_CTA_HREF}
                size="lg"
                class="relative z-20 mt-4 h-11 w-fit rounded-xl px-5 text-sm font-semibold"
                variant="outline"
              >
                Build Next Week
                <ArrowUpRight class="size-4" />
              </Button>
            {/if}

            <button
              type="button"
              class="absolute inset-y-0 left-0 z-10 w-1/2"
              aria-label="Previous story"
              onclick={goPrev}
            ></button>
            <button
              type="button"
              class="absolute inset-y-0 right-0 z-10 w-1/2"
              aria-label="Next story"
              onclick={goNext}
            ></button>
          </article>
        </Carousel.Item>
      {/each}
    </Carousel.Content>

    <Carousel.Previous
      class="top-1/2 z-30 -translate-y-1/2 border-white/35 bg-black/25 text-white hover:bg-black/40"
      aria-label="Previous story"
    />
    <Carousel.Next
      class="top-1/2 z-30 -translate-y-1/2 border-white/35 bg-black/25 text-white hover:bg-black/40"
      aria-label="Next story"
    />

    <div class="absolute inset-x-0 -bottom-11 flex items-center justify-center">
      <p class="text-xs text-muted-foreground/85">
        Story {selectedIndex + 1} / {slides.length}
      </p>
    </div>
  </Carousel.Root>
</div>
