<script lang="ts">
  import InstagramIcon from "@lucide/svelte/icons/instagram";
  import logo from "$lib/assets/enock-logo.svg";
</script>

<footer class="border-t border-border/70 bg-background py-10 sm:py-12">
	<div
		class="mx-auto flex max-w-7xl flex-col gap-6 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8"
	>
		<div class="flex items-center gap-3">
			<img src={logo} alt="Enock logo" class="size-8 rounded-md" />
			<div>
				<p class="font-heading text-base font-semibold text-foreground">
					Enock
				</p>
				<p class="text-xs text-muted-foreground">
					&copy; 2026 Enock. All rights reserved.
				</p>
			</div>
		</div>

		<div
			class="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground"
		>
			<a
				href="https://instagram.com"
				target="_blank"
				rel="noreferrer"
				class="inline-flex items-center gap-2 transition-colors hover:text-foreground"
			>
				<InstagramIcon class="size-4" />
				Instagram
			</a>
			<a href="/privacy-policy" class="transition-colors hover:text-foreground"
				>Privacy Policy</a
			>
			<a
				href="/terms-of-service"
				class="transition-colors hover:text-foreground">Terms of Service</a
			>
		</div>
	</div>
</footer>
