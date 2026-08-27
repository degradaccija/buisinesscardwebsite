# Task 13 — About + Skills Rebuild

**Spec ref:** §2, §7, DESIGN.md v2

**Depends on:** Tasks 10 (boards 02–03), 12

## Goal

Rebuild About and Skills to their boards (`board-02-about.html`,
`board-03-skills.html`). Both sections currently read as plain card stacks.

## Steps

1. Read the two board files + DESIGN.md v2 component rules.
2. About (`src/components/sections/About.tsx`):
   - Composition family per board (distinct from hero and from skills).
   - Photo slot: real `photo_url` when present (sized `next/image`), monogram
     fallback otherwise; no fake terminal window.
   - Bio with typographic emphasis per board (bold/italic same family, never a
     random serif); terminal *flavor* limited to mono labels if the board uses them.
3. Skills (`src/components/sections/Skills.tsx`):
   - Replace skill bars/dots entirely: grouped presentation per board (e.g.
     category clusters with mono labels, or a single marquee row — remember
     max 1 marquee per page; if Projects uses one, Skills must not).
   - Levels expressed without progress-bar tracks (number + subtle indicator
     per DESIGN.md v2).
4. Delete `SkillBar` usage remnants; remove dead imports.
5. i18n: any new UI strings go in both dictionaries.
6. `npm run lint`, `npm run typecheck`, `npm run build` clean.

## Acceptance Criteria

- [x] About matches board-02 (photo slot + typographic bio)
- [x] Skills matches board-03 (grouped, no progress bars/dots, no 3-equal-cards)
- [x] No fake terminal anywhere
- [x] Bilingual strings via dictionaries; build/lint/typecheck clean

## Notes

- Composition families: Hero = asymmetric split (7fr/5fr, vertical framed portrait).
  About = board-02 editorial offset (lg:grid-cols-12; landscape 7/5 photo slot
  col-span-7 with two layered offset frames left/top, caption col-span-4
  col-start-9 with lg:mt-24 offset). Skills = board-03 staggered clusters (4
  equal columns with lg:mt-0/12/24/36 stagger steps). All three read distinct.
- Board deviations (documented):
  - About caption column carries the bio (board-02's right-third caption)
    instead of DESIGN.md's literal "bio col-span-7"; facts hairline styling
    follows DESIGN.md. Board's "experience 8+ years" fact skipped (ban 13, no
    fake metrics). Fact set: role, focus, languages (profile + dict values;
    profile has no location/education fields).
  - Skills cluster hover: border accent/40 + bg-surface-2 only, no glow shadow
    (DESIGN.md §4 two-glow-moment rule overrides board-03's hover glow).
    DESIGN.md's "no cards" for Skills read as no equal-card grid; board-03's
    staggered bordered clusters kept as the board is the composition target.
  - Levels shown as board-03 mono numerals (L1-L5, accent) per owner
    instruction, not DESIGN.md's tier words. Header note (L1-L5, self
    assessed) placed as SectionTitle body to avoid a split header; no eyebrow
    added (About/Skills are consecutive and hero already spends eyebrow budget).
  - Board-03's numeral count-up deferred to Task 16 motion sweep; cluster
    stagger implemented now.
- GSAP (board-annotated, light): AboutMotion = photo scrub settle y+30/scale
  1.05→1 + caption x-slide + fact rows 0.1s stagger. SkillsMotion = cluster
  y+40 stagger 0.12s on section top 70%. Both collapsed under
  prefers-reduced-motion via useReducedMotion.
- Typographic emphasis: new `src/lib/text.tsx` parseEmphasis supports
  `**bold**` (font-medium text-text-primary, same family) and `*italic*` in
  bio paragraphs. Seed bio has no markers yet; Task 17 can use them.
- New i18n keys (en + lv): about.facts.{role,focus,languages},
  about.focusValue, about.languagesValue, about.cv, skills.note,
  skills.countOne, skills.countOther. No em-dashes anywhere in new copy.
- CV link renders only when profile.resume_url is set (null in seed).
- About photo slot uses object-[center_20%] to bias the vertical 704x1521
  portrait inside the 7/5 landscape frame; CONTENT_TODO landscape workspace
  shot will replace it later.
- `lint`, `typecheck`, `build` all clean. e2e tests untouched (Task 19).
