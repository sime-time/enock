<svelte:head>
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
  >
  <meta name="theme-color" content="#020f0b">
  <meta
    name="theme-color"
    media="(prefers-color-scheme: light)"
    content="#020f0b"
  >
  <meta
    name="theme-color"
    media="(prefers-color-scheme: dark)"
    content="#020f0b"
  >
  <meta name="color-scheme" content="dark">
  <meta
    name="apple-mobile-web-app-status-bar-style"
    content="black-translucent"
  >
  <title>Waitlist | Enock</title>
</svelte:head>

<main class="waitlist-root bg-background text-foreground">
  <iframe
    class="request-frame"
    src="https://app.youform.com/forms/d8tpht97"
    title="Enock Waitlist"
    referrerpolicy="no-referrer-when-downgrade"
  ></iframe>
</main>

<style>
  :global(html),
  :global(body) {
    background: #020f0b !important;
    color-scheme: dark;
  }

  .waitlist-root {
    position: fixed;
    inset: 0;
    background: #020f0b;
    padding-bottom: env(safe-area-inset-bottom);
  }

  .request-frame {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
    background: #020f0b;
  }
</style>
