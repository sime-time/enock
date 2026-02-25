<script lang="ts">
  import Navbar from "$lib/components/marketing/navbar.svelte";
  import Hero from "$lib/components/marketing/hero.svelte";
  import Problem from "$lib/components/marketing/problem.svelte";
  import Diagnosis from "$lib/components/marketing/diagnosis.svelte";
  import Method from "$lib/components/marketing/method/index.svelte";
  import FAQ from "$lib/components/marketing/faq.svelte";
  import FinalDecision from "$lib/components/marketing/final-decision.svelte";
  import Footer from "$lib/components/marketing/footer.svelte";
</script>

<div class="dark bg-background text-foreground">
	<Navbar />
	<main class="min-h-screen">
		<Hero />
		<Problem />
		<Diagnosis />
		<Method />
		<FAQ />
		<FinalDecision />
	</main>
	<Footer />
</div>
