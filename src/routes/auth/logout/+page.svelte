<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Card from "$lib/components/ui/card/index";
  import { goto } from "$app/navigation";
  import { resolve } from "$app/paths";
  import { authClient } from "$lib/auth-client";

  let { data } = $props();

  function logout() {
    authClient.signOut({
      fetchOptions: {
        onSuccess: async () => {
          goto(resolve("/auth/login"));
        },
      },
    });
  }
</script>

<main class="flex flex-1 justify-center items-center h-screen">
  {#if data.user?.id}
    <Card.Root class="w-80">
      <Card.Header class="text-center">
        <Card.Title>Are you sure?</Card.Title>
        <Card.Description>Would you like to log out of Enock?</Card.Description>
      </Card.Header>
      <Card.Content class="flex justify-evenly gap-4">
        <Button variant="destructive" class="flex-1" onclick={() => logout()}>
          Logout
        </Button>
        <Button href="/dashboard/chat" variant="outline" class="flex-1">
          Cancel
        </Button>
      </Card.Content>
    </Card.Root>
  {:else}
    <Card.Root class="w-80">
      <Card.Header class="text-center">
        <Card.Title>You are not logged in</Card.Title>
        <Card.Description>Continue to login with Google</Card.Description>
      </Card.Header>
      <Card.Content class="flex justify-evenly gap-4">
        <Button href="/auth/login" class="flex-1">Login</Button>
        <Button href="/" variant="outline" class="flex-1">Cancel</Button>
      </Card.Content>
    </Card.Root>
  {/if}
</main>
