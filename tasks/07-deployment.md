# Task 07 — Deployment

**Spec ref:** §1, §4, §10

**Depends on:** Tasks 01–06

## Goal

Ship to Vercel with all services connected and verified end-to-end.

## Steps

1. Pre-deploy cleanup:
   - remove temporary `/styleguide` route
   - confirm no secrets in repo (`grep -r "SERVICE_ROLE\|RESEND_API_KEY" --exclude-dir=node_modules`)
2. Push to GitHub repo (owner creates it if needed) and import into Vercel (free tier).
3. Configure Vercel env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
4. Apply Supabase migrations + seed to production project (`supabase db push`, run `seed.sql`) and deploy `contact-notify` function with secrets.
5. Verify production:
   - `/` redirects correctly; `/en` + `/lv` render
   - language toggle works
   - contact form: submit → row appears in Supabase → email received
   - ISR: change a DB value → visible on site within ~60s
6. Update `CONTENT_TODO.md` with "live site URL" and any remaining owner setup items.

## Acceptance Criteria

- [ ] Live URL on Vercel works, both locales
- [ ] Env vars set in Vercel (never in code)
- [ ] Contact form verified end-to-end on production
- [ ] Email notification received
- [ ] No secrets in git history
- [ ] `CONTENT_TODO.md` updated with live URL

## Notes

- Keep the free `*.vercel.app` subdomain; custom domain later if desired.
- If GitHub repo doesn't exist yet, pause and ask owner.
