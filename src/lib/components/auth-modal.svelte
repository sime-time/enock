<script lang="ts">
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import GoogleIcon from "~icons/material-icon-theme/google";
  import { authClient } from "$lib/auth-client";

  async function handleSubmit() {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  }
</script>

<Dialog.Root>
  <form>
    <Dialog.Trigger class={buttonVariants({ variant: "outline" })}>
      Sign In
    </Dialog.Trigger>
    <Dialog.Content class="sm:max-w-100">
      <Dialog.Header>
        <Dialog.Title>Enock's Mentorship</Dialog.Title>
        <Dialog.Description>
          Enock requires access to your Google Calendar.
        </Dialog.Description>
      </Dialog.Header>
      <Button onclick={handleSubmit}>
        <GoogleIcon />
        <span> Sign In with Google </span>
      </Button>
    </Dialog.Content>
  </form>
</Dialog.Root>
