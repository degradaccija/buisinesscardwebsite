import { Link2 } from "lucide-react";
import type { Project } from "@/lib/types";
import type { Dict } from "@/i18n";
import { Badge } from "@/components/ui/Badge";
import { GlowCard } from "@/components/ui/GlowCard";
import { GitHubIcon } from "@/components/ui/BrandIcons";

export function ProjectCard({
  project,
  locale,
  dict,
}: {
  project: Project;
  locale: "en" | "lv";
  dict: Dict;
}) {
  const description =
    locale === "en" ? project.description_en : project.description_lv;

  return (
    <GlowCard className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-lg font-semibold">{project.title}</h3>
        {project.featured ? (
          <Badge className="border-accent/50 text-accent">*</Badge>
        ) : null}
      </div>
      <p className="mt-2 flex-1 text-sm text-text-muted">{description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
      {(project.repo_url || project.live_url) && (
        <div className="mt-4 flex gap-4 border-t border-border pt-4 font-mono text-sm">
          {project.repo_url ? (
            <a
              href={project.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-text-muted transition-colors hover:text-accent"
            >
              <GitHubIcon className="h-4 w-4" />
              {dict.projects.repo}
            </a>
          ) : null}
          {project.live_url ? (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-text-muted transition-colors hover:text-accent"
            >
              <Link2 className="h-4 w-4" />
              {dict.projects.live}
            </a>
          ) : null}
        </div>
      )}
    </GlowCard>
  );
}
