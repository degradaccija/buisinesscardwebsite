# Spec: Personal Business-Card Website — Mārcis Krēgers

Version: 1.0
Status: Approved
Last updated: 2026-08-26

## 1. Goal

A single-page "digital business card" website for **Mārcis Krēgers**, fullstack web developer
and AI/agent engineer, to show to potential freelance clients and employers.

Non-functional goals:

- Runs entirely on free tiers (Vercel, Supabase, Resend).
- Content is editable without touching code (Supabase dashboard = CMS).
- Bilingual: English + Latvian.
- Fast, responsive, accessible, dark & techy with purple accents.

## 2. Persona & Content

### Persona

- Name: Mārcis Krēgers
- Role: Fullstack Web Developer / AI & Agent Engineer
- Background: Linux expert; hardware & tech repair hobby
- Education: Jelgava vocational school — "Datorsistēmu tehniķis" / system administrator
- Links: GitHub, LinkedIn
- Photo: yes (to be provided later; placeholder until then)

### Sections (single page, smooth scroll)

1. **Hero** — name, role, tagline, primary CTA (contact), quick links (GitHub/LinkedIn)
2. **About** — short bio, photo, facts panel (no fake terminal)
3. **Skills** — grouped by category, with level indicator
4. **Experience / CV** — work history + education, timeline layout
5. **Projects** — cards with title, description, tags, repo/live links
6. **Services** — what he offers to freelance clients
7. **Contact** — contact form + email/social links

## 3. Tech Stack

| Layer      | Choice                                        | Free tier                     |
|------------|-----------------------------------------------|-------------------------------|
| Framework  | Next.js 16 (App Router), React 19, TypeScript | —                            |
| Styling    | Tailwind CSS 4 (CSS-first config via @theme)  | —                             |
| Motion     | GSAP + @gsap/react + ScrollTrigger            | —                             |
| Hosting    | Vercel                                        | Hobby plan                    |
| CMS / DB   | Supabase (Postgres)                           | 500 MB DB, generous limits    |
| Email      | Resend + Supabase Edge Function               | 3000 emails/mo                |
| i18n       | Custom locale routing (`/[locale]`)            | —                             |

No auth, no paid services, no ORM (plain Supabase JS client).

## 4. Architecture

```
Browser
  │
  ├── Next.js (Vercel)
  │     ├── /[locale]            single page, ISR (revalidate 60s)
  │     ├── /api/contact         POST → inserts into Supabase
  │     └── /api/revalidate      optional webhook (v2)
  │
  ├── Supabase Postgres
  │     ├── content tables (read at build/ISR)
  │     └── contact_messages (write at runtime)
  │
  └── Supabase Edge Function  (contact-notify)
        └── Resend  →  email to owner
```

- Content tables are read with `cache: 'force-cache'` + `revalidate: 60` (ISR).
- DB trigger `on_contact_insert` invokes the `contact-notify` Edge Function.
- Data access lives in `src/lib/` — UI never talks to Supabase directly.

## 5. Supabase Schema

All text content has `_en` / `_lv` variants. IDs are UUID. All content tables have
`sort_order int` and `created_at timestamptz default now()`.

### site_profile (single row, id = fixed UUID)

| column     | type   | notes                          |
|------------|--------|--------------------------------|
| id         | uuid   | pk, fixed                      |
| name       | text   | "Mārcis Krēgers"               |
| role_en    | text   | "Fullstack Web Developer"      |
| role_lv    | text   | "Pilna cikla web izstrādātājs" |
| tagline_en | text   |                                |
| tagline_lv | text   |                                |
| bio_en     | text   |                                |
| bio_lv     | text   |                                |
| photo_url  | text   | public URL, placeholder ok     |
| email      | text   | owner contact email            |
| github_url | text   |                                |
| linkedin_url| text  |                                |
| resume_url | text   | optional PDF CV link           |

### skills

| column    | type   | notes                                |
|-----------|--------|--------------------------------------|
| id        | uuid   | pk                                   |
| name      | text   | same in both languages (tech name)   |
| category  | text   | e.g. Frontend, Backend, DevOps, AI   |
| level     | int    | 1–5                                  |
| sort_order| int    |                                      |

### experience

