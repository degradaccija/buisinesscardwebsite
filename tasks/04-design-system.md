# Task 04 — Design System

**Spec ref:** §7

**Depends on:** Task 01, 03

## Goal

Build the shared UI layer: theme, typography, and reusable components matching spec §7.

## Steps

1. Global styles (`src/app/globals.css`): CSS vars for tokens, body background/text, selection color, focus-visible ring (accent), reduced-motion handling.
2. Layout shell in `app/[locale]/layout.tsx`: page background (subtle purple grid via CSS/SVG), max-width container, `<Nav>` (sticky, "MK" monogram, section links, locale toggle), footer.
3. Components (in `src/components/ui/`):
   - `Button` — primary (accent, glow hover) + ghost variants, `asChild`-free simple API
   - `Badge`/`Tag` — mono, bordered pill
   - `Section` — wrapper with `id`, `SectionTitle` (mono prefix like `01. //` + heading)
   - `GlowCard` — bordered surface with hover glow
   - `Terminal` — decorative window (dots, mono text, `$` prompt)
   - `SkillBar`, `TimelineItem`, `ProjectCard`, `ServiceCard` (visual shells; data wiring in Task 05)
   - `Monogram` — "MK" avatar placeholder (used until photo exists)
4. Add `next.config.ts` if needed for nothing special (keep default).
5. Verify contrast: text-primary on background, muted text on surfaces — AA.

## Acceptance Criteria

- [x] All components render in a `/styleguide` dev-only route (removed or gated before deploy in Task 07)
- [x] Colors/fonts come from Tailwind theme tokens (no one-off hex in components)
- [x] Nav sticky with section anchors + working locale toggle
- [x] Footer with name + GitHub/LinkedIn icons
- [x] Focus-visible outlines visible; `prefers-reduced-motion` respected (no animated scroll/glow)
- [x] `npm run lint`, `npm run typecheck`, `npm run build` clean

## Notes

- Icons: lucide-react only (fixed set per AGENTS.md).
- The styleguide route is temporary scaffolding — delete before Task 07 deploy.
- lucide-react 1.x removed brand icons (Github/Linkedin) — added `BrandIcons.tsx`
  with two minimal inline SVGs instead (no extra icon library).
- React Compiler lint (`react-hooks/static-components`) forbids dynamic component
  refs — `ServiceCard` renders the mapped icon via `createElement`.
- Traffic-light dots use tokens (`traffic-red/yellow/green`), not raw hex.
