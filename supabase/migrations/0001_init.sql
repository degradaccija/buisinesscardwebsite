-- 0001_init.sql — CMS content tables + contact_messages (spec §5)

create extension if not exists "pgcrypto";

-- Content: single-row profile
create table if not exists site_profile (
  id uuid primary key,
  name text not null,
  role_en text not null default '',
  role_lv text not null default '',
  tagline_en text not null default '',
  tagline_lv text not null default '',
  bio_en text not null default '',
  bio_lv text not null default '',
  photo_url text,
  email text,
  github_url text,
  linkedin_url text,
  resume_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  level int not null default 3 check (level between 1 and 5),
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists experience (
  id uuid primary key default gen_random_uuid(),
  type text not null default 'work' check (type in ('work', 'education')),
  title_en text not null default '',
  title_lv text not null default '',
  organization_en text not null default '',
  organization_lv text not null default '',
  start_date date,
  end_date date,
  description_en text not null default '',
  description_lv text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description_en text not null default '',
  description_lv text not null default '',
  image_url text,
  repo_url text,
  live_url text,
  tags text[] not null default '{}',
  featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  title_en text not null,
  title_lv text not null,
  description_en text not null default '',
  description_lv text not null default '',
  icon text not null default 'Code2',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  locale text not null default 'en' check (locale in ('en', 'lv')),
  created_at timestamptz not null default now()
);

create index if not exists experience_sort_idx on experience (sort_order, start_date desc);
create index if not exists projects_sort_idx on projects (sort_order);
create index if not exists services_sort_idx on services (sort_order);
create index if not exists skills_sort_idx on skills (category, sort_order);
create index if not exists contact_messages_created_idx on contact_messages (created_at desc);

-- RLS: content public read; contact_messages public insert only (spec §5)

alter table site_profile enable row level security;
alter table skills enable row level security;
alter table experience enable row level security;
alter table projects enable row level security;
alter table services enable row level security;
alter table contact_messages enable row level security;

drop policy if exists "public read site_profile" on site_profile;
create policy "public read site_profile" on site_profile for select using (true);

drop policy if exists "public read skills" on skills;
create policy "public read skills" on skills for select using (true);

drop policy if exists "public read experience" on experience;
create policy "public read experience" on experience for select using (true);

drop policy if exists "public read projects" on projects;
create policy "public read projects" on projects for select using (true);

drop policy if exists "public read services" on services;
create policy "public read services" on services for select using (true);

drop policy if exists "public insert contact_messages" on contact_messages;
create policy "public insert contact_messages" on contact_messages for insert with check (true);
