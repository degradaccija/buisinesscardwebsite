import { Mail } from "lucide-react";
import type { Dict } from "@/i18n";
import type { Locale, SiteProfile } from "@/lib/types";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { ContactForm } from "@/components/ContactForm";

export function Contact({
  locale,
  dict,
  profile,
}: {
  locale: Locale;
  dict: Dict;
  profile: SiteProfile | null;
}) {
  return (
    <Section id="contact">
      <SectionTitle index="06" title={dict.nav.contact} />
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <p className="font-mono text-sm text-text-muted">{dict.contact.emailMe}</p>
          {profile?.email ? (
            <a
              href={`mailto:${profile.email}`}
              className="mt-3 inline-flex items-center gap-2 font-display text-lg font-semibold text-accent transition-colors hover:text-accent-hover"
            >
              <Mail className="h-5 w-5" />
              {profile.email}
            </a>
          ) : null}
          <div className="mt-6 flex gap-4">
            {profile?.github_url ? (
              <a
                href={profile.github_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-text-muted transition-colors hover:text-accent"
              >
                <GitHubIcon className="h-6 w-6" />
              </a>
            ) : null}
            {profile?.linkedin_url ? (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-text-muted transition-colors hover:text-accent"
              >
                <LinkedInIcon className="h-6 w-6" />
              </a>
            ) : null}
          </div>
        </div>
        <div>
          <ContactForm locale={locale} dict={dict} />
        </div>
      </div>
    </Section>
  );
}
