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
- [x] Self-driving setup ~90% complete (2026-09-15/16): GitHub App installed
      (installation 161954787, account degradaccija), wizard workflow at
      1/9 tasks. **Blocked: account hit its weekly wizard agent-run limit**
      (burned by repeated automated runs). Resume next week with ONE run:
      `cd site && npx -y @posthog/wizard@latest self-driving --api-key
      <phx_ personal key> --project-id 275345` — GitHub step is skipped
      (already connected); remaining dialogs: issue trackers (answer
      "None of these"), scout troop, Replay Vision. No more auth prompts.

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

- **v2 (2026-09-16): adopted the wizard's consent-aware integration.**
  The wizard's detection agent read this codebase and built its
  integration on top of our consent gate (`lib/consent.ts`): client init
  in `instrumentation-client.ts` only on accepted consent, server-side
  contact events only when a consented client's distinct-id header is
  present, project-click events gated by `posthog.__loaded`, full
  `/ph` assets+array reverse proxy. Replaced my hand-rolled
  `PostHogAnalytics.tsx` (deleted). Env renamed to
  `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` (canonical `phc_` token) +
  `NEXT_PUBLIC_POSTHOG_HOST`. Fixed two strict-mode TS errors in the
  generated code. Verified in prod e2e: decline = zero requests;
  accept = config/flags/static via proxy with `phc_` token.
- Reverse proxy through `/ph` keeps analytics on the site's own domain
  (fewer ad-blocker breakages, no cross-origin third-party endpoint).
- **PostHog's new project keys use the `phs_` prefix** (older docs say
  `phc_`); they authenticate the `/batch`/ingest endpoints, are
  public-by-design, and do NOT work as personal API keys.
