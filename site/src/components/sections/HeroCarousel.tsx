"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "@/lib/motion";

const ADVANCE_MS = 5000;

export function HeroCarousel({
  slides,
  label,
}: {
  slides: { src: string; title: string; alt: string }[];
  label: string;
}) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced || slides.length < 2) return;
    const id = setInterval(
      () => setIndex((current) => (current + 1) % slides.length),
      ADVANCE_MS,
    );
    return () => clearInterval(id);
  }, [reduced, slides.length]);

  if (slides.length === 0) return null;

  return (
    <div
      role="group"
      aria-label={label}
      className="relative aspect-[5/6] w-full overflow-hidden rounded-xl border border-border bg-surface"
    >
      {slides.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={i === index ? slide.alt : ""}
          aria-hidden={i !== index}
          fill
          sizes="(min-width: 448px) 440px, 100vw"
          priority={i === 0}
          className={`object-cover transition-opacity duration-700 ease-fluid motion-reduce:transition-none ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-x-3 bottom-3 flex items-end gap-3">
        <p className="min-w-0 flex-1 truncate rounded-full border border-border bg-surface-2 px-2.5 py-1 font-mono text-xs text-text-muted">
          {slides[index].title}
        </p>
        <div className="flex shrink-0 items-center gap-1.5 pb-1.5" aria-hidden="true">
          {slides.map((slide, i) => (
            <span
              key={slide.src}
              className={`h-1.5 w-1.5 rounded-full ${i === index ? "bg-accent" : "bg-text-muted/50"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
