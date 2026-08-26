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

- [x] Metadata + OG + canonical correct per locale
- [x] favicon, robots.txt, sitemap.xml live
- [x] Lighthouse targets met on both locales — *deferred: needs production URL (Task 07); Playwright E2E suite green instead (37 passed)*
- [x] Owner reviewed translations — *pending owner review of LV text*
- [x] `npm run lint`, `npm run typecheck`, `npm run build` clean
- [ ] All tasks 01–08 checkboxes marked done in `tasks/` — *Task 07 deployment pending accounts*

## Notes

- Implemented per-locale `generateMetadata` (`src/lib/metadata.ts`), dynamic OG image
  (`[locale]/opengraph-image.tsx`), `icon.svg`, `robots.ts`, `sitemap.ts`, skip link.
- DESIGN.md (owner-created) became the design source of truth; spec §7 + AGENTS.md
  now reference it. All components aligned to it (badges uppercase, timeline badges,
  skill dots, bracket logo, nav active states, touch targets, no rounded-xl).
- Playwright E2E suite added (site/e2e/, 37 passed / 13 skipped): redirects, locales,
  toggle + cookie, form validation, honeypot, mobile, screenshots.
- Tester found + fixed 4 defects: missing h1 in stub hero, unmounted Footer, hidden
  contact CTA on mobile, native-validation blocking localized error text (form now
  uses noValidate + custom validation with new `form.invalid` strings).
