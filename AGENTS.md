# AGENTS.md — Working Instructions

This repo is a **personal business-card website** for Mārcis Krēgers (fullstack web developer / AI & agent engineer). Spec-driven development: the spec is the source of truth.

## Read first

- `spec.md` — full technical spec (stack, schema, design tokens, requirements)
- `DESIGN.md` — design source of truth for UI work (component styling, typography, do's & don'ts)
- `FIX_PLAN.md` — **active work queue**: recruiter-review fixes (tasks 24–30). Work these in the order below before picking up anything else.
- `tasks/` — one file per task with acceptance criteria. Work one task at a time, in order.
- `CONTENT_TODO.md` — list of placeholder content to be filled by the owner later

## Active execution order — recruiter-review fix plan (2026-09-15)

Tasks 24–30 in `tasks/` must be done **in this exact order** (rationale and dependencies in `FIX_PLAN.md`):

1. **Task 24** — verify consent banner in prod + close out Task 23 owner items (gate; ~15 min)
2. **Task 25** — custom domain `marciskregers.qd.je` (start early: external DNS wait)
3. **Task 30** — hero tagline & meta description (needs owner approval of drafted copy)
4. **Task 28** — experience timeline year rail fix
5. **Task 29** — skills: drop L1–L5 self-ratings
6. **Task 27** — project credibility: secrets audit + key rotation **first** (hard blocker), then publish site repo, fix project links, rewrite Hermes copy
7. **Task 26** — GitHub profile (last: needs the domain from 25 and the public repo from 27)

Do not skip ahead, do not reorder. Task 27 may not publish any repo before the secrets
audit passes **and** the leaked keys (Supabase service role, Resend, management PAT,
notify secret) are rotated. One task at a time; finish a task (acceptance criteria +
deploy) before starting the next.

## Rules

1. **Follow the spec.** If a decision isn't covered, make the simplest choice consistent with it and note it in the task file.
2. **Work task by task.** Do not jump ahead. Mark acceptance criteria as done in the task file.
3. **Never commit placeholders silently.** Placeholder text uses `[TODO: CONTENT]` and is tracked in `CONTENT_TODO.md`.
4. **Secrets never go in code or commits.** Use `.env.local` (gitignored), Vercel env vars, or `supabase secrets set`.
5. **No comments in code unless genuinely non-obvious.**
6. **Bilingual content everywhere:** DB rows have `_en`/`_lv` columns; UI strings live in `src/i18n/` dictionaries. Never hardcode user-facing English or Latvian strings in components.
7. **TypeScript strict mode.** Run `npm run lint` and `npm run typecheck` before declaring a task done.

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS 4 — app in `site/`
- Supabase (Postgres, free tier) as CMS: content tables + `contact_messages`
- Resend + Supabase Edge Function for contact email notifications
- Deployed on Vercel free tier

## Commands (run inside `site/`)

```bash
npm run dev          # dev server http://localhost:3000
npm run build        # production build
npm run lint         # eslint
npm run typecheck    # tsc --noEmit
```

Supabase (requires Supabase CLI):

```bash
supabase db push            # apply migrations (run from repo root; needs linked project)
supabase functions deploy contact-notify
supabase secrets set --env-file supabase/.env  # edge function secrets
```

## Directory layout

```
spec.md            tech spec (source of truth)
AGENTS.md          this file
FIX_PLAN.md        active work queue: recruiter-review fixes (tasks 24–30)
CONTENT_TODO.md    placeholder content checklist
tasks/             task files (01..30)
supabase/          migrations, seeds, edge functions
site/              Next.js app
```

## Conventions

- Routes: `/[locale]` only; `/` redirects by language preference (cookie `NEXT_LOCALE`, then Accept-Language).
- Data access only via `site/src/lib/` helpers (no direct Supabase calls in components).
- ISR: `revalidate: 60` for the page; never fetch DB content at request time.
- Styling: Tailwind utility classes + design tokens in `src/app/globals.css` `@theme` block matching spec §7 (Tailwind 4 CSS-first config; no tailwind.config file).
- Icons: one fixed icon set (lucide-react), icon names for services stored in DB must come from this set.

## When a task is done

- All acceptance criteria pass
- `npm run lint` and `npm run typecheck` clean
- `npm run build` succeeds
- Task file updated with `[x]` checkboxes and notes
- If the task involved content/DB: seed data present in `supabase/seed.sql`
