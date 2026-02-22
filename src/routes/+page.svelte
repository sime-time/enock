<script lang="ts">
	import Navbar from "$lib/components/marketing/navbar.svelte";
	import Hero from "$lib/components/marketing/hero.svelte";
	import Problem from "$lib/components/marketing/problem.svelte";
	import Diagnosis from "$lib/components/marketing/diagnosis.svelte";
	import Method from "$lib/components/marketing/method/index.svelte";
</script>

<div class="dark bg-background text-foreground">
	<Navbar />
	<main class="min-h-screen">
		<Hero />
		<Problem />
		<Diagnosis />
		<Method />
	</main>
</div>
