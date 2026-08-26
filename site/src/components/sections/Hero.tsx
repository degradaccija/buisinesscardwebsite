import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Dict } from "@/i18n";
import type { Locale, SiteProfile } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Monogram } from "@/components/ui/Monogram";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";

export function Hero({
  locale,
  dict,
  profile,
}: {
  locale: Locale;
  dict: Dict;
  profile: SiteProfile | null;
}) {
  if (!profile) {
    return (
      <section id="top" className="flex min-h-[60vh] flex-col justify-center py-24">
        <h1 className="font-display text-3xl font-bold tracking-tight text-accent md:text-4xl">
          {dict.stub.title}
        </h1>
        <p className="mt-2 text-text-muted">{dict.stub.body}</p>
      </section>
    );
  }

  const role = locale === "en" ? profile.role_en : profile.role_lv;
  const tagline = locale === "en" ? profile.tagline_en : profile.tagline_lv;

  return (
    <section id="top" className="flex min-h-[calc(100vh-4rem)] items-center py-16">
      <div className="grid w-full items-center gap-12 md:grid-cols-[1fr_auto]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-text-muted">
            <span className="h-2 w-2 rounded-full bg-terminal" />
            {dict.hero.available}
          </p>
          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight md:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-3 font-mono text-lg text-accent md:text-xl">{role}</p>
          {tagline ? <p className="mt-4 max-w-xl text-text-muted">{tagline}</p> : null}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href="#contact">
              {dict.hero.ctaContact}
              <ArrowRight className="h-4 w-4" />
            </Button>
            {profile.github_url ? (
              <Button
                variant="ghost"
                href={profile.github_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon className="h-4 w-4" />
                GitHub
              </Button>
            ) : null}
            {profile.linkedin_url ? (
              <Button
                variant="ghost"
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon className="h-4 w-4" />
                LinkedIn
              </Button>
            ) : null}
          </div>
        </div>
        <div>
          {profile.photo_url ? (
            <Image
              src={profile.photo_url}
              alt={profile.name}
              width={224}
              height={224}
              className="rounded-lg border border-border object-cover"
              priority
            />
          ) : (
            <Monogram className="h-40 w-40 text-5xl md:h-56 md:w-56" />
          )}
        </div>
      </div>
    </section>
  );
}
