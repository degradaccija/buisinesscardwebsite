import type { Dict } from "@/i18n";
import type { Locale, Project } from "@/lib/types";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectTile } from "@/components/ui/ProjectTile";
import { ProjectsStack } from "@/components/sections/ProjectsStack";
import { ProjectsGridMotion } from "@/components/sections/ProjectsGridMotion";

const GRID_BASE = [5, 7, 4, 8, 4, 8];
const GRID_SMALL: Record<number, number[]> = {
  1: [12],
  2: [7, 5],
  3: [5, 7, 12],
  4: [5, 7, 4, 8],
  5: [5, 7, 4, 4, 4],
};

function gridSpans(count: number): number[] {
  if (count <= 0) return [];
  if (count <= 5) return GRID_SMALL[count];
  const blocks = Math.floor(count / 6);
  const rest = count % 6;
  const spans: number[] = [];
  for (let i = 0; i < blocks; i++) spans.push(...GRID_BASE);
  if (rest > 0) spans.push(...GRID_SMALL[rest]);
  return spans;
}

export function Projects({
  locale,
  dict,
  projects,
}: {
  locale: Locale;
  dict: Dict;
  projects: Project[];
}) {
  if (projects.length === 0) return null;

  const featured = projects.filter((project) => project.featured);
  const rest = projects.filter((project) => !project.featured);
  const spans = gridSpans(rest.length);

  const featuredCards = featured.map((project, index) => (
    <ProjectCard
      key={project.id}
      project={project}
      locale={locale}
      dict={dict}
      first={index === 0}
    />
  ));

  return (
    <Section id="projects">
      <SectionTitle title={dict.nav.projects} />
      {featuredCards.length > 0 ? (
        <>
          <p className="mb-8 font-mono text-xs font-medium uppercase tracking-[0.08em] text-text-muted">
            {dict.projects.featured}
          </p>
          {featuredCards.length > 1 ? (
            <ProjectsStack cards={featuredCards} />
          ) : (
            <div className="mx-auto max-w-4xl">{featuredCards[0]}</div>
          )}
        </>
      ) : null}
      {rest.length > 0 ? (
        <div className={featuredCards.length > 0 ? "mt-24 md:mt-32" : ""}>
          <ProjectsGridMotion className="grid auto-rows-[8rem] grid-flow-dense grid-cols-1 overflow-hidden rounded-xl border border-border sm:grid-cols-12">
            {rest.map((project, index) => (
              <ProjectTile
                key={project.id}
                project={project}
                span={spans[index]}
              />
            ))}
          </ProjectsGridMotion>
        </div>
      ) : null}
    </Section>
  );
}
