"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { languageNames } from "@/i18n";
import type { Dict } from "@/i18n";
import type { Locale } from "@/lib/types";
import { switchLocalePath } from "@/lib/locale";
import { EASE_FLUID, gsap, prefersReducedMotion, useReducedMotion } from "@/lib/motion";
import { z } from "@/lib/z";
import { Button } from "@/components/ui/Button";

const sections = ["about", "skills", "experience", "projects", "services", "contact"] as const;

export function Nav({ locale, dict }: { locale: Locale; dict: Dict }) {
  const pathname = usePathname();
  const nextLocale: Locale = locale === "en" ? "lv" : "en";
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const menuRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const mountedRef = useRef(false);

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

  useGSAP(
    () => {
      if (reduced || prefersReducedMotion()) return;
      const overlay = menuRef.current;
      if (!overlay) return;
      const links = overlay.querySelectorAll("[data-menu-link]");
      const tl = gsap.timeline({ paused: true });
      tl.fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: EASE_FLUID },
        0,
      );
      tl.fromTo(
        links,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.08, ease: EASE_FLUID },
        0.08,
      );
      timelineRef.current = tl;
    },
    { dependencies: [reduced] },
  );

  useEffect(() => {
    if (reduced) {
      gsap.set(menuRef.current, { opacity: open ? 1 : 0 });
      return;
    }
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    if (open) {
      timelineRef.current?.play();
    } else {
      timelineRef.current?.reverse();
    }
  }, [open, reduced]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <header
        className="sticky top-0 border-b border-border bg-background/80 backdrop-blur"
        style={{ zIndex: z.nav }}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 md:h-[72px] lg:px-8">
          <Link
            href={`/${locale}`}
            className="shrink-0 font-display text-lg font-bold tracking-tight"
          >
            <span className="text-accent">[</span>MK<span className="text-accent">]</span>
          </Link>
          <ul className="hidden items-center gap-7 md:flex lg:gap-8">
            {sections.map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  aria-current={active === section ? "true" : undefined}
                  className={`text-sm transition-colors hover:text-text-primary ${
                    active === section
                      ? "text-accent underline decoration-accent underline-offset-8"
                      : "text-text-muted"
                  }`}
                >
                  {dict.nav[section]}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <Link
              href={switchLocalePath(pathname, nextLocale)}
              onClick={() => {
                document.cookie = `NEXT_LOCALE=${nextLocale};path=/;max-age=31536000;samesite=lax`;
              }}
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-border px-3 font-mono text-xs uppercase tracking-wider transition-colors hover:border-accent/40 hover:bg-surface-2"
            >
              {languageNames[nextLocale]}
            </Link>
            <Button href="#contact" className="shrink-0 px-4 py-2">
              {dict.cta.contact}
            </Button>
            <button
              type="button"
              aria-label={dict.nav.menu}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((value) => !value)}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-text-primary transition-colors hover:border-accent/40 hover:bg-surface-2 md:hidden"
            >
              <span className="relative block h-3.5 w-5">
                <span
                  className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ease-snap ${
                    open ? "translate-y-[6px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-[6px] h-0.5 w-5 rounded-full bg-current transition-opacity duration-300 ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-[12px] h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ease-snap ${
                    open ? "-translate-y-[6px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>
      <div
        id="mobile-menu"
        ref={menuRef}
        inert={!open}
        className={`fixed inset-0 flex flex-col justify-center gap-2 bg-background/95 px-8 opacity-0 backdrop-blur md:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{ zIndex: z.menu }}
      >
        {sections.map((section) => (
          <a
            key={section}
            href={`#${section}`}
            data-menu-link
            onClick={() => setOpen(false)}
            className={`border-b border-border py-5 font-display text-3xl font-bold transition-colors hover:text-accent ${
              active === section ? "text-accent" : "text-text-primary"
            }`}
          >
            {dict.nav[section]}
          </a>
        ))}
      </div>
    </>
  );
}
