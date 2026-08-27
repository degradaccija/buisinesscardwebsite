import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Dict } from "@/i18n";
import type { Locale, SiteProfile } from "@/lib/types";
import { parseEmphasis } from "@/lib/text";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Monogram } from "@/components/ui/Monogram";
import { AboutMotion } from "@/components/sections/AboutMotion";

export function About({
  locale,
  dict,
  profile,
}: {
  locale: Locale;
  dict: Dict;
  profile: SiteProfile | null;
}) {
  if (!profile) return null;

  const bio = locale === "en" ? profile.bio_en : profile.bio_lv;
  const paragraphs = bio.split(/\n+/).filter(Boolean);
  const role = locale === "en" ? profile.role_en : profile.role_lv;

  return (
    <Section id="about">
      <SectionTitle title={dict.nav.about} />
      <AboutMotion className="grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div data-about-visual className="relative lg:col-span-7">
          <div
            aria-hidden="true"
            className="absolute -left-4 -top-4 h-40 w-40 rounded-xl border border-border bg-surface-2 lg:h-56 lg:w-56"
          />
          <div
            aria-hidden="true"
            className="absolute left-4 top-4 h-full w-full rounded-xl border border-accent/40 lg:left-6 lg:top-6"
          />
          {profile.photo_url ? (
            <Image
              src={profile.photo_url}
              alt={profile.name}
              width={1120}
              height={800}
              className="relative aspect-[7/5] w-full rounded-xl border border-border object-cover object-[center_20%]"
            />
          ) : (
            <Monogram className="relative aspect-[7/5] w-full text-6xl" />
          )}
        </div>
        <div data-about-caption className="lg:col-span-4 lg:col-start-9 lg:mt-24">
          <div className="space-y-4 text-pretty text-text-muted">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{parseEmphasis(paragraph)}</p>
            ))}
          </div>
          <dl data-about-facts className="mt-8 border-t border-border">
            <div
              data-about-fact
              className="flex items-baseline justify-between gap-6 border-b border-border py-3"
            >
              <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted">
                {dict.about.facts.role}
              </dt>
              <dd className="text-right text-sm text-text-primary">{role}</dd>
            </div>
            <div
              data-about-fact
              className="flex items-baseline justify-between gap-6 border-b border-border py-3"
            >
              <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted">
                {dict.about.facts.focus}
              </dt>
              <dd className="text-right text-sm text-text-primary">
                {dict.about.focusValue}
              </dd>
            </div>
            <div
              data-about-fact
              className="flex items-baseline justify-between gap-6 border-b border-border py-3"
            >
              <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted">
                {dict.about.facts.languages}
              </dt>
              <dd className="text-right text-sm text-text-primary">
                {dict.about.languagesValue}
              </dd>
            </div>
          </dl>
          {profile.resume_url ? (
            <a
              href={profile.resume_url}
              className="group mt-6 inline-flex items-center gap-2 font-mono text-sm text-accent"
            >
              <span className="relative after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 after:ease-fluid group-hover:after:scale-x-100">
                {dict.about.cv}
              </span>
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          ) : null}
        </div>
      </AboutMotion>
    </Section>
  );
}
