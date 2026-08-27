-- seed.sql - idempotent seed data (safe to re-run; placeholders marked [TODO: CONTENT])

-- site_profile (single fixed row)
insert into site_profile (id, name, role_en, role_lv, tagline_en, tagline_lv, bio_en, bio_lv, photo_url, email, github_url, linkedin_url, resume_url)
values (
  '00000000-0000-4000-8000-000000000001',
  'Mārcis Krēgers',
  'Fullstack Web Developer & AI Engineer',
  'Pilna cikla web izstrādātājs un MI inženieris',
  'Building web apps, AI agents, and Linux systems. Fixing computers.',
  'Veidoju web lietotnes un MI aģentus, uzturu Linux sistēmas, remontēju datorus.',
  'I trained as a computer systems technician. Day to day I choose to work with Linux, because I believe in the Unix philosophy. I build web apps with React, Next.js, and TypeScript, and develop AI agents that automate the monotonous parts of development and server maintenance.',
  'Esmu apguvis datorsistēmu tehniķa profesiju. Ikdienā labprāt strādāju ar Linux operētājsistēmu, jo piekrītu Unix filozofijai. Protu veidot web lietotnes ar React, Next.js un TypeScript, kā arī izstrādāju MI aģentus, kas automatizē dažādus monotonus procesus izstrādes un serveru uzturēšanas laikā.',
  '/images/about.jpg',
  'marcis.kregers@gmail.com',
  'https://github.com/degradaccija',
  'https://lv.linkedin.com/in/marcis-kregers',
  null
)
on conflict (id) do nothing;

-- skills
insert into skills (id, name, category, level, sort_order) values
  ('00000000-0000-4000-8000-000000000101', 'React', 'Frontend', 4, 1),
  ('00000000-0000-4000-8000-000000000102', 'Next.js', 'Frontend', 4, 2),
  ('00000000-0000-4000-8000-000000000103', 'TypeScript', 'Frontend', 4, 3),
  ('00000000-0000-4000-8000-000000000104', 'Tailwind CSS', 'Frontend', 4, 4),
  ('00000000-0000-4000-8000-000000000105', 'HTML & CSS', 'Frontend', 4, 5),
  ('00000000-0000-4000-8000-000000000201', 'Node.js', 'Backend', 3, 1),
  ('00000000-0000-4000-8000-000000000202', 'PostgreSQL', 'Backend', 3, 2),
  ('00000000-0000-4000-8000-000000000203', 'REST APIs', 'Backend', 4, 3),
  ('00000000-0000-4000-8000-000000000204', 'GraphQL', 'Backend', 2, 4),
  ('00000000-0000-4000-8000-000000000301', 'Linux', 'DevOps & Linux', 5, 1),
  ('00000000-0000-4000-8000-000000000302', 'Bash / Shell scripting', 'DevOps & Linux', 4, 2),
  ('00000000-0000-4000-8000-000000000303', 'Docker', 'DevOps & Linux', 3, 3),
  ('00000000-0000-4000-8000-000000000304', 'System administration', 'DevOps & Linux', 4, 4),
  ('00000000-0000-4000-8000-000000000305', 'Networking', 'DevOps & Linux', 3, 5),
  ('00000000-0000-4000-8000-000000000401', 'LLM integration', 'AI & Agents', 3, 1),
  ('00000000-0000-4000-8000-000000000402', 'AI agents', 'AI & Agents', 3, 2),
  ('00000000-0000-4000-8000-000000000403', 'Prompt engineering', 'AI & Agents', 4, 3),
  ('00000000-0000-4000-8000-000000000404', 'Workflow automation', 'AI & Agents', 3, 4)
on conflict (id) do nothing;

