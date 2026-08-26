# DESIGN.md — Mārcis Krēgers · Personal Business-Card Website

A terminal-flavored, dark techy single-page design system with violet accents.
This file is the source of truth for how the UI should look and feel. Coding
agents building or editing UI must follow it.

## 1. Visual Theme & Atmosphere

- **Mood**: developer terminal meets polished portfolio — dark, precise, techy,
  slightly playful (`$` prompts), never gimmicky.
- **Density**: airy hero and about, tighter density in skills/timeline. Generous
  whitespace; sections separated by thin borders, not heavy dividers.
- **Philosophy**: everything looks like a well-tuned dev setup — monospace
  labels, numbered section headers (`01. // about`), purple glow as the single
  source of color energy, terminal green used only as decorative flair.

## 2. Color Palette & Roles

| Token           | Value                  | Role                                        |
|-----------------|------------------------|---------------------------------------------|
| background      | `#0a0a12`              | Page canvas (near black)                    |
| surface         | `#12121f`              | Cards, nav, form fields                     |
| surface-2       | `#1a1a2e`              | Elevated surface, hover states, code blocks |
| border          | `#2a2a45`              | 1px hairline borders                        |
| text-primary    | `#e8e8f0`              | Headings, body, high-emphasis text          |
| text-muted      | `#9a9ab0`              | Secondary text, labels, meta                |
| accent          | `#8b5cf6` (violet-500) | Primary CTA, links, active states, focus    |
| accent-hover    | `#a78bfa` (violet-400) | Hover/focus brightening                     |
| accent-glow     | `rgba(139,92,246,0.35)`| Glow shadows, gradient stops               |
| terminal-green  | `#4ade80`              | Decorative flair only (`$` prompts, status) |

Rules:
- Never introduce new hues. Violet is the only accent family.
- Terminal green must not be used for interactive states or CTAs.
- Text on `background` must meet WCAG AA: primary `#e8e8f0` (17:1), muted
  `#9a9ab0` (7:1).

## 3. Typography Rules

Three fonts via `next/font/google` (variables exposed in `@theme`):

- **Space Grotesk** (`--font-display`) — all headings, hero name, logo
- **Inter** (`--font-sans`) — body copy
- **JetBrains Mono** (`--font-mono`) — terminal prefixes, code, tags, labels

Hierarchy:

| Level | Font                   | Size / Weight            | Case            | Tracking        |
|-------|------------------------|--------------------------|-----------------|-----------------|
| Hero  | Space Grotesk          | clamp(2.5rem–4.5rem) / 700 | normal        | tight           |
| h2    | Space Grotesk          | clamp(1.5rem–2.25rem) / 700 | normal      | normal          |
| h3    | Space Grotesk          | 1.125rem / 600           | normal          | normal          |
| Body  | Inter                  | 1rem / 400               | normal          | normal          |
| Small | Inter                  | 0.875rem / 400           | normal          | normal          |
| Label | JetBrains Mono         | 0.75rem / 500            | uppercase       | 0.05em          |

- Section titles: monospace prefix in accent, e.g. `01. // about`, then the
  human title in Space Grotesk.
- Line-height: body 1.6–1.7, headings 1.1–1.2.

## 4. Component Stylings

All radii `rounded-lg` (0.5rem) unless noted. All borders 1px `border`.

**Buttons**
- Primary: `bg-accent text-white`, hover `bg-accent-hover` + accent glow shadow,
  focus-visible 2px accent ring offset 2px.
- Secondary: transparent, 1px border `border`, text-primary; hover
  `bg-surface-2 border-accent/40`.
- Size: py-2 px-5, font-medium, rounded-lg.

**Cards (GlowCard, ProjectCard, ServiceCard)**
- `bg-surface`, 1px `border`, rounded-lg.
- Hover: translate-y(-2px), border brightens toward accent, soft accent-glow
  shadow. Respect `prefers-reduced-motion` (no translate then).

**Terminal (decorative)**
- `bg-surface` (or background with border), rounded-lg, header row with three
  8px dots (border/neutral, not traffic-light colors), body in JetBrains Mono.
- Prompts start with `$` in terminal-green; output text-muted; cursor block
  blinking accent. Text content never depends on animation.