| column         | type   | notes                            |
|----------------|--------|----------------------------------|
| id             | uuid   | pk                               |
| type           | text   | 'work' \| 'education'            |
| title_en       | text   | job title / degree name          |
| title_lv       | text   |                                  |
| organization_en| text   | company / school                 |
| organization_lv| text   |                                  |
| start_date     | date   |                                  |
| end_date       | date   | null = present                   |
| description_en | text   |                                  |
| description_lv | text   |                                  |
| sort_order     | int    | newest first                     |

### projects

| column         | type   | notes                        |
|----------------|--------|------------------------------|
| id             | uuid   | pk                           |
| title          | text   | project name (both langs)    |
| description_en | text   |                              |
| description_lv | text   |                              |
| image_url      | text   | nullable placeholder ok      |
| repo_url       | text   | nullable                     |
| live_url       | text   | nullable                     |
| tags           | text[] |                              |
| featured       | bool   | default false                |
| sort_order     | int    |                              |

### services

| column         | type   | notes                                  |
|----------------|--------|----------------------------------------|
| id             | uuid   | pk                                     |
| title_en       | text   |                                        |
| title_lv       | text   |                                        |
| description_en | text   |                                        |
| description_lv | text   |                                        |
| icon           | text   | icon name from fixed icon set          |
| sort_order     | int    |                                        |

### contact_messages

| column     | type        | notes                              |
|------------|-------------|------------------------------------|
| id         | uuid        | pk, default gen_random_uuid()      |
| name       | text        | required                           |
| email      | text        | required                           |
| message    | text        | required                           |
| locale     | text        | 'en' \| 'lv'                       |
| created_at | timestamptz | default now()                      |

### Security (RLS)

- Content tables: public SELECT only.
- `contact_messages`: public INSERT only (no select/update/delete).
- Anon key in env as `NEXT_PUBLIC_SUPABASE_ANON_KEY` (safe by design).
- Service role key used ONLY server-side (contact API + Edge Function never share it to client).

### Edge Function: contact-notify

- Trigger: `on_contact_insert` → `after insert on contact_messages`
- Calls `https://<project>.supabase.co/functions/v1/contact-notify` via `pg_net` (`net.http_post`)
- Auth: custom `x-notify-secret` header (NOT an Authorization header — the Functions
  gateway JWT-validates Authorization). Function deployed with `verify_jwt = false`
  (`supabase/config.toml`).
- Secret stored in private `app_settings` table (`notify_secret` key), matched against
  function env `NOTIFY_SECRET`; trigger reads it via `public.app_settings` (security
  definer function with empty search_path — all references schema-qualified).
- Uses Resend API to send email to owner address from `NOTIFY_TO`
- Env: `RESEND_API_KEY`, `NOTIFY_TO`, `NOTIFY_SECRET`
- Failure handling: trigger fails silently (log only), message stays in DB.

## 6. Routing & i18n

- Locales: `en`, `lv` (default `en`).
- Routes:
  - `/` → redirect to `/en` (or `/lv` if `Accept-Language` starts with `lv`, or saved cookie)
  - `/[locale]` → the single-page site
  - `/api/contact` → contact form endpoint
- Language toggle persists choice in cookie `NEXT_LOCALE`, swaps route segment.
- Translations: typed dictionaries in `src/i18n/` (`en.ts`, `lv.ts`, `index.ts`).
  DB content uses `_en`/`_lv` columns; UI strings use dictionaries.
- `<html lang>` and metadata switch per locale. Canonical links per locale.

## 7. Design System

**`DESIGN.md` at repo root is the design source of truth (v2)** - tokens below are the
same; detailed component styling rules (typography hierarchy, button/card
states, nav behavior, motion language, bans) live there. Coding agents must
follow DESIGN.md v2. Tasks 11-16 implement it.

### Theme: "Dark Violet, Elevated Tech"

| Token                 | Value                          |
|-----------------------|--------------------------------|
| background            | `#0a0a12` (near black)         |
| surface               | `#12121f`                      |
| surface-2             | `#1a1a2e`                      |
| border                | `#2a2a45`                      |
| text-primary          | `#e8e8f0`                      |
| text-muted            | `#9a9ab0`                      |
| accent                | `#8f7ce6` (links, icons, borders, focus) |
| accent-hover          | `#a48ff5` (link hover)         |
| accent-strong         | `#7c5ce0` (filled CTA background) |
| accent-glow           | rgba(140, 122, 240, 0.28)      |
| success               | `#4ade80` (semantic positive states only) |
| danger                | `#f87171` (form errors)        |

