-- Copy polish (unslop pass 2026-09-16): mirrors supabase/seed.sql edits
update site_profile
set bio_en = 'I trained as a computer systems technician. Day to day I work with Linux because I believe in the Unix philosophy. I build web apps with React, Next.js, and TypeScript, and develop AI agents that automate the monotonous parts of development and server maintenance.\n\nI also maintain and repair computers and electronics of all kinds, from diagnostics to SMD component reballing and board level repair.',
    bio_lv = 'Esmu apguvis datorsistēmu tehniķa profesiju. Ikdienā labprāt strādāju ar Linux, jo piekrītu Unix filozofijai. Protu veidot web lietotnes ar React, Next.js un TypeScript, kā arī izstrādāju MI aģentus, kas automatizē monotonus izstrādes un serveru uzturēšanas procesus.\n\nKopju un remontēju arī datorus un elektroniku: no diagnostikas līdz SMD komponenšu pārlodēšanai un board level repair.'
where id = '00000000-0000-4000-8000-000000000001';

update experience
set description_en = 'Ran show technology for Riga Fashion Week, two seasons per year: planned and managed stage, lighting, sound, and AV for the runway shows and led the technical crew on site.',
    description_lv = 'Atbildēju par tehnisko nodrošinājumu Riga Fashion Week skatēs, kas notiek divas reizes gadā: plānoju un uzraudzīju skatuves, gaismas, skaņas un AV risinājumus un pasākuma laikā vadīju tehnisko komandu.'
where id = '00000000-0000-4000-8000-000000000212';

update projects
set description_en = 'An always-on AI agent setup built on Hermes Agent (Nous Research). The agent core is theirs. The guardrails, custom skills, cron automations, and service wrappers that run my home server day to day are mine. Every tool call is logged to SQLite, so a failed run can be replayed and inspected step by step.',
    description_lv = 'Vienmēr strādājošs MI aģenta uzstādījums uz Hermes Agent (Nous Research) bāzes. Pats aģenta kodols ir gatava atvērtā koda tehnoloģija, bet drošības robežas, pielāgotās prasmes, cron automatizācijas un servisu ietinēji, kas ik dienu uzrauga manu mājas serveri, ir mani darbi. Katrs rīka izsaukums tiek fiksēts SQLite, tāpēc jebkuru neveiksmīgu izpildi var atskaņot un izpētīt soli pa solim.'
where id = '00000000-0000-4000-8000-000000000301';

update services
set description_en = 'Hardware diagnostics and repair for laptops and desktops, plus practical advice on what to buy and when to replace rather than repair.'
where id = '00000000-0000-4000-8000-000000000405';
