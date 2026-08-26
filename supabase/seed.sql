-- seed.sql — idempotent seed data (safe to re-run; placeholders marked [TODO: CONTENT])

-- site_profile (single fixed row)
insert into site_profile (id, name, role_en, role_lv, tagline_en, tagline_lv, bio_en, bio_lv, photo_url, email, github_url, linkedin_url, resume_url)
values (
  '00000000-0000-4000-8000-000000000001',
  'Mārcis Krēgers',
  'Fullstack Web Developer & AI Engineer',
  'Pilna cikla web izstrādātājs un AI inženieris',
  '[TODO: CONTENT] I build modern web apps and AI agents that get things done.',
  '[TODO: CONTENT] Es veidoju mūsdienīgas web lietotnes un AI aģentus, kas paveic darbu.',
  '[TODO: CONTENT] Fullstack developer with a system administrator background. Linux expert at heart, hardware enthusiast in spare time — I fix computers, build apps, and teach machines to work.',
  '[TODO: CONTENT] Pilna cikla izstrādātājs ar sistēmu administratora izglītību. Linux eksperts pēc būtības, aparatūras entuziasts brīvajā laikā — remontēju datorus, veidoju lietotnes un mācu mašīnām strādāt.',
  null,
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
    '00000000-0000-4000-8000-000000000201',
    'education',
    'Computer Systems Technician / System Administrator',
    'Datorsistēmu tehniķis / sistēmu administrators',
    '[TODO: CONTENT] Jelgava vocational school',
    '[TODO: CONTENT] Jelgavas profesionālā skola',
    null,
    null,
    '[TODO: CONTENT] Vocational education in computer systems and system administration: hardware, networking, operating systems, and IT infrastructure.',
    '[TODO: CONTENT] Profesionālā izglītība datorsistēmu un sistēmu administrēšanas jomā: aparatūra, tīkli, operētājsistēmas un IT infrastruktūra.',
    10
  ),
  (
    '00000000-0000-4000-8000-000000000202',
    'work',
    '[TODO: CONTENT] Work experience entry',
    '[TODO: CONTENT] Darba pieredzes ieraksts',
    '[TODO: CONTENT] Company name',
    '[TODO: CONTENT] Uzņēmuma nosaukums',
    null,
    null,
    '[TODO: CONTENT] Describe your role and achievements here.',
    '[TODO: CONTENT] Apraksti šeit savu lomu un sasniegumus.',
    5
  )
on conflict (id) do nothing;

-- projects
insert into projects (id, title, description_en, description_lv, image_url, repo_url, live_url, tags, featured, sort_order) values
  (
    '00000000-0000-4000-8000-000000000301',
    '[TODO: CONTENT] Project one',
    '[TODO: CONTENT] What it does, your role, the outcome.',
    '[TODO: CONTENT] Ko tas dara, tava loma, rezultāts.',
    null,
    null,
    null,
    array['[TODO: CONTENT]', 'tech'],
    true,
    1
  ),
  (
    '00000000-0000-4000-8000-000000000302',
    '[TODO: CONTENT] Project two',
    '[TODO: CONTENT] What it does, your role, the outcome.',
    '[TODO: CONTENT] Ko tas dara, tava loma, rezultāts.',
    null,
    null,
    null,
    array['[TODO: CONTENT]', 'tech'],
    false,
    2
  ),
  (
    '00000000-0000-4000-8000-000000000303',
    '[TODO: CONTENT] Project three',
    '[TODO: CONTENT] What it does, your role, the outcome.',
    '[TODO: CONTENT] Ko tas dara, tava loma, rezultāts.',
    null,
    null,
    null,
    array['[TODO: CONTENT]', 'tech'],
    false,
    3
  )
on conflict (id) do nothing;

-- services (icon names from lucide-react)
insert into services (id, title_en, title_lv, description_en, description_lv, icon, sort_order) values
  (
    '00000000-0000-4000-8000-000000000401',
    'Web development',
    'Web izstrāde',
    '[TODO: CONTENT] Custom websites and web apps, from first sketch to deployment.',
    '[TODO: CONTENT] Pielāgotas mājaslapas un web lietotnes — no pirmās skices līdz palaišanai.',
    'Code2',
    1
  ),
  (
    '00000000-0000-4000-8000-000000000402',
    'AI agents & automation',
    'AI aģenti un automatizācija',
    '[TODO: CONTENT] AI-powered agents and workflows that automate repetitive work.',
    '[TODO: CONTENT] AI aģenti un darbplūsmas, kas automatizē rutīnas darbu.',
    'Bot',
    2
  ),
  (
    '00000000-0000-4000-8000-000000000403',
    'Linux & server administration',
    'Linux un serveru administrēšana',
    '[TODO: CONTENT] Server setup, maintenance and hardening on Linux.',
    '[TODO: CONTENT] Serveru uzstādīšana, uzturēšana un drošības nostiprināšana uz Linux.',
    'Terminal',
    3
  ),
  (
    '00000000-0000-4000-8000-000000000404',
    'IT infrastructure & networking',
    'IT infrastruktūra un tīkli',
    '[TODO: CONTENT] Networks, workstations and IT infrastructure that just work.',
    '[TODO: CONTENT] Tīkli, darbstacijas un IT infrastruktūra, kas vienkārši strādā.',
    'Server',
    4
  ),
  (
    '00000000-0000-4000-8000-000000000405',
    'Tech repair & consulting',
    'Tehnikas remonts un konsultācijas',
    '[TODO: CONTENT] Hardware diagnostics, repair advice and honest tech consulting.',
    '[TODO: CONTENT] Aparatūras diagnostika, remonta padomi un godīgas tehnoloģiju konsultācijas.',
    'Wrench',
    5
  )
on conflict (id) do nothing;
