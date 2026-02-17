<script lang="ts">
	import { page } from "$app/state";
	import * as Sidebar from "$lib/components/ui/sidebar/index";
	import ChatSidebar from "$lib/components/sidebars/chat-sidebar.svelte";
	import IconSidebar from "$lib/components/sidebars/icon-sidebar.svelte";
	import MobileSidebar from "$lib/components/sidebars/mobile-sidebar.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import Settings from "@lucide/svelte/icons/settings";

	let { children, data } = $props();
</script>

<Sidebar.Provider class="md:pl-16">
	<IconSidebar />

	{#if page.url.pathname.startsWith("/dashboard/chat")}
		<ChatSidebar chats={data.userChats} />
	{/if}

	<main class="w-full h-screen flex flex-col">
		<nav class="flex flex-row items-center justify-between m-4">
			<Sidebar.Trigger class="size-10" />

			<div class="hidden md:flex gap-2">
				<Button variant="outline">
					<Settings />
					<span>Settings</span>
				</Button>
			</div>

			<div class="md:hidden">
				<MobileSidebar />
			</div>
		</nav>
		{@render children()}
	</main>
</Sidebar.Provider>
