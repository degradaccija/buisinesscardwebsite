# Task 27 — Project cards: honest Hermes claim, working links, public site repo

**Plan ref:** FIX_PLAN.md finding 3
**Depends on:** secrets audit (step 1, blocking) · 25 for the `live_url` domain (can
proceed without, update later)

## Background

Review findings on the Projects section:

1. The Hermes card says **"My always-on AI agent"**, but the repo's own README says the
   agent is *Hermes Agent by Nous Research* and the repo is *"my setup layer on top of
   it: sanitized configuration, custom skills, cron jobs, and service wrappers."* A
   technical hiring manager reads the site claim as inflated — damaging under an "AI
   Engineer" headline.
2. The "Case study" label on the Hermes card is a static `generic`, not a link — a
   broken promise at first click.
3. Two of three featured cards (Homelab, This Website) have **no link at all**: the
   `projects` table's `repo_url`/`live_url` are NULL for those rows, and the site's own
   GitHub repo is private (it does not appear in the public repo list).

## Goal

Every featured project card has a working link; the Hermes copy survives the
click-through test (site claim ≈ repo reality); the website's own source is public and
safe to be public.

## Steps

1. **Secrets audit (blocking, before any repo goes public):**
   - `git log -p` scan of the site repo for keys, or `gitleaks detect` over the clone.
   - `.env.local` / `supabase/.env` must be gitignored (they are) and never present in
     history blobs.
   - Independent of the audit: the keys leaked into chat exports (Supabase service
     role, Resend, Supabase PAT, notify secret) are still unrotated per session notes —
     **rotate them before publishing anything.** An audit proves git is clean; it cannot
     un-leak chat history.
2. **Make `degradaccija/buisinesscardwebsite` public:** add a README (one paragraph +
   stack list), verify no `.env*`, no seed secrets (`seed.sql` must contain only
   demo/public data), optional LICENSE.
3. **DB content updates** (production DB via SQL editor/migration **and**
   `supabase/seed.sql` kept in sync — content is build-time):
   - `projects.repo_url` → Homelab row: `https://github.com/degradaccija/hermes-homelab`;
     This Website row: `https://github.com/degradaccija/buisinesscardwebsite`;
     This Website `live_url`: `https://marciskregers.qd.je` (from Task 25).
   - **Hermes description rewrite** — draft (owner approves wording):
     - EN: `An always-on AI agent setup built on Hermes Agent (Nous Research). The
       agent core is theirs — the guardrails, custom skills, cron automations, and
       service wrappers running my home server day to day are mine. Every tool call is
       logged to SQLite, so a failed run can be replayed and inspected step by step.`
     - LV (draft, informal "tu" not needed in descriptions, "MI" term): `Vienmēr
       strādājošs MI aģenta uzstādījums uz Hermes Agent (Nous Research) bāzes. Pati
       aģenta kodola tehnoloģija ir Notre pētnieku — bet drošības robežas, pielāgotās
       prasmes, cron automatizācijas un servisu ietinēji, kas ik dienu uzrauga manu
       mājas serveri, ir mani darbi. Katrs rīka izsaukums tiek fiksēts SQLite, tāpēc
       jebkuru neveiksmīgu izpildi var atskaņot un izpētīt soli pa solim.`
       *(Fix "Notre pētnieku" → proper handling: keep "Nous Research" untranslated:
       "…uz Hermes Agent (Nous Research) bāzes. Aģenta kodols ir gatava atvērtā koda
       tehnoloģija — bet drošības robežas…")*
   - **"Case study" label:** remove the label (simplest, honest) **or** point it at the
     repo README as a link. Recommend removal until real case-study pages exist — then
     reintroduce the label as an actual link.
4. Redeploy (push to `main`); verify each card shows its links and all three resolve
   (200, logged-out browser).

## Acceptance Criteria

- [x] Secrets audit clean (2026-09-15: full `git log -p --all` pattern scan — 6 hits,
      all false positives: variable names / .example files / docs; only
      `*.env.example` files ever tracked) — **but** [ ] leaked keys rotated (owner:
      Supabase service role, Resend, Supabase management PAT, notify secret — leaked
      in chat exports, not git) before any repo goes public
- [ ] `buisinesscardwebsite` repo public with README, no secrets
- [ ] All three project cards have at least one working external link
- [ ] Hermes copy states the Nous Research base explicitly, EN + LV
- [ ] No static "Case study" label remains on a non-link element
- [ ] `seed.sql` matches production rows; lint/typecheck/build clean; deployed

## Notes

- The honest framing is *stronger*, not weaker: "I productionize and operate a
  cutting-edge open-source agent on real infrastructure" beats an inflated claim the
  first click can falsify. The 21-service homelab context does the selling.
- `image_url` assets are fine as-is (review confirmed they render well).
