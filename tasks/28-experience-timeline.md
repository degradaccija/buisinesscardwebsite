# Task 28 — Experience timeline: fix the jumping year rail

**Plan ref:** FIX_PLAN.md finding 4 (visual half)
**Depends on:** nothing

## Background

The review found the Experience year rail reads `2026 → 2024 → 2025 → 2024 → 2024` —
at a glance it looks like a sorting bug. Cause:

- Rows are ordered by `sort_order` desc (`site/src/lib/content.ts:37`, roughly
  end-date-descending: Jul 2026, Apr 2026, Dec 2025, Nov 2024, Jul 2024) — correct.
- The rail year is `startYear(item)` (`site/src/components/sections/Experience.tsx:30`)
  — so the label shows the **start** year while the list is ordered by **end** date:
  2026, 2024, 2025, 2024, 2024. Non-monotonic labels.

## Goal

Year labels are monotonically non-increasing down the list, so the timeline reads as
sorted. Ordering of entries does not regress the strongest roles.

## Steps

1. In `site/src/components/sections/Experience.tsx`: change the rail to render the
   **end** year (fallback to start year for open-ended items, e.g. education row uses
   its end date anyway). Expected labels: `2026, 2026, 2025, 2024, 2024` — monotonic.
   - Alternative considered: re-sort by start date (labels 2026, 2025, 2024, 2024,
     2024) — **rejected**: it buries the 2-year Technical Manager role below a 3-month
     school internship.
   - Alternative considered: drop the rail year and show only the per-card period —
     viable fallback if design prefers, but the rail is part of the desktop layout's
     rhythm (Task 14).
2. Verify both locales (the rail year is locale-independent; period strings use
   `en-GB` / `lv-LV` via `formatPeriod` — confirm nothing else shifts).
3. Mobile check: the rail year is `hidden … lg:block` — confirm mobile still reads
   fine from the per-card date lines alone.
4. Update `tasks/14-experience-projects.md` notes if it documented the start-year
   behavior, then lint/typecheck/build, deploy.

## Acceptance Criteria

- [ ] Desktop rail reads `2026, 2026, 2025, 2024, 2024` top-to-bottom
- [ ] Entry order unchanged (Technical Manager stays 2nd, per existing sort_order)
- [ ] Both locales verified; mobile unchanged
- [ ] lint/typecheck/build clean; deployed

## Notes

- The **copy half** of review finding 4 (headline "Fullstack Web Developer & AI
  Engineer" vs intern-level history) is intentionally *not* fixed by rewriting titles
  — it is addressed by the proof layer: Tasks 27/29/30 make the work inspectable and
  the framing honest. Do not inflate job titles.
- `sort_order` for the education row: confirm it sits last on desktop as intended.
