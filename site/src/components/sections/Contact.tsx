import { ArrowUpRight, Mail } from "lucide-react";
import type { Dict } from "@/i18n";
import type { Locale, SiteProfile } from "@/lib/types";
import { Section } from "@/components/ui/Section";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { ContactForm } from "@/components/ContactForm";
import { ContactMotion } from "@/components/sections/ContactMotion";

function handleFromUrl(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/+$/, "");
}

const rowClasses =
  "group flex min-h-11 items-center justify-between gap-4 border-b border-border py-3 transition-colors duration-300 hover:bg-surface";

const keyClasses =
  "flex items-center gap-3 font-mono text-xs font-medium tracking-[0.08em] uppercase text-text-muted";

const valueClasses =
  "flex items-center gap-2 font-mono text-sm transition-colors duration-300 group-hover:text-accent";

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
      <ContactMotion className="grid gap-16 lg:grid-cols-2 lg:gap-20">
        <div className="lg:border-r lg:border-border lg:pr-16">
          <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.01em] text-balance">
            {dict.contact.title}
          </h2>
          <div className="mt-12 border-t border-border">
            {profile?.email ? (
              <a data-contact-channel href={`mailto:${profile.email}`} className={rowClasses}>
                <span className={keyClasses}>
                  <Mail className="h-4 w-4 text-accent" aria-hidden="true" />
                  {dict.contact.channels.email}
                </span>
                <span className={`${valueClasses} text-accent group-hover:text-accent-hover`}>
                  {profile.email}
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-accent transition-transform duration-300 ease-snap group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </a>
            ) : null}
            {profile?.github_url ? (
              <a
                data-contact-channel
                href={profile.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className={rowClasses}
              >
                <span className={keyClasses}>
                  <GitHubIcon className="h-4 w-4 text-accent" />
                  {dict.contact.channels.github}
                </span>
                <span className={`${valueClasses} text-text-primary`}>
                  {handleFromUrl(profile.github_url)}
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-accent transition-transform duration-300 ease-snap group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </a>
            ) : null}
            {profile?.linkedin_url ? (
              <a
                data-contact-channel
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className={rowClasses}
              >
                <span className={keyClasses}>
                  <LinkedInIcon className="h-4 w-4 text-accent" />
                  {dict.contact.channels.linkedin}
                </span>
                <span className={`${valueClasses} text-text-primary`}>
                  {handleFromUrl(profile.linkedin_url)}
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-accent transition-transform duration-300 ease-snap group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </a>
            ) : null}
          </div>
          <p className="mt-8 max-w-prose text-sm text-text-muted text-pretty">
            {dict.contact.note}
          </p>
        </div>
        <div>
          <ContactForm locale={locale} dict={dict} />
        </div>
      </ContactMotion>
    </Section>
  );
}
