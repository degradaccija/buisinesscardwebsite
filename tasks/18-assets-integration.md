# Task 18 — Asset Integration

**Spec ref:** §11, §12, DESIGN.md v2

**Depends on:** Task 17

## Goal

Give the redesigned page real visuals: project thumbnails, hero visual, OG
image. Every board annotation from Task 10 lists the needed assets.

**Environment constraint:** no image-generation tool is available in this
repo's agent environment. Use seeded placeholder photography (picsum seed URLs
matching each board's vibe) wired through the DB so the slots are real, then
produce an exact asset-request list for the owner (or a later generation run).

## Steps

1. Read board annotations (`design-inspiration/redesign/`) + DESIGN.md v2 image
   rules (no div-based fake screenshots; `next/image`; sized; alt text).
2. Wire image URLs:
   - `supabase/seed.sql`: set `projects.image_url` to picsum seed URLs with
     descriptive seeds + correct aspect per board (e.g. 1200x900, 1600x1000).
   - Hero: if no `photo_url`, keep monogram fallback (do not fake a portrait);
     hero visual slot uses the board's specified backdrop treatment in CSS.
3. Verify components use `next/image` with `width/height` or `fill`+`sizes`;
   hero/LCP image `priority`; `alt` text bilingual where appropriate.
4. OG image: restyle `site/src/app/[locale]/opengraph-image.tsx` to the new
   tokens (existing implementation, new visuals).
5. Produce `CONTENT_TODO.md` asset-request list: for each slot — dimensions,
   aspect, style description, priority (photo first). This is what a future
   image-gen run or the owner must provide.
6. `npm run lint`, `npm run typecheck`, `npm run build` clean.

## Acceptance Criteria

- [x] Project cards show images (seeded), no broken URLs
- [x] All images sized via next/image; hero LCP image priority; no CLS
- [x] OG image restyled to new tokens
- [x] Asset-request list in CONTENT_TODO.md (photo, thumbs, dimensions)
- [x] Build/lint/typecheck clean

## Notes

- Seeded picsum URLs are interim: swap when owner provides real screenshots or
  a generation run happens. Do not pretend stock photos are the owner's work.
- `supabase/seed.sql`: `projects.image_url` set to picsum seed URLs
  (`agent-logbook-terminal`, `homelab-server-rack`, `dark-code-editor`,
  1600x1000 = 16/10, matching the card slot aspect). Added guarded
  `update ... where image_url is null` statements after the insert because the
  insert is `on conflict do nothing`, so re-running the seed lands the images
  on already-existing rows without overwriting a future real screenshot.
- `site/next.config.ts`: `images.remotePatterns` tightened from `hostname: "**"`
  to `hostname: "picsum.photos"` only (local `/images/...` paths are unaffected).
- Project visual already correct: `ProjectVisual` uses `next/image` `fill` +
  `sizes` with `object-cover`; card slot is `aspect-[16/10]`, hover `scale-105`
  (no changes needed).
- Hero/About portrait slots verified: hero `Image` is sized (440x528),
  `priority` (renders as `rel="preload" as="image"` in Next 16, no CLS),
  `object-cover`; About keeps `object-[center_20%]` (per board). No changes.
- OG image (`site/src/app/[locale]/opengraph-image.tsx`): all hex now matches
  DESIGN.md v2 tokens (bg `#0a0a12`, grid `rgba(143,124,230,0.04)`, accent
  `#8f7ce6`, text `#e8e8f0`, muted `#9a9ab0`). Removed the banned fake terminal
  prompt (`$ whoami`) and the decorative success green; bottom strip now shows
  the profile tagline in muted mono. Loads Space Grotesk 700 + JetBrains Mono
  500 from Google Fonts at render time (TTF, satori-compatible; woff2 was
  rejected with "Unsupported OpenType signature"), falling back to the bundled
  Geist default if the fetch fails. Verified 200 PNG 1200x630 for /en and /lv.
- CONTENT_TODO.md: new "Asset requests" section with per-slot dimensions,
  aspect, style, and priority (P0 portrait done, P1 project screenshots, P2
  workspace shot, P3 hero reshoot optional).
- Sanity check: dev server run against a local mock Supabase REST server (live
  DB still holds old placeholder rows with `image_url = null`; not touched).
  `/en` HTML contains all three `/_next/image?url=...picsum...` srcs, the image
  optimizer returns 200 for a picsum URL (remotePatterns OK), and the profile
  image renders in hero (priority preload) and About.
