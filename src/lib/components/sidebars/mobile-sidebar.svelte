<script lang="ts">
  import MenuIcon from "@lucide/svelte/icons/menu";
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Sheet from "$lib/components/ui/sheet/index";
  import { footerItems, menuItems } from "./menu-items";

  const darkModeItem = footerItems[0];
  const logoutItem = footerItems[1];
</script>

<Sheet.Root>
  <Sheet.Trigger>
    {#snippet child({ props })}
      <Button {...props} variant="ghost" size="icon" class="md:hidden size-10">
        <MenuIcon class="size-6" />
        <span class="sr-only">Open menu</span>
      </Button>
    {/snippet}
  </Sheet.Trigger>

  <Sheet.Content side="right" class="w-72" hideOverlay={true}>
    <Sheet.Header class="font-stretch-semi-expanded font-medium -m-2">
      Menu
    </Sheet.Header>
    <section class="flex flex-col justify-between h-full mb-3">
      <div class="flex flex-col gap-3 mx-2">
        {#each menuItems as item}
          <Button href={item.url} variant="outline">
            <!-- biome-ignore format: svelte dotted component name -->
            <item.icon />
            <span>{item.title}</span>
          </Button>
        {/each}
      </div>
      <div class="flex flex-col gap-3 mx-2">
        <Button href={darkModeItem.url} variant="default">
          <!-- biome-ignore format: svelte dotted component name -->
          <darkModeItem.icon />
          <span>{darkModeItem.title}</span>
        </Button>
        <Button href={logoutItem.url} variant="destructive">
          <!-- biome-ignore format: svelte dotted component name -->
          <logoutItem.icon />
          <span>{logoutItem.title}</span>
        </Button>
      </div>
    </section>
  </Sheet.Content>
</Sheet.Root>
