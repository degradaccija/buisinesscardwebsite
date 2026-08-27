# DESIGN.md - Mārcis Krēgers - Personal Business-Card Website (v2)

A dark violet, elevated-execution single-page design system for a freelance
fullstack developer / AI engineer. This file is the design source of truth.
Coding agents building or editing UI must follow it. Tasks 11-16 implement it.

## 0. Design Read & Dials

Reading this as: a dev portfolio for freelance clients and recruiters, with a
dark techy premium language, leaning toward an elevated execution of the
existing purple brand (Tailwind 4 utilities + custom tokens + GSAP motion).

Dials (fixed with owner, do not re-litigate):

- `DESIGN_VARIANCE: 8` - asymmetric compositions, fractional grids, offset
  columns, overlapping accents. No centered-symmetric defaults.
- `MOTION_INTENSITY: 7` - real scroll choreography (one pinned setpiece,
  staggered reveals, hover physics), never theme-park density.
- `VISUAL_DENSITY: 4` - airy chapter spacing, restrained content per section.

Authority and conflict resolution:

- The design skills in `.agents/skills/` (design-taste-frontend, gpt-taste,
  high-end-visual-design, redesign-existing-projects) inform this document.
  Where they conflict with AGENTS.md, AGENTS.md wins:
  - Icons stay lucide-react (skills prefer Phosphor; AGENTS.md mandates lucide
    and service icons in the DB come from this set).
  - Bilingual en/lv stays mandatory (dictionaries + `_en`/`_lv` columns).
- Skill ideas consciously adopted: sticky-stack pin, eyebrow restraint,
  em-dash ban, layout-family variety, pill buttons, hairline-first surfaces.
- Skill ideas consciously skipped (too heavy for a business card site): double
  bezel on every card, magnetic cursor buttons, horizontal scroll hijack,
  kinetic type marquees, liquid glass.

## 1. Brand & Atmosphere

- Mood: precise dark studio, not a terminal pastiche. Violet is the single
  source of color energy, hairline borders carry structure, type does the
  talking.
- Philosophy: everything looks engineered, not decorated. No fake terminals,
  no fake metrics, no gimmicks. When a decorative element cannot be justified
  in one sentence, it does not exist.
- One theme: the whole page is dark. No section inverts or lightens mid-page.

## 2. Color Tokens

Defined once in `site/src/app/globals.css` `@theme` (Tailwind 4 CSS-first
config; no tailwind.config file). Components reference tokens via utilities
(`bg-background`, `text-accent`, `border-border`); hex values never appear in
components.

| Token              | Value                     | Role |
|--------------------|---------------------------|------|
| background         | `#0a0a12`                 | Page canvas (near-black, violet tinted; never pure `#000`) |
| surface            | `#12121f`                 | Cards, nav, form fields, code/quote blocks |
| surface-2          | `#1a1a2e`                 | Hover states, badge fills. Final surface level: two max |
| border             | `#2a2a45`                 | 1px hairline borders everywhere |
| text-primary       | `#e8e8f0`                 | Headings, body, high-emphasis text |
| text-muted         | `#9a9ab0`                 | Secondary text, dates, meta |
| accent             | `#8f7ce6`                 | Links, icons, borders, focus, labels. AA text on background |
| accent-hover       | `#a48ff5`                 | Link hover brightening (text/icon only) |
| accent-strong      | `#7c5ce0`                 | Filled CTA background. White text passes AA on it |
| accent-glow        | `rgba(140, 122, 240, 0.28)` | Glow shadows only; max 2 usage moments (see §4) |
| success            | `#4ade80`                 | Semantic positive states only (form success, availability) |
| danger             | `#f87171`                 | Form errors only |
| grid               | `rgba(143, 124, 230, 0.04)` | Hero backdrop grid lines only |
| --ease-fluid       | `cubic-bezier(0.16, 1, 0.3, 1)` | Standard transition/reveal easing |
| --ease-snap        | `cubic-bezier(0.32, 0.72, 0, 1)` | Hover spring feel |

Rules:

