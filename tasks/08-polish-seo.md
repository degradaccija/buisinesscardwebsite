# Task 08 — Polish: SEO, Metadata, Final Review

**Spec ref:** §9, §12

**Depends on:** Task 07

## Goal

Production-quality polish: metadata, favicon, sitemap, Lighthouse targets, owner review.

## Steps

1. `generateMetadata` per locale (spec §9): localized titles/descriptions, `alternates.languages`, canonical, OpenGraph/Twitter.
2. Add default OG image (generate simple branded PNG/SVG — purple "MK" monogram on dark).
3. Add `app/icon.svg` + favicon, `app/robots.ts`, `app/sitemap.ts` (en/lv).
4. Add skip-to-content link; verify one `h1`, section `h2`s, aria labels on form/toggle.
5. Run Lighthouse locally on `/en` + `/lv`: Performance ≥ 90, A11y ≥ 95, BP ≥ 95, SEO ≥ 95. Fix violations (font swap, image sizes, contrast).
6. Owner review pass of all translations (LV naturalness, EN correctness).
7. Update `CONTENT_TODO.md` remaining items (photo, real project links, email address).
8. Final acceptance sweep: run every task's acceptance criteria checklist end-to-end.

## Acceptance Criteria

- [ ] Metadata + OG + canonical correct per locale
- [ ] favicon, robots.txt, sitemap.xml live
- [ ] Lighthouse targets met on both locales
- [ ] Owner reviewed translations
- [ ] `npm run lint`, `npm run typecheck`, `npm run build` clean
- [ ] All tasks 01–08 checkboxes marked done in `tasks/`

## Notes

- Photo and real content remain owner-owned placeholders — not blockers for this task.
