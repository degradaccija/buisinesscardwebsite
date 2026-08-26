import type { ReactNode } from "react";

export function Terminal({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface font-mono text-sm">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="ml-2 text-xs text-text-muted">{title}</span>
      </div>
      <div className="space-y-1.5 px-4 py-4">
        <p>
          <span className="text-terminal">$</span>{" "}
          <span className="text-text-muted">cat {title}</span>
        </p>
        {children}
        <p aria-hidden="true">
          <span className="inline-block h-4 w-2 animate-pulse bg-accent align-text-bottom motion-reduce:animate-none" />
        </p>
      </div>
    </div>
  );
}
