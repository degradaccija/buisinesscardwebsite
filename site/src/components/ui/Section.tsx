import type { ReactNode } from "react";

export function Section({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 py-32 md:py-48 ${className ?? ""}`}>
      {children}
    </section>
  );
}
