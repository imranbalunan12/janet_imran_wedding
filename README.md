# Imran & Janet Wedding Website

React (Next.js 16) invitation site with a guest code on the landing page, the full invitation, a prenup video, the RSVP form at the very end, and a private admin desk.

## Run it locally

```bash
npm install
npm run dev
```

- Site: http://localhost:5000 (guest code is `INVITE_CODE` in `.env.local`)
- Admin desk: http://localhost:5000/admin (code is `ADMIN_CODE` in `.env.local`)

Without a database, local RSVPs are saved to `data/rsvps.json`.

## Page order

Landing (photo fade + logo + names + Open Invitation → code) → Home with countdown → Story (By His Grace) → Couple → Time and Place → Entourage → Attire → Special notes → Captured Moments → Prenup video → RSVP form.

## Photos

Every page and section has its own folder under `public/photos`. See `public/photos/README.md` for the file names. Missing files show a soft placeholder.

## Prenup video

Set `NEXT_PUBLIC_PRENUP_YOUTUBE_ID` to the video id (the part after `v=` in the YouTube link). Until then a "coming soon" card shows `photos/prenup/cover.jpg`.

## Deploying to Vercel with a database

Vercel can't save files, so RSVPs need a database in production. The site uses Postgres via Neon (the free tier is plenty).

1. Push this folder to GitHub and import it in Vercel.
2. In the Vercel project open **Storage → Create Database → Neon** and connect it to the project. This sets `DATABASE_URL` for you.
3. In **Settings → Environment Variables**, add:
   - `INVITE_CODE`: the code guests type
   - `ADMIN_CODE`: your private admin code (make it long)
   - `SESSION_SECRET`: any long random text
   - `NEXT_PUBLIC_PRENUP_YOUTUBE_ID`: optional
4. Redeploy. The `rsvps` table is created on the first request.

## Admin desk

Go to `/admin` and enter the admin code. You can see every RSVP with the date and time it was sent (Philippine time), search, add a guest manually, delete a guest, export a CSV, and sign out. Changing `ADMIN_CODE` or `SESSION_SECRET` signs everyone out.

## Edit content

- Names, date, venues, entourage, attire, notes, meal options: `lib/wedding.ts`
- Couple logo: replace the `I & J` monogram in `components/Florals.tsx`, the landing page and the navbar.
