<script lang="ts">
  import { onMount } from "svelte";
  import Diagnosis from "$lib/components/marketing/diagnosis.svelte";
  import Faq from "$lib/components/marketing/faq.svelte";
  import FinalDecision from "$lib/components/marketing/final-decision.svelte";
  import Footer from "$lib/components/marketing/footer.svelte";
  import Hero from "$lib/components/marketing/hero.svelte";
  import Method from "$lib/components/marketing/method/index.svelte";
  import Navbar from "$lib/components/marketing/navbar.svelte";
  import Pricing from "$lib/components/marketing/pricing.svelte";
  import Problem from "$lib/components/marketing/problem.svelte";

  onMount(() => {
    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        }
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    revealElements.forEach((el) => {
      revealObserver.observe(el);
    });

    requestAnimationFrame(() => {
      for (const el of revealElements) {
        const { top } = el.getBoundingClientRect();
        if (top < window.innerHeight * 0.9) {
          el.classList.add("is-visible");
        }
      }
    });

    return () => {
      revealObserver.disconnect();
    };
  });
</script>

<div class="bg-background text-foreground">
  <Navbar />
  <main class="min-h-screen">
    <Hero />
    <Problem />
    <Diagnosis />
    <Method />
    <Pricing />
    <Faq />
    <FinalDecision />
  </main>
  <Footer />
</div>

<style>
  :global([data-reveal]) {
    opacity: 0;
    transform: translateY(12px);
    transition:
      opacity 460ms cubic-bezier(0.22, 1, 0.36, 1),
      transform 460ms cubic-bezier(0.22, 1, 0.36, 1);
    transition-delay: var(--reveal-delay, 0ms);
    will-change: opacity, transform;
  }

  :global([data-reveal].is-visible) {
    opacity: 1;
    transform: translateY(0);
  }

  :global(.hover-rise) {
    transition:
      transform 220ms cubic-bezier(0.22, 1, 0.36, 1),
      box-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  :global(.hover-rise:hover) {
    transform: translateY(-2px);
  }

  @media (prefers-reduced-motion: reduce) {
    :global([data-reveal]) {
      opacity: 1;
      transform: none;
      transition: none;
    }

    :global(.hover-rise),
    :global(.hover-rise:hover) {
      transform: none;
      transition: none;
    }
  }
</style>
