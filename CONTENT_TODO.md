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
- [x] `site_profile.photo_url` — photo lives in About only: `site/public/images/about.jpg`, live DB + seed point to `/images/about.jpg`. Hero was replaced by the work-screenshot carousel and old `portrait.jpg` removed (2026-08-27)
- [x] `site_profile.github_url` — GitHub profile URL (https://github.com/degradaccija)
- [x] `site_profile.linkedin_url` — LinkedIn profile URL (https://lv.linkedin.com/in/marcis-kregers)
- [x] `site_profile.tagline_en/lv` — final copy (Task 17, owner approved)
- [x] `site_profile.bio_en/lv` — final copy (Task 17, owner approved)
- [x] `experience` education description — final copy (Task 17, owner approved)
- [x] `experience` education: Jelgavas tehnikums, 2022-09 → 2026-06, Datorsistēmu tehniķis / sistēmu administrators, LKI 4. līmenis (owner provided 2026-08-27)
- [x] `experience` work history: 5 real entries (SIA OptiCore AI intern, Riga Fashion Week technical manager, Jelgavas Centra pamatskola IT intern, SIA Ogilvy sales, RTU IT intern) applied + verified live (owner provided 2026-08-27)
- [x] Projects: real lineup shipped 2026-08-27 (Hermes featured, Homelab, This Website) - mined from Hermes agent logs + Perplexity memory; copy en/lv verified live
- [ ] Projects: repo/live links (Hermes done: github.com/degradaccija/hermes-homelab, live on card; remaining: optional live_url for This Website)
- [x] Services: final wording EN/LV (Task 17, owner approved)
- [ ] Skills levels (1–5) reviewed — current values are estimates

## Asset requests (image slots)

Decision 2026-08-27 (superseded same day: real screenshots shipped and
wired): project cards initially shipped with the monogram-style fallback
(`image_url` null) until real screenshots existed. Owner decision - no
interim picsum placeholders. Drop files in `site/public/images/`, then set
`projects.image_url` in Supabase and/or update `supabase/seed.sql`.

- [x] P0 - owner portrait: done, now `site/public/images/about.jpg` (1254x1254 square). Rendered in About only since 2026-08-27; hero shows the project screenshot carousel instead.
- [x] P1 - real project screenshots, one per project: shipped 2026-08-27.
      Wired: Hermes = `/images/project-hermes.jpg` (2400x1500), Homelab =
      `/images/project-homelab.jpg` (2400x1500); live on the project cards
      and in the hero work carousel (seed.sql + live DB patched via REST).
      - Shot list (Hermes): docker ps / Portainer stack view, Hermes CLI
        session with tool calls, Hermes dashboard, systemctl status uxplay
        or the Latvian-law cron output. See tasks/20-projects-content.md.
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
- [x] P3 - hero reshoot: superseded 2026-08-27, the hero visual is now the featured-project screenshot carousel; the portrait serves About only (`/images/about.jpg`).

## After deployment

- [x] Live site URL: https://buisinesscardwebsite.vercel.app (prod; Git-connected, deploys on push to main)
- [x] Redesign deployed + live content applied (2026-08-27): approved copy + photo_url applied via REST; both locales verified rendering
- [ ] Verify contact form email lands in inbox
