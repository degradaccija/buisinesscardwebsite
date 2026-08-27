"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { EASE_FLUID, gsap, prefersReducedMotion, useReducedMotion } from "@/lib/motion";

export function HeroMotion({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const scope = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || prefersReducedMotion()) return;
      const tl = gsap.timeline({ defaults: { ease: EASE_FLUID } });
      tl.fromTo(
        "[data-hero-eyebrow]",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0,
      )
        .fromTo(
          "[data-hero-headline]",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          0.08,
        )
        .fromTo(
          "[data-hero-role]",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          0.2,
        )
        .fromTo(
          "[data-hero-tagline]",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          0.3,
        )
        .fromTo(
          "[data-hero-ctas] > *",
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.06 },
          0.4,
        )
        .fromTo(
          "[data-hero-visual]",
          { scale: 0.94, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.9 },
          0.55,
        );
    },
    { dependencies: [reduced], scope },
  );

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
