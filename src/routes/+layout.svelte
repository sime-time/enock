<script lang="ts">
	import logo from "$lib/assets/enock-logo.svg";
	import "@fontsource-variable/plus-jakarta-sans";
	import "@fontsource-variable/onest";
	import "../app.css";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={logo} />
</svelte:head>

{@render children()}
