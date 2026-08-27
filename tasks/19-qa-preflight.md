# Task 19 — QA, Pre-Flight & Playwright Testing

**Spec ref:** §8, §12

**Depends on:** Task 18

## Goal

Final quality gate for the redesign: update + run the Playwright e2e suite,
Lighthouse on both locales, reduced-motion + mobile checks, and the design-skill
pre-flight sweep. This task is executed by a dedicated testing agent using the
playwright-cli skill.

## Steps

1. Read `.agents/skills/playwright-cli/SKILL.md` for test conventions.
2. Update `site/e2e/` suite:
   - Fix selectors broken by the redesign (nav, sections, form, toggle).
   - Add coverage: hero CTA visible without scroll, nav single-line at desktop
     (1024px), projects sticky-stack present, form success/error, locale toggle
     + cookie, reduced-motion emulation (no animation), 360px mobile pass.
   - Refresh visual screenshots to the new design.
3. Run the full suite: `cd site && npm run test:e2e`. Fix real defects; do not
   loosen tests to pass.
4. Lighthouse on `/en` + `/lv` (local `next build` + `next start` or dev):
   Performance ≥ 90, A11y ≥ 95, BP ≥ 95, SEO ≥ 95. Fix violations
   (LCP image priority, CLS, contrast).
5. Design pre-flight sweep (mechanical checks):
   - 0 em-dashes/en-dashes visible anywhere
   - Eyebrow count ≤ ceil(sections/3)
   - Exactly one contact-CTA label per intent across the page
   - Hero headline ≤ 2 lines desktop; nav single-line; no scroll cues
   - No fake terminals, no progress-bar tracks, no numbered eyebrows
   - Single accent family; tokens only (no one-off hex)
6. Manual smoke: both locales, keyboard nav, focus rings, form end-to-end
   (use `CONTACT_TEST_MODE=1` if DB not reachable in CI-like run).
7. Record results in this file's Notes; update `CONTENT_TODO.md` status.

## Acceptance Criteria

- [x] Playwright suite green (updated selectors + new coverage + screenshots)
- [x] Lighthouse targets met on both locales (record scores here)
- [x] Pre-flight sweep passes (record checklist here)
- [x] Mobile 360px + reduced-motion verified
- [x] `npm run lint`, `npm run typecheck`, `npm run build` clean
- [x] All task files 09–19 checkboxes updated

## Notes

### Test inventory (final run)

- Primary config (`playwright.config.ts`, live DB): 58 passed / 30 skipped
  (skips are project filters: desktop-only vs mobile-only).
- Mock config (`playwright.mock.config.ts`, mock Supabase REST + mock data):
  28 passed / 0 failed.
- Total: **86 passed / 30 skipped / 0 failed** across both projects.
- Suite needed no selector fixes: prior tasks (15-18) had already migrated
  specs to the redesigned selectors (`data-hero-*`, `#contact-*` fields,
  `form.send` "Send"/"Sūtīt", `cta.contact` "Get in touch"/"Sazināties",
  `data-project-tile`, `.stack-card`, `[MK]` logo nav).
- Additions this task:
  - `motion.mock.spec.ts` reduced-motion scroll test now also asserts zero
    GSAP-applied transforms on `#projects article` after scrolling to the end
    (no stuck transforms).
  - `screenshots.spec.ts` rewritten: deterministic per-section captures
    (`en-hero`, `en-{about,skills,experience,projects,services,contact}`,
    `lv-hero`, `lv-contact`, mobile hero/projects/contact) instead of
    full-page captures, plus a hero-entrance wait that requires every
    `[data-hero-*]` opacity to *hold* at 1 for 600ms (the old wait raced GSAP
    hydration and captured mid-entrance frames).

### Screenshot artifact found (not a site defect, suite changed)

Playwright full-page capture (`captureBeyondViewport`) resizes the viewport,
ScrollTrigger refreshes, and all `once: true` fromTo reveals below the fold
reset to their opacity-0 from-state — full-page PNGs came out with
Skills/Experience/Services/Contact blank. Verified via an instrumented probe
that this is a capture mechanic, not real UX: real scrolling and anchor jumps
fire reveals normally (every reveal is `start "top 70-85%"`, `once: true`,
fires on position past start). Replaced full-page captures with per-section
viewport captures at real proportions.

### Lighthouse (production `next build && next start`, Lighthouse 13.4.1,
headless "Chrome for Testing" via CHROME_PATH, default mobile emulation)

