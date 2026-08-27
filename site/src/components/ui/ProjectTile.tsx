import type { Project } from "@/lib/types";
import { ProjectVisual } from "@/components/ui/ProjectVisual";

const SPAN_CLASSES: Record<number, string> = {
  3: "sm:col-span-3",
  4: "sm:col-span-4",
  5: "sm:col-span-5",
  7: "sm:col-span-7",
  8: "sm:col-span-8",
  12: "sm:col-span-12",
};

export function ProjectTile({
  project,
  span,
}: {
  project: Project;
  span: number;
}) {
  const meta = project.tags.slice(0, 3).join(" / ");
  const href = project.live_url ?? project.repo_url;
  const spanClass = SPAN_CLASSES[span] ?? "sm:col-span-12";

  return (
    <div
      data-project-tile
      className={`group relative -ml-px -mt-px row-span-2 overflow-hidden border border-border bg-surface transition-colors duration-300 hover:z-10 hover:border-accent/40 ${spanClass}`}
    >
      <ProjectVisual
        project={project}
        sizes="(min-width: 1024px) 40vw, 100vw"
        className="transition-transform duration-700 ease-snap group-hover:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 flex items-baseline justify-between gap-3 bg-linear-to-t from-background/95 to-transparent px-4 py-3 md:px-5 md:py-4">
        <span className="font-display text-sm font-semibold text-text-primary transition-colors duration-300 group-hover:text-accent md:text-base">
          {project.title}
        </span>
        {meta ? (
          <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-text-muted">
            {meta}
          </span>
        ) : null}
      </div>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={project.title}
          className="absolute inset-0"
        />
      ) : null}
    </div>
  );
}
