<script lang="ts">
  import MenuIcon from "@lucide/svelte/icons/menu";
  import logo from "$lib/assets/enock-logo.svg";
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Nav from "$lib/components/ui/navigation-menu/index";
  import * as Sheet from "$lib/components/ui/sheet/index";

  import { IsMobile } from "$lib/hooks/is-mobile.svelte";

  const isMobile = new IsMobile();

  const navItems = [
    {
      title: "Method",
      href: "#method",
    },
    {
      title: "Pricing",
      href: "#pricing",
    },
    {
      title: "FAQ",
      href: "#faq",
    },
  ];

  function scrollToSection(href: string, event?: MouseEvent): void {
    if (!href.startsWith("#")) return;

    event?.preventDefault();

    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;

    const navOffset = 0;
    const top = target.getBoundingClientRect().top + window.scrollY - navOffset;

    window.scrollTo({ top, behavior: "smooth" });
  }
</script>

<Nav.Root
  class="fixed top-0 z-10 flex mx-auto min-w-full items-center justify-between p-3 px-6"
>
  <Nav.List
    class="rounded-lg p-1 pr-3 bg-background backdrop-blur-md dark:border-input shadow-xs"
  >
    <Nav.Item>
      <a href="/" class="flex items-center gap-1.5">
        <img src={logo} alt="Enock logo" class="h-7 w-7">
        <span class="font-heading font-semibold text-lg">Enock</span>
      </a>
    </Nav.Item>
  </Nav.List>

  {#if !isMobile.current}
    <Nav.List
      class="text-muted-foreground gap-8 border rounded-full px-6 bg-input/60 backdrop-blur-md dark:border-input shadow-xs"
    >
      {#each navItems as item}
        <Nav.Item>
          <Nav.Link
            href={item.href}
            onclick={(event) => scrollToSection(item.href, event)}
            class="cursor-pointer transition-all duration-200 hover:bg-transparent focus:bg-transparent hover:text-foreground hover:-translate-y-0.5"
          >
            {item.title}
          </Nav.Link>
        </Nav.Item>
      {/each}
    </Nav.List>
    <Button
      href="/auth/login"
      class="transition-transform duration-200 hover:-translate-y-0.5"
      >Sign In</Button
    >
  {:else}
    <Nav.List class="flex gap-4">
      <Button
        href="/auth/login"
        class="transition-transform duration-200 hover:-translate-y-0.5"
        >Sign In</Button
      >
      <Sheet.Root>
        <Sheet.Trigger>
          {#snippet child({ props })}
            <Button
              {...props}
              variant="ghost"
              size="icon"
              class="md:hidden size-10"
            >
              <MenuIcon class="size-6" />
              <span class="sr-only">Open menu</span>
            </Button>
          {/snippet}
        </Sheet.Trigger>

        <Sheet.Content
          side="right"
          class="w-72 z-20 bg-background"
          hideOverlay={true}
        >
          <Sheet.Header class="-m-2 flex flex-row">
            <img src={logo} alt="Enock logo" class="h-7 w-7">
            <span class="font-heading font-semibold text-lg">Enock</span>
          </Sheet.Header>
          <section class="flex flex-col justify-between h-full mb-3">
            <div class="flex flex-col gap-3 mx-2">
              {#each navItems as item}
                <Button
                  href={item.href}
                  variant="outline"
                  onclick={(event) => scrollToSection(item.href, event)}
                >
                  <span>{item.title}</span>
                </Button>
              {/each}
              <Button href="/auth/login">Sign In</Button>
            </div>
          </section>
        </Sheet.Content>
      </Sheet.Root>
    </Nav.List>
  {/if}
</Nav.Root>
