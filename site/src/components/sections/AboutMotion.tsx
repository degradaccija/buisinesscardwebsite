"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { EASE_FLUID, gsap, prefersReducedMotion, useReducedMotion } from "@/lib/motion";

export function AboutMotion({
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
      gsap.fromTo(
        "[data-about-visual]",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: EASE_FLUID,
          scrollTrigger: {
            trigger: "[data-about-visual]",
            start: "top 85%",
            once: true,
          },
        },
      );
      gsap.fromTo(
        "[data-about-caption]",
        { x: 24, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: EASE_FLUID,
          scrollTrigger: {
            trigger: "[data-about-caption]",
            start: "top 85%",
            once: true,
          },
        },
      );
      gsap.fromTo(
        "[data-about-fact]",
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: EASE_FLUID,
          scrollTrigger: {
            trigger: "[data-about-facts]",
            start: "top 85%",
            once: true,
          },
        },
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
