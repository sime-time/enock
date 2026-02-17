<script lang="ts">
	import * as Card from "$lib/components/ui/card/index";
	import Button from "$lib/components/ui/button/button.svelte";
	import GoogleIcon from "~icons/material-icon-theme/google";
	import { authClient } from "$lib/auth-client";
	import { toast } from "svelte-sonner";

	async function login() {
		try {
			await authClient.signIn.social({
				provider: "google",
				callbackURL: "/dashboard/chat",
			});
		} catch (error) {
			console.error(error);
			toast.error("Login Error", {
				description: "There was an error logging in with Google",
			});
		}
	}
</script>

<div class="flex flex-col gap-3 justify-center items-center h-screen">
	<Card.Root class="w-80">
		<Card.Header class="flex flex-col items-center">
			<Card.Title>Welcome Back</Card.Title>
			<Card.Description>Login with your Google account</Card.Description>
		</Card.Header>
		<Card.Content>
			<Button class="w-full" onclick={() => login()}>
				<GoogleIcon />
				<span>Login with Google</span>
			</Button>
		</Card.Content>
	</Card.Root>
	<p class="text-sm text-muted-foreground opacity-60 max-w-80 text-center">
		By clicking continue, you agree to our Terms of Service and Privacy Policy
	</p>
</div>