**Nav**
- Sticky top, `bg-background/80` + backdrop-blur, bottom hairline border.
- Logo: "MK" monogram in Space Grotesk bold with accent bracket styling.
- Links: text-muted → text-primary + accent underline on hover; active section
  link in accent.

**SkillBar**
- Track `bg-surface-2` rounded-full; fill gradient accent → accent-hover;
  level dots 1–5, active dots accent.

**TimelineItem**
- Left rail 1px border with accent node dot; title + org in primary, dates in
  mono/muted. `type` badge ('work' | 'education') as mono uppercase tag.

**Forms (ContactForm)**
- Inputs/textareas: `bg-surface`, 1px border, rounded-lg, focus border-accent +
  accent ring. Labels mono uppercase 0.75rem muted. Error text: `#f87171`
  (red-400) with matching border; success state in terminal-green.

**Tags/Badges**
- Mono 0.75rem uppercase, 1px border, `bg-surface-2`, rounded-full, muted →
  accent text on hover (when clickable).

## 5. Layout Principles

- Max content width ~72rem (max-w-5xl/6xl), centered, px-4 sm:px-6 lg:px-8.
- Section vertical padding ~6rem (py-24); rhythm uses 8px base spacing scale
  (Tailwind default).
- Single column flow; cards in grids: 1 col mobile → 2 col md → 3 col lg
  (projects/services), skills 2-col.
- Section IDs used for sticky-nav anchor links; smooth scroll with
  reduced-motion fallback (CSS `scroll-behavior`, no JS scroll hijacking).
- Subtle purple grid background: faint radial gradient + grid lines using
  accent at very low opacity (≤ 0.05), never interfering with text contrast.

## 6. Depth & Elevation

- Flat, border-first system: elevation is expressed with borders + subtle
  shadows, not heavy drop shadows.
- Only two shadow levels:
  1. Rest: none (borders carry the edges).
  2. Hover/glow: `0 0 24px accent-glow` for CTA hover, `0 0 32px accent-glow`
     for featured cards.
- No overlays darker than `background`; no blur except nav backdrop.

## 7. Do's and Don'ts

Do:
- Use numbered mono section prefixes (`01. // about`).
- Keep 1px hairlines in `border` everywhere cards/inputs appear.
- Use violet for every interactive accent; one accent family only.
- Put decorative terminal snippets in JetBrains Mono with `$` prompts.
- Keep semantic HTML: one h1 (hero name), h2 sections, alt text, skip link.

Don't:
- Don't introduce other accent colors (no blue/orange/red CTAs).
- Don't use gradients over text or busy multicolor gradients; at most a
  subtle violet radial glow in backgrounds.
- Don't use pure black `#000` or pure white `#fff` surfaces.
- Don't round beyond rounded-lg for structural components (rounded-full only
  for pills/badges).
- Don't animate without a `prefers-reduced-motion` fallback.
- Don't hardcode UI strings in components — use `src/i18n/` dictionaries (en/lv).

## 8. Responsive Behavior

- Mobile-first, 360px minimum; breakpoints Tailwind default (sm 640, md 768,
  lg 1024).
- Grids collapse 3→2→1; nav collapses to compact bar (links hide, keep logo +
  language toggle + contact CTA).
- Touch targets ≥ 44px on mobile.
- Typography fluid via `clamp()` for hero and section titles; no layout shift.

## 9. Agent Prompt Guide

- Implementation: Next.js 16 App Router + TypeScript + Tailwind CSS 4. Tokens
  live in `site/src/app/globals.css` `@theme` as
  `--color-background`, `--color-accent`, `--font-display`, etc. — use
  utilities like `bg-background`, `text-text-muted`, `font-display`, never
  hardcode hex values in components.
- Dark techy theme; violet `#8b5cf6` accent; Space Grotesk headings,
  Inter body, JetBrains Mono accents; terminal motif with `$` prompts.
- Bilingual (en/lv): all user-facing strings from `site/src/i18n/`; DB content
  via `_en`/`_lv` columns through `site/src/lib/` helpers only.
- Icons: lucide-react only.
- Quick style prompt: "Build a section in the terminal-flavored dark techy
  style: near-black `#0a0a12` canvas, `#12121f` surfaces with 1px `#2a2a45`
  borders, violet `#8b5cf6` accents and glow on hover, mono uppercase labels,
  section header like `01. // about`."
