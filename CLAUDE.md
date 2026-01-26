# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
bun run dev          # Start dev server with hot reload
bun run build        # Production build
bun run start        # Run compiled production binary
bun run check        # Format & lint with Biome
bun run check:svelte # Type check Svelte files
```

## Tech Stack

- **Framework**: SvelteKit 2 with Svelte 5 (runes, async components enabled)
- **Runtime**: Bun (svelte-adapter-bun)
- **Database**: PostgreSQL with Drizzle ORM
- **Auth**: Better-Auth with Google OAuth
- **AI**: Vercel AI SDK with OpenAI/Anthropic providers
- **Styling**: Tailwind CSS 4, Bits UI components, Lucide icons
- **Code Quality**: Biome (formatting & linting)

## Architecture

### Routing Structure
- `/` - Landing page
- `/auth/login` - Google OAuth login
- `/auth/logout` - Logout handler
- `/dashboard/*` - Protected routes (auth guard in +layout.server.ts)
- `/dashboard/chat` - Chat list
- `/dashboard/chat/[id]` - Individual chat with streaming AI responses
- `/api/chat/[id]` - POST endpoint for streaming AI responses

### Key Patterns
- **Auth guards**: Dashboard layout.server.ts redirects unauthenticated users to /auth/login
- **Form actions**: Use `form()` wrapper with Zod validation (see chat.remote.ts)
- **Remote functions**: SvelteKit experimental feature enabled for backend calls from frontend
- **Streaming**: AI SDK streams responses, onFinish callback persists messages to DB
- **Message format**: Uses Vercel AI SDK's UIMessage format with parts array

### Database Schema
Tables: `user`, `session`, `account`, `verification`, `chat`, `message`
- Schema defined in `src/lib/server/db/schema.ts`
- Migrations managed with drizzle-kit (files in `/drizzle`)
- Chat messages include `parts` JSON column for AI SDK compatibility

### Key Files
- `src/lib/auth.ts` - Better-auth server configuration
- `src/lib/auth-client.ts` - Client-side auth utilities
- `src/lib/server/db/schema.ts` - Drizzle schema with relations
- `src/hooks.server.ts` - Auth middleware
- `drizzle.config.ts` - Database configuration

## Environment Variables

Required:
- `DATABASE_URL` - PostgreSQL connection string
- `GOOGLE_CLIENT_ID` - Google OAuth app ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth app secret
- `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` - LLM API key
