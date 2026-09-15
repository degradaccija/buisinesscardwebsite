# Fix Plan — Recruiter Review 2026-09-15

The site (https://buisinesscardwebsite.vercel.app) was reviewed on 2026-09-15 as if by a
hiring manager: full desktop + mobile pass in both locales, every outbound link clicked
(GitHub profile, Hermes repo, LinkedIn), meta tags, console, page weight inspected.

**Overall verdict:** design, performance, and content structure are strong. The five
things that cost credibility are all presentation/proof problems, not ability problems —
and all are fixable in roughly one focused weekend.

## Findings → tasks

| # | Finding (what the recruiter sees) | Task |
|---|---|---|
| 1 | URL `buisinesscardwebsite.vercel.app` misspells "business"; no custom domain | [tasks/25-custom-domain.md](tasks/25-custom-domain.md) |
| 2 | GitHub profile is anonymous: identicon avatar, no name/bio/location, 0 followers, handle `degradaccija` | [tasks/26-github-profile.md](tasks/26-github-profile.md) |
| 3 | Hermes presented as "my AI agent" but its own README says it is a setup layer on Nous Research's agent; "Case study" label not clickable; Homelab & This Website cards have no links at all | [tasks/27-project-credibility.md](tasks/27-project-credibility.md) |
| 4 | Experience year rail jumps 2026 → 2024 → 2025 → 2024 → 2024; headline contradicts intern-level experience | [tasks/28-experience-timeline.md](tasks/28-experience-timeline.md) |
| 5 | Self-assessed L1–L5 skill levels — incl. L3 in "AI & Agents" under an "AI Engineer" headline | [tasks/29-skills-levels.md](tasks/29-skills-levels.md) |
| 6 | "Fixing computers." ends the hero tagline **and** the Google/OG meta description | [tasks/30-hero-meta-copy.md](tasks/30-hero-meta-copy.md) |
| 7 | Review hit the old single-button "Got it" banner (Task-22-v1 build); consent v2 (Task 22 v2 + 23) has since been deployed — needs prod verification + Task 23 owner items | [tasks/24-deploy-main-consent.md](tasks/24-deploy-main-consent.md) |

## Recommended execution order

```
24 verify consent build  (15 min gate — banner already deployed; PostHog owner items remain)
25 custom domain        (start early — external DNS wait; everything else links to it)
30 hero/meta copy       (1 h, DB + seed)
28 experience years     (1 h, one component)
29 skills levels        (1 h, one component + dict)
27 project credibility  (half day — secrets audit + repo publish + copy rewrite)
26 github profile       (1–2 h, do last — needs domain from 25 + public repo from 27)
```

Dependencies: **26** needs the domain (25) for the profile website link and the public
repo (27) for pinning. **27** must start with the secrets audit. Everything else is
independent.

## Rules that apply to every task here

1. **Bilingual everywhere.** Every content change has `_en` and `_lv` values. Latvian
   copy: informal "tu" tone, "MI" never "AI" (see memory: lv-copy-conventions).
2. **Content lives in Postgres.** Site content is read at build time (ISR): update the
   production DB *and* `supabase/seed.sql` in the same task, then redeploy — a DB edit
   alone does nothing until the next build.
3. **Data access via `site/src/lib/content.ts` helpers only**; UI strings via
   `site/src/i18n/en.ts` / `lv.ts`. Never hardcode strings in components.
4. **Definition of done per AGENTS.md:** `npm run lint`, `npm run typecheck`,
   `npm run build` clean; task checkboxes ticked; deploy = push to `main` (Git
   integration works; fallback `cd site && npx --yes vercel@latest --prod`).
5. **Secrets never in code or commits.** Task 27's repo-publish step is blocked until
   the secrets audit passes — and the leaked-in-chat keys (Supabase service role,
   Resend, management PAT) should be rotated regardless (tracked as urgent outside
   this plan).

## What this plan deliberately does not do

- No redesign — the visual system tested well; only copy, data, and proof-layer fixes.
- No real case-study pages yet — Task 27 removes the misleading label; actual case
  studies are a separate future effort.
- No username rename inside Task 26's core path — it is an optional decision box there,
  deliberately sequenced last because it touches every link back to the site.
