import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, isLocale } from "@/i18n";
import { siteBaseUrl } from "@/lib/metadata";
import { Monogram } from "@/components/ui/Monogram";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "lv" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  const dict = getDictionary(locale);
  return {
    title: dict.privacy.title,
    description: dict.privacy.intro,
    metadataBase: new URL(siteBaseUrl()),
    alternates: {
      canonical: `/${locale}/privacy`,
      languages: { en: "/en/privacy", lv: "/lv/privacy" },
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  const dict = getDictionary(locale);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-32 sm:px-6">
      <Monogram className="mb-8" />
      <h1 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.01em]">
        {dict.privacy.title}
      </h1>
      <p className="mt-2 font-mono text-xs tracking-[0.04em] text-text-muted">
        {dict.privacy.updated}
      </p>
      <p className="mt-6 max-w-prose leading-relaxed text-text-muted">
        {dict.privacy.intro}
      </p>

      <h2 className="mt-12 font-display text-xl font-bold">
        {dict.privacy.controllerHeading}
      </h2>
      <p className="mt-3 max-w-prose leading-relaxed text-text-muted">
        {dict.privacy.controllerBody}
      </p>

      <h2 className="mt-12 font-display text-xl font-bold">
        {dict.privacy.dataHeading}
      </h2>
      <dl className="mt-6 space-y-6">
        {dict.privacy.dataItems.map((item) => (
          <div key={item.term} className="border-l-2 border-border pl-4">
            <dt className="font-mono text-sm font-medium tracking-[0.04em] text-text-primary">
              {item.term}
            </dt>
            <dd className="mt-1 max-w-prose text-sm leading-relaxed text-text-muted">
              {item.text}
            </dd>
          </div>
        ))}
      </dl>

      <h2 className="mt-12 font-display text-xl font-bold">
        {dict.privacy.noTrackingHeading}
      </h2>
      <p className="mt-3 max-w-prose leading-relaxed text-text-muted">
        {dict.privacy.noTrackingBody}
      </p>

      <h2 className="mt-12 font-display text-xl font-bold">
        {dict.privacy.processorsHeading}
      </h2>
      <p className="mt-3 max-w-prose leading-relaxed text-text-muted">
        {dict.privacy.processorsBody}
      </p>

      <h2 className="mt-12 font-display text-xl font-bold">
        {dict.privacy.retentionHeading}
      </h2>
      <p className="mt-3 max-w-prose leading-relaxed text-text-muted">
        {dict.privacy.retentionBody}
      </p>

      <h2 className="mt-12 font-display text-xl font-bold">
        {dict.privacy.rightsHeading}
      </h2>
      <p className="mt-3 max-w-prose leading-relaxed text-text-muted">
        {dict.privacy.rightsBody}
      </p>

      <p className="mt-16 border-t border-border pt-8">
        <Link
          href={`/${locale}`}
          className="font-mono text-sm text-accent underline-offset-4 hover:underline"
        >
          {dict.privacy.backHome}
        </Link>
      </p>
    </main>
  );
}
