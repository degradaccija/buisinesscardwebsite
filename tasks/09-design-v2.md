# Task 09 — Design v2: Audit & DESIGN.md Rewrite

**Spec ref:** §7, DESIGN.md

**Depends on:** Task 08

## Goal

The current terminal-purple design reads as "vibecoded" (numbered section headers,
Inter body, fake terminal, glow on every card, symmetric card stacks). Rewrite
`DESIGN.md` as v2 — elevated execution of the same dark violet brand, incorporating
the project's design skills. DESIGN.md remains the design source of truth.

**Design Read (agreed with owner):** dev portfolio for freelance clients + recruiters,
dark techy premium language, elevated execution of the existing purple brand.

**Dials:** `DESIGN_VARIANCE: 8`, `MOTION_INTENSITY: 7`, `VISUAL_DENSITY: 4`

## Steps

1. Read the current `DESIGN.md`, `spec.md` §7, and skim the live site components
   (`site/src/components/**`) to catalog what exists.
2. Read the skill files (these are the authority for the rewrite):
   - `.agents/skills/design-taste-frontend/SKILL.md`
   - `.agents/skills/gpt-taste/SKILL.md`
   - `.agents/skills/high-end-visual-design/SKILL.md`
   - `.agents/skills/redesign-existing-projects/SKILL.md`
3. Write an audit summary (keep vs. kill) in the Notes section of this file:
   - Keep: dark `#0a0a12` family, violet accent identity, Space Grotesk +
     JetBrains Mono, hairline-border surfaces, bilingual i18n, lucide icons.
   - Kill/replace: `01. // about` numbered section prefixes (banned tell),
     Inter body font, fake terminal window, glow on every card, three-equal-card
     grids, skill dot-bars, symmetric single-column stacking, "//" dividers.
4. Rewrite `DESIGN.md` v2 with:
   - Refined token table (violet kept but desaturated; no pure black; two surface
     levels max; single accent family; where glow is allowed — max 1–2 moments).
   - Final type stack: Space Grotesk display + **Geist body** (replaces Inter) +
     JetBrains Mono labels. `next/font/google` for all.
   - Component rules for: Nav, Hero, About, Skills, Experience, Projects, Services,
     Contact, Footer + shared primitives (Button, Badge, cards, form fields).
   - Layout variety rule: each section uses a different composition family; no
     section looks like another; no repeated 3-equal-cards rows.
   - Motion language (GSAP): where pinning/scrub/hover physics are allowed,
     `prefers-reduced-motion` collapse rule, transform/opacity only, leaf client
     components only.
   - Bans list (from skills): numbered eyebrows, max 1 eyebrow per 3 sections,
     em-dashes, scroll cues, locale strips, fake terminals, fake metrics, filler
     verbs, more than one CTA label per intent, Inter, pure black/white.
   - i18n constraint: every UI string from `src/i18n/` dictionaries (en/lv); DB
     content via `_en`/`_lv` columns.
   - Performance: LCP < 2.5s, CLS < 0.1, images sized, grain only on fixed layers.
5. If `spec.md` §7 details contradict DESIGN.md v2, update spec §7 to defer to
   DESIGN.md (it already delegates) and note the delta here.
6. Update AGENTS.md only if a rule changes (icons stay lucide-react).

## Acceptance Criteria

- [x] DESIGN.md rewritten (v2) with token table, type stack, component rules,
      layout-variety rule, motion language, bans list, i18n + perf constraints
- [x] Audit summary (keep vs. kill) recorded in this file's Notes
- [x] spec.md §7 still consistent with DESIGN.md (no stale `01. //` examples)
- [x] No remaining reference to Inter or numbered section prefixes in DESIGN.md
- [x] Owner-approved direction preserved: dark violet, elevated, GSAP motion

## Notes

- Do NOT write site code in this task — docs only (next tasks implement).
- Skills conflict resolution: where skills conflict with AGENTS.md (icons, i18n),
  AGENTS.md wins; record the decision in DESIGN.md.
