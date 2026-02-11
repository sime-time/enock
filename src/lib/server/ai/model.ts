import { createOpenAI } from "@ai-sdk/openai";
import { OPENAI_API_KEY } from "$env/static/private";

const openai = createOpenAI({
  apiKey: OPENAI_API_KEY,
});

export const model = openai("gpt-3.5-turbo");
