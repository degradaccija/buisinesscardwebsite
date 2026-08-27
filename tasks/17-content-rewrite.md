# Task 17 — Content Rewrite (en/lv)

**Spec ref:** §2, §11, CONTENT_TODO.md

**Depends on:** Task 16

## Goal

Replace placeholder copy with real, concrete, bilingual content so the new
design isn't carrying `[TODO: CONTENT]` strings. Owner reviews before this is
marked done.

## Steps

1. Read `supabase/seed.sql`, `site/src/i18n/en.ts` + `lv.ts`,
   `CONTENT_TODO.md`, and the copy-quality rules in
   `.agents/skills/design-taste-frontend/SKILL.md` §4.9/§9 (no filler verbs, no
   fake metrics, no em-dashes, no emoji, no AI-cute copy, one register).
2. Rewrite in both languages (EN + LV):
   - site_profile: tagline (≤ 12 words), bio (short, concrete).
   - projects: titles + descriptions (what, tech, outcome) for each seeded row.
   - services: titles + 1-line descriptions, concrete.
   - experience: descriptions if placeholder.
   - Dictionaries: hero/availability/contact/meta strings, button labels
     (one contact label), section headings (no numbered prefixes, no em-dashes).
3. Update `supabase/seed.sql` with the new copy (keep `_en`/`_lv` structure).
4. Keep `[TODO: CONTENT]` ONLY where the owner must supply facts: real photo,
   real GitHub/LinkedIn URLs, real email, real job dates/employers, real project
   links. Everything else must be real copy now.
5. Update `CONTENT_TODO.md`: mark resolved items, keep unresolved with owners.
6. `npm run lint`, `npm run typecheck`, `npm run build` clean.

## Acceptance Criteria

- [x] No `[TODO: CONTENT]` strings remain except owner-fact items (listed)
- [x] All copy exists in both en + lv (seed.sql + dictionaries)
- [x] Copy passes skill bans: no em-dashes, no filler verbs, no fake metrics
- [x] CONTENT_TODO.md updated
- [x] Build/lint/typecheck clean

## Notes

- This is a proposal pass: owner reviews before deployment. List all rewritten
  strings in this file's Notes for review.
- Dates/employers: if unknown, seed realistic placeholder AND keep a
  `[TODO: CONTENT]` marker only in CONTENT_TODO.md, not in rendered copy.

### Owner decisions made (recorded)

- Education org kept as `[TODO: CONTENT] Vocational school in Jelgava`
  (exact school name not verified; spec says "Jelgava vocational school",
  candidate "Jelgavas tehnikums" unconfirmed). Education description written
  as real copy; school name + dates are the only education facts still TODO.
- Work history row kept fully `[TODO: CONTENT]`: inventing an employer is
  worse than a placeholder. Owner adds real entries later.
- Projects: 3 personal projects proposed (no fake clients, no fake metrics,
  no links). `repo_url` / `live_url` stay null until owner supplies real links.
- Latvian register unified to informal "tu" across all LV strings
  (form messages, contact note, services copy).

### Rewritten strings (owner review list)

#### seed.sql — site_profile

| Field | EN | LV |
|---|---|---|
| tagline | Building web apps, AI agents, and Linux systems. Fixing computers. | Veidoju web lietotnes un AI aģentus, uzturu Linux sistēmas, remontēju datorus. |
| bio | I trained as a computer systems technician, and Linux has been my daily driver ever since. I build web apps with React, Next.js, and TypeScript, plus AI agents that automate the repetitive parts of development and server upkeep. In my free time I repair laptops and desktops, from diagnostics to replacement parts. | Esmu izmācījies par datorsistēmu tehniķi, un kopš tā laika ar Linux strādāju ik dienas. Veidoju web lietotnes ar React, Next.js un TypeScript, kā arī AI aģentus, kas automatizē atkārtoto darbu izstrādē un serveru uzturēšanā. Brīvajā laikā remontēju portatīvos un galddatorus, sākot ar diagnostiku un beidzot ar detaļu nomaiņu. |

#### seed.sql — projects

| Project | EN description | LV description | Tags |
|---|---|---|---|
| Agent Logbook (featured) | A local tool for running and inspecting AI agents. Every tool call, prompt, and result goes to Postgres, so a failed run can be replayed and debugged step by step. I built it for my own agent work and use it daily. | Lokāls rīks AI aģentu palaišanai un pārbaudei. Katrs rīka izsaukums, uzvedne un rezultāts nonāk Postgres datubāzē, tāpēc neveiksmīgu palaišanu var atkārtot un izpētīt soli pa solim. Uzbūvēju to savam darbam ar aģentiem un lietoju ik dienas. | TypeScript, Node.js, PostgreSQL, AI agents |
| Homelab | My home server lab: Proxmox running containers and virtual machines for development, backups, and self-hosted services. I plan, run, and harden it myself, and it doubles as the test environment for most of my projects. | Mans homelab: Proxmox ar konteineriem un virtuālajām mašīnām izstrādei, dublējumkopijām un pašmitinātiem pakalpojumiem. Plānoju, palaižu un nostiprinu to pats, un tas kalpo kā testa vide lielākajai daļai manu projektu. | Linux, Docker, Proxmox, Networking |
| This Website | The site you are reading. A bilingual business card built with Next.js 16, Tailwind, and Supabase as the CMS. All content lives in Postgres and is read at build time, so the page ships as static HTML. | Vietne, kuru šobrīd lasi. Divvalodu vizītkarte, būvēta ar Next.js 16, Tailwind un Supabase kā satura pārvaldības sistēmu. Viss saturs atrodas Postgres datubāzē un tiek ielasīts būvēšanas laikā, tāpēc lapa tiek izsniegta kā statisks HTML. | Next.js, TypeScript, Tailwind CSS, Supabase |