| Locale | Performance | Accessibility | Best Practices | SEO | LCP | CLS |
|--------|-------------|---------------|----------------|-----|-----|-----|
| /en    | 93          | 100           | 100            | 100 | 3.3s | 0 |
| /lv    | 92          | 100           | 100            | 100 | 3.4s | 0 |

Targets met (Perf >= 90, A11y >= 95, BP >= 95, SEO >= 95) on both locales.

### Defects found + fixed

1. **CLS 0.147 / skeleton flash (site defect, fixed)** —
   `src/app/[locale]/loading.tsx` wrapped the prerendered ISR page in an
   automatic Suspense boundary: Lighthouse's throttled trace showed the
   skeleton shell painting first (doc ~1078px, 0 sections), the real content
   swapping in ~300ms later (doc ~8435px), and the footer jumping 121px —
   the entire 0.147 CLS. The swap also delayed the hero `priority` image
   preload (LCP 3.6s, perf 84). Deleted `loading.tsx` (nothing beneficial to
   show while a cached prerendered page streams; HTML now arrives complete in
   one response). Result: CLS 0 on both locales, perf 84 -> 92-95.
2. **Monogram project fallback color contrast (site defect, fixed)** —
   `ProjectVisual` initials used `text-accent/50` on `bg-surface`
   (~2.2:1, below the 3:1 large-text minimum); Lighthouse dinged
   `color-contrast` (a11y 96). Changed to `text-accent` (large-text AA on
   surface, matches `ui/Monogram.tsx`). Result: a11y 100 on both locales.

LCP is 3.3-3.4s under Lighthouse mobile network throttling against localhost
(hero photo served from the live Supabase DB); above the 2.5s §11 goal but the
task target is the Lighthouse score, which passes. Perf proxies are asserted
in e2e: hero `priority` image + `<link rel="preload">` present
(`images.mock.spec.ts`), CLS via the layout assertions in nav/mobile/projects
specs. Worth revisiting if the owner swaps in a real optimized portrait.

### Pre-flight sweep results (mechanical)

| Check | Result |
|-------|--------|
| Em/en dashes in `site/src` (+ `site/public`, i18n, seed) | 0 matches |
| Numbered eyebrows (`01.` / `//` style) above headings | 0 (SectionTitle has no index prop; `svc/a` board labels dropped in Task 15) |
| Scroll cues (scroll text, wheel icons, hero-bottom arrows) | 0 |
| Contact-CTA labels per intent | exactly one label per intent: contact intent = `cta.contact` ("Get in touch"/"Sazināties", nav + hero, both `#contact`); message-submit intent = `form.send` ("Send"/"Sūtīt", form only). No second label for either intent. |
| Eyebrow budget (<= 2 page-wide, no consecutive sections) | 2 (hero availability pill + Projects "Featured" caption); hero/skills/projects spaced apart |
| Fake terminals / progress-bar tracks / dot ratings | 0 (Terminal.tsx + SkillBar.tsx deleted in Task 11; levels render as `L1-L5` mono numerals per Task 13 owner instruction) |
| Raw hex in components | 0 in components; hex only in `globals.css`, `opengraph-image.tsx`, and `app/icon.svg` (static SVG asset cannot reference CSS tokens; values match tokens exactly) |
| Single accent family / tokens only | yes (violet only; success/danger semantic) |

Visual scrub of refreshed section screenshots confirmed: no numbered labels,
no scroll cues, no fake terminals, single accent family, one h1 per page.
DESIGN.md §5 lists Services as "index rows" while Tasks 10/15 shipped the
accepted board-driven bento (span math + treatments documented in Task 15
Notes) — recorded here as an intentional, documented deviation, not reopened.

### Content observation (owner follow-up, tracked in CONTENT_TODO.md)

The live Supabase DB still serves pre-redesign `[TODO: CONTENT]` rows
(rendered screenshots show old placeholder copy); `supabase/seed.sql` holds
the Task 17 content. Owner must re-run the seed to refresh live content.
Added as a checklist item in `CONTENT_TODO.md`.

### Environment notes

- Suite ran against a fresh dev server per config (`reuseExistingServer:
  false`); a stale dev server on :3000 was killed before starting.
- Lighthouse used Playwright's Chromium
  (`CHROME_PATH=.../Google Chrome for Testing`) because no system Chrome is
  installed; `npx lighthouse` itself is available locally (13.4.1).
- Prod server for Lighthouse ran with `site/.env.local` (live Supabase URL +
  `CONTACT_TEST_MODE=1`); /en + /lv prerendered static at build.
