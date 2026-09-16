"use client";

import { ArrowUpRight } from "lucide-react";
import posthog from "posthog-js";
import type { Dict } from "@/i18n";
import type { Locale, Project } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { ProjectVisual } from "@/components/ui/ProjectVisual";

export function ProjectCard({
  project,
  locale,
  dict,
  first = false,
}: {
  project: Project;
  locale: Locale;
  dict: Dict;
  first?: boolean;
}) {
  const description =
    locale === "en" ? project.description_en : project.description_lv;

  function captureProjectLink(linkType: "live" | "repository") {
    if (!posthog.__loaded) return;
    posthog.capture("project_link_clicked", {
      project_id: project.id,
      link_type: linkType,
      placement: "featured_card",
      locale,
    });
  }

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-xl border border-border bg-surface ${
        first ? "shadow-[0_0_32px_var(--color-accent-glow)]" : ""
      }`}
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border">
        <ProjectVisual
          project={project}
          sizes="(min-width: 896px) 896px, 100vw"
          className="transition-transform duration-700 ease-snap group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-8">
        {project.tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        ) : null}
        <h3 className="mt-4 font-display text-2xl font-bold tracking-[-0.01em] text-text-primary">
          {project.title}
        </h3>
        {description ? (
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-text-muted text-pretty md:text-base">
            {description}
          </p>
        ) : null}
        {project.repo_url || project.live_url ? (
          <div className="mt-8 flex items-center gap-6 border-t border-border pt-4">
            {project.live_url ? (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => captureProjectLink("live")}
                className="inline-flex items-center gap-1.5 font-mono text-sm text-accent transition-colors hover:text-accent-hover"
              >
                {dict.projects.live}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : null}
            {project.repo_url ? (
              <a
                href={project.repo_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => captureProjectLink("repository")}
                className="inline-flex items-center gap-1.5 font-mono text-sm text-text-muted transition-colors hover:text-accent"
              >
                <GitHubIcon className="h-4 w-4" />
                {dict.projects.repo}
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}