#### seed.sql — services

| Service | EN | LV |
|---|---|---|
| Web development | Websites and web apps with React, Next.js, and TypeScript. I take a project from first design to a deployed and maintained site. | Mājaslapas un web lietotnes ar React, Next.js un TypeScript. Projektu vedu no pirmā dizaina līdz izvietotai un uzturētai vietnei. |
| AI agents & automation | Agents and automation scripts that handle repetitive work, such as data entry, report generation, and inbox triage. I build the workflow, wire the tools, and test the result on your real data. | Aģenti un automatizācijas skripti, kas pārņem rutīnas darbus, piemēram, datu ievadi, atskaišu ģenerēšanu un e-pastu šķirošanu. Uzbūvēju darbplūsmu, pieslēdzu rīkus un pārbaudu rezultātu uz taviem reālajiem datiem. |
| Linux & server administration | Setup, maintenance, and hardening of Linux servers. From a fresh VPS to scheduled backups, monitoring, and updates. | Linux serveru uzstādīšana, uzturēšana un drošības nostiprināšana. No jauna VPS līdz ieplānotām dublējumkopijām, uzraudzībai un atjauninājumiem. |
| IT infrastructure & networking | Network and workstation setup for homes and small offices. Routers, Wi-Fi, switches, and wired runs, configured and documented. | Tīklu un darbstaciju uzstādīšana mājām un maziem birojiem. Maršrutētāji, Wi-Fi, komutatori un kabeļu līnijas. Viss nokonfigurēts un dokumentēts. |
| Tech repair & consulting | Hardware diagnostics and repair for laptops and desktops, plus practical advice on what to buy and when to replace instead of repair. | Portatīvo un galddatoru aparatūras diagnostika un remonts, kā arī praktiski padomi: ko pirkt un kad labāk nomainīt, nevis labot. |

#### seed.sql — experience (education)

| Field | Value |
|---|---|
| title_en / title_lv | unchanged: Computer Systems Technician / System Administrator; Datorsistēmu tehniķis / sistēmu administrators |
| organization_en / organization_lv | kept `[TODO: CONTENT] Vocational school in Jelgava` / `[TODO: CONTENT] Profesionālā skola Jelgavā` |
| description_en | Vocational training in computer systems and system administration. The program covered hardware, networking, operating systems, and IT infrastructure. |
| description_lv | Profesionālā izglītība datorsistēmu un sistēmu administrēšanas jomā. Programma aptvēra aparatūru, tīklus, operētājsistēmas un IT infrastruktūru. |
| dates | null (owner fills) |

#### Dictionaries (en.ts / lv.ts)

| Key | EN (old → new) | LV (old → new) |
|---|---|---|
| hero.available | unchanged: Available for freelance & full-time work | Pieejams freelance un pilna laika darbam → Pieejams freelance un pilnas slodzes darbam |
| contact.title | Start something → Get in touch | Sāc sarunu → Sazinies ar mani |
| contact.note | "…inbox and fires a notification. No CRMs…" → Direct is fastest. The form lands straight in my inbox. No CRMs, no drip sequences, just me reading your message. | Tiešā saziņa ir ātrākā. Veidlapa nonāk tieši manā e-pastā. Bez CRM sistēmām un automatizētiem e-pastiem. Tavu ziņu izlasu es. |
| form.success | Message sent — I'll get back to you soon. → Message sent. I'll get back to you soon. | Ziņa nosūtīta — drīz sazināšos ar jums. → Ziņa nosūtīta. Drīz sazināšos ar tevi. |
| form.invalid | Please check the form — all fields… → Please check the form: all fields are required and the email must be valid. | Lūdzu, pārbaudi veidlapu — visi lauki… → Lūdzu, pārbaudi veidlapu: visi lauki ir obligāti un e-pastam jābūt derīgam. |
| skills.note | unchanged | Līmeņi L1-L5, pašnovērtējums. → Līmeņus L1-L5 novērtēju pats. |
| about.focusValue | unchanged | Pilna cikla web, AI aģenti → Pilna cikla web izstrāde, AI aģenti |
| meta.title | Mārcis Krēgers — Fullstack… → Mārcis Krēgers \| Fullstack Web Developer & AI Engineer | Mārcis Krēgers — Pilna cikla… → Mārcis Krēgers \| Pilna cikla web izstrādātājs un AI inženieris |
| meta.description | → Fullstack web developer and AI/agent engineer from Latvia. I build web apps with React and Next.js, run Linux servers, and automate work with AI agents. | → Pilna cikla web izstrādātājs un AI/aģentu inženieris no Latvijas. Veidoju web lietotnes ar React un Next.js, uzturu Linux serverus un automatizēju darbu ar AI aģentiem. |

#### Other files

- `site/src/lib/metadata.ts`: page title template `${profile.name} — ${role}` → `${profile.name} | ${role}`.
- `site/e2e/contact.spec.ts`: EN/LV `invalid` + `success` fixtures updated to match the new dictionary strings (e2e-sensitive keys kept: `form.send`, `form.name`, `form.email`, `form.message`, `cta.contact` "Get in touch", nav "About"/"Par mani").
- Em-dash audit: zero `—` / `–` in `en.ts`, `lv.ts`, `seed.sql`, `metadata.ts` after rewrite.

### Still TODO (owner facts)

- Education school name + dates
- Work history row (kept as `[TODO: CONTENT]`)
- Project repo/live links + screenshots
- Owner review of all proposed copy above