- Single accent family. No second hue, no blue/orange/teal anywhere. Violet is
  the brand (skill lila-rule override: embrace, but desaturate and execute
  deliberately).
- Contrast locks (WCAG AA): text-primary on background 17:1, text-muted on
  background 7:1, accent on background 5.8:1, white on accent-strong 4.7:1.
- success and danger are semantic only; never used as decoration or on
  interactive states.
- No pure `#000` or `#fff` anywhere. No gradients over text. No oversaturated
  fills.

## 3. Typography

Three fonts via `next/font/google`, all with `latin` + `latin-ext` subsets
(Latvian diacritics), exposed as variables and mapped in `@theme`:

- Space Grotesk (`--font-display`) - all headings, hero name, logo
- Geist (`--font-sans`) - body copy
- JetBrains Mono (`--font-mono`) - labels, dates, tags, small technical text

Hierarchy:

| Level   | Font          | Size / Weight                 | Case     | Tracking      |
|---------|---------------|-------------------------------|----------|---------------|
| Hero h1 | Space Grotesk | clamp(2.75rem, 6vw, 5.5rem) / 700 | normal | -0.02em |
| h2      | Space Grotesk | clamp(2rem, 4vw, 3.25rem) / 700   | normal | -0.01em |
| h3      | Space Grotesk | 1.25rem / 600                 | normal   | normal        |
| Body    | Geist         | 1rem / 400                    | normal   | normal        |
| Small   | Geist         | 0.875rem / 400                | normal   | normal        |
| Label   | JetBrains Mono| 0.75rem / 500                 | as-is    | 0.04em        |

Rules:

- Hero headline max 2 lines at desktop; h2s short (max 8 words). Line-height:
  headings 1.05-1.15, body 1.65.
- Body paragraphs max 65ch wide (`max-w-prose` or `max-w-[65ch]`).
- Labels are not a default: mono uppercase micro-labels above every heading are
  banned (see §8 eyebrow rule). Mono is for dates, tags, email, code-adjacent
  values.
- Numbers and dates render in mono or `tabular-nums`; never fake-precise
  metrics.
- Emphasis inside a headline uses weight of the same font, never a mixed
  family.
