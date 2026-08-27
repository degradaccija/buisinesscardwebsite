export function SectionTitle({ title, body }: { title: string; body?: string }) {
  return (
    <div className="mb-12">
      <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.01em] text-balance">
        {title}
      </h2>
      {body ? (
        <p className="mt-4 max-w-prose text-text-muted text-pretty">{body}</p>
      ) : null}
    </div>
  );
}
