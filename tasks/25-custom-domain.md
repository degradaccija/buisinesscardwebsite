# Task 25 — Custom domain `marciskregers.qd.je` live on Vercel

**Plan ref:** FIX_PLAN.md finding 1 (the #1 recruiter eye-catcher)
**Depends on:** nothing technical; start early (external DNS waits)
**Unblocks:** 26 (GitHub profile website link), 27 (This Website `live_url`)

## Background

The site's only address is `buisinesscardwebsite.vercel.app` — a misspelling of
"business" in the address bar of a web developer's business-card site, and no custom
domain. The domain `marciskregers.qd.je` (DigitalPlat) is already registered. A previous
session hit a Vercel TXT-verification block; the agreed fix is switching the domain's
nameservers to Vercel's. Details of that attempt: `export/domain-setup-session.md`
(gitignored).

## Goal

`https://marciskregers.qd.je` serves the site over HTTPS; the vercel.app URL redirects
to it; all generated URLs (canonical, OG, sitemap) use the new domain.

## Steps

1. **DNS at DigitalPlat:** set nameservers to `ns1.vercel-dns.com` /
   `ns2.vercel-dns.com`. Delete the leftover test A record `test.marciskregers.qd.je`.
   NS changes can take up to 24–48h to propagate (usually much faster).
2. **Vercel:** project → Settings → Domains → add `marciskregers.qd.je` (and `www` if
   desired, redirecting to apex). With Vercel nameservers the TXT verification block no
   longer applies.
3. Make the custom domain the **production domain** so
   `VERCEL_PROJECT_PRODUCTION_URL` resolves to it — `site/src/lib/metadata.ts`
   `siteBaseUrl()` builds `metadataBase`, canonicals and OG URLs from that var, so this
   step is what flips all generated URLs.
4. Trigger a redeploy (push or `cd site && npx --yes vercel@latest --prod`).
5. Verify:
   - `curl -sI https://marciskregers.qd.je/en` → 200, valid TLS cert
   - `curl -s https://marciskregers.qd.je/en | grep -o 'og:url[^>]*'` → new domain
   - `https://marciskregers.qd.je/sitemap.xml` → 200 with new-domain URLs
   - `https://buisinesscardwebsite.vercel.app` → redirects to the custom domain
6. Re-run the lighthouse/quick-load sanity check from the review (nothing should regress).

## Acceptance Criteria

- [ ] `https://marciskregers.qd.je` serves the site with a valid cert
- [ ] vercel.app production alias redirects to the custom domain
- [ ] `og:url`, canonical, and sitemap URLs use `marciskregers.qd.je`
- [ ] Old `test.marciskregers.qd.je` record gone
- [ ] Both locales verified live on the new domain

## Notes

- Keep the vercel.app project name as-is (renaming the Vercel project is churn with no
  recruiter benefit once the custom domain is primary).
- After this ships: Task 26 puts the domain on the GitHub profile, and the LinkedIn
  contact info / any CV should be updated manually by the owner.
