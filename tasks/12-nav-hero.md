# Task 12 — Nav + Hero Rebuild

**Spec ref:** §7, DESIGN.md v2

**Depends on:** Tasks 10 (board-01), 11

## Goal

Rebuild Nav and Hero to `design-inspiration/redesign/board-01-hero.html` and the
Nav rules in DESIGN.md v2. This is the first thing a client/recruiter sees.

## Steps

1. Read the board file + DESIGN.md v2 Nav/Hero sections.
2. Nav (`src/components/Nav.tsx`):
   - Single line on desktop, height 64–72px; sticky with backdrop-blur.
   - MK monogram, section links, active-section state, locale toggle, one
     contact CTA. Mobile: compact bar, 44px+ touch targets.
3. Hero (`src/components/sections/Hero.tsx`):
   - Asymmetric split per board; `min-h-[100dvh]` (never `h-screen`).
   - Headline max 2 lines desktop; subtext ≤ 20 words; role treatment per board.
   - ONE contact CTA label (dict key `cta.contact`), reused in nav/footer —
     remove duplicated "Contact" labels with different wording everywhere.
   - Hero visual per board (image slot with monogram fallback; priority
     `next/image` when real).
   - GSAP entrance choreography: staggered reveal, client component leaf,
     `useReducedMotion` collapse to static.
   - Max 1 eyebrow on the page here (hero) — no scroll cue, no stats, no
     tagline-below-CTA clutter.
4. i18n: add/rename dict keys in `src/i18n/en.ts` + `lv.ts` (both locales,
   no hardcoded strings).
5. `npm run lint`, `npm run typecheck`, `npm run build` clean.

## Acceptance Criteria

- [x] Hero matches board composition; headline ≤ 2 lines; CTA visible without scroll
- [x] Nav single-line desktop, ≤ 72px, active-section highlight works
- [x] Exactly one contact-CTA label across nav/hero/footer
- [x] GSAP entrance with reduced-motion fallback (transform/opacity only)
- [x] Bilingual strings via dictionaries; build/lint/typecheck clean

## Notes

- **Single CTA label:** `cta.contact` = "Get in touch" (en) / "Sazināties" (lv), used in
  Nav and Hero. `hero.ctaContact` removed. Footer has no CTA label; Contact section
  heading is `nav.contact` (a nav/section label, not a CTA) and stays for Task 15.
- **Board deviations:**
  - Headline reveal uses y+opacity, not the board's clip-path (DESIGN.md §7 bans
    non-transform/opacity animation).
  - Visual scrub drift (parallax) skipped (banned by §7).
  - Side rail and `// riga · lv` chip skipped (locale strips + middle-dot chains banned,
    §8.5/§8.18).
  - Nav links in Geist 0.875rem sentence case per DESIGN.md v2 (board used mono
    uppercase + numbering).
  - Button pills rounded-full per DESIGN §6 (board used 8px radius).
  - Board's accent full-stop after the name kept via `after:content-['.']` pseudo-element
    so the h1 text stays exactly "Mārcis Krēgers".
- **Hero visual:** framed 5/6 slot (440x528 on lg, board's 440x520) with `object-cover`
  crop of the vertical portrait, `priority` + sized, offset accent frame behind,
  `lg:mt-16` offset. Monogram fallback verified (DB photo_url still null until owner runs
  the seed SQL update from CONTENT_TODO). `object-position` defaults to center; owner can
  fine-tune the crop.
- **GSAP entrance (HeroMotion client leaf):** eyebrow 0.6s / headline 0.7s / role 0.6s /
  tagline 0.6s / CTA row (stagger 0.06) / visual scale 0.94, positioned 0.08-0.55s,
  `--ease-fluid`, once. `useReducedMotion` collapses to fully static render.
- **Mobile menu:** full-screen overlay (`bg-background/95 backdrop-blur`, z.menu),
  0.08s staggered link reveal via paused timeline play/reverse, hamburger morphs to X,
  Escape closes, body scroll locked. z-index from `z.ts` (nav 10, menu 30).
- **Active section:** IntersectionObserver only, accent + underline state.
- lint / typecheck / build all clean; dev-server curl sanity check passed on /en and /lv.