-- experience (newest first by sort_order)
insert into experience (id, type, title_en, title_lv, organization_en, organization_lv, start_date, end_date, description_en, description_lv, sort_order) values
  (
    '00000000-0000-4000-8000-000000000211',
    'work',
    'AI Engineer Intern',
    'MI inženieris praktikants',
    'SIA OptiCore',
    'SIA OptiCore',
    '2026-01-01',
    '2026-07-31',
    'Built LLM-powered automation for real business tasks: prototyped agent workflows, integrated language models into internal tools, and tested prompts and pipelines on live data.',
    'Veidoju LLM automatizāciju reāliem uzdevumiem: prototipēju aģentu darbplūsmas, integrēju valodu modeļus iekšējos rīkos un pārbaudīju to darbību uz reāliem datiem.',
    60
  ),
  (
    '00000000-0000-4000-8000-000000000212',
    'work',
    'Technical Manager',
    'Tehniskais direktors',
    'Riga Fashion Week',
    'Riga Fashion Week',
    '2024-04-01',
    '2026-04-30',
    'Ran show technology for Riga Fashion Week, two seasons per year: planned and managed stage, lighting, sound, and AV for the runway shows, leading the technical crew on site.',
    'Atbildēju par tehnisko nodrošinājumu Riga Fashion Week skatēs, kas notiek divas reizes gadā: plānoju un vadīju skatuves, gaismas, skaņas un AV risinājumus, pasākuma laikā vadot tehnisko komandu.',
    50
  ),
  (
    '00000000-0000-4000-8000-000000000213',
    'work',
    'IT Help Desk Intern',
    'IT atbalsta praktikants',
    'Jelgavas Centra pamatskola',
    'Jelgavas Centra pamatskola',
    '2025-10-01',
    '2025-12-31',
    'IT support for teachers and school staff: kept classroom computers and the school network running, resolved day-to-day hardware and software issues.',
    'IT atbalsts skolotājiem un skolas personālam: uzturēju klašu datorus un skolas tīklu, risināju ikdienas aparatūras un programmatūras problēmas.',
    40
  ),
  (
    '00000000-0000-4000-8000-000000000214',
    'work',
    'Sales Specialist',
    'Pārdošanas speciālists',
    'SIA Ogilvy',
    'SIA Ogilvy',
    '2024-05-01',
    '2024-11-30',
    'Client-facing sales role at the marketing agency: handled customer communication, prepared offers, and coordinated work between clients and internal teams.',
    'Darbs ar klientiem mārketinga aģentūrā: vadīju klientu komunikāciju, sagatavoju piedāvājumus un koordinēju darbu starp klientiem un iekšējām komandām.',
    30
  ),
  (
    '00000000-0000-4000-8000-000000000215',
    'work',
    'IT Help Desk Intern',
    'IT atbalsta praktikants',
    'Riga Technical University (RTU)',
    'Rīgas Tehniskā universitāte (RTU)',
    '2024-04-01',
    '2024-07-31',
    'First-line IT support at the university: handled support tickets, diagnosed hardware and software problems, and set up workstations for staff.',
    'Pirmā līmeņa IT atbalsts universitātē: pieņēmu un risināju atbalsta pieprasījumus, diagnosticēju aparatūras un programmatūras problēmas, uzstādīju darbstacijas.',
    20
  ),
  (
    '00000000-0000-4000-8000-000000000201',
    'education',
    'Computer Systems Technician / System Administrator',
    'Datorsistēmu tehniķis / sistēmu administrators',
    'Jelgavas tehnikums',
    'Jelgavas tehnikums',
    '2022-09-01',
    '2026-06-30',
    'Vocational education in computer systems and system administration. Graduated in 2026 with a Level 4 profession under the Latvian Qualifications Framework (LKI). The program covered hardware, networking, operating systems, and IT infrastructure.',
    'Profesionālā izglītība datorsistēmu un sistēmu administrēšanas jomā. Beidzu 2026. gadā ar 4. līmeņa profesiju pēc Latvijas kvalifikāciju ietvara. Programmā apguvu aparatūru, tīklus, operētājsistēmas un IT infrastruktūru.',
    10
  )
on conflict (id) do nothing;

