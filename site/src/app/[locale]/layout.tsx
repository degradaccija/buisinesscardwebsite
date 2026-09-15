import type { Metadata } from "next";
import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { Geist, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { getDictionary, isLocale, locales } from "@/i18n";
import { getSiteProfile } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CookieNotice } from "@/components/CookieNotice";
import { PostHogAnalytics } from "@/components/PostHogAnalytics";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin", "latin-ext"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin", "latin-ext"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "latin-ext"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  const profile = await getSiteProfile();
  return buildMetadata(locale, profile);
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) redirect("/en");

  const dict = getDictionary(locale);
  const profile = await getSiteProfile();

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${geist.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
        >
          {dict.skipLink}
        </a>
        <Nav locale={locale} dict={dict} />
        {children}
        <Footer dict={dict} profile={profile} locale={locale} />
        <CookieNotice locale={locale} dict={dict} />
        <PostHogAnalytics />
      </body>
    </html>
  );
}
