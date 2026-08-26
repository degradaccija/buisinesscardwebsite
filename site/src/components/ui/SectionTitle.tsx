export function SectionTitle({
  index,
  title,
  subtitle,
}: {
  index: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-10">
      <p className="font-mono text-xs uppercase tracking-wider text-accent">
        {index}. {"//"} {title.toLowerCase()}
      </p>
      <h2 className="mt-2 font-display text-2xl font-bold md:text-4xl">{title}</h2>
      {subtitle ? (
        <p className="mt-3 max-w-2xl text-text-muted">{subtitle}</p>
      ) : null}
    </div>
  );
}
