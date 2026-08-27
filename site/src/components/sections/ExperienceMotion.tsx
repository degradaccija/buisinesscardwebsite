"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { EASE_FLUID, EASE_SNAP, gsap, prefersReducedMotion, useReducedMotion } from "@/lib/motion";

export function ExperienceMotion({
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
      gsap.utils.toArray<HTMLElement>("[data-xp-row]").forEach((row) => {
        const entry = row.querySelector<HTMLElement>("[data-xp-entry]");
        const rail = row.querySelector<HTMLElement>("[data-xp-rail]");
        const node = row.querySelector<HTMLElement>("[data-xp-node]");
        if (!entry) return;
        const trigger = {
          trigger: entry,
          start: "top 85%",
          once: true,
        };
        gsap.fromTo(
          entry,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: EASE_FLUID,
            scrollTrigger: trigger,
          },
        );
        if (rail) {
          gsap.fromTo(
            rail,
            { scaleY: 0, transformOrigin: "top center" },
            {
              scaleY: 1,
              duration: 0.5,
              ease: EASE_FLUID,
              scrollTrigger: trigger,
            },
          );
        }
        if (node) {
          gsap.fromTo(
            node,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.35,
              delay: 0.15,
              ease: EASE_SNAP,
              scrollTrigger: trigger,
            },
          );
        }
      });
      gsap.utils.toArray<HTMLElement>("[data-xp-label]").forEach((label) => {
        gsap.fromTo(
          label,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: EASE_FLUID,
            scrollTrigger: {
              trigger: label,
              start: "top 85%",
              once: true,
            },
          },
        );
      });
    },
    { dependencies: [reduced], scope },
  );

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
