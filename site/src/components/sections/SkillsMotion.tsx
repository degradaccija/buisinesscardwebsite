"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { EASE_FLUID, gsap, prefersReducedMotion, useReducedMotion } from "@/lib/motion";

export function SkillsMotion({
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
        "[data-skill-cluster]",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: EASE_FLUID,
          scrollTrigger: {
            trigger: scope.current,
            start: "top 70%",
            once: true,
          },
        },
      );
    },
    { dependencies: [reduced], scope },
  );

  return (
    <div ref={scope} data-skill-clusters className={className}>
      {children}
    </div>
  );
}
