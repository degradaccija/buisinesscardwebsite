# Task 22 — Cookie Notice + GDPR Compliance (DONE)

**Date:** 2026-09-15

## Goal

Make the site GDPR-compliant for its actual data footprint: one functional
cookie (`NEXT_LOCALE`), contact-form personal data in Supabase, and three
processors (Vercel, Supabase, Resend). No consent-management circus — the
site sets no tracking, analytics, or marketing cookies, so the notice is
informational with a dismiss action, not an opt-in gate.

## Acceptance criteria

- [x] Cookie notice banner, bilingual, dismissible; dismissal persisted in
      `localStorage` (`cookie-notice-dismissed`) — `site/src/components/CookieNotice.tsx`,
      mounted in `[locale]/layout.tsx`
- [x] Privacy policy page at `/en/privacy` and `/lv/privacy` — static,
      bilingual, own metadata + hreflang (`site/src/app/[locale]/privacy/page.tsx`)
- [x] Policy covers: controller identity, contact-form data + legal bases
      (GDPR Art. 6(1)(b)/(f)), transient IP rate-limiting, the language
      cookie, hosting logs, no-tracking statement, processors, retention,
      data-subject rights + Datu valsts inspekcija complaint right
- [x] Footer links to the privacy page (both locales)
- [x] Contact form shows a short storage notice + privacy link under the
      submit button (Art. 13 at point of collection)
- [x] Privacy pages added to `sitemap.ts`
- [x] All copy in `src/i18n/en.ts` / `lv.ts` (zero hardcoded strings)
- [x] `npm run lint`, `npm run typecheck`, `npm run build` clean

## Notes / decisions

- **v2 (2026-09-15, owner request): real Accept/Decline consent.** The
  initial informational-only banner was replaced after the owner flagged
  legal-risk concerns. The language cookie is now stored **only after the
  visitor accepts**; declining (or ignoring) stores nothing, and declining
  actively expires any previously set `NEXT_LOCALE` cookie. The language
  toggle still works via URL routing without the cookie — it just stops
  persisting across visits. Consent state itself lives in `localStorage`
  (`cookie-consent`), not in a cookie. Policy text updated to match.
  Rationale: the strictly-necessary exemption arguably covered a
  language-only cookie, but an explicit opt-in is the safe interpretation.

- **No accept/reject cookie dialog:** the only cookie is functional
  (`NEXT_LOCALE` language preference, no identifier), exempt from consent
  under the ePrivacy "strictly necessary/functional" carve-out. A fake
  accept-all gate would be misleading. The notice states what is used and
  links to the full policy.
- **Dismissal in `localStorage`, not a cookie:** avoids creating a second
  cookie to track the first. If storage is blocked (private mode), the
  banner simply reappears.
- **Processor safeguards phrased generically** ("each under a data
  processing agreement"): Vercel/Supabase/Resend all offer DPAs; exact
  hosting region not asserted in copy.
- **`export/` added to root `.gitignore`** — session logs there contain
  live secrets (Supabase service-role key, Resend key, management PAT,
  notify secret). Never commit that folder; consider rotating those keys
  since they were pasted into chat history during earlier sessions.