- The design boards task (10) will use DESIGN.md v2 as its palette/type source.

### Audit summary (current site vs. DESIGN.md v2)

**Keep (preserved and refined):**
- Dark `#0a0a12` canvas + `#12121f`/`#1a1a2e` surface family (near-black, violet
  tinted, no pure black) and `#2a2a45` hairline borders
- Violet accent identity (lila-rule override: brand is purple) but desaturated
  and split: `accent #8f7ce6` (AA text) + `accent-strong #7c5ce0` (white-text CTA
  fill) + `accent-hover #a48ff5`
- Space Grotesk display + JetBrains Mono labels
- Sticky nav with active-section tracking, `[MK]` monogram, language toggle
- Timeline rail for Experience
- Contact form structure (labels above, honeypot, inline errors/success)
- Semantic HTML, skip link, focus rings, reduced-motion CSS guards
- Bilingual i18n dictionaries + `_en`/`_lv` columns
- lucide-react icons (AGENTS.md wins over skills' Phosphor preference)
- Radial violet wash ambience (kept as fixed layer, opacity lowered)

**Kill / replace:**
- Numbered section prefixes (`01. // about`) and numbered nav links (01. About)
- Inter body font, replaced by Geist
- Fake terminal (`ui/Terminal.tsx`: `$` prompts, dots header, blinking cursor)
  replaced by About facts panel; component deleted in Task 11
- Glow on every card (`GlowCard` hover shadow) restricted to 2 page-wide moments
- Three-equal-card grids (Projects 3-col, Services 3-col) replaced by per-section
  composition families (pinned stack + offset grid; index rows)
- SkillBar progress tracks + level dots, replaced by tier labels (component
  deleted in Task 11)
- Terminal-green decorative accent, kept only as `success` for semantic states
- Mono-uppercase-everything labels, `//` dividers
- Duplicate contact CTA labels (nav "Contact" vs. hero "Get in touch"), replaced
  by single `cta.contact` dict key
- Em-dash usage (flagged: `site/src/i18n/en.ts` success message contains one;
  Task 17 content rewrite must clear it)
- h-screen patterns (none present; `min-h-[100dvh]` mandated going forward)
- Body-wide grid lines, demoted to hero-only backdrop at lower opacity

**Net-new in v2:**
- GSAP + @gsap/react + ScrollTrigger motion stack (site was static)
- Layout-variety rule: 7 distinct section composition families
- Eyebrow budget (max 2 page-wide), chapter spacing `py-32 md:py-48`
- Pill buttons, rounded-xl surfaces, two-moment glow budget
- `src/lib/motion.ts` + `src/lib/z.ts` helpers

### Spec deltas applied (spec.md)
- §2 About: removed "terminal-style whoami flair"
- §3: added Motion row (GSAP + @gsap/react + ScrollTrigger)
- §7: theme renamed "Dark Violet, Elevated Tech"; token table updated (accent
  family, success replaces terminal-green, glow rgba); fonts line now Space
  Grotesk + Geist + JetBrains Mono; motifs line drops `$` prompts, glow on
  hover, rounded-lg; removed the numbered section-title example; Components
  list drops Terminal, SkillBar, GlowCard and notes un-numbered SectionTitle
- DESIGN.md remains the delegated source of truth (spec §7 kept short)

### Handoff notes for Tasks 11-16
- Task 11 deletes `ui/Terminal.tsx`, `ui/SkillBar.tsx`; SectionTitle loses the
  `index` prop; fonts swap in `[locale]/layout.tsx` (remove Inter variable)
- Task 12: one `cta.contact` label across nav/hero/footer/contact
- Task 13: Skills tier-label mapping helper needed (`level` -> tier dict string)
- Task 14: Projects featured sticky-stack is THE one pinned setpiece
- Task 17: clear the em-dash in `en.ts` contact success string
