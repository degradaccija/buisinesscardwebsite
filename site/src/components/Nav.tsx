"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { languageNames } from "@/i18n";
import type { Dict } from "@/i18n";
import type { Locale } from "@/lib/types";
import { switchLocalePath } from "@/lib/locale";

const sections = ["about", "skills", "experience", "projects", "services", "contact"] as const;

export function Nav({ locale, dict }: { locale: Locale; dict: Dict }) {
  const pathname = usePathname();
  const nextLocale: Locale = locale === "en" ? "lv" : "en";
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const section of sections) {
      const el = document.getElementById(section);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}`}
          className="font-display text-lg font-bold tracking-tight"
        >
          <span className="text-accent">[</span>MK<span className="text-accent">]</span>
        </Link>
        <ul className="hidden items-center gap-6 md:flex">
          {sections.map((section, i) => (
            <li key={section}>
              <a
                href={`#${section}`}
                aria-current={active === section ? "true" : undefined}
                className={`font-mono text-xs uppercase tracking-wider transition-colors hover:text-text-primary hover:underline hover:decoration-accent hover:underline-offset-4 ${
                  active === section ? "text-accent" : "text-text-muted"
                }`}
              >
                <span className="mr-1">{String(i + 1).padStart(2, "0")}.</span>
                {dict.nav[section]}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="inline-flex min-h-11 items-center rounded-lg border border-accent px-3 py-1.5 font-mono text-xs text-accent transition-colors hover:bg-accent hover:text-white"
          >
            {dict.hero.ctaContact}
          </a>
          <Link
            href={switchLocalePath(pathname, nextLocale)}
            onClick={() => {
              document.cookie = `NEXT_LOCALE=${nextLocale};path=/;max-age=31536000;samesite=lax`;
            }}
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors hover:border-accent/40 hover:bg-surface-2"
          >
            {languageNames[nextLocale]}
          </Link>
        </div>
      </nav>
    </header>
  );
}
