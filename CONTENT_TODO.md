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
- [ ] Vercel account (free tier) → import GitHub repo
- [ ] GitHub repo for this project

## Content placeholders (in `supabase/seed.sql`)

- [x] `site_profile.email` — real contact email (marcis.kregers@gmail.com)
- [ ] `site_profile.photo_url` — professional photo
- [x] `site_profile.github_url` — GitHub profile URL (https://github.com/degradaccija)
- [x] `site_profile.linkedin_url` — LinkedIn profile URL (https://lv.linkedin.com/in/marcis-kregers)
- [ ] `site_profile.tagline_en/lv` — final tagline wording
- [ ] `site_profile.bio_en/lv` — final bio text
- [ ] `experience` education: exact school name, start/end dates, description
- [ ] `experience` work history: company, dates, descriptions (extra rows welcomed)
- [ ] Projects: real project titles, descriptions, repo/live links, images, tags
- [ ] Services: final wording EN/LV
- [ ] Skills levels (1–5) reviewed — current values are estimates

## After deployment

- [ ] Live site URL recorded here: ______________
- [ ] Verify contact form email lands in inbox
