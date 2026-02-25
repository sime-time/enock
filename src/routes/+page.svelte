<script lang="ts">
	import Navbar from "$lib/components/marketing/navbar.svelte";
	import Hero from "$lib/components/marketing/hero.svelte";
	import Problem from "$lib/components/marketing/problem.svelte";
	import Diagnosis from "$lib/components/marketing/diagnosis.svelte";
	import Method from "$lib/components/marketing/method/index.svelte";
	import Pricing from "$lib/components/marketing/pricing.svelte";
	import Faq from "$lib/components/marketing/faq.svelte";
	import FinalDecision from "$lib/components/marketing/final-decision.svelte";
	import Footer from "$lib/components/marketing/footer.svelte";
	import { onMount } from "svelte";

	// set dark mode on the landing page only
	onMount(() => {
		const root = document.documentElement;
		const hadDark = root.classList.contains("dark");
		const previousColorScheme = root.style.colorScheme;
		root.classList.add("dark");
		root.style.colorScheme = "dark";
		return () => {
			if (!hadDark) root.classList.remove("dark");
			root.style.colorScheme = previousColorScheme;
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
