<script lang="ts">
  import MenuIcon from "@lucide/svelte/icons/menu";
  import logo from "$lib/assets/enock-logo.svg";
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Nav from "$lib/components/ui/navigation-menu/index";
  import * as Sheet from "$lib/components/ui/sheet/index";
  import { PRIMARY_CTA_HREF } from "$lib/config/primary-cta";
  import { IsMobile } from "$lib/hooks/is-mobile.svelte";
  import { scrollToSection } from "$lib/utils/smooth-scroll";

  const isMobile = new IsMobile();
  let isSheetOpen = $state(false);

  const handleMobileNavClick = (href: string, event: MouseEvent) => {
    scrollToSection(href, event);
    isSheetOpen = false;
  };

  const navItems = [
    { title: "Problem", href: "#problem" },
    {
      title: "Method",
      href: "#method",
    },
    { title: "Compare", href: "#comparison" },
    {
      title: "FAQ",
      href: "#faq",
    },
  ];
</script>

<Nav.Root
  class={`fixed top-0 z-10 flex mx-auto min-w-full items-center justify-between p-3 px-6 ${isMobile.current ? "bg-background/80 backdrop-blur-lg dark:border-input" : ""}`}
>
  <Nav.List>
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
      href={PRIMARY_CTA_HREF}
      class="transition-transform duration-200 hover:-translate-y-0.5"
      >Join Waitlist</Button
    >
  {:else}
    <Nav.List class="flex gap-4">
      <Button
        href={PRIMARY_CTA_HREF}
        class="transition-transform duration-200 hover:-translate-y-0.5"
        >Join Waitlist</Button
      >
      <Sheet.Root bind:open={isSheetOpen}>
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
          overlay={false}
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
                  onclick={(event) => handleMobileNavClick(item.href, event)}
                >
                  <span>{item.title}</span>
                </Button>
              {/each}
              <Button href={PRIMARY_CTA_HREF}>Join Waitlist</Button>
            </div>
          </section>
        </Sheet.Content>
      </Sheet.Root>
    </Nav.List>
  {/if}
</Nav.Root>
