"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { EASE_FLUID, gsap, prefersReducedMotion, useReducedMotion } from "@/lib/motion";

export function ServicesMotion({
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
        "[data-service-cell]",
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: EASE_FLUID,
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: scope.current,
            start: "top 75%",
            once: true,
          },
        },
      );
    },
    { dependencies: [reduced], scope },
  );

  return (
    <div ref={scope} data-service-grid className={className}>
      {children}
    </div>
  );
}
