# CONTENT_TODO — Placeholders & Owner Setup

Tracked items the owner (Mārcis) must fill in later. Search codebase for `[TODO: CONTENT]`
to find placeholder locations.

## Setup checklist (accounts to create)

- [x] Supabase project (free tier) — project ref `fsifnfjjkokyhztngega`
- [x] Supabase CLI installed + PAT-based automation (no local link needed)
- [x] Apply migrations + seed: done via Management API (0001 + seed + 0002 applied)
- [x] Resend account (free tier) — key in `supabase/.env`; sender `onboarding@resend.dev` until domain verified
- [x] Contact email setup (Task 06):
      - Edge function deployed (`contact-notify`, verify_jwt=false via supabase/config.toml)
      - Secrets set: RESEND_API_KEY, NOTIFY_TO (marcis.kregers@gmail.com), NOTIFY_SECRET
      - Secret synced to DB: `app_settings.notify_secret` row (insert via REST/service key)
      - Trigger verified end-to-end: insert → pg_net → function → Resend (status 200)
- [ ] Vercel account (free tier) → project live; confirm Git integration auto-deploys on push to main
- [x] GitHub repo for this project (github.com/degradaccija/buisinesscardwebsite)

## Content placeholders (in `supabase/seed.sql`)

- [x] Apply approved Task 17 content to the live DB (tagline, bio, projects, services, education description + photo_url) — applied 2026-08-27 via REST, verified live on both locales. Fresh installs get it from seed.sql directly.

- [x] `site_profile.email` — real contact email (marcis.kregers@gmail.com)
- [x] `site_profile.photo_url` — portrait at `site/public/images/profile.jpg` (704x1521); seed + live DB point to `/images/profile.jpg`
- [x] `site_profile.github_url` — GitHub profile URL (https://github.com/degradaccija)
- [x] `site_profile.linkedin_url` — LinkedIn profile URL (https://lv.linkedin.com/in/marcis-kregers)
- [x] `site_profile.tagline_en/lv` — final copy (Task 17, owner approved)
- [x] `site_profile.bio_en/lv` — final copy (Task 17, owner approved)
- [x] `experience` education description — final copy (Task 17, owner approved)
- [ ] `experience` education: exact school name, start/end dates (school name unverified, kept as `[TODO: CONTENT]` in seed.sql; owner confirms)
- [ ] `experience` work history: company, dates, descriptions (row kept as `[TODO: CONTENT]` in seed.sql, no invented employer)
- [x] Projects: titles, descriptions, tags — final copy (Task 17, owner approved)
- [ ] Projects: repo/live links (kept null in seed.sql, owner fills real links)
- [x] Services: final wording EN/LV (Task 17, owner approved)
- [ ] Skills levels (1–5) reviewed — current values are estimates

## Asset requests (image slots)

Decision 2026-08-27: project cards ship with the monogram-style fallback
(`image_url` null) until real screenshots exist. Owner decision — no interim
picsum placeholders. Drop files in `site/public/images/`, then set
`projects.image_url` in Supabase and/or update `supabase/seed.sql`.

- [x] P0 - owner portrait: done, `site/public/images/profile.jpg` (704x1521).
      Hero and About render it via `next/image` (hero has `priority`).
- [ ] P1 - real project screenshots, one per project
      - Slot: project cards. Featured card image top: aspect 16/10, full-bleed,
        renders 896x560 @1x, `object-cover`, hover `scale-105`; grid tiles
        render 40vw.
      - Dimensions: 1600x1000 (16/10) preferred, 1200x900 acceptable.
      - Style: real screenshots of the actual software, dark UI to sit in the
        dark theme, no browser chrome, no watermarks, no phone mockups:
        - Agent Logbook: agent run inspector, tool-call trace list with detail
        - Homelab: Proxmox dashboard or the server rack in a dark room
        - This Website: this site's hero section in a browser frame
- [ ] P2 - optional workspace shot for the About visual slot
      - Slot: About visual, aspect 7/5, renders 1120x800 @1x, `object-cover`
        with `object-[center_20%]`.
      - Dimensions: 1400x1000 (7/5). Style: desk/workspace at work,
        warm-violet duotone grade, shallow depth of field (board-02).
- [ ] P3 - optional portrait reshoot for the hero visual slot
      - Current photo is vertical 704x1521; the hero slot is aspect 5/6 and
        crops with `object-cover` (default center), so the vertical shot
        already works. A 4/5-grade crop (1200x1500 per board-01, duotone
        violet grade, subject right of center) would fill the frame with less
        cropping. Low priority.

## After deployment

- [x] Live site URL: https://buisinesscardwebsite.vercel.app (prod; Git-connected, deploys on push to main)
- [x] Redesign deployed + live content applied (2026-08-27): approved copy + photo_url applied via REST; both locales verified rendering
- [ ] Verify contact form email lands in inbox
