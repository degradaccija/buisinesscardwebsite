# Task 10 — Design Boards (Per-Section Visual Specs)

**Spec ref:** DESIGN.md v2 (Task 09)

**Depends on:** Task 09

## Goal

Produce one visual reference board per page section so implementation tasks
(11–15) build to a concrete target instead of improvising. Boards live in
`design-inspiration/redesign/` and are the visual spec for section tasks.

**Environment constraint:** no image-generation tool is available in this repo's
agent environment. Boards are therefore self-contained static HTML files
(1440px-wide canvas, dark theme) built with inline CSS using the DESIGN.md v2
tokens, with GSAP/motion moments annotated as HTML comments. They are "painted
wireframes": exact composition, type scale, spacing, imagery placement.

## Steps

1. Read `.agents/skills/imagegen-frontend-web/SKILL.md` for direction rules:
   composition variety (never all left-text/right-image), narrative concept spine,
   second-read moments, single consistent palette, varied CTA treatment.
2. Read `DESIGN.md` v2 (tokens + type stack + bans).
3. Create one board file per section (name pattern `board-01-hero.html` …):
   - `board-01-hero.html` — asymmetric split hero, `min-h:100dvh`, 2-line
     headline, one contact CTA, GSAP entrance annotation.
   - `board-02-about.html` — photo slot + bio, distinct composition family.
   - `board-03-skills.html` — grouped skill presentation (no dot-bars, no
     3-equal-cards).
   - `board-04-experience.html` — timeline rail, refined (not card soup).
   - `board-05-projects.html` — featured sticky-stack + gapless grid with
     thumbnail placeholders.
   - `board-06-services.html` — bento/accordion, not identical cards.
   - `board-07-contact.html` — split layout, form + direct channels.
   - `board-08-footer.html` — footer CTA block + links.
4. Each board: same palette/type as DESIGN.md v2; annotate with `<!-- -->`
   comments the GSAP moments (entrance, scrub, pin, hover physics) and the
   imagery needed (dimensions + description).
5. Add `design-inspiration/redesign/README.md` listing boards, the narrative
   spine, and the palette swatches used.

## Acceptance Criteria

- [x] 8 board files exist in `design-inspiration/redesign/`
- [x] Every board uses a different composition family (no two identical layouts)
- [x] Palette + type match DESIGN.md v2 tokens exactly
- [x] GSAP moments and image needs annotated per board
- [x] README.md documents the spine and swatches

## Notes

- Boards are self-contained static HTML (inline CSS, no assets, no JS); validated with a Python HTML tag-balance checker plus banned-pattern scan (em-dash, `#000`, numbered eyebrows, scroll cues, `$` prompts): all clean.
- Decision: mono eyebrows use `// name` without numbers (task bans numbered eyebrows, overriding the `01. // about` pattern from DESIGN.md).
- Decision: skill levels shown as mono numerals `L1 → L5` instead of DESIGN.md SkillBar dots (task bans dot-bars); SkillBar itself can still stay for the live site or be revisited in Task 11.
- Decision: narrative spine = "precision instrument"; the single second-read moment is the vertical side rail on the hero only.
- No em-dashes in copy; bilingual hints shown as inline LV chips / mono translations.

## Notes

- Boards are throwaway visual specs; they do not ship in the site build.
- Later tasks may replace imagery placeholders with real/generated assets
  (Task 18); boards specify dimensions so replacement is drop-in.
- No em-dashes, no numbered eyebrows, no scroll cues inside boards.
