<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index";
  import ChatSidebar from "$lib/components/chat-sidebar.svelte";

  let { children } = $props();
</script>

<Sidebar.Provider>
  <ChatSidebar />
  <main>
    <Sidebar.Trigger />
    {@render children()}
  </main>
</Sidebar.Provider>
