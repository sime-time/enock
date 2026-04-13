<script lang="ts">
  import logo from "$lib/assets/enock-logo.svg";
  import "@fontsource-variable/plus-jakarta-sans";
  import "@fontsource-variable/onest";
  import "../app.css";
  import Footer from "$lib/components/marketing/footer.svelte";

  let { children } = $props();
</script>

<svelte:head>
  <title>Enock</title>
  <meta
    name="description"
    content="Enock is a personal productivity app that helps you plan time blocks, track execution, and turn your schedule into consistent daily progress."
  >
  <link rel="icon" href={logo}>
</svelte:head>

{@render children()}
<Footer />
