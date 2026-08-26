import { createBrowserClient } from "@/lib/supabase/client";
import type {
  ExperienceItem,
  Project,
  Service,
  SiteProfile,
  Skill,
} from "@/lib/types";

const configured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export async function getSiteProfile(): Promise<SiteProfile | null> {
  if (!configured) return null;
  const { data, error } = await createBrowserClient()
    .from("site_profile")
    .select("*")
    .limit(1)
    .maybeSingle();
  if (error) return null;
  return data;
}

export async function getSkills(): Promise<Skill[]> {
  if (!configured) return [];
  const { data, error } = await createBrowserClient()
    .from("skills")
    .select("*")
    .order("category")
    .order("sort_order");
  if (error) return [];
  return data;
}

export async function getExperience(): Promise<ExperienceItem[]> {
  if (!configured) return [];
  const { data, error } = await createBrowserClient()
    .from("experience")
    .select("*")
    .order("sort_order", { ascending: false });
  if (error) return [];
  return data;
}

export async function getProjects(): Promise<Project[]> {
  if (!configured) return [];
  const { data, error } = await createBrowserClient()
    .from("projects")
    .select("*")
    .order("featured", { ascending: false })
    .order("sort_order");
  if (error) return [];
  return data;
}

export async function getServices(): Promise<Service[]> {
  if (!configured) return [];
  const { data, error } = await createBrowserClient()
    .from("services")
    .select("*")
    .order("sort_order");
  if (error) return [];
  return data;
}
