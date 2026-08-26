export function TimelineItem({
  title,
  organization,
  period,
  description,
  badge,
}: {
  title: string;
  organization: string;
  period: string;
  description: string;
  badge: string;
}) {
  return (
    <li className="relative border-l border-border pl-6 pb-10 last:pb-0">
      <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="font-display text-lg font-semibold">{title}</h3>
        <span className="font-mono text-xs text-text-muted">{period}</span>
      </div>
      <div className="mt-1 flex items-center gap-3">
        <p className="font-mono text-sm text-accent">{organization}</p>
        <span className="rounded-full border border-border bg-surface-2 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-text-muted">
          {badge}
        </span>
      </div>
      {description ? (
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
          {description}
        </p>
      ) : null}
    </li>
  );
}
