export type Locale = "en" | "lv";

export interface SiteProfile {
  id: string;
  name: string;
  role_en: string;
  role_lv: string;
  tagline_en: string;
  tagline_lv: string;
  bio_en: string;
  bio_lv: string;
  photo_url: string | null;
  email: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  resume_url: string | null;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  sort_order: number;
}

export type ExperienceType = "work" | "education";

export interface ExperienceItem {
  id: string;
  type: ExperienceType;
  title_en: string;
  title_lv: string;
  organization_en: string;
  organization_lv: string;
  start_date: string | null;
  end_date: string | null;
  description_en: string;
  description_lv: string;
  sort_order: number;
}

export interface Project {
  id: string;
  title: string;
  description_en: string;
  description_lv: string;
  image_url: string | null;
  repo_url: string | null;
  live_url: string | null;
  tags: string[];
  featured: boolean;
  sort_order: number;
}

export interface Service {
  id: string;
  title_en: string;
  title_lv: string;
  description_en: string;
  description_lv: string;
  icon: string;
  sort_order: number;
}

export interface ContactMessageInput {
  name: string;
  email: string;
  message: string;
  locale: Locale;
}
