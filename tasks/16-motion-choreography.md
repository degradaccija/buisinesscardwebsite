# Task 16 — Motion Choreography Sweep

**Spec ref:** DESIGN.md v2 motion language

**Depends on:** Task 15

## Goal

One global motion pass over the whole page: every animation motivated,
consistent easing, no jank, reduced-motion safe, and no violations of the
motion rules from `.agents/skills/design-taste-frontend/SKILL.md` §5.

## Steps

1. Read DESIGN.md v2 motion language + skill §5 (allowed patterns,
   forbidden patterns).
2. Audit every animation added in tasks 12–15 against:
   - Motivated? (hierarchy / storytelling / feedback / state) — remove any
     "looked cool" animation.
   - Transform/opacity only (no width/height/top/left animation).
   - `prefers-reduced-motion` collapses everything to static/instant.
   - No `window.addEventListener('scroll')`, no scrollY-in-state, no rAF on React state.
   - Max 1 marquee page-wide; exactly 1 pinned setpiece (Projects stack).
   - GSAP contexts cleaned up (`gsap.context` + revert) in client leaves.
3. Add missing scroll-reveal stagger where sections feel dead (per board
   annotations), using the canonical skeleton (§5.C) or GSAP scrub — but keep
   total motion below "theme park" level.
4. Perf: verify no layout shift from animations; images/containers sized;
   hero LCP untouched by JS; grain/noise only on fixed pointer-events-none layer
   if used.
5. Cross-check: 360px mobile, reduced-motion emulation, both locales.
6. `npm run lint`, `npm run typecheck`, `npm run build` clean.

## Acceptance Criteria

- [x] Every animation has a one-line motivation (recorded in this file's Notes)
- [x] Reduced-motion: page fully static/instant
- [x] No banned patterns (scroll listeners, layout-thrash animations)
- [x] ≤1 marquee, 1 pinned setpiece, page still hits LCP < 2.5s (dev check)
- [x] Build/lint/typecheck clean

## Notes

### Animation inventory (component → animation → motivation)

| Component | Animation | Motivation |
|---|---|---|
| HeroMotion | Entrance timeline: availability pill → h1 → role → tagline → CTAs (0.06s stagger) → visual (scale 0.94) | Hierarchy: hero stack reads in importance order on first paint |
| Nav | Mobile menu overlay fade + link y-stagger 0.08s; hamburger morphs to X (CSS) | State/feedback: open/close state change; link hierarchy inside the menu |
| AboutMotion | Portrait y+24 reveal; caption x+24; fact rows stagger 0.1s | Storytelling: caption and facts follow the portrait into view |
| SkillsMotion | Cluster columns y+40 stagger 0.12s (start "top 70%") | Hierarchy: category clusters read in sequence |
| ExperienceMotion | Entry rows y+24; rail scaleY draws top-down; node dots pop (EASE_SNAP, 0.15s delay) | Storytelling: the timeline draws itself as history unfolds |
| ProjectsStack | Pinned sticky-stack; previous card scales 0.92 / opacity 0.55 scrubbed | Storytelling: featured projects stack; the page's single pinned setpiece |
| ProjectsGridMotion | Archive grid tiles y+32 stagger 0.06s (once) | Storytelling: the dense archive grid enters as one sweep (board 05) |
| ServicesMotion | Cells y+32 stagger 0.08s | Hierarchy: service cells enter in reading order |
| ContactMotion | Form fields x-24 (left), channel rows x+24 (right), mirrored 0.07s stagger | Storytelling: mirrored entrance across the split divider |
| CSS hover physics | CTA `active:scale-[0.98]`; arrow `translate-x-1`; project image `scale-105` (0.7s ease-snap); service cell `-translate-y-0.5` (2px, motion-safe); border/bg color shifts | Feedback: tactile acknowledgement of interactive elements |

### Violations found & fixed

1. **autoAlpha (Task 15 flake source)**: present in HeroMotion, AboutMotion,
   SkillsMotion, ExperienceMotion and Nav — all replaced with `opacity`.
   Verified: zero `autoAlpha` remains in `site/src`.
2. **Parallax on content (banned, DESIGN.md §7)**: AboutMotion scrubbed the
   portrait (y+30 / scale 1.05→1) — replaced with a standard once reveal
   (y+24, opacity, "top 85%"). Hero board's visual scrub drift was never
   implemented (correct).
3. **Reduced-motion hydration race (real bug found by probe)**: first client
   effect ran with `useSyncExternalStore`'s server snapshot (false) before
   React's re-check re-render, so reduced-motion users saw the full hero
   entrance (~1.1s). Added `prefersReducedMotion()` effect-time matchMedia
   check to every leaf; reduced motion is now static/instant from the first
   frame (verified via Playwright `reducedMotion: "reduce"` probe).
4. **ScrollTrigger registration fragility**: `registerMotion()` was called at
   module scope of 2 components (would break if both were tree-shaken).
   Registration moved once to module scope of `src/lib/motion.ts`;
   `registerMotion()` deleted.
5. **`transition-all`** on Button and ServiceCell (unbounded property
   transitions) — narrowed to border-color/background-color/box-shadow/transform.
6. **Untracked easing**: About CV underline used `ease-out` — switched to the
   `ease-fluid` token.
7. **Keyboard reachability**: with autoAlpha gone, the closed mobile menu's
   links were still tabbable — added `inert={!open}` to the overlay.

### Board annotations deliberately skipped (with reason)

- Hero: nav entrance + clip-path h1 reveal (not transform/opacity); side-rail
  second-read moment (layout element, not motion); visual scrub drift
  (parallax ban).
- Skills: numeral count-up (banned fake metrics; levels render statically).
- Experience: board's 600px rail pin (DESIGN.md allows exactly 1 pin page-wide,
  owned by ProjectsStack).
- Services: icon rotate on hover ("looked cool", unmotivated).
- Contact: form height-collapse success swap (height animation banned) and
  error shake (restrained; inline `role="alert"` text instead).
- Footer: closing-CTA word stagger (v2 footer is a minimal bar, no closing CTA).
- Marquee: zero used (allowed ≤1; no board demands one).

### Final counts & perf

- Pinned setpieces: 1 (ProjectsStack). Marquees: 0. Grain: none used.
- No `window.addEventListener('scroll')`, no scrollY-in-state, no rAF on React
  state (only matchMedia change + keydown listeners, allowed).
- Every client leaf: `useReducedMotion` guard + effect-time
  `prefersReducedMotion()` check + `useGSAP`/`gsap.context` + revert cleanup.
- CLS: hero `next/image` `priority` + sized 440×528 with reserved aspect; all
  images sized; reveals are transform/opacity only (no layout change).
- `transition-all` ban elsewhere: only color/shadow/transform CSS transitions
  remain, easing via `--ease-fluid` / `--ease-snap` tokens.

### Verification

- `npm run lint` ✓ `npm run typecheck` ✓ `npm run build` ✓
- Playwright: 39 passed, 13 skipped (desktop/mobile project filters) — ran
  against the already-running dev server on :3000 via a temporary
  `reuseExistingServer: true` config (removed after; e2e config itself belongs
  to Task 19).
- Probe at 360×740 + `reducedMotion: "reduce"` on /en and /lv: fully static
  from frame one, no console errors, no horizontal overflow. Normal motion:
  hero entrance plays, single pin, no marquees.
