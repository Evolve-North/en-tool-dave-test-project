# Per-Project Agent Instructions

This file is read by the Claude Agent SDK at the start of each build session. It
supplements the platform-wide style guide which is injected via
`appendSystemPrompt`.

## Platform constraints (NON-NEGOTIABLE)

- British English throughout UI copy, docs, comments.
- shadcn/ui only — no other component libraries.
- No authentication changes — use `middleware.ts` and `lib/supabase/*` as
  provided by the scaffold.
- EN API calls go through `lib/en-api/client.ts` (which hits the platform proxy
  at `${NEXT_PUBLIC_PLATFORM_URL}/api/en-proxy/*`). Never call the EN API
  directly.
- `NEXT_PUBLIC_*` env vars are public. Never put secrets in them.

## Project-Specific Overrides

Add project-specific deviations from the platform style guide below. Anything in
this section takes precedence over the global style guide.

<!-- Overrides go here -->
