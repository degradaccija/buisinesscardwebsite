# Task 30 — Hero tagline & meta description: retire "Fixing computers."

**Plan ref:** FIX_PLAN.md finding 6
**Depends on:** nothing (independent of 28/29; do alongside them)

## Background

The hero's second line is `Building web apps, AI agents, and Linux systems. Fixing
computers.` — and because the meta description is built from the same
`site_profile.tagline_en` (`site/src/lib/metadata.ts`), **"Fixing computers." is also
the Google search snippet and the og:description** a recruiter sees in search results
and link previews. The repair craft is real expertise, but as the closing line of the
hero and the site's search-engine elevator pitch it undersells the dev/AI positioning.

The repair identity is not lost: it lives deliberately in the About bio (second
paragraph, SMD reballing / board-level repair) and the "Tech repair & consulting"
service card.

## Goal

Hero tagline and every derived snippet (meta description, OG/Twitter) lead with the
dev + AI + Linux-ops story; repair remains available one click deep.

## Steps

1. Update `site_profile.tagline_en` / `tagline_lv` in the **production DB and
   `supabase/seed.sql`** (row at `supabase/seed.sql:10`). Drafts (owner approves
   final wording):
   - EN: `Building web apps, AI agents, and Linux systems that stay running.`
     (alternatives: `…and keeping Linux systems running.` / `…from build to daily
     operation.`)
   - LV: `Veidoju web lietotnes un MI aģentus, uzturu Linux sistēmas.`
     (simply drops `remontēju datorus`; informal tone + "MI" per copy conventions)
2. Redeploy (content is build-time).
3. Verify all derived surfaces, both locales:
   - Hero second line on `/en` and `/lv`
   - `<meta name="description">` and `og:description` / `twitter:description` in the
     live HTML
   - Search-snippet preview: paste the URL into a share-debugger (e.g. LinkedIn Post
     Inspector) and eyeball the card
4. Sanity-check About + Services still carry the repair positioning (no copy change
   there — confirm only).

## Acceptance Criteria

- [ ] "Fixing computers." / "remontēju datorus" gone from hero and meta description,
      both locales
- [ ] OG/Twitter preview shows the new tagline
- [ ] Repair expertise still visible in About bio and Services
- [ ] Production DB and `seed.sql` in sync; deployed

## Notes

- One string, many surfaces — that's why this is its own task despite the size: the
  tagline is the single highest-leverage copy edit in the plan (it *is* the search
  snippet).
- If the owner wants repair kept in the hero eventually, the honest compromise is
  "…and the hardware they run on." — still recommended against for the meta surface.
