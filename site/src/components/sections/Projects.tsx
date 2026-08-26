import type { Dict } from "@/i18n";
import type { Locale, Project } from "@/lib/types";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProjectCard } from "@/components/ui/ProjectCard";

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

  return (
    <Section id="projects">
      <SectionTitle index="04" title={dict.nav.projects} />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} locale={locale} dict={dict} />
        ))}
      </div>
    </Section>
  );
}
