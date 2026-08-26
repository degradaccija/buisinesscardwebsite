export function SkillBar({ name, level }: { name: string; level: number }) {
  return (
    <div>
      <div className="flex items-center justify-between font-mono text-sm">
        <span className="text-text-primary">{name}</span>
        <span className="flex items-center gap-1" aria-hidden="true">
          {[1, 2, 3, 4, 5].map((dot) => (
            <span
              key={dot}
              className={`h-1.5 w-1.5 rounded-full ${dot <= level ? "bg-accent" : "bg-surface-2"}`}
            />
          ))}
        </span>
      </div>
      <div
        className="mt-1.5 h-1.5 rounded-full bg-surface-2"
        role="progressbar"
        aria-valuenow={level}
        aria-valuemin={1}
        aria-valuemax={5}
        aria-label={name}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent to-accent-hover shadow-[0_0_8px_var(--color-accent-glow)]"
          style={{ width: `${(level / 5) * 100}%` }}
        />
      </div>
    </div>
  );
}
