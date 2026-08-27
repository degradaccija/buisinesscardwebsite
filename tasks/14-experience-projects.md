# Task 14 — Experience + Projects Rebuild

**Spec ref:** §2, §7, DESIGN.md v2

**Depends on:** Tasks 10 (boards 04–05), 13

## Goal

Rebuild Experience and Projects to `board-04-experience.html` and
`board-05-projects.html`. Projects is the wow setpiece: a GSAP sticky-stack for
featured work plus a gapless grid for the rest.

## Steps

1. Read the two board files + DESIGN.md v2; read the sticky-stack canonical
   skeleton in `.agents/skills/design-taste-frontend/SKILL.md` §5.A.
2. Experience (`src/components/sections/Experience.tsx`):
   - Timeline rail per board (hairline + node), refined typography, type badge
     (work/education) as mono label; no card-per-entry soup.
3. Projects (`src/components/sections/Projects.tsx`):
   - Featured projects (DB `featured = true`): GSAP sticky-stack — cards pin at
     `start: "top top"`, previous card scales/fades as next arrives, last card
     unpinned; `useReducedMotion` → plain stacked list.
   - Remaining projects: gapless grid per board (`grid-flow-dense`, spans
     mathematically interlocked, no empty cells), hover physics
     (`group-hover:scale-105` inside `overflow-hidden`).
   - Thumbnails: `image_url` when present via `next/image` with `sizes`; seeded
     fallback visual otherwise (monogram-style, not a fake screenshot).
   - Tags as mono pills; repo/live links with proper states.
4. Client components: only the GSAP stack piece is `"use client"`; the grid
   stays server-rendered.
5. i18n strings in both dictionaries.
6. `npm run lint`, `npm run typecheck`, `npm run build` clean.

## Acceptance Criteria

- [x] Experience timeline matches board-04
- [x] Featured projects sticky-stack works (pin at top, scale/fade), reduced-motion fallback
- [x] Project grid gapless, no empty cells, varied cell spans
- [x] Hover physics on cards; images sized (no CLS)
- [x] Bilingual strings; build/lint/typecheck clean

## Notes

### Experience (board-04 timeline rail)

- Grid `grid-cols-[36px_1fr]` mobile / `lg:grid-cols-[140px_56px_1fr]`
  (year col hidden below lg, mono right-aligned; node col carries the rail).
- Hairline rail segments live on the node cell: first row `top-[18px] bottom-0`,
  middle `top-0 bottom-0`, last `top-0 h-[18px]` so the rail runs dot-to-dot
  and breaks at group labels (labels span all columns, like the board).
  Single-entry groups render the dot only (rail connects nothing).
- Entries: h3 + org (mono accent) + sentence-case type Badge (work/education),
  description `max-w-[65ch]`, period mono muted joined with `" - "` (board's
  `→` arrow and middle-dot location row skipped: no location column in DB,
  DESIGN.md date format wins). Row hover `bg-surface`.
- Entries grouped work-first then education (board order), DB sort kept within
  each group.
- Motion: client leaf `ExperienceMotion` with per-entry reveals (y 24, once,
  `top 85%`, `--ease-fluid`, 0.6s) per DESIGN.md §7. The board's rail-draw
  scrub pin was deliberately NOT used: it would be a second pinned setpiece
  (DESIGN.md: exactly one pin page-wide = Projects stack).
- Deviation from "only the sticky-stack is a client leaf": ExperienceMotion is
  a second tiny client leaf, mirroring the existing Hero/About/Skills motion
  leaf architecture. The Projects grid itself stays server-rendered.

### Projects (board-05)

- Sticky-stack: canonical skill §5.A skeleton in `ProjectsStack.tsx` ('use
  client'): each non-last `.stack-card` pinned via ScrollTrigger
  `start: "top top"`, `endTrigger: last card`, `end: "top top"`, `pin: true`,
  `pinSpacing: false`; previous card scrubbed to `scale: 0.92`, `opacity:
  0.55` driven by the NEXT card's trigger (`top bottom` → `top top`, scrub,
  ease none). Last card unpinned. `gsap.context` + `ctx.revert()` cleanup.
  Wrapper divs keep the skeleton's `sticky top-0 min-h-[100dvh]` classes so
  all cards are positioned (DOM-order stacking over the GSAP-fixed pins; a
  static last card would paint below fixed siblings). `useReducedMotion` →
  wrappers lose sticky + no GSAP: plain stacked list (verified in browser:
  position static, sequential tops).
- Verified in-browser with a temp 3-card harness (route deleted afterwards):
  pin engages at `top top` (position fixed), mid-scroll card 0 at 0.96/0.78,
  at card-1-arrival exactly 0.92/0.55, pins release when the last card hits
  top, zero console errors.
- 1 featured card renders as a plain centered `max-w-4xl` card (no 100dvh
  wrapper); 0 featured skips the stack entirely.
- Featured card: image/fallback top `aspect-[16/10]`, tags, h3, locale
  description, mono repo/live links pinned `mt-auto`; first card carries glow
  moment 2 (`0 0 32px accent-glow`, verified in computed style) + "Case
  study" pill. Hover: image `scale-105` in `overflow-hidden` with
  `ease-snap` 0.7s, no hover glow.
- Dense grid (non-featured): `grid-flow-dense`, 12 cols ≥sm (single col
  below), `auto-rows-[8rem]`, every cell `row-span-2`, gap 0, hairlines via
  `border` + `-ml-px -mt-px` overlap inside a bordered rounded container,
  hover `border-accent/40` + `hover:z-10` paint bump.
- Span math (all cells row-span-2; rows always sum to 12, zero holes for any
  count): 1→[12]; 2→[7,5]; 3→[5,7,12]; 4→[5,7,4,8]; 5→[5,7,4,4,4]; n≥6→
  floor(n/6) blocks of [5,7,4,8,4,8] (each block fills 3 rows: 5+7, 4+8,
  4+8) plus the leftover r=n%6 using the small pattern. Verified live:
  7+5 = 12, cells touch, container height = 2 rows.
- Tile: full-cell visual (next/image fill + `sizes` when `image_url`, else
  monogram-style initials block on `bg-surface`, no fake screenshot; bracket
  tokens like `[TODO: CONTENT]` stripped from initials), caption bar with
  gradient scrim, title + mono tag list (" / " join, max 3), stretched link
  to `live_url ?? repo_url` with title aria-label.

### i18n keys added

- `experience.groupWork` / `experience.groupEducation` (replace old
  `experience.work`/`education`; used for both group labels and badges)
- `projects.featured`, `projects.caseStudy`; `projects.live` rewording
  ("View live" / "Skatīt tiešsaistē")
- Both dictionaries updated; no em-dashes added.

### Cleanup

- `ui/TimelineItem.tsx` deleted (replaced by the grid timeline).
- `ui/Badge.tsx` switched to sentence case (no forced uppercase) per
  DESIGN.md §6 badge spec; its only consumer was the old ProjectCard.
- `ProjectCard.tsx` rewritten (featured stack card), `ProjectVisual.tsx` +
  `ProjectTile.tsx` + `ProjectsStack.tsx` + `ExperienceMotion.tsx` added.
- GlowCard kept: still used by Services (task 15 scope).
- `npm run lint`, `npm run typecheck`, `npm run build` all clean.
