# Task 03 — i18n: Locale Routing

**Spec ref:** §6

**Depends on:** Task 01

## Goal

Locale-aware routing (`/en`, `/lv`), root redirect, language toggle, and typed translation dictionaries.

## Steps

1. Create `src/i18n/en.ts`, `lv.ts`, `index.ts`:
   - `index.ts` exports `locales = ['en', 'lv']`, `defaultLocale = 'en'`, `isLocale()`, `getDictionary(locale)`, and a `Dict` type inferred from `en.ts`.
2. Add `src/middleware.ts`: redirect `/` → `/en` or `/lv` based on `NEXT_LOCALE` cookie, else `Accept-Language` starting with `lv`.
3. Create `app/[locale]/layout.tsx`:
   - `generateStaticParams()` for both locales
   - validates `locale` param (redirect to `/en` if invalid)
   - sets `<html lang>` and locale metadata
4. Add `src/components/Nav.tsx` stub with locale toggle (sets cookie, navigates to same page in other locale). Full nav design in Task 04/05.
5. Create `src/lib/locale.ts` helpers: `setLocaleCookie`, `switchLocalePath(pathname, nextLocale)`.
6. Dictionary covers nav labels + all section titles (hero, about, skills, experience, projects, services, contact) in EN and LV (real translations, not placeholders).
7. Root `app/page.tsx` can stay as redirect fallback; `app/not-found.tsx` minimal.

## Acceptance Criteria

- [ ] `/` redirects to `/en` (no cookie) and `/lv` (Accept-Language `lv`)
- [ ] `/en` and `/lv` render; invalid locale redirects to `/en`
- [ ] Toggle switches language and persists cookie `NEXT_LOCALE`
- [ ] `<html lang>` correct per locale
- [ ] UI strings come only from dictionaries (no hardcoded text in components)
- [ ] `npm run lint`, `npm run typecheck`, `npm run build` clean

## Notes

- Latvian translations should read naturally (owner reviews in Task 08).
