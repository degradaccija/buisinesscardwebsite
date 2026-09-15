# Task 24 — Verify consent banner in prod; close out Task 23 owner items

**Plan ref:** FIX_PLAN.md finding 7
**Depends on:** nothing (do this first — it's a verification gate, ~15 min + owner items)

## Background

> **Scope update:** this task originally shipped the then-undeployed consent build
> (`d2050c1` + `09df7cb`). A same-day follow-up session deployed both via Git
> auto-deploy and verified prod — so the deploy itself is **done**. What remains is the
> verification below and Task 23's owner-side items.

The recruiter review found the live EN cookie banner inconsistent (desktop: old
single-button "Got it"; mobile: Accept/Decline). Root cause was the review hitting the
Task-22-v1 build; consent v2 (accept/decline everywhere) has since been deployed.

## Goal

Confirm prod actually runs the consent-v2 banner identically on desktop and mobile in
both locales; if yes, tick the review punch-list item and leave only Task 23's owner
items open.

## Steps

1. Hard-refresh `https://buisinesscardwebsite.vercel.app/en` and `/lv` in a fresh
   logged-out browser (desktop **and** mobile emulation):
   - Banner must show **Accept / Decline** (EN) and **Piekritu / Noraidīt** (LV) at
     every viewport. If any surface still shows the old single-button "Got it" variant,
     push `main` and re-verify (fallback: `cd site && npx --yes vercel@latest --prod`).
2. Decline → network tab must show zero third-party/analytics requests.
3. Accept → `/ph` proxy requests flow **only after** Task 23's
   `NEXT_PUBLIC_POSTHOG_KEY` is set (owner item — see below); without it, nothing
   loads, which is still correct behavior.
4. Zero console errors on both locales (as in the review).
5. Owner items from `tasks/23-posthog-analytics.md` (unchanged, still open):
   PostHog EU account + `phc_...` key into `.env.local` and Vercel env, then the wizard
   auth step, then the accept/decline live verification.

## Acceptance Criteria

- [x] Prod verified: consent banner Accept/Decline at every viewport, both locales
      (2026-09-15: desktop + mobile emulation, `/en` Decline/Accept, `/lv`
      Noraidīt/Piekrītu; "Got it" variant gone)
- [x] (Only if verification fails) `main` pushed and re-verified READY — n/a, prod
      already ran consent v2; no push needed
- [x] Decline results in zero third-party/analytics requests (network log: 0 matching
      requests, 0 third-party domains)
- [x] No console errors on `/en` and `/lv`
- [x] Task 23 owner items resolved in `0e44b6e` ("key provisioned, consent gate
      verified in prod e2e", parallel session 2026-09-15); decline-path independently
      re-verified this task (0 third-party requests after Decline)

## Notes

- Review context: the desktop "Got it" / mobile "Decline-Accept" split was the Task-22-v1
  build observed before the consent-v2 deploy; this task only closes the loop.
- If a deploy sits in queue unusually long (happened 48 min once), check
  `npx vercel ls` before retriggering.
