# Task 23 — PostHog Analytics, Consent-Gated (DONE)

**Date:** 2026-09-15
**Depends on:** Task 22 consent flow

## Goal

Add PostHog usage analytics for the owner, in the only way compatible with
this site's consent policy (see task 22 v2): PostHog loads **only after the
visitor accepts** the cookie banner. Declining or ignoring = zero PostHog
requests, zero cookies.

## Acceptance criteria

- [x] `posthog-js` installed
- [x] `PostHogAnalytics` client component (`site/src/components/PostHogAnalytics.tsx`):
      inits only when `getConsent() === "accepted"` (or after an accept
      event), never renders anything, no-ops entirely when
      `NEXT_PUBLIC_POSTHOG_KEY` is unset
- [x] EU region: events go through a same-origin reverse proxy
      (`/ph/*` → `https://eu.i.posthog.com/*` in `next.config.ts`),
      `ui_host` = `https://eu.posthog.com`
- [x] `capture_pageview: false` + manual `$pageview` on route change;
      `person_profiles: "identified_only"` (no anonymous profiles)
- [x] Banner + privacy policy copy updated EN/LV: analytics is now an
      optional, consent-based feature; "no third-party requests when
      declined" statement; PostHog added to processors
- [x] `npm run lint` / `typecheck` / `build` clean
- [x] Key provisioned (owner provided `phs_...` project key 2026-09-15):
      `site/.env.local` + Vercel env (production/preview/development),
      prod rebuild triggered via API git deploy
- [ ] Self-driving wizard step deferred: `npx @posthog/wizard@latest
      self-driving` needs ACCOUNT auth (personal key `phx_...` or browser
      OAuth). The `phs_` project key authenticates ingest only (verified:
      401 on `/api/users/@me`, 200 on `/batch`), so it cannot drive the
      wizard. Owner to run OAuth flow or provide a `phx_` key later.

## Verification (browser e2e, Brave via playwright-cli, 2026-09-15)

Local build AND production, same results:
1. Before choice: 0 `/ph` requests (of 31-33 resources), no cookies, no
   PostHog localStorage keys.
2. Click **Accept**: `/ph/array/<key>/config.js`, `/ph/.../config`,
   `/ph/flags/` fire through the same-origin proxy to PostHog EU;
   `NEXT_LOCALE` + PostHog device cookie set; `cookie-consent=accepted`
   in localStorage.
3. Reload: banner stays hidden, PostHog re-initializes (consent kept).
4. Fresh session, click **Decline**: 0 `/ph` requests, zero cookies,
   `cookie-consent=declined`, banner dismissed.

## Notes / decisions

- **Wizard used only for the PostHog-side "self-driving" step**, not for
  the SDK install: the stock wizard integration loads PostHog
  unconditionally, which would violate the site's consent gate. The
  consent-gated provider is hand-written instead.
- Reverse proxy through `/ph` keeps analytics on the site's own domain
  (fewer ad-blocker breakages, no cross-origin third-party endpoint).
- **PostHog's new project keys use the `phs_` prefix** (older docs say
  `phc_`); they authenticate the `/batch`/ingest endpoints, are
  public-by-design, and do NOT work as personal API keys.