- `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs to kill
  orphan words.

## 4. Shape, Depth & Elevation

- Radius scale (one documented system, applied everywhere):
  - interactive controls (buttons): `rounded-full` pills
  - structural surfaces (cards, images, form inputs, panels): `rounded-xl`
    (0.75rem)
  - inner elements (badges, tags, thumbnails): `rounded-full`
- Borders: 1px `border` hairlines carry all edges. Flat, border-first system.
- Shadows: two moments only, page-wide:
  1. Primary CTA hover: `0 0 24px accent-glow` plus border accent.
  2. Featured project card (first card of the pinned stack): `0 0 32px
     accent-glow`.
  Nothing else on the page glows. Hover states elsewhere are border color
  shifts + background shifts only.
- Background ambience (fixed layers, never scrolling containers):
  - Radial violet wash: fixed, top-of-page, `rgba(140, 122, 240, 0.10-0.14)`,
    pointer-events none.
  - Grid lines: hero backdrop only, opacity 0.04 max, `pointer-events-none`,
    hidden under `prefers-reduced-motion`.
  - Grain/noise (optional): fixed inset-0 overlay, `opacity-[0.03]`,
    `pointer-events-none`, z-index 40, never on scrolling content.
- Backdrop-blur only on the sticky nav and the mobile menu overlay. Never on
  scrolling containers.

## 5. Layout System

- Container: `max-w-6xl` (72rem), centered, `px-4 sm:px-6 lg:px-8`.
- Chapter rhythm: default section padding `py-32 md:py-48` (gpt-taste spacing).
  Exceptions: footer `py-8`, contact can close at `py-24 md:py-32`.
- Hero: `min-h-[100dvh]` (never `h-screen`; nav offset via
  `min-h-[calc(100dvh-4.5rem)]`).
- Grids: CSS Grid only, no flex percentage math. Asymmetric fractional units
  (`grid-cols-[7fr_5fr]`, `lg:grid-cols-12` with varied spans) are the default
  above `md:`. Mobile override: everything collapses to single column
  `w-full` below 768px, explicit in the same component.
- Section layout variety (mandatory, no family repeats):

| Section    | Composition family                                  |
|------------|-----------------------------------------------------|
| Hero       | Asymmetric split: left text block, right framed visual |
| About      | Offset editorial: prose column + facts column with offset top margin |
| Skills     | Typographic clusters: category columns of text tags, no cards, no bars |
| Experience | Vertical timeline rail (1px rail + node dots)       |
| Projects   | Featured: pinned sticky-stack (GSAP). Rest: offset asymmetric grid |
| Services   | Full-width index rows (hairline rows, icon + title + arrow) |
| Contact    | Split: large statement + form, divider between      |
| Footer     | Single minimal bar                                  |

- No 3-equal-cards rows anywhere. No two consecutive sections share a family.
- No zigzag image+text alternation beyond one instance (only the hero is a
  split; no other image+text side-by-side sections).
- Header pattern: stacked vertical (h2 on top, optional body below), never a
  left-headline/right-paragraph split header, never a floating corner
  paragraph.
- `overflow-x-hidden` guard on `<main>`.

## 6. Component Rules

### Primitives

**Button** (`ui/Button.tsx`)
- Pill: `rounded-full px-6 py-3`, min-height 44px, label one line, max 3 words.
- Primary: `bg-accent-strong text-white border border-accent-strong`; hover:
  border accent + `0 0 24px accent-glow` (glow moment 1) + `bg` unchanged
  (keeps AA); active: `scale-[0.98]`; disabled: 50% opacity, no glow.
- Ghost: transparent, `border-border text-text-primary`; hover:
  `bg-surface-2 border-accent/40`.
- Focus-visible: 2px accent ring, 2px offset.
- One contact CTA label site-wide (dict key `cta.contact`), identical wording
  in nav, hero, and contact section. No second label for the same intent.

**Badge / Tag**
- `rounded-full border border-border bg-surface-2 px-2.5 py-0.5`, mono
  0.75rem, sentence case (tech names are case-sensitive; no forced uppercase).
- Hover only when clickable: `text-accent border-accent/40`.

**SectionTitle** (`ui/SectionTitle.tsx`)
- Props: `title` + optional `body`. Render: h2 in Space Grotesk, optional body
  paragraph below (max-w-prose, muted). No index prop, no numbering, no slash
  separators, no uppercase micro-label by default.
- Eyebrow variant exists but is used per the eyebrow budget (§8): at most 2
  eyebrows page-wide, never two sections in a row.

**Section wrapper** (`ui/Section.tsx`)
- `id`, `scroll-mt-24`, chapter padding `py-32 md:py-48` (unless overridden).

**Cards** (replace GlowCard with a flat `SurfaceCard` primitive or plain
divs)
- `bg-surface border border-border rounded-xl p-6 md:p-8`.
- Hover: `border-accent/40` + optional `bg-surface-2`. No glow, no translate
  beyond 2px, no box-shadow. `motion-reduce` disables transforms.

**Monogram** (`ui/Monogram.tsx`)
- Photo placeholder + logo mark: `rounded-xl border border-accent/50
  bg-surface font-display font-bold text-accent`, no glow shadow.

**Form fields** (Contact form)
- Label above input (mono 0.75rem muted), input `bg-surface border-border
  rounded-xl px-4 py-2.5`, focus `border-accent` + 2px `accent/40` ring,
  error `border-danger` with `text-danger` message below, success panel
  `border-success/50 bg-surface` with success icon and text. Honeypot field
  stays hidden. No placeholder-as-label.

### Sections

**Nav** (`Nav.tsx`)
- Sticky, height 64-72px, `bg-background/80 backdrop-blur`, bottom hairline.
- Left: `[MK]` monogram link (accent brackets, Space Grotesk bold). Center:
  section links in Geist 0.875rem, muted to primary, active section in accent
  with accent underline; no numbers, no mono uppercase. Right: language
  toggle + one contact CTA (the single `cta.contact` label).
- Desktop: strictly one line. Mobile: logo + CTA + language toggle + hamburger;
  menu opens as full-screen overlay (`bg-background/95 backdrop-blur`) with
  staggered mask reveal of links (0.08s stagger, transform/opacity only),
  hamburger morphs to X.
- Active-section tracking: IntersectionObserver only.

**Hero** (`sections/Hero.tsx`)
- Asymmetric split: `lg:grid-cols-[7fr_5fr]`, left-aligned text block.
- Stack (max 4 text elements): availability pill (the one semantic status
  dot, success color, mono 0.75rem; counts as the hero eyebrow), h1 name (2
  lines max), role line (mono, accent), tagline (max 20 words, muted), CTAs.
  No tagline-below-CTA strip, no stats, no scroll cue, no logo wall.
- CTAs: primary contact CTA + ghost GitHub and LinkedIn (icon + label or icon
  buttons).
- Right visual: framed portrait (`rounded-xl border`, inner image
  `object-cover`, `priority` + sized when real) or Monogram fallback. Optional
  subtle offset: visual column `mt-8 lg:mt-16` for asymmetry.
- GSAP entrance: staggered fade-up (name, role, tagline, CTAs, visual),
  0.6-0.8s, `--ease-fluid`, once. See §7.

**About** (`sections/About.tsx`)
- No terminal. Offset editorial: `lg:grid-cols-12`; bio paragraphs
  `col-span-7` (max-w-prose, muted), facts column `col-span-4 col-start-9
  lg:mt-24` (offset asymmetry): 3-5 hairline rows (label mono muted + value
  primary): role, focus areas, languages (LV/EN), education. Values from
  profile + dictionaries.

**Skills** (`sections/Skills.tsx`)
- No SkillBar, no cards, no dots, no tracks. Category clusters:
  `lg:grid-cols-12`; each category is a column with a mono accent category
  label and its skills as Badge tags in a flowing wrap. Column widths vary
  (`col-span-5`, `col-span-4`, `col-span-3`) so no two columns are equal.
- Level (1-5 from DB) renders as a tier label (e.g. "core", "working",
  "familiar") in tiny mono muted text, mapped in `src/lib/` helpers with
  dictionary strings. Never as bars or dots.

**Experience** (`sections/Experience.tsx`)
- Keep the vertical rail: left 1px `border-border` rail, accent node dot per
  item, title (Space Grotesk h3), org (mono accent), period (mono muted,
  ranges joined with a hyphen and spaces: `Jan 2023 - Present`), type badge
  (Badge). Hover: row `bg-surface` optional. Max-width 65ch for descriptions.

**Projects** (`sections/Projects.tsx`)
- Featured items (`featured = true`): the single pinned setpiece (§7):
  sticky-stack cards, each `max-w-4xl`, full content card (image top 16/10
  object-cover when present, or Monogram block; title; tags; repo/live links
  in mono). First featured card may carry the glow moment 2. If no featured
  items, skip pinning entirely.
- Non-featured items: offset asymmetric grid (`lg:grid-cols-12`, alternating
  `col-span-6/col-span-5` spans with `lg:mt-16` offset on the second column),
  2 per row max, mobile single column.
- Card hover: border brightens, image `scale-105` inside `overflow-hidden`
  (0.7s `--ease-snap`), no glow.
- Card buttons/links pin to the bottom of the card (`mt-auto`) so link rows
  align.

**Services** (`sections/Services.tsx`)
- Index rows, not cards: full-width rows separated by single `border-t`
  hairlines (never border on every side). Row grid:
  `[icon 2.5rem | title + description | arrow]`; hover: `bg-surface`, title
  to accent, arrow `translate-x-1`. Icons from lucide via the existing
  `src/lib/icons.ts` mapping (DB icon names from the fixed set).

**Contact** (`sections/Contact.tsx`)
- Split: `lg:grid-cols-2` with a vertical hairline between. Left: large
  statement h2 (from dictionaries), direct email link (large, accent, mono or
  display), GitHub/LinkedIn icons. Right: the form. Submit button primary
  pill with trailing Send icon; statuses inline (error below fields, success
  panel replaces form).

**Footer** (`Footer.tsx`)
- Minimal single bar: `© year name. All rights reserved.` + GitHub/LinkedIn
  icons. No link farm, no locale strip, no version stamps, no back-to-top
  scroll cue.

## 7. Motion Language (GSAP)

Stack: `gsap` + `@gsap/react` + `gsap/ScrollTrigger` (installed in Task 11).
One helper module, `src/lib/motion.ts`:

- Registers ScrollTrigger once, exports the gsap instance, the easing tokens,
  and a `useReducedMotion()` hook (matchMedia-based).
- Z-index scale in `src/lib/z.ts`: 10 sticky nav, 20 pinned section layers,
  30 mobile menu overlay, 40 grain overlay. No other z-index values.

Rules:

- Client leaf components only: any component using GSAP is a `'use client'`
  leaf with `gsap.context(() => {...}, ref)` and `ctx.revert()` cleanup.
  Server Components render static layout only.
- Animate transform and opacity only. Never width/height/top/left/background
  position. No `will-change` spam.
- Exactly one pinned setpiece page-wide: the featured Projects sticky-stack.
  Canonical skeleton: `start: "top top"`, `pin: true`, `pinSpacing: false`
  per card except the last, incoming card scales previous to 0.92 / opacity
  0.55, scrubbed.
- At most one marquee page-wide (optional; if unused, zero).
- Staggered scroll reveals (section headings, cards, rows): ScrollTrigger
  `start: "top 85%"`, `once: true`, y 24px + opacity, 0.6s `--ease-fluid`,
  0.06s stagger. No reveals inside the pinned setpiece.
- Hover physics: CSS transitions only (`transition-transform`,
  `--ease-snap`): CTA press `scale-[0.98]`, arrow nudge `translate-x-1`,
  image `scale-105`. No JS pointer physics.
- Reduced motion (`prefers-reduced-motion`): all GSAP effects return early;
  the page renders fully static and instant; pinned stack renders as a plain
  stacked grid; grid ambience and grain hidden; smooth scroll reverts to
  auto. This is non-negotiable.
- Banned: `window.addEventListener('scroll')`, scroll position in React
  state, rAF loops touching state, parallax on content, scroll hijacking
  beyond the one pin.
- Every animation must have a one-line motivation (hierarchy, storytelling,
  feedback, or state). "It looked cool" is a removal reason.

## 8. Bans (hard list, from the design skills)

1. Numbered section prefixes of any form: index digits followed by slashes,
   dots, or separators above headings, and numbered nav labels. Banned in
   headings, eyebrows, nav, and copy. No enumeration-style labels anywhere.
2. Em-dashes and en-dashes as characters, anywhere visible: headlines, body,
   labels, buttons, alt text, quotes, dates. Hyphens only. Zero tolerance.
3. Fake terminal windows: `$` prompts, blinking cursors, fake shell output,
   div-built fake product UI. The old Terminal component is deleted.
4. Scroll cues: "Scroll", "Scroll to explore", mouse-wheel icons, arrow glyphs
   at hero bottom.
5. Locale/city/time/weather strips, build stamps, version footers.
6. Progress bars with filled background tracks and dot-level ratings (the old
   SkillBar is deleted).
7. Three-equal-cards rows and repeated card grids for different sections.
8. System-default neutral sans as the body font (the old body font is gone).
9. Pure black `#000` and pure white `#fff`.
10. Glow on every card. `accent-glow` appears at exactly two moments (§4).
11. Duplicate CTA labels per intent: one `cta.contact` label site-wide.
12. Filler verbs and AI copy cliches: Elevate, Seamless, Unleash, Next-Gen,
    Game-changer, Delve, and their Latvian equivalents.
