# AGENTS.md

Guidelines for AI coding agents working in this repository.

## Build & Development Commands

```bash
bun run dev          # Start dev server with hot reload
bun run build        # Production build
bun run start        # Run compiled production binary
bun run check        # Format & lint with Biome (auto-fixes)
bun run check:svelte # Type check Svelte files
bun run check:watch  # Watch mode for Svelte type checking
bun run preview      # Preview production build locally
```

**No test framework is configured.** If tests are added, update this section.

## Code Style Guidelines

### Formatting (Biome)

- **Indentation**: 2 spaces
- **Quotes**: Double quotes for strings
- **Semicolons**: Required (Biome default)
- Run `bun run check` before committing to auto-fix formatting issues

### Import Organization

Order imports as follows:
1. External packages (e.g., `ai`, `drizzle-orm`, `zod`)
2. SvelteKit imports (`$app/*`, `$env/*`, `@sveltejs/kit`)
3. Local imports (`$lib/*`)

```typescript
// Example - correct import order
import { streamText, type UIMessage } from "ai";
import { eq } from "drizzle-orm";
import { error, redirect } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { chat } from "$lib/server/db/schema";
```

Use `import type` for type-only imports in TypeScript files:
```typescript
import type { PageData } from "./$types";
```

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Files | kebab-case | `chat-input.svelte`, `auth-client.ts` |
| Database columns | snake_case | `user_id`, `created_at` |
| Variables/functions | camelCase | `userChats`, `initChat` |
| Types/interfaces | PascalCase | `ButtonProps`, `UIMessage` |
| Constants | camelCase | `advisorSystemPrompt` |
| Svelte components | PascalCase in imports | `import { Button } from "$lib/components/ui/button"` |

### TypeScript

- Strict mode is enabled - avoid `any` types
- Use Zod for runtime validation of external data
- Prefer explicit return types for exported functions
- Use path aliases: `$lib/`, `$app/`, `$env/`

### Svelte 5 Patterns

Use runes syntax (Svelte 5):

```svelte
<script lang="ts">
  // Props - use $props()
  let { data } = $props();
  let { value = $bindable(), onchange } = $props();

  // State - use $state()
  let count = $state(0);

  // Derived - use $derived()
  let doubled = $derived(count * 2);
</script>

<!-- Render children -->
{@render children?.()}
```

For component type exports, use module script:

```svelte
<script lang="ts" module>
  export interface MyComponentProps {
    value: string;
  }
</script>

<script lang="ts">
  let { value }: MyComponentProps = $props();
</script>
```

### Component Library (shadcn-svelte style)

- Components in `src/lib/components/ui/` follow shadcn-svelte patterns
- Use `tailwind-variants` (tv) for variant styling
- Use `cn()` helper from `$lib/utils` for class merging
- Each component has an `index.ts` barrel file

```typescript
// src/lib/components/ui/button/index.ts
import Root from "./button.svelte";
export { Root, Root as Button, buttonVariants, type ButtonProps };
```

### Class Merging

Always use the `cn()` utility for conditional/merged classes:

```svelte
<div class={cn("base-classes", conditional && "conditional-class", className)}>
```

## Error Handling

### API Routes (+server.ts)

Return Response objects with appropriate status codes:

```typescript
export async function POST({ request, locals }) {
  if (!locals.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }
  // ...
}
```

### Page Server Load Functions

Use SvelteKit's `error` and `redirect` helpers:

```typescript
import { error, redirect } from "@sveltejs/kit";

export async function load({ locals }) {
  if (!locals.user?.id) {
    throw redirect(302, "/auth/login");
  }

  const record = await db.select().from(table).where(...).limit(1);
  if (!record[0]) {
    error(404, "Not found");
  }

  return { data: record[0] };
}
```

### Remote Functions (command pattern)

Use Zod for validation, SvelteKit error helper for errors:

```typescript
import { error } from "@sveltejs/kit";
import { command, getRequestEvent } from "$app/server";
import { z } from "zod";

export const myCommand = command(
  z.object({ field: z.string().nonempty("Required") }),
  async ({ field }) => {
    const event = getRequestEvent();
    if (!authorized) {
      error(401, "Unauthorized");
    }
    return { result };
  }
);
```

### Client-Side

Use try-catch with toast notifications:

```typescript
import { toast } from "svelte-sonner";

try {
  await someAction();
} catch (err) {
  console.error(err);
  toast.error("Error Title", { description: "User-friendly message" });
}
```

## Database Patterns (Drizzle ORM)

### Schema Definition

```typescript
import { pgTable, text, timestamp, uuid, index } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const myTable = pgTable(
  "my_table",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
  },
  (table) => [index("my_table_userId_idx").on(table.userId)],
);

export const myTableRelations = relations(myTable, ({ one }) => ({
  user: one(user, { fields: [myTable.userId], references: [user.id] }),
}));
```

### Query Patterns

```typescript
import { db } from "$lib/server/db";
import { eq, and, desc } from "drizzle-orm";

// Select with conditions
const results = await db
  .select()
  .from(table)
  .where(and(eq(table.userId, userId), eq(table.status, "active")))
  .orderBy(desc(table.createdAt));

// Insert with returning
const [newRecord] = await db
  .insert(table)
  .values({ userId, title })
  .returning();
```

## Architecture Notes

### Key Directories

- `src/lib/server/` - Server-only code (db, ai, auth config)
- `src/lib/components/ui/` - Reusable UI components
- `src/routes/api/` - API endpoints
- `src/routes/dashboard/` - Protected routes (auth guard in +layout.server.ts)

### Auth Pattern

- Auth middleware in `src/hooks.server.ts` populates `locals.user`
- Dashboard layout redirects unauthenticated users
- Use `locals.user?.id` in server code for current user

### AI Streaming Pattern

```typescript
import { streamText, convertToModelMessages } from "ai";

const result = streamText({
  model,
  messages: await convertToModelMessages(messages),
  system: systemPrompt,
  tools,
});

return result.toUIMessageStreamResponse({
  originalMessages: messages,
  onFinish: async ({ responseMessage }) => {
    // Persist to database
  },
});
```

## Environment Variables

Required in `.env`:
- `DATABASE_URL` - PostgreSQL connection string
- `GOOGLE_CLIENT_ID` - Google OAuth app ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth app secret
- `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` - LLM API key
