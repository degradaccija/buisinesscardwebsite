# Task 29 — Skills: drop self-assessed L1–L5 levels

**Plan ref:** FIX_PLAN.md finding 5
**Depends on:** nothing

## Background

The Skills section subtitle says *"Levels L1–L5, self assessed."* and every skill shows
an `L{level}` badge (`site/src/components/sections/Skills.tsx:41`). Review verdict:
self-ratings are a no-win device — recruiters discount them as noise, and this set
actively undermines the headline: "AI & Agents" shows **L3** for LLM integration and AI
agents (with Prompt engineering at L4) under an "AI Engineer" title, and GraphQL shows
L2 with nothing behind it.

## Goal

Same grouped layout, no numbers. The section stops grading the candidate and starts
listing capabilities; proof moves to Projects.

## Steps

1. **Component** — `site/src/components/sections/Skills.tsx`: remove the `L{skill.level}`
   badge render (keep the skill name row; the freed right edge can stay empty or carry
   nothing — do not add years-of-experience numbers, same problem in new clothes).
2. **Dictionaries** — remove/replace the subtitle in `site/src/i18n/en.ts` and
   `site/src/i18n/lv.ts`:
   - EN (draft): `The proof lives in Projects — below.`
   - LV (draft, informal, "MI"): `Pierādījumi — sadaļā "Projekti" zemāk.`
   (If the empty right-edge feels bare, an optional lighter alternative: move nothing,
   delete just the numbers.)
3. **DB:** leave the `level` column in place (no migration churn); it simply stops
   rendering. Note the decision here so a future migration isn't accidental.
4. Verify desktop + mobile, EN + LV (cards were `4 skills / 5 skills` footer text —
   keep or drop those count lines for consistency with the new subtitle).
5. lint/typecheck/build, deploy, live check.

## Acceptance Criteria

- [ ] No L-level badges render anywhere (both locales)
- [ ] Subtitle replaced per drafts above (owner approves final wording)
- [ ] Layout intact on desktop + mobile
- [ ] `level` column retained in DB; decision documented
- [ ] lint/typecheck/build clean; deployed

## Notes

- Removing self-grades is strictly information-losing for *doubt* and
  information-neutral for *signal*: nothing the L3 admitted is worse than the question
  "why is your AI rating a 3 under an AI-engineer headline?".
- Related copy rule from Task 27 still applies to any new wording: no inflating — the
  section describes capability groups, not seniority claims.
