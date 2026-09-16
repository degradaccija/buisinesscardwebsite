# Task 25 — Custom domain live on Vercel

**Plan ref:** FIX_PLAN.md finding 1 (the #1 recruiter eye-catcher)
**Depends on:** nothing technical; owner registers the domain (2 min)
**Unblocks:** 26 (GitHub profile website link), 27 (This Website `live_url`)

## Route change (2026-09-16): qd.je → marciskregers.dpdns.org

`marciskregers.qd.je` is **abandoned**: DigitalPlat's panel never applied the NS
delegation to `ns1/ns2.vercel-dns.com` (repeated submits left the parent delegation
empty), and even working DNS would not have satisfied Vercel — `qd.je` is not on the
Public Suffix List, so Vercel demanded an ownership TXT at `_vercel.qd.je` (the parent
zone DigitalPlat controls). Cloudflare-for-qd.je was evaluated and rejected for the
same two reasons.

New domain: **`marciskregers.dpdns.org`** — `dpdns.org` IS on the PSL, so Vercel treats it as a
registrable domain. Added to the Vercel project 2026-09-16: **verified true
immediately, no TXT challenge**.

## Remaining steps

1. **Owner:** register `marciskregers.dpdns.org` in the DigitalPlat dashboard
   (Register Domain → free), then in its DNS records add:
   - `A` `@` → `216.198.79.1`
   - `A` `@` → `64.29.17.1`
   - `CNAME` `www` → `cname.vercel-dns.com`
2. Vercel verification: TXT challenge at `_vercel.marciskregers.dpdns.org` =
   `vc-domain-verify=marciskregers.dpdns.org,9efe564cb6c64207cda6` (owner adds it
   alongside the A records; Vercel auto-rechecks). Then poll DNS → HTTPS 200 + valid
   cert on `https://marciskregers.dpdns.org/en`.
3. 308 the old alias: PATCH project domain `buisinesscardwebsite.vercel.app` with
   `{"redirect":"marciskregers.dpdns.org","redirectStatusCode":308}`.
4. Canonical/og flip: if og:url still shows vercel.app (VERCEL_PROJECT_PRODUCTION_URL
   preference), set `NEXT_PUBLIC_SITE_URL=https://marciskregers.dpdns.org` (Vercel CLI
   env rm/add, production+preview) AND reorder `siteBaseUrl()` in
   `site/src/lib/metadata.ts` to check `NEXT_PUBLIC_SITE_URL` first; lint/typecheck/
   build, commit, push (git auto-deploy; never `vercel --prod` from the tree).
5. Flip This Website `live_url` to `https://marciskregers.dpdns.org` (prod DB PATCH +
   `supabase/seed.sql` sync) and redeploy.
6. Verify: /en + /lv 200 on the new domain; vercel.app 308s; sitemap lists dpdns.org URLs.
7. Update external references (task 26 GitHub link; owner: LinkedIn).

## Acceptance Criteria

- [x] `https://marciskregers.dpdns.org` serves the site with a valid cert
      (2026-09-16: HTTP/2 200, both locales)
- [x] vercel.app production alias 308-redirects to the new domain
      (https://buisinesscardwebsite.vercel.app/en -> 308 -> dpdns.org/en)
- [x] `og:url`, canonical, and sitemap URLs use `marciskregers.dpdns.org`
      (og:url live-verified; sitemap lists 12 dpdns.org URLs; NEXT_PUBLIC_SITE_URL env
      set + siteBaseUrl() reordered to prefer it — commit 5b5554e)
- [x] Both locales verified live on the new domain

## Post-mortem note

Vercel never re-ran the verification on its own (3+ hours with correct TXT + A).
Undocumented trigger `POST /v9/projects/{id}/domains/{domain}/verify` forces an
immediate recheck WITHOUT rotating the challenge code (delete+re-add rotates it every
time — that cost one TXT round-trip). Also: Vercel env API 403s with the CLI token but
CLI `vercel env add/rm` works.

## Notes

- Keep the vercel.app project name as-is (renaming the Vercel project is churn with no
  recruiter benefit once the custom domain is primary).
- `qd.je` remains registered until Aug 2027; it can be left to lapse or repurposed
  later. The old qd.je Vercel domain attachment can be removed for tidiness.
- Automation `Every 30 min: check marciskregers.dpdns.org DNS, finish Vercel domain
  (Task 25)` completes steps 2–7 and self-deletes when done.

- After this ships: Task 26 puts the domain on the GitHub profile, and the LinkedIn
  contact info / any CV should be updated manually by the owner.