-- projects
insert into projects (id, title, description_en, description_lv, image_url, repo_url, live_url, tags, featured, sort_order) values
  (
    '00000000-0000-4000-8000-000000000301',
    'Hermes',
    'My always-on AI agent. It runs my home server day to day: restarting services, patching config files, automating daily checks, and debugging everything from Docker disk hogs to AirPlay freezes. Every tool call is logged to SQLite, so a failed run can be replayed and inspected step by step.',
    'Mans nepārtraukti strādājošais MI aģents. Tas katru dienu pārvalda manu serveri: restartē servisus, labo konfigurācijas failus, automatizē ikdienas pārbaudes un atkļūdo visu, sākot ar Docker vietas ēdājiem un beidzot ar AirPlay aizsalšanu. Katrs rīka izsaukums tiek saglabāts SQLite datubāzē, tāpēc neveiksmīgu palaišanu var atkārtot un izpētīt soli pa solim.',
    '/images/project-hermes.jpg',
    'https://github.com/degradaccija/hermes-homelab',
    null,
    array['AI agents', 'SQLite', 'Docker', 'Linux', 'systemd'],
    true,
    1
  ),
  (
    '00000000-0000-4000-8000-000000000302',
    'Homelab',
    'A bare-metal Debian 13 box that runs about 21 self-hosted services: media, photo library, DNS, search, and sync. Remote access goes through Tailscale with split DNS, Nginx Proxy Manager serves SSL subdomains, and my Obsidian vault syncs in real time over CouchDB.',
    'Paša savākts Debian 13 serveris, kurā darbojas apmēram 21 pašmitināts pakalpojums: multivide, fotoarhīvs, DNS, meklēšana un sinhronizācija. Attālinātā piekļuve notiek caur Tailscale ar split DNS, Nginx Proxy Manager nodrošina SSL apakšdomēnus, un mana Obsidian glabātava reāllaikā sinhronizējas caur CouchDB.',
    '/images/project-homelab.jpg',
    null,
    null,
    array['Linux', 'Docker', 'Tailscale', 'Nginx'],
    true,
    2
  ),
  (
    '00000000-0000-4000-8000-000000000303',
    'This Website',
    'The site you are reading. A bilingual business card built with Next.js 16, Tailwind, and Supabase as the CMS. All content lives in Postgres and is read at build time, so the page ships as static HTML.',
    'Vietne, kuru šobrīd lasi. Divvalodu vizītkarte, būvēta ar Next.js 16, Tailwind un Supabase kā satura pārvaldības sistēmu. Viss saturs atrodas Postgres datubāzē un tiek ielasīts būvēšanas laikā, tāpēc lapa tiek izsniegta kā statisks HTML.',
    '/images/project-site.jpg',
    null,
    null,
    array['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    true,
    3
  )
on conflict (id) do nothing;

-- services (icon names from lucide-react)
insert into services (id, title_en, title_lv, description_en, description_lv, icon, sort_order) values
  (
    '00000000-0000-4000-8000-000000000401',
    'Web development',
    'Web izstrāde',
    'Websites and web apps with React, Next.js, and TypeScript. I take a project from first design to a deployed and maintained site.',
    'Mājaslapas un web lietotnes ar React, Next.js un TypeScript. Projektu vedu no pirmā dizaina līdz izvietotai un uzturētai vietnei.',
    'Code2',
    1
  ),
  (
    '00000000-0000-4000-8000-000000000402',
    'AI agents & automation',
    'MI aģenti un automatizācija',
    'Agents and automation scripts that handle repetitive work, such as data entry, report generation, and inbox triage. I build the workflow, wire the tools, and test the result on your real data.',
    'Aģenti un automatizācijas skripti, kas pārņem rutīnas darbus, piemēram, datu ievadi, atskaišu ģenerēšanu un e-pastu šķirošanu. Uzbūvēju darbplūsmu, pieslēdzu rīkus un pārbaudu rezultātu uz taviem reālajiem datiem.',
    'Bot',
    2
  ),
  (
    '00000000-0000-4000-8000-000000000403',
    'Linux & server administration',
    'Linux un serveru administrēšana',
    'Setup, maintenance, and hardening of Linux servers. From a fresh VPS to scheduled backups, monitoring, and updates.',
    'Linux serveru uzstādīšana, uzturēšana un drošības nostiprināšana. No jauna VPS līdz ieplānotām dublējumkopijām, uzraudzībai un atjauninājumiem.',
    'Terminal',
    3
  ),
  (
    '00000000-0000-4000-8000-000000000404',
    'IT infrastructure & networking',
    'IT infrastruktūra un tīkli',
    'Network and workstation setup for homes and small offices. Routers, Wi-Fi, switches, and wired runs, configured and documented.',
    'Tīklu un darbstaciju uzstādīšana mājām un maziem birojiem. Maršrutētāji, Wi-Fi, komutatori un kabeļu līnijas. Viss nokonfigurēts un dokumentēts.',
    'Server',
    4
  ),
  (
    '00000000-0000-4000-8000-000000000405',
    'Tech repair & consulting',
    'Tehnikas remonts un konsultācijas',
    'Hardware diagnostics and repair for laptops and desktops, plus practical advice on what to buy and when to replace instead of repair.',
    'Portatīvo un galddatoru aparatūras diagnostika un remonts, kā arī praktiski padomi: ko pirkt un kad labāk nomainīt, nevis labot.',
    'Wrench',
    5
  )
on conflict (id) do nothing;
