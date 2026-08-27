# Task 20 — Projects Content: Real Projects (Hermes + Homelab)

**Spec ref:** §2, §11

**Depends on:** Task 17, 18

## Goal

Replace the placeholder-derived project lineup with real, evidence-backed
projects mined from the owner's actual tooling (Hermes agent logs, Perplexity
memory bank).

## Source material gathered (2026-08-27)

Prompts were run by the owner:

1. **Hermes self-audit prompt** (the agent documented itself from real config
   + logs)
2. **Perplexity memory-mining prompt** (topics, solved problems, decisions,
   frustrations, skill evidence)

Full prompt texts are preserved in the chat transcript of 2026-08-27; the
signed outputs are summarized below.

### Key findings (Hermes output)

- Framework: Hermes Agent by Nous Research; model stepfun/step-3.7-flash:free
  via Nous inference API. Runs bare-metal Debian 13 (HP EliteDesk 800 G1 TWR,
  GTX 1660 SUPER), NOT a VM/container.
- Invocation: CLI/TUI, dashboard (basic auth), desktop app, OpenAI-compatible
  proxy, cron, messaging platforms.
- Memory/state: SQLite `state.db` (~301 MB, FTS5) + file memories + honcho.
- Real wins: UxPlay headless stabilization (Xvfb, patched source rebuild
  1.73.6 with nvh264dec hardware decode, stall detector), disk reclaim
  (93% -> 42%, docker prune ~73 GB), LADSPA/PipeWire audio debug, daily
  Latvian-law validation cron (50+ ok runs since Jul 8).
- Guardrails: command_allowlist gates destructive ops; confirmations on
  high-impact actions; audit via request_dump_*.json (full replay) + agent.log.
- ~21 self-hosted services managed (Immich, Pi-hole, Portainer, LM Studio,
  SearXNG, NPM, CouchDB, faster-whisper, Postiz, Edge-TTS, Jellyfin stack,
  *arr stack, UxPlay, Hermes).
- Time-saved estimate (3-6 h/week) UNVERIFIED - excluded from site copy.

### Key findings (Perplexity output)

- Owner chose Debian minimal OVER Proxmox (July 2026) - the previous Homelab
  card claiming Proxmox was factually wrong. Corrected.
- Stack decisions researched and locked: Nginx Proxy Manager (vs Traefik/
  Caddy), CouchDB LiveSync (vs Syncthing/Git), Hermes (vs LangChain/custom),
  Tailscale + split DNS, Namecheap domain.
- Recurring frustrations = future build-out fodder: NPM subdomain patterns,
  PS4 diagnostics flowchart, battery sourcing list, Obsidian LiveSync
  conflicts.
- Perplexity memory shows NO web-dev evidence - memory is selective; real
  proof exists (this site, OptiCore internship). No skills-list change.

## Corrections shipped to live site

| Card | Was | Now |
|---|---|---|
| Agent Logbook (featured) | fictional "Postgres audit log" tool | **Hermes**: real agent, SQLite audit trail, merged with Logbook concept |
| Homelab | "Proxmox containers and VMs" | bare-metal Debian 13, ~21 Docker services, Tailscale/NPM/CouchDB |
| This Website | unchanged | unchanged |

## New copy (live + seed)

- Hermes EN: "My always-on AI agent. It runs my home server day to day:
  restarting services, patching config files, automating daily checks, and
  debugging everything from Docker disk hogs to AirPlay freezes. Every tool
  call is logged to SQLite, so a failed run can be replayed and inspected
  step by step." Tags: AI agents, SQLite, Docker, Linux, systemd.
- Homelab EN: "A bare-metal Debian 13 box that runs about 21 self-hosted
  services: media, photo library, DNS, search, and sync. Remote access goes
  through Tailscale with split DNS, Nginx Proxy Manager serves SSL
  subdomains, and my Obsidian vault syncs in real time over CouchDB."
  Tags: Linux, Docker, Tailscale, Nginx.

## Screenshot shot list (captured + wired 2026-08-27)

1. `docker ps` or Portainer stack view (shows the ~21 services)
2. Hermes CLI session showing tool calls executing
3. Hermes dashboard (basic-auth UI)
4. `systemctl status uxplay` or the Latvian-law cron output

Shipped 2026-08-27: cropped to 16:10 (2400x1500), dropped in
`site/public/images/`, `projects.image_url` set via REST on live DB and
updated in seed.sql. Wired: project-hermes.jpg + project-homelab.jpg are
live on the cards and in the hero work carousel.

## Repo plan

Skeleton prepped at `~/Documents/hermes/` (separate repo): README with real
architecture, sanitized config example, .gitignore, MIT license. Owner
creates the GitHub repo; then `git init` + push; then set
`projects.repo_url` for the Hermes card (seed + live DB).

## Acceptance Criteria

- [x] Project lineup replaced with real projects (seed + live DB)
- [x] "Proxmox" and "Postgres" mentions removed from project copy
- [x] Bilingual copy verified live on both locales
- [x] Screenshots wired into cards (project-hermes.jpg + project-homelab.jpg live on cards, verified 200 on both locales)
- [x] Hermes repo created and linked on the card (github.com/degradaccija/hermes-homelab)

## Addendum (2026-08-27, later)

- Hero photo replaced entirely by a 3-slide work carousel (HeroCarousel.tsx,
  crossfade, reduced-motion static). Slides = featured projects from the DB,
  so adding a project with an image grows the carousel.
- Carousel frame fixed from 5/6 to 16/10: the portrait-oriented frame
  center-cropped landscape screenshots into empty middle regions.
- About section uses the friendlier portrait (about.jpg); old portrait.jpg
  removed from disk, git, and DB.
- This Website is now the third featured card (screenshot of the live hero
  captured via Playwright at 1440x900@2x), giving the carousel 3 slides and
  the Projects section a 3-card sticky-stack.

## Notes

- Photo split (2026-08-27): the hero visual is the featured-project work
  carousel (`HeroCarousel.tsx`); the friendly portrait `about.jpg`
  (1254x1254) renders in the About section only. Old `portrait.jpg`
  removed from the repo and now 404s.
- Cards used monogram fallbacks by design until screenshots landed; both
  featured cards render real screenshots since 2026-08-27.
- Time-saved metric intentionally excluded (unverified).
- Console modding (20+ Perplexity convos) stays persona color for the
  "Tech repair & consulting" service - not a portfolio project card.
