# Task 21 — Hermes Console (Build-Out, NOT STARTED)

**Depends on:** Task 20; owner decision 2026-08-27

## Goal

A Next.js web control panel for the owner's Hermes agent: converts "AI
skills" into visible fullstack skills and becomes the 4th portfolio project
(and eventually a live demo link).

## MVP checklist (2-week scale)

1. **Chat UI**: talk to Hermes via its OpenAI-compatible proxy
   (`hermes proxy`); streaming responses.
2. **Tool-call trace**: timeline view reading Hermes's SQLite `state.db`
   (`sessions`, `messages` with tool_calls, `async_delegations`) - the
   portfolio's signature screen.
3. **Run replay**: load a `request_dump_*.json` and replay/inspect a failed
   gateway call step by step.
4. **Service controls**: read-only dashboards first (systemd units, docker
   ps, disk usage) + guarded actions (restart service) behind the same
   allowlist/confirm philosophy Hermes uses.
5. **Auth**: single-user basic auth/session (it fronts a homelab).
6. **Bilingual UI (en/lv)** if shipped publicly - house rule.

## Tech notes

- Next.js 16 App Router + TS + Tailwind 4, same tokens as the portfolio.
- SQLite access server-side only (better-sqlite3 or node:sqlite read-only,
  pointed at a copy/sync of state.db - never expose the DB path publicly).
- Server Actions / route handlers for proxy streaming; no secret keys client
  side.
- Reduced-motion + tokens per DESIGN.md v2; screenshots of the trace view
  become the 4th project card asset.

## Milestones

- Week 1: proxy chat + tool-call trace (MVP demo-able).
- Week 2: run replay + service controls + polish + screenshots.

## Acceptance Criteria (when built)

- [ ] Chat round-trip through Hermes proxy works (streaming)
- [ ] Tool-call trace renders real sessions from state.db
- [ ] Failed-run replay from request dumps
- [ ] Guarded service actions with confirm flow
- [ ] Repo public (or portfolio links to a demo) + card added to site
