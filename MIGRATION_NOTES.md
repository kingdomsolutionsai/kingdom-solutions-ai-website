# Migration Notes — Leaving Manus

**Date:** August 2026
**Source:** `kingdom-solutions-ai-source.zip` (SHA-256: `21103e35d9c7fc4be0ea6d0bb800397289bc3233fe0170500ab373ad70ff7b3a`, verified against export manifest)
**Result:** Builds and runs clean with `pnpm install && pnpm run build && pnpm run start`. Verified locally — all 11 pages return 200, tRPC health check and form submission endpoints work correctly.

## What this site actually is

11 static content pages (Home, About, Clarity Pro, Constance, Executive AI Strategy, Capacity Leak Audit, Contact, Strategy Call, Privacy, Terms, Refund Policy) plus a lightweight Express/tRPC backend whose only real job is emailing form submissions through Brevo.

## What was removed (confirmed unused via import-graph inspection, not just filenames)

- **OAuth login** — `server/_core/oauth.ts`, `server/_core/sdk.ts`, `server/db.ts`, `drizzle/` (entire database — the only table existed to back this unused login flow), `client/src/_core/hooks/useAuth.ts`, `client/src/components/DashboardLayout*.tsx`
- **Manus "Forge" data API** — `server/_core/dataApi.ts` (never imported anywhere)
- **Image generation, voice transcription, maps, notifications** — `server/_core/imageGeneration.ts`, `voiceTranscription.ts`, `map.ts`, `notification.ts` (never imported anywhere)
- **Manus storage proxy** — `server/_core/storageProxy.ts`, `server/storage.ts` (the 10 real image files were already included in the export; only the proxy layer was Manus-specific)
- **Dead demo/scaffold pages** — `client/src/pages/ComponentShowcase.tsx`, `client/src/components/AIChatBox.tsx`, `client/src/components/ManusDialog.tsx`, `client/src/components/Map.tsx`
- **Manus dev-time tooling** — `vite-plugin-manus-runtime`, the custom debug-collector Vite plugin, `client/public/__manus__/`, the Manus analytics script placeholder in `index.html`, the `wouter` patch (only fed Manus's own route-detection tooling)
- **Unused npm packages** — `mysql2`, `drizzle-orm`, `drizzle-kit`, `@aws-sdk/client-s3`, `@aws-sdk/s3-request-presigner`, `jose`, `axios`, `cookie`

## What was changed

- All 10 image assets moved from `exported-assets/` into `client/public/assets/`, and every reference to `/manus-storage/<file>` across the codebase (pages, `seoMetadata.ts`, `index.html`) updated to `/assets/<file>`
- `server/_core/index.ts`, `context.ts`, `trpc.ts`, `routers.ts`, `systemRouter.ts` simplified to drop the auth-only code paths
- `client/src/main.tsx` simplified to drop the login-redirect-on-401 logic
- `vite.config.ts` stripped of Manus-only plugins and dev-host allowlist

## What still works exactly as before

- All 11 page routes and their per-page SEO metadata (title, OG tags, Twitter cards) — verified via server-side injection test
- The three form endpoints (Capacity Leak Audit, Clarity Pro intake, Contact) — verified via direct tRPC call; correctly validates input and correctly reports `notified: false` when `BREVO_API_KEY` isn't set, rather than crashing
- The favicon/PWA icon set, hero image, and all page visuals

## Environment variables needed in production

| Variable | Value |
|---|---|
| `BREVO_API_KEY` | Your Brevo transactional email API key |
| `BREVO_SENDER_EMAIL` | Defaults to `tabitha@kingdomsolutionsai.com` if unset |

No database, no OAuth credentials, no other secrets required.

## Deploy commands (Render Web Service)

- **Build command:** `pnpm install && pnpm run build`
- **Start command:** `pnpm run start`
- **Node version:** 22.x (matches what this was verified against)
