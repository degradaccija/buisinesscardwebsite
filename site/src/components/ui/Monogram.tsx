export function Monogram({ className }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl border border-accent/50 bg-surface font-display font-bold text-accent ${className ?? ""}`}
    >
      MK
    </div>
  );
}
