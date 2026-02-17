import type { UIMessage } from "ai";

export function createTitleFromPrompt(prompt?: string): string {
  return prompt?.substring(0, 40) || "New Chat";
}

export function createTitleFromMessages(messages: UIMessage[]): string {
  // Extract title from first user message
  const userMessages = messages.find((m) => m.role === "user");

  const firstPrompt = userMessages?.parts
    ?.filter((p) => p.type === "text")
    .map((p) => p.text)
    .join("");

  return createTitleFromPrompt(firstPrompt);
}
