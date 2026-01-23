<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index";
  import Button from "$lib/components/ui/button/button.svelte";
  import PlusIcon from "@lucide/svelte/icons/plus";

  // Menu items.
  const items = [
    {
      title: "Home is where the heart is says spongebob squarepants",
      url: "#",
    },
    {
      title: "Inbox and the fires of mordor going off like a firecracker",
      url: "#",
    },
    {
      title:
        "Calendar checking google calendar to make sure it works and doesn't break",
      url: "#",
    },
    {
      title: "Search big guy spongebob big guy big guy",
      url: "#",
    },
    {
      title: "Profile settings or just settings settings?",
      url: "#",
    },
  ];
</script>

<Sidebar.Root class="start-15" style="--sidebar: var(--color-background);">
  <Sidebar.Header class="font-stretch-semi-expanded font-medium">
    Chat
  </Sidebar.Header>
  <Sidebar.Content>
    <Sidebar.Group>
      <Button class="w-full">
        <PlusIcon />
        <span>New Chat</span>
      </Button>
      <Sidebar.Separator class="my-4" />
      <Sidebar.GroupLabel>History</Sidebar.GroupLabel>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {#each items as item}
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                {#snippet child({ props })}
                  <a href={item.url} {...props}>
                    <span>{item.title}</span>
                  </a>
                {/snippet}
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          {/each}
        </Sidebar.Menu>
      </Sidebar.GroupContent>
    </Sidebar.Group>
  </Sidebar.Content>
</Sidebar.Root>
