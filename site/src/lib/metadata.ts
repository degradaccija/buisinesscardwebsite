import type { Metadata } from "next";
import { getDictionary } from "@/i18n";
import type { SiteProfile } from "@/lib/types";

export function siteBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export async function buildMetadata(
  locale: "en" | "lv",
  profile: SiteProfile | null,
): Promise<Metadata> {
  const dict = getDictionary(locale);
  const role = profile
    ? locale === "en"
      ? profile.role_en
      : profile.role_lv
    : null;
  const tagline = profile
    ? locale === "en"
      ? profile.tagline_en
      : profile.tagline_lv
    : "";
  const title = profile && role ? `${profile.name} | ${role}` : dict.meta.title;
  const description =
    profile && tagline.trim().length > 0 ? tagline : dict.meta.description;
  const url = `${siteBaseUrl()}/${locale}`;
  const images = [{ url: `/${locale}/opengraph-image`, width: 1200, height: 630 }];

  return {
    title,
    description,
    metadataBase: new URL(siteBaseUrl()),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        lv: "/lv",
      },
    },
    openGraph: {
      type: "website",
      siteName: "Mārcis Krēgers",
      locale: locale === "en" ? "en_US" : "lv_LV",
      url,
      title,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}
