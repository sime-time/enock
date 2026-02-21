<script lang="ts">
	import * as Nav from "$lib/components/ui/navigation-menu/index";
	import Button from "$lib/components/ui/button/button.svelte";
	import MenuIcon from "@lucide/svelte/icons/menu";
	import * as Sheet from "$lib/components/ui/sheet/index";
	import logo from "$lib/assets/enock-logo.svg";

	import { IsMobile } from "$lib/hooks/is-mobile.svelte";

	const isMobile = new IsMobile();

	const navItems = [
		{
			title: "Method",
			href: "#",
		},
		{
			title: "Pricing",
			href: "#",
		},
		{
			title: "FAQ",
			href: "#",
		},
	];
</script>

<Nav.Root
	class="fixed top-0 z-10 flex mx-auto min-w-full items-center justify-between p-3 px-6"
>
	<Nav.List>
		<Nav.Item>
			<a href="/" class="flex items-center gap-1.5">
				<img src={logo} alt="Enock logo" class="h-7 w-7" />
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
						class="cursor-pointer hover:bg-transparent focus:bg-transparent"
					>
						{item.title}
					</Nav.Link>
				</Nav.Item>
			{/each}
		</Nav.List>
		<Button href="/auth/login">Sign In</Button>
	{:else}
		<Nav.List class="flex gap-4">
			<Button href="/auth/login">Sign In</Button>
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
						<img src={logo} alt="Enock logo" class="h-7 w-7" />
						<span class="font-heading font-semibold text-lg">Enock</span>
					</Sheet.Header>
					<section class="flex flex-col justify-between h-full mb-3">
						<div class="flex flex-col gap-3 mx-2">
							{#each navItems as item}
								<Button href={item.href} variant="outline">
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
