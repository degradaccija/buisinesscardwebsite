export function Monogram({ className }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg border border-accent/50 bg-surface font-display text-xl font-bold text-accent shadow-[0_0_24px_var(--color-accent-glow)] ${className ?? ""}`}
    >
      MK
    </div>
  );
}