13. Fake metrics and fake-precise numbers the brand does not claim.
14. Eyebrow overuse: max 1 eyebrow per 3 sections (2 max page-wide; hero
    counts as 1; never two consecutive sections with eyebrows).
15. More than one marquee and more than one pinned setpiece per page.
16. Split-header section headers (left headline + right explainer).
17. Zigzag image/text alternation beyond one instance.
18. Decorative status dots (only the hero availability dot, which is real
    semantic state) and middle-dot separator chains.
19. Emojis in UI, code, or copy.
20. Hardcoded hex values or user-facing strings in components.

## 9. Content & Copy Rules

- Plain, specific, active language. Sentence case for headings (no Title Case
  On Every Header).
- No exclamation marks in success/error messages. Error copy direct: "Something
  went wrong. Please try again."
- Dates joined with " - " (hyphen, spaces). No dash flourishes.
- Real data only: skill levels come from the DB, no invented percentages or
  counts.
- No placeholder copy ships: `[TODO: CONTENT]` placeholders tracked in
  CONTENT_TODO.md (AGENTS.md rule).

## 10. i18n Constraints

- Every user-facing string comes from `src/i18n/en.ts` / `lv.ts` typed
  dictionaries. No hardcoded English or Latvian in components.
- DB content renders through `_en`/`_lv` columns via `src/lib/` helpers only.
- New keys for v2: `cta.contact` (single contact label), About facts labels,
  skill tier labels, services arrow labels (or none), form strings (rewritten
  without em-dashes).
