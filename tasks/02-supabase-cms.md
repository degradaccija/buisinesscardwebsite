# Task 02 — Supabase CMS: Schema + Seed

**Spec ref:** §5
**Depends on:** Task 01

## Goal

Create the Supabase schema (migrations + seed) so content lives in the DB per spec §5.

## Steps

1. Init `supabase/` directory layout: `migrations/`, `seed.sql`, `functions/contact-notify/` (function itself is Task 06).
2. Write migration `0001_init.sql`: all tables from spec §5 with exact columns, UUID defaults, enums as `text` + checks where sensible.
3. Enable RLS:
   - content tables: public SELECT
   - `contact_messages`: public INSERT only
4. Write `seed.sql` with:
   - `site_profile` row (real data: name, roles EN/LV, email placeholder, GitHub/LinkedIn placeholder `[TODO: CONTENT]`, photo_url `[TODO: CONTENT]`)
   - skills rows (realistic set grouped: Frontend, Backend, DevOps/Linux, AI/Agents — levels by owner later)
   - experience rows (education: Jelgava vocational school — datorsistēmu tehniķis; work history placeholder rows marked `[TODO: CONTENT]`)
   - projects: 3 placeholder rows with `[TODO: CONTENT]` descriptions
   - services: 4–6 rows (web dev, AI agents, Linux/admin, repair-ish consulting)
5. Create `site/src/lib/supabase/` clients: `client.ts` (anon, browser), `server.ts` (service role, server-only), `content.ts` (typed fetch helpers for each content table, `force-cache`, revalidate 60).
6. Create `site/src/lib/types.ts` with TS types matching tables.
7. Try applying migration to the owner's linked Supabase project if available (`supabase db push`); otherwise document the SQL copy-paste path in `CONTENT_TODO.md` "setup checklist".
8. Update `CONTENT_TODO.md` with every `[TODO: CONTENT]` item added.

## Acceptance Criteria

- [ ] Migration creates all 6 tables per spec §5 (columns, types)
- [ ] RLS policies match spec §5
- [ ] `seed.sql` inserts profile, skills, experience, projects, services (bilingual `_en`/`_lv`)
- [ ] `src/lib/types.ts` + `content.ts` typed helpers compile
- [ ] `npm run lint`, `npm run typecheck`, `npm run build` clean
- [ ] `CONTENT_TODO.md` lists all placeholders
- [ ] If owner provided Supabase creds: schema applied and seed loaded successfully (verify via dashboard)

## Notes

- If Supabase CLI project link isn't available yet, keep migration + seed ready; applying them becomes part of Task 07 deploy checklist.
