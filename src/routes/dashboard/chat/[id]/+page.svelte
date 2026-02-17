<script lang="ts">
  import {
    Conversation,
    ConversationContent,
    ConversationEmptyState,
    ConversationScrollButton,
  } from "$lib/components/ui/conversation/index";
  import { Chat } from "@ai-sdk/svelte";
  import ChatInput from "$lib/components/chat-input.svelte";
  import TypingIndicator from "$lib/components/typing-indicator.svelte";
  import * as Dialog from "$lib/components/ui/dialog";
  import Button from "$lib/components/ui/button/button.svelte";
  import { DefaultChatTransport } from "ai";
  import { onMount } from "svelte";
  import { authClient } from "$lib/auth-client";
  import dayjs from "dayjs";
  import timezone from "dayjs/plugin/timezone";

  dayjs.extend(timezone);

  let { data } = $props(); // from +page.server.ts

  let prompt = $state("");
  let requestCalendarAccess = $state(false);

  let chat = $derived(
    new Chat({
      get transport() {
        return new DefaultChatTransport({
          api: `/api/chat/${data.chatId}`,
          body: () => {
            return {
              clientDateTime: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
              timezone: dayjs.tz.guess(),
              locale: navigator.language,
            };
          },
        });
      },
      get id() {
        return data.chatId;
      },
      get messages() {
        return data.messages;
      },
      onError: (error) => {
        if (error.message === "MISSING_CALENDAR_SCOPE") {
          requestCalendarAccess = true;
        }
      },
    }),
  );

  async function enableCalendarAccess() {
    // Store the last user message that failed
    const lastUserMessage = chat.messages
      .filter((m) => m.role === "user")
      .at(-1);
    if (lastUserMessage) {
      const text = lastUserMessage.parts
        .filter((p) => p.type === "text")
        .map((p) => p.text)
        .join("");
      sessionStorage.setItem(`pending-prompt-${data.chatId}`, text);
    }

    await authClient.linkSocial({
      provider: "google",
      scopes: ["https://www.googleapis.com/auth/calendar"],
      callbackURL: `/dashboard/chat/${data.chatId}`,
    });
  }

  onMount(async () => {
    const key = `pending-prompt-${data.chatId}`;
    const pendingPrompt = sessionStorage.getItem(key);

    if (pendingPrompt) {
      sessionStorage.removeItem(key);
      chat.sendMessage({ text: pendingPrompt });
    }
  });

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (!prompt.trim()) return;
    chat.sendMessage({ text: prompt.trim() });
    prompt = "";
  }
</script>

<section class="flex flex-col flex-1 min-h-0">
	<Conversation class="h-full">
		<ConversationContent class="space-y-4">
			{#if chat.messages.length === 0}
				<ConversationEmptyState
					title="Start a conversation"
					description="Type a message below to begin chatting"
				/>
			{:else}
				{#each chat.messages as message, messageIndex (messageIndex)}
					<div
						class="flex {message.role === 'user'
							? 'justify-end'
							: 'justify-start'}"
					>
						<div
							class="max-w-[80%] rounded-2xl px-4 py-2 {message.role === 'user'
								? 'bg-primary text-primary-foreground'
								: 'bg-muted'}"
						>
							{#each message.parts as part, partIndex (partIndex)}
								{#if part.type === "text"}
									<p class="whitespace-pre-wrap">{part.text}</p>
								{/if}
							{/each}
						</div>
					</div>
				{/each}

				<!-- Loading Indicator -->
				{#if chat.status === "submitted"}
					<div class="flex justify-start">
						<div class="bg-muted rounded-2xl px-4 py-2">
							<TypingIndicator />
						</div>
					</div>
				{/if}
			{/if}
		</ConversationContent>
		<ConversationScrollButton />
	</Conversation>

	<!-- Input Form -->
	<div class="p-4 border-t">
		<ChatInput
			bind:input={prompt}
			onsubmit={handleSubmit}
			placeholder="Continue the conversation..."
		/>
	</div>

	<!-- Request Calendar Access -->
	<Dialog.Root bind:open={requestCalendarAccess}>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Calendar Access Required</Dialog.Title>
				<Dialog.Description>
					To create calendar events, please grant calendar permissions.
				</Dialog.Description>
			</Dialog.Header>
			<Dialog.Footer>
				<Button onclick={enableCalendarAccess}>Enable Calendar Access</Button>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
</section>
