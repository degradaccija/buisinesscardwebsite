# Task 05 — Page Sections

**Spec ref:** §2, §5, §6

**Depends on:** Task 02, 03, 04

## Goal

Render the full single-page business card: all 7 sections fed from Supabase content.

## Steps

1. `app/[locale]/page.tsx`: fetch all content via `src/lib/content.ts` helpers (ISR, `revalidate: 60`), pass into section components. Page is a server component.
2. Build sections (`src/components/sections/`):
   - `Hero` — name, role, tagline, CTAs (contact + GitHub/LinkedIn), monogram or photo, terminal-style prompt line
   - `About` — bio paragraphs + `Terminal` with `whoami`/`cat profile.txt` flair
   - `Skills` — grouped by category, `SkillBar` with level 1–5
   - `Experience` — `TimelineItem` list (work + education), dates formatted per locale, "present" for null end_date
   - `Projects` — `ProjectCard` grid, tags, repo/live links, featured first
   - `Services` — `ServiceCard` grid with lucide icon mapped from DB `icon` string (safe lookup, fallback icon)
   - `Contact` — email/link row + `<ContactForm>` (form itself wired in Task 06; render with disabled state until then)
3. Smooth scroll via CSS `scroll-behavior: smooth` (media-query-gated on reduced motion) + `scroll-margin-top` on sections for sticky nav offset.
4. Loading state: since page is ISR, add minimal `loading.tsx` skeleton.
5. Update `CONTENT_TODO.md` if any new placeholders appear.

## Acceptance Criteria

- [ ] All 7 sections render on `/en` and `/lv` with correct language from DB columns
- [ ] Content comes only from `src/lib/content.ts` (components receive props; no fetching inside)
- [ ] Section nav anchors work; smooth scroll; sticky nav offset correct
- [ ] Empty/nullable fields degrade gracefully (no image, no live_url)
- [ ] `npm run lint`, `npm run typecheck`, `npm run build` clean

## Notes

- Photo: use `Monogram` until `site_profile.photo_url` is set.
- Keep sections' props typed from `src/lib/types.ts`.
