"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap, prefersReducedMotion, useReducedMotion } from "@/lib/motion";

export function ProjectsStack({ cards }: { cards: ReactNode[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || prefersReducedMotion() || !ref.current) return;
    const ctx = gsap.context(() => {
      const cardEls = gsap.utils.toArray<HTMLElement>(".stack-card");
      cardEls.forEach((card, i) => {
        if (i === cardEls.length - 1) return;
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: cardEls[cardEls.length - 1],
          end: "top top",
          pin: true,
          pinSpacing: false,
        });
        gsap.to(card, {
          scale: 0.92,
          opacity: 0.55,
          ease: "none",
          scrollTrigger: {
            trigger: cardEls[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, [reduced, cards.length]);

  return (
    <div ref={ref} className="relative">
      {cards.map((card, i) => (
        <div
          key={i}
          className={
            reduced
              ? "flex justify-center py-10"
              : "stack-card sticky top-0 flex min-h-[100dvh] items-center justify-center"
          }
        >
          <div className="w-full max-w-4xl">{card}</div>
        </div>
      ))}
    </div>
  );
}
