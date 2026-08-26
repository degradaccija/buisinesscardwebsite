import type { MetadataRoute } from "next";
import { siteBaseUrl } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteBaseUrl();
  const languages = { en: `${base}/en`, lv: `${base}/lv` };
  const lastModified = new Date();

  return ["en", "lv"].map((locale) => ({
    url: `${base}/${locale}`,
    lastModified,
    alternates: { languages },
  }));
}
