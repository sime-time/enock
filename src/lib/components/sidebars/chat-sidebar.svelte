<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index";
  import Button from "$lib/components/ui/button/button.svelte";
  import PlusIcon from "@lucide/svelte/icons/plus";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";

  let { chats } = $props();
</script>

<Sidebar.Root class="start-15" style="--sidebar: var(--color-background);">
  <Sidebar.Header class="font-stretch-semi-expanded font-medium">
    Chat
  </Sidebar.Header>
  <Sidebar.Content>
    <Sidebar.Group>
      <Button href="/dashboard/chat" class="w-full">
        <PlusIcon />
        <span>New Chat</span>
      </Button>
      <Sidebar.Separator class="my-4" />
      <Sidebar.GroupLabel>History</Sidebar.GroupLabel>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {#each chats as chat}
            <Sidebar.MenuItem>
              <Sidebar.MenuButton
                variant={page.url.pathname.startsWith(
                  `/dashboard/chat/${chat.id}`,
                )
                  ? "active"
                  : "default"}
                onclick={() => goto(`/dashboard/chat/${chat.id}`)}
              >
                <span>{chat.title}</span>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          {/each}
        </Sidebar.Menu>
      </Sidebar.GroupContent>
    </Sidebar.Group>
  </Sidebar.Content>
</Sidebar.Root>
