"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { EASE_FLUID, gsap, prefersReducedMotion, useReducedMotion } from "@/lib/motion";

export function ContactMotion({
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
      const clear = "transform,opacity";
      gsap.fromTo(
        "[data-contact-field]",
        { x: -24, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.07,
          ease: EASE_FLUID,
          clearProps: clear,
          scrollTrigger: {
            trigger: scope.current,
            start: "top 80%",
            once: true,
          },
        },
      );
      gsap.fromTo(
        "[data-contact-channel]",
        { x: 24, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.07,
          ease: EASE_FLUID,
          clearProps: clear,
          scrollTrigger: {
            trigger: scope.current,
            start: "top 80%",
            once: true,
          },
        },
      );
    },
    { dependencies: [reduced], scope },
  );

  return (
    <div ref={scope} data-contact-split className={className}>
      {children}
    </div>
  );
}
