# Task 11 — Foundation: Tokens, Fonts, GSAP Install

**Spec ref:** §7, DESIGN.md v2

**Depends on:** Task 09

## Goal

Rebuild the styling foundation to DESIGN.md v2 and install the motion stack, so
section tasks (12–15) build on stable primitives.

## Steps

1. `cd site && npm install gsap @gsap/react` (verify versions in package.json).
2. `src/app/globals.css` `@theme` block: replace tokens per DESIGN.md v2
   (refined violet, surfaces, borders, text, motion easing tokens). Delete tokens
   DESIGN.md v2 removed. Keep Tailwind 4 CSS-first config (no tailwind.config).
3. `src/app/layout.tsx`: swap fonts — keep Space Grotesk (`--font-display`),
   add Geist for body (`--font-sans`), keep JetBrains Mono (`--font-mono`);
   expose as CSS variables; remove Inter.
4. Primitives:
   - Remove the fake-terminal `Terminal` component (or repurpose strictly per
     DESIGN.md v2 — default is remove).
   - `SectionTitle`: drop the `01. //` numbered prefix; new style per DESIGN.md v2
     (plain-language label, eyebrow only where allowed).
   - `SkillBar`: delete (Skills section gets a new treatment in Task 13).
   - Add `src/lib/motion.ts`: easing tokens, `useReducedMotion` re-export,
     `gsap` + `ScrollTrigger` registration helper.
   - Add z-index scale constants (`src/lib/z.ts`) per DESIGN.md v2.
5. Global shell: container widths, section spacing rhythm (py-32 md:py-48
   chapter spacing per gpt-taste), `overflow-x-hidden` guard on `<main>`.
6. Verify no one-off hex values remain in components (tokens only).
7. `npm run lint`, `npm run typecheck`, `npm run build` clean.

## Acceptance Criteria

- [x] gsap + @gsap/react in package.json
- [x] @theme tokens match DESIGN.md v2; Inter fully removed
- [x] Terminal + SkillBar components removed; SectionTitle un-numbered
- [x] lib/motion.ts + z-index scale in place
- [x] Build/lint/typecheck clean

## Notes

- Installed `gsap@3.15.0` + `@gsap/react@2.1.2`.
- globals.css rebuilt: accent family `#8f7ce6`/`#a48ff5`/`#7c5ce0`,
  glow `rgba(140,122,240,0.28)`, grid demoted to hero-only value
  `rgba(143,124,230,0.04)`, `--color-terminal` renamed `--color-success`,
  `--ease-fluid`/`--ease-snap` added. Body-wide grid background removed
  (hero backdrop only per §4; Task 12 adds it in Hero). Radial wash updated
  to `rgba(140,122,240,0.14)`. Legacy shadcn `:root`/`@theme inline` mapping
  kept (shadcn/ primitives depend on it), values aligned to v2.
- Fonts: Geist (`--font-geist`) replaces Inter everywhere; Space Grotesk +
  JetBrains Mono unchanged; `latin` + `latin-ext` subsets.
- `ui/Terminal.tsx` + `ui/SkillBar.tsx` deleted. About.tsx now renders bio
  paragraphs only; Skills.tsx renders a minimal grouped list (Task 13
  rebuilds properly). `about.terminal*` keys removed from en.ts/lv.ts.
  lucide `Terminal` icon stays in `lib/icons.ts` (service icon mapping, not
  the component).
- SectionTitle: `title` + optional `body`, no index/numbering; h2 per v2
  type scale. All six callers updated.
- `lib/motion.ts`: gsap + ScrollTrigger registration (idempotent), easing
  constants, `useReducedMotion` via `useSyncExternalStore` (matchMedia;
  react-hooks lint forbids sync setState in effects; `@gsap/react` v2 does
  not export `useReducedMotion`). `lib/z.ts`: 10/20/30/40 scale. Nav now
  `z-10` per scale.
- Shell: Section padding `py-32 md:py-48`, `overflow-x-hidden` on `<main>`,
  container already `max-w-6xl px-4 sm:px-6 lg:px-8`.
- Hex values: only `opengraph-image.tsx` (satori generator, Tailwind tokens
  do not apply there); colors updated to v2. Its `$ whoami` line is fake
  shell output per ban §8.3 - flagged for a later task.
- Not touched (later tasks): GlowCard still used by ServiceCard/ProjectCard
  (Tasks 13-15 replace per DESIGN.md §12), Button styling, full-section
  layouts, Playwright suite (Task 19).
