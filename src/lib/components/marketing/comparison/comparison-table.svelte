<script lang="ts">
  const traditionalCard = {
    title: "Traditional calendars",
    label: "Google Calendar, Outlook, Apple Calendar",
    items: [
      "Built for meetings and events",
      "Best for coordinating with other people",
      "No real way to track execution",
      "The week ends without showing what actually happened",
    ],
  };

  const enockCard = {
    title: "Enock",
    label: "iOS and Android app",
    items: [
      "Built for personal time blocking",
      "Built for following through with yourself",
      "Mark each block as done or missed",
      "End the week with a clear record of your execution",
    ],
  };
</script>

<div class="grid gap-4 md:grid-cols-2 md:gap-6">
  <section
    data-reveal
    style="--reveal-delay: 240ms"
    class="overflow-hidden rounded-2xl border border-destructive/35 bg-destructive/5"
  >
    <div
      class="border-b border-destructive/35 bg-destructive/10 px-5 py-4 sm:px-6"
    >
      <h3
        class="text-base font-semibold uppercase tracking-[0.12em] text-destructive sm:text-lg"
      >
        {traditionalCard.title}
      </h3>
      <p class="mt-1.5 text-sm text-muted-foreground">
        {traditionalCard.label}
      </p>
    </div>

    <ul class="px-5 py-3 sm:px-6 sm:py-4">
      {#each traditionalCard.items as item, index (item)}
        <li
          data-reveal
          style={`--reveal-delay: ${270 + index * 42}ms`}
          class="border-b border-destructive/18 py-3 text-base tracking-wide text-muted-foreground last:border-b-0"
        >
          {item}
        </li>
      {/each}
    </ul>
  </section>

  <section
    data-reveal
    style="--reveal-delay: 300ms"
    class="overflow-hidden rounded-2xl border border-primary/35 bg-primary/8"
  >
    <div class="border-b border-primary/35 bg-primary/12 px-5 py-4 sm:px-6">
      <h3
        class="text-base font-semibold uppercase tracking-[0.12em] text-primary sm:text-lg"
      >
        {enockCard.title}
      </h3>
      <p class="mt-1.5 text-sm text-muted-foreground">{enockCard.label}</p>
    </div>

    <ul class="px-5 py-3 sm:px-6 sm:py-4">
      {#each enockCard.items as item, index (item)}
        <li
          data-reveal
          style={`--reveal-delay: ${330 + index * 42}ms`}
          class="border-b border-primary/20 py-3 text-base tracking-wide font-semibold text-foreground last:border-b-0"
        >
          {item}
        </li>
      {/each}
    </ul>
  </section>
</div>
