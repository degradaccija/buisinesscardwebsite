# Task 01 — Project Setup

**Spec ref:** §3, §10
**Depends on:** nothing

## Goal

Scaffold the Next.js app in `site/`, wire up Tailwind, tooling, and env files so later
tasks have a working dev environment.

## Steps

1. Create `site/` via `create-next-app` (TypeScript, ESLint, Tailwind, App Router, src dir).
2. Add dev dependencies: `zod`, `@supabase/supabase-js`.
3. Configure `tailwind.config.ts` with design tokens from spec §7 (colors, fonts).
4. Add `next/font/google` fonts: Space Grotesk, Inter, JetBrains Mono.
5. Create `site/.env.local.example` with all vars from spec §10 (values blank).
   Create `site/.env.local` (gitignored) for dev.
6. Init git repo at repo root with `.gitignore` (node_modules, .env*, .next).
7. Add npm scripts: `typecheck` (`tsc --noEmit`).
8. Create minimal `/[locale]` route stub so `npm run dev` renders something.
9. Document required secrets (Supabase project URL/keys, Resend API key) in `CONTENT_TODO.md` → "setup checklist" section, so the owner can create the accounts.

## Acceptance Criteria

- [x] `npm run dev` serves the app on :3000
- [x] `npm run lint` clean
- [x] `npm run typecheck` clean
- [x] `npm run build` succeeds
- [x] Tailwind theme tokens defined per spec §7 (purple accent, dark surfaces)
- [x] `.env.local` gitignored; `.env.local.example` committed
- [x] Git repo initialized at root with initial commit

## Notes

- Owner will need to create: Supabase project, Resend account (free), Vercel project.
  Capture their URLs/keys in `.env.local` (never committed).
- Deviations from original spec (agreed): `create-next-app` scaffolded **Next.js 16.3.3**
  + **Tailwind CSS 4** (CSS-first `@theme` tokens, no `tailwind.config.ts`). Spec §3/§7
  and AGENTS.md updated accordingly. `lucide-react` also installed here (Task 04 needs it).
- Initial `npm install` was interrupted, corrupting `@next/swc-darwin-arm64`;
  fixed by reinstalling that package. Build now passes with Turbopack.
- `next dev` smoke test: `/en` 200, `/lv` 200, `/` 307.
