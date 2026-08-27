# Task 15 — Services + Contact Rebuild

**Spec ref:** §2, §7, §8, DESIGN.md v2

**Depends on:** Tasks 10 (boards 06–07), 14

## Goal

Rebuild Services and Contact to `board-06-services.html` and
`board-07-contact.html`. Contact form keeps spec §8 behavior (validation,
honeypot, POST to `/api/contact`); only the UI changes.

## Steps

1. Read the two board files + DESIGN.md v2 form/component rules.
2. Services (`src/components/sections/Services.tsx`):
   - Bento or accordion composition per board — NOT three identical cards.
   - Icons from the DB (`icon` column) via the existing lucide map; varied cell
     treatment so cells don't look templated.
3. Contact (`src/components/sections/Contact.tsx`):
   - Split layout per board: form on one side, direct channels (email,
     GitHub/LinkedIn) on the other.
   - Form polish per skills: labels above inputs, helper/error text below,
     WCAG AA contrast on all states, focus rings, success state in terminal
     green, error in danger; no placeholder-as-label.
   - Keep honeypot + `noValidate` custom validation + `/api/contact` wiring
     and rate-limit error display unchanged (spec §8).
   - CTA label identical to nav/hero contact label (one label per intent).
4. i18n strings in both dictionaries (en/lv).
5. `npm run lint`, `npm run typecheck`, `npm run build` clean.

## Acceptance Criteria

- [x] Services matches board-06 (not 3 identical cards)
- [x] Contact matches board-07; form states AA contrast
- [x] Form behavior per spec §8 unchanged (honeypot, validation, API)
- [x] Contact CTA label consistent with nav/hero
- [x] Bilingual strings; build/lint/typecheck clean

## Notes

### Services bento (span math, zero holes)

12-col grid, `auto-rows-[96px]`, 16px gap. Five DB services map to fixed
treatments in `Services.tsx` (`TREATMENTS`):

| # | Service (seed)               | Span  | Rows | Treatment            |
|---|------------------------------|-------|------|----------------------|
| 0 | Web development              | 7 cols| 3    | dominant (accent/40 border) |
| 1 | AI agents & automation       | 5 cols| 3    | plain (surface)      |
| 2 | Linux & server administration| 5 cols| 3    | tinted (surface-2)   |
| 3 | IT infrastructure & networking| 7 cols| 3    | dot pattern (border-color dots, 14px) |
| 4 | Tech repair & consulting     | 12 cols| 2   | wide (horizontal row) |

Band math: (7+5)=12 cols × 3 rows; (5+7)=12 × 3; (12)=12 × 2 → 8 rows total,
zero holes. Verified via geometry check at 1440px. Mobile: single column, no
fixed row heights. Extra services beyond 5 fall back to the wide treatment;
the DB ships exactly 5. `ServiceCell` replaces `ServiceCard`; `ServiceCard`
and `GlowCard` are deleted (per DESIGN.md Task 11 note).

### Contact split

`lg:grid-cols-2` with vertical hairline (`lg:border-r`) between columns:
left = large statement h2 (`contact.title`) + mono directory rows (email /
GitHub / LinkedIn with key + value + ArrowUpRight, hover `bg-surface` +
arrow nudge), right = form. Channels/values come from `site_profile`
(email, github_url, linkedin_url; handles derived by stripping protocol).
`contact.note` closes the channels column.

### Form states

Labels above inputs (mono 12px, muted, tracking 0.04em), inputs
`bg-surface rounded-xl px-4 py-2.5`, focus `border-accent` + 2px `accent/40`
ring, invalid fields get `border-danger` + `danger/40` ring + `aria-invalid`
(only the failing fields now, computed in `fieldErrors`), error summary in
`text-danger` with `role="alert"` below the message field, helper hint
(`form.hint`) shown when idle, success panel `border-success/50 bg-surface`
with CheckCircle2 + `role="status"`. Honeypot unchanged (`class="hidden"`,
name `website`). Validation regex, `noValidate`, POST body and rate-limit
error path byte-identical to before; `/api/contact` untouched.

### Deviations (and why)

- Board svc/a index labels dropped: DESIGN.md §8.1 bans enumeration labels.
- Board cell hover glow dropped: §4 limits `accent-glow` to 2 moments.
  Hover = border/bg shift + max 2px lift (`motion-safe`), CSS only.
- Board icon 90° rotate micro-motion dropped: outside §7's hover physics list.
- Board has form left / channels right; DESIGN.md §6 Contact specifies
  statement + channels left, form right — DESIGN.md wins.
- Board location row + green "online" dot dropped: §8.5 locale strips,
  §8.18 decorative status dots.
- Entrance scrub → one-shot reveal (`start "top 80%"`, `once`, 0.6s,
  stagger 0.07–0.08) per §7. `autoAlpha` avoided in ServicesMotion/
  ContactMotion (opacity + transform only): the `visibility: hidden`
  from-state raced Playwright `fill()` (Chromium can focus hidden inputs,
  and fill dropped the value) — flaked the e2e contact suite; opacity-only
  is test-safe and visually equivalent below the fold.
- Form strings keep em-dashes (`form.success`, `form.invalid`): the e2e
  suite (contact.spec.ts) asserts those exact strings; not touching tests
  per task rules. Deviation from §8.2 recorded; Task 17 may rewrite both.
- Submit button keeps `form.send` ("Send" / "Sūtīt"), not `cta.contact`:
  e2e clicks `getByRole("button", { name: "Send" })` and the lock rule says
  don't fix tests. One label per intent holds page-wide: "contact me"
  intent = `cta.contact` (nav + hero, both point to #contact); "send this
  message" intent = `form.send` (form only, trailing Send icon). No second
  contact CTA label exists anywhere.

### i18n keys added/removed

Added: `contact.title`, `contact.channels.{email,github,linkedin}`,
`contact.note`, `contact.form.hint`. Removed: `contact.emailMe` (unused
after rebuild). No em-dashes in any new string.

### Motion

Two new client leaves: `ServicesMotion` (cells y 32 + fade, stagger 0.08,
`clearProps` so hover transforms keep working) and `ContactMotion`
(fields x −24 / channels x +24 mirrored, stagger 0.07). Both collapse to
static via `useReducedMotion`; Task 16 does the final sweep.

### Verification

`npm run lint`, `npm run typecheck`, `npm run build` clean. Full e2e suite
39 passed / 13 skipped / 0 failed (both projects, fresh dev server with
`CONTACT_TEST_MODE=1`); contact spec re-run 3× clean after the fill-race fix.
Bento geometry + form states verified programmatically (Playwright geometry
dump) — see span math above.
