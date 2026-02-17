<script lang="ts">
import { page } from "$app/state";
import Button from "$lib/components/ui/button/button.svelte";
import * as Tooltip from "$lib/components/ui/tooltip/index";
import * as Avatar from "$lib/components/ui/avatar/index";
import { menuItems, footerItems } from "./menu-items";
</script>

<!-- Desktop only: always visible, hidden on mobile -->
<Tooltip.Provider>
  <aside
    class="fixed inset-y-0 left-0 z-20 w-15 hidden md:flex flex-col items-center justify-between border-r bg-sidebar py-3"
  >
    <div class="flex flex-col items-center gap-3">
      <Avatar.Root class="size-9.5">
        <Avatar.Image src="https://github.com/sime-time.png" alt="@leerob" />
        <Avatar.Fallback>ST</Avatar.Fallback>
      </Avatar.Root>

      {#each menuItems as item}
        <Tooltip.Root>
          <Tooltip.Trigger>
            <Button
              href={item.url}
              size="icon-lg"
              class="rounded-full"
              variant={page.url.pathname.startsWith(item.url)
                ? "default"
                : "outline"}
            >
              <item
                .icon
                class={page.url.pathname.startsWith(item.url)
                  ? ""
                  : "text-muted-foreground"}
              />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content side="right"> <p>{item.title}</p> </Tooltip.Content>
        </Tooltip.Root>
      {/each}
    </div>

    <div class="flex flex-col items-center gap-3">
      {#each footerItems as item}
        <Tooltip.Root>
          <Tooltip.Trigger>
            <Button
              href={item.url}
              size="icon-lg"
              class="rounded-full"
              variant="outline"
            >
              <item
                .icon
                class={item.title.toLowerCase() === "logout"
                  ? "text-destructive"
                  : "text-muted-foreground"}
              />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content side="right"> <p>{item.title}</p> </Tooltip.Content>
        </Tooltip.Root>
      {/each}
    </div>
  </aside>
</Tooltip.Provider>
