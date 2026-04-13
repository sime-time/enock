<script lang="ts">
  import ComparisonTable from "$lib/components/marketing/comparison/comparison-table.svelte";
  import { Badge } from "$lib/components/ui/badge";
</script>

<section id="comparison" class="relative bg-background py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-3xl text-center">
      <Badge
        data-reveal
        style="--reveal-delay: 40ms"
        variant="outline"
        class="mb-8 gap-2 rounded-full border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-primary"
      >
        <span class="size-2 rounded-full bg-primary"></span>
        Comparison
      </Badge>

      <h2
        data-reveal
        style="--reveal-delay: 120ms"
        class="font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl"
      >
        Traditional calendars organize your
        <span class="text-destructive">schedule.</span>
      </h2>

      <p
        data-reveal
        style="--reveal-delay: 190ms"
        class="mt-4 text-2xl font-medium text-muted-foreground "
      >
        Enock organizes your
        <span class="font-semibold text-primary">behavior.</span>
      </p>
    </div>

    <div class="mx-auto mt-10 max-w-6xl sm:mt-12"><ComparisonTable /></div>

    <p
      data-reveal
      style="--reveal-delay: 620ms"
      class="mx-auto mt-10 max-w-3xl text-center font-medium leading-relaxed text-foreground sm:mt-12 text-xl"
    >
      One helps you plan time.
      <br>
      <span class="text-primary">The other exposes how you use it.</span>
    </p>
  </div>
</section>
