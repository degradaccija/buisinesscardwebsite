# Task 26 — Make the GitHub profile identifiable and presentable

**Plan ref:** FIX_PLAN.md finding 2
**Depends on:** 25 (domain, for the profile website link) · 27 (public website repo, for
pinning) — do last among the fix-plan tasks

## Background

The site pushes GitHub as its primary trust signal (hero, contact, footer), but
https://github.com/degradaccija currently shows: a default identicon avatar, no display
name, no bio, no location, no website, 0 followers, and three repos — one fork (`n8n`),
one with no description (`pictonic`), and `hermes-homelab`. A recruiter cannot confirm
the profile belongs to Mārcis Krēgers, and the handle means nothing to them.

## Goal

A recruiter clicking GitHub from the site sees, within five seconds: a face, a name, a
one-line pitch, and pinned repos that back up the site's claims.

## Steps

1. **Profile basics** (Settings → Profile):
   - Name: `Mārcis Krēgers`
   - Bio (EN, mirrors the site tagline from Task 30): e.g. `Fullstack web developer &
     AI-agent engineer. Next.js / TypeScript on the web, Linux in the basement.`
   - Location: `Jelgava, Latvia`
   - Website: `https://marciskregers.qd.je` (from Task 25)
   - Upload the professional photo (crop of the suit photo used in the site's About
     section — square, face-centered).
2. **Profile README:** create repo `degradaccija/degradaccija` with a short README:
   who I am (2–3 sentences), what I'm working on (Hermes setup, this website), the 21
   -service homelab one-liner, links to the site + LinkedIn. Keep it under ~20 lines.
3. **Pin repos:** `hermes-homelab`, `buisinesscardwebsite` (after Task 27 makes it
   public), and `pictonic` **only if** step 4 gives it a real description.
4. **Repo hygiene:**
   - `pictonic`: add a one-line description + topics, or archive it if abandoned.
   - `n8n` (fork): unpin/hide — forks dilute the wall.
5. **Decision box — username rename (optional, owner decision):**
   - *Recommendation: keep `degradaccija` for now.* The profile is credible once it has
     a face, name, and pins; renaming mid-fix-plan touches every link back to the site.
   - If renaming later (e.g. to `marciskregers`): do it in one sitting — GitHub keeps
     redirects until someone claims the old name, but you must update: `github_url` /
     contact text rows in the Supabase `site_profile` + `seed.sql`, git remotes
     (`site/`), the profile README links, and LinkedIn. Re-check old-handle
     availability afterwards.
6. Verify: logged-out browser → profile shows name, avatar, bio, location, website,
   pinned repos; click through from the live site's hero GitHub button.

## Acceptance Criteria

- [ ] Profile shows real name, photo, bio, location, website (no identicon, no nulls)
- [ ] Profile README repo exists and is public
- [ ] Pinned: `hermes-homelab` + `buisinesscardwebsite` (+ `pictonic` if described)
- [ ] `pictonic` described or archived; `n8n` fork not pinned
- [ ] Recruiter test: from the live site, ≤ 3 clicks to confirm identity + see work

## Notes

- The avatar and bio are owner-approval items — draft them here, owner confirms before
  publishing.
- LinkedIn is linked three times from the site and bot-blocks external checks (HTTP
  999 during review): owner should manually confirm the profile is public with photo,
  headline "Fullstack Web Developer & AI Engineer", and the custom URL under Contact
  info. Track that confirmation as this task's final checkbox:
- [ ] Owner: LinkedIn profile verified public + complete (manual)