- Fonts: **Space Grotesk** (headings) + **Geist** (body) + **JetBrains Mono** (monospace labels) via `next/font/google`.
- Motifs: hairline 1px borders, desaturated violet accent family, glow only at
  two page-wide moments (primary CTA hover, featured project card), hero-only
  grid ambience at very low opacity. No fake terminals, no `$` prompts, no
  numbered section prefixes.
- Motion: GSAP + ScrollTrigger per DESIGN.md §7 (one pinned setpiece, staggered
  reveals, transform/opacity only, reduced-motion collapses to static).
- Accessibility: WCAG AA contrast, focus-visible rings in accent color, semantic HTML, `prefers-reduced-motion` respected.
- Tokens are defined once in `src/app/globals.css` via Tailwind 4 `@theme` (no `tailwind.config.ts`).

### Components

`src/components/`:

- `Nav` - sticky, logo monogram "MK", section links, language toggle
- `Hero`, `About`, `Skills`, `Experience`, `Projects`, `Services`, `Contact`
- `Section` (wrapper: id, title), `SectionTitle` (no numbering)
- `ProjectCard`, `ServiceCard`, `TimelineItem`, `ContactForm`
- `Button`, `Badge`/`Tag`, `Monogram`, surface cards (no glow-on-every-card)

## 8. Contact Form Behavior

- Client-side validation (required name/email/message, email format), honeypot field `website` (hidden, must stay empty).
- POST JSON to `/api/contact` → validates again server-side (zod), inserts into `contact_messages`.
- Returns `{ ok: true }` or `{ ok: false, error }`. UI shows success state ("Message sent") or error.
- Rate limiting (v1: simple in-memory per-IP bucket, 5/hour) to avoid spam.
- Email notification via DB trigger → Edge Function → Resend (owner gets "New message from <name>").

## 9. SEO & Metadata

- `generateMetadata` per locale: title "Mārcis Krēgers — Fullstack Web Developer", description from tagline, `alternates.languages` for en/lv, canonical.
- OpenGraph + Twitter cards (default OG image).
- `favicon.ico`/icon, `robots.txt`, `sitemap.xml` (en/lv URLs).
- Semantic: one `h1` (hero name), sections `h2`, skip-to-content link.

## 10. Environment Variables

| Variable                       | Where           | Notes                          |
|--------------------------------|-----------------|--------------------------------|
| NEXT_PUBLIC_SUPABASE_URL       | client          | safe to expose                 |
| NEXT_PUBLIC_SUPABASE_ANON_KEY  | client          | safe to expose (RLS enforced)  |
| SUPABASE_SERVICE_ROLE_KEY      | server only     | never in client bundles        |
| RESEND_API_KEY                 | Edge Function   |                                |
| NOTIFY_TO                      | Edge Function   | owner email fallback           |
| CRON_SECRET / REVALIDATE_SECRET| server          | reserved for v2 revalidation   |
| CONTACT_TEST_MODE             | server (dev)    | "1" = form returns ok without insert (e2e/dev only) |

`.env.local` for dev, Vercel env for prod, `supabase secrets set` for edge function.

## 11. Placeholders Policy

Anything unknown is seeded with clearly marked placeholder text:

- Text placeholders: `[TODO: CONTENT] <suggestion>` — visible so it's never mistaken for real copy.
- Photo: inline SVG monogram placeholder until real photo is provided.
- All placeholders tracked in `CONTENT_TODO.md` at repo root (owner fills it in later).

## 12. Non-Functional Requirements

- Lighthouse: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- All pages static/ISR — no layout shift; images sized, `next/image` used.
- Works on mobile 360px+ and desktop; sticky nav; smooth scroll with reduced-motion fallback.

## 13. Out of Scope (v1)

- Admin UI / auth (edit via Supabase dashboard)
- Blog
- CMS webhook-driven instant revalidation (ISR 60s instead)
- Analytics
- Multi-page CV (single page only)
