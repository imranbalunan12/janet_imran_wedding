# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

Next.js 16 / React 19 / Tailwind v4 wedding invitation site for Imran & Janet: guest-code landing page → single-page invitation → RSVP form, plus a private `/admin` desk. Deployed on Vercel with Neon Postgres. Repo: github.com/imranbalunan12/janet_imran_wedding (public), branch `main`.

## Commands

```bash
npm run dev      # http://localhost:5000 (guest code = INVITE_CODE, admin at /admin with ADMIN_CODE)
npm run build    # production build; also the main type check
npm run lint     # eslint (flat config: next core-web-vitals + typescript)
```

There is no test suite. Verify changes with `npm run build`, `npm run lint`, and by running the app. `.claude/launch.json` defines `wedding` (dev, port 5000) and `wedding-prod` (`next start` on 3005).

## Next 16 specifics

Read `node_modules/next/dist/docs/` before using unfamiliar Next APIs (see AGENTS.md). Notably, request gating lives in [proxy.ts](proxy.ts) (Next 16's replacement for `middleware.ts`, exporting `proxy`, not `middleware`), and `cookies()` from `next/headers` is async.

## Architecture

**Access control (two roles, no user accounts).** [lib/cookies.ts](lib/cookies.ts) issues HMAC-signed tokens `role.expires.signature` for `invite` and `admin`, stored in the `ij_invite` / `ij_admin` httpOnly cookies (60-day expiry). The signing secret is `SESSION_SECRET`, falling back to a value derived from the two codes, so changing any of them signs everyone out. `lib/cookies.ts` imports only `crypto` so `proxy.ts` can use it. [lib/auth.ts](lib/auth.ts) adds code comparison and the `isInvited()` / `isAdmin()` server helpers.
- `proxy.ts` is only an optimistic gate: it redirects `/invitation` to `/` and returns 401 for `/api/admin/*` (except login). **Every API route must still check its own cookie** (`isInvited()` / `isAdmin()`); keep that pattern in any new route.
- `/api/invite` and `/api/admin/login` check the code and set the cookie. `DELETE /api/admin/login` signs out.

**RSVP storage has two backends** behind one interface in [lib/db.ts](lib/db.ts) (`listRsvps`, `createRsvp`, `deleteRsvp`):
- When `DATABASE_URL` is set, it uses Neon serverless Postgres. The `rsvps` table is created lazily with `CREATE TABLE IF NOT EXISTS` on first use; there are no migrations. A schema change therefore means editing that statement and altering the live table by hand.
- Without `DATABASE_URL`, it reads and writes `data/rsvps.json` (gitignored). This only works locally, because Vercel's filesystem is read-only.
- All input goes through `parseRsvp` in [lib/rsvpInput.ts](lib/rsvpInput.ts), which handles trimming, length caps and clamping guests to 1–10. Both the guest route (`/api/rsvp`) and the admin "add guest" route reuse it. Adding a field means changing the `Rsvp` type, the SQL, `mapRow`, `parseRsvp`, `RsvpForm`, and the admin table/CSV in `AdminView`.

**Pages.** `app/*/page.tsx` are thin wrappers around view components in `components/`. [components/invitation/InvitationView.tsx](components/invitation/InvitationView.tsx) is the whole invitation: one long page whose sections are anchored by id (`home`, `story`, `couple`, `events`, `entourage`, `attire`, `gallery`, `prenup`, `rsvp`), which the Navbar links to. `app/admin/page.tsx` is `force-dynamic` and loads RSVPs on the server only when the admin cookie is valid.

**Content is data-driven.** Names, date, venues, entourage, attire, notes and meal options live in [lib/wedding.ts](lib/wedding.ts). Edit content there, not in JSX. The prenup YouTube id comes from `NEXT_PUBLIC_PRENUP_YOUTUBE_ID`; until it is set, a cover-photo card shows.

**Photos.** Slots are declared in [lib/photos.ts](lib/photos.ts), each with a local `src` under `public/photos/...` and an Unsplash `fallback`. `SoftPhoto` probes the local file in the browser and shows the fallback until the local file loads, so missing photos never break the page. The expected file names are in `public/photos/README.md`. A new photo needs both the file and a matching slot in `lib/photos.ts` (and the extension must match). Remote image hosts are allow-listed in `next.config.ts`.

**Styling.** Tailwind v4 is configured in CSS, not in a config file. The palette (ivory, cream, petal, butter, gold, sage, leaf, ink, mute) and font tokens are CSS variables mapped through `@theme inline` in [app/globals.css](app/globals.css), so use classes like `bg-petal` and `text-gold`. The `I & J` monogram is hardcoded in `components/Florals.tsx`, the landing view and the Navbar.

## Environment

See `.env.example`: `DATABASE_URL` (Neon; Vercel sets it automatically), `INVITE_CODE`, `ADMIN_CODE`, `SESSION_SECRET`, `NEXT_PUBLIC_PRENUP_YOUTUBE_ID`. Codes fall back to hardcoded defaults in `lib/cookies.ts` when unset, so production must set them. Admin timestamps are shown in Philippine time.
