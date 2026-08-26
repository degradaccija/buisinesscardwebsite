import type { Dict } from "@/i18n";
import type { Locale, SiteProfile } from "@/lib/types";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Terminal } from "@/components/ui/Terminal";

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

  return (
    <Section id="about">
      <SectionTitle index="01" title={dict.nav.about} />
      <div className="grid gap-10 md:grid-cols-2 md:items-start">
        <div className="space-y-4 text-text-muted">
          {paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        <Terminal title={dict.about.terminalTitle}>
          <p>
            <span className="text-terminal">$</span> {dict.about.terminalCommand}
          </p>
          <p className="text-accent">{profile.name}</p>
          <p>
            <span className="text-terminal">$</span> uname -a
          </p>
          <p className="text-text-muted">{dict.about.terminalLine}</p>
        </Terminal>
      </div>
    </Section>
  );
}
