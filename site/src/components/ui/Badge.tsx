import type { ReactNode } from "react";

export function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-border bg-surface-2 px-2.5 py-0.5 font-mono text-xs uppercase tracking-wider text-text-muted ${className ?? ""}`}
    >
      {children}
    </span>
  );
}
