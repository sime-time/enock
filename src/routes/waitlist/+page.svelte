<svelte:head>
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
  >
  <meta name="theme-color" content="#020f0b">
  <meta
    name="apple-mobile-web-app-status-bar-style"
    content="black-translucent"
  >
  <title>Waitlist | Enock</title>
</svelte:head>

<main class="bg-background text-foreground">
  <iframe
    class="request-frame"
    src="https://app.youform.com/forms/d8tpht97"
    title="Enock Waitlist"
    referrerpolicy="no-referrer-when-downgrade"
  ></iframe>
</main>

<style>
  :global(html),
  :global(body),
  main {
    background: #020f0b;
  }

  .request-frame {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100dvh;
    border: 0;
  }
</style>
