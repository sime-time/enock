<script lang="ts">
  import * as Card from "$lib/components/ui/card/index";
  import Button from "./ui/button/button.svelte";
  import GoogleIcon from "~icons/material-icon-theme/google";
  import { authClient } from "$lib/auth-client";
  import { toast } from "svelte-sonner";

  async function logIn() {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (error) {
      console.error(error);
      toast.error("Login Error", {
        description: "There was an error logging in with Google",
      });
    }
  }
</script>

<Card.Root class="w-100">
  <Card.Header class="flex flex-col items-center">
    <Card.Title>Welcome Back</Card.Title>
    <Card.Description>Login with your Google account</Card.Description>
  </Card.Header>
  <Card.Content>
    <Button class="w-full" onclick={() => logIn()}>
      <GoogleIcon />
      <span>Login with Google</span>
    </Button>
  </Card.Content>
</Card.Root>
