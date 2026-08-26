import type { ReactNode } from "react";

export function GlowCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border border-border bg-surface p-6 transition-all hover:border-accent/60 hover:shadow-[0_0_32px_var(--color-accent-glow)] motion-safe:hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
