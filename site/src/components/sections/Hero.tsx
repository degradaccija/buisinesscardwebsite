import { ArrowRight } from "lucide-react";
import type { Dict } from "@/i18n";
import type { Locale, SiteProfile } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Monogram } from "@/components/ui/Monogram";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { HeroMotion } from "@/components/sections/HeroMotion";
import { HeroCarousel } from "@/components/sections/HeroCarousel";

export function Hero({
  locale,
  dict,
  profile,
  slides,
}: {
  locale: Locale;
  dict: Dict;
  profile: SiteProfile | null;
  slides: { src: string; title: string; alt: string }[];
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
    <section id="top" className="relative">
      <HeroMotion className="grid min-h-[calc(100dvh-4.5rem)] items-center gap-16 py-16 lg:grid-cols-[7fr_5fr] lg:gap-20 lg:py-24">
        <div>
          <p
            data-hero-eyebrow
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-xs text-text-muted"
          >
            <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
            {dict.hero.available}
          </p>
          <h1
            data-hero-headline
            className="mt-8 font-display text-[clamp(2.75rem,6vw,5.5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-balance after:text-accent after:content-['.']"
          >
            {profile.name}
          </h1>
          <p data-hero-role className="mt-5 font-mono text-base text-accent md:text-lg">
            {role}
          </p>
          {tagline ? (
            <p
              data-hero-tagline
              className="mt-5 max-w-[480px] text-pretty text-text-muted"
            >
              {tagline}
            </p>
          ) : null}
          <div data-hero-ctas className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="#contact">
              {dict.cta.contact}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
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
        <div data-hero-visual className="relative mx-auto w-full max-w-[440px] lg:mt-16">
          <div
            aria-hidden="true"
            className="absolute -right-4 top-8 hidden h-full w-full rounded-xl border border-accent/40 lg:block"
          />
          {slides.length > 0 ? (
            <HeroCarousel slides={slides} label={dict.hero.carouselLabel} />
          ) : (
            <Monogram className="relative aspect-[5/6] w-full text-6xl" />
          )}
        </div>
      </HeroMotion>
    </section>
  );
}
