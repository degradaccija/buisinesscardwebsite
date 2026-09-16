# Mārcis Krēgers — business card site

Bilingual (EN/LV) personal site for a fullstack web developer & AI-agent engineer:
[marciskregers.qd.je](https://marciskregers.qd.je) (interim: [buisinesscardwebsite.vercel.app](https://buisinesscardwebsite.vercel.app)).

## Stack

- [Next.js](https://nextjs.org) 16 (App Router) + TypeScript strict + Tailwind CSS 4 (CSS-first `@theme` tokens)
- [Supabase](https://supabase.com) (Postgres) as the CMS — all page content lives in `_en`/`_lv` columns and is read **at build time**, so the page ships as static HTML (ISR revalidate 60)
- Consent-gated [PostHog](https://posthog.com) analytics (EU-hosted, same-origin `/ph` proxy, inits only after banner Accept)
- Resend + Supabase Edge Function for contact-form notifications
- Deployed on Vercel (push-to-deploy from `main`)

## Structure

```
site/       Next.js app (src/app routes, src/components, src/i18n, src/lib data helpers)
supabase/   migrations, seed.sql (content snapshot), functions/contact-notify
tasks/      spec-driven task files with acceptance criteria
spec.md     technical spec (source of truth)
```

## Develop

```bash
cd site
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint && npm run typecheck
```

Requires `site/.env.local` with `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (see `site/.env.local.example`).

## Notes

- Routes are `/[locale]` only; `/` redirects by cookie then Accept-Language.
- No secrets are committed: env files are gitignored; the repo history is clean by audit.