- Copy bans (§8.2, §9) apply to both locales.
- Icons: lucide-react only; service icon names stored in the DB must come from
  this set (mapping in `src/lib/icons.ts`).

## 11. Accessibility & Performance

- WCAG AA minimum: contrast locks from §2 verified per component. AAA target
  for hero copy.
- Semantic HTML: one h1 (hero name), h2 per section, `<nav>` `<main>`
  `<section>` `<footer>`, skip-to-content link, alt text on real images.
- Focus-visible: 2px accent ring, 2px offset, on every interactive element.
- Touch targets min 44px on mobile. Form labels above inputs, errors inline
  with `role="alert"`.
- `prefers-reduced-motion` collapses all motion (§7). Smooth scroll via CSS
  `scroll-behavior` with reduced-motion fallback, no JS scroll hijacking.
- Performance targets: LCP < 2.5s, CLS < 0.1, INP < 200ms; Lighthouse
  Performance ≥ 90.
  - Hero visual: `next/image` `priority`, sized, reserved space (no CLS).
  - Fonts via `next/font` variables (no external font links).
  - ISR stays: never fetch DB content at request time (`revalidate: 60`).
  - Grain only on the fixed pointer-events-none layer; backdrop-blur only on
    nav/menu; GSAP only in client leaves; no heavy WebGL.
  - All images sized; monogram fallback when `image_url` is null.

## 12. Implementation Notes for Agents

- Tokens live in `site/src/app/globals.css` `@theme` as `--color-*`,
  `--font-*`, `--ease-*` per §2/§3. Use utilities, never hex.
- Fonts swap in `site/src/app/[locale]/layout.tsx`: Space Grotesk +
  Geist + JetBrains Mono via `next/font/google` (latin + latin-ext). The old
  body font is removed everywhere including globals.css fallbacks.
- Deletions in Task 11: `ui/Terminal.tsx`, `ui/SkillBar.tsx`,
  `SectionTitle` index prop. GlowCard either replaced by a flat SurfaceCard
  or removed in favor of plain divs.
- New helpers: `src/lib/motion.ts` (§7), `src/lib/z.ts` (§7).
- z-index: only the four scale values. Grain layer is optional and fixed.
- Quick style prompt: "Build a section in the dark violet elevated style:
  `#0a0a12` canvas, `#12121f` surfaces with 1px `#2a2a45` hairlines,
  desaturated violet `#8f7ce6` accents (filled CTAs `#7c5ce0`), Space Grotesk
  headings, Geist body, JetBrains Mono labels, asymmetric composition, no
  numbering, no glow except the two allowed moments, transform/opacity motion
  with reduced-motion fallback."
