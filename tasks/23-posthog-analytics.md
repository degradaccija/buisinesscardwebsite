# Task 23 — PostHog Analytics, Consent-Gated (IN PROGRESS — waiting on owner key)

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
- [ ] **Owner provides PostHog project API key (`phc_...`)** from
      https://eu.posthog.com → set as `NEXT_PUBLIC_POSTHOG_KEY` in
      `site/.env.local` + Vercel project env (production + preview)
- [ ] Owner completes PostHog auth so `npx -y @posthog/wizard@latest
      self-driving` can finish (needs `--api-key phx_...` personal key or
      browser OAuth — account-level, not the phc_ project key)
- [ ] Verify live: accept → `/ph` requests flow, events in PostHog EU;
      decline → network tab shows zero third-party/analytics requests

## Notes / decisions

- **Wizard used only for the PostHog-side "self-driving" step**, not for
  the SDK install: the stock wizard integration loads PostHog
  unconditionally, which would violate the site's consent gate. The
  consent-gated provider is hand-written instead.
- Reverse proxy through `/ph` keeps analytics on the site's own domain
  (fewer ad-blocker breakages, no cross-origin third-party endpoint).
- Key absent = feature fully inert, so this ships safely before the key
  is added.
