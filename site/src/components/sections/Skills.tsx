import type { Dict } from "@/i18n";
import type { Skill } from "@/lib/types";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SkillsMotion } from "@/components/sections/SkillsMotion";

const CLUSTER_OFFSETS = ["lg:mt-0", "lg:mt-12", "lg:mt-24", "lg:mt-36"];

export function Skills({ dict, skills }: { dict: Dict; skills: Skill[] }) {
  if (skills.length === 0) return null;

  const groups = new Map<string, Skill[]>();
  for (const skill of skills) {
    const group = groups.get(skill.category) ?? [];
    group.push(skill);
    groups.set(skill.category, group);
  }
  const clusters = [...groups.entries()];

  return (
    <Section id="skills">
      <SectionTitle title={dict.nav.skills} body={dict.skills.note} />
      <SkillsMotion className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {clusters.map(([category, items], index) => (
          <div
            key={category}
            data-skill-cluster
            className={`rounded-xl border border-border bg-surface p-6 transition-colors duration-300 hover:border-accent/40 hover:bg-surface-2 ${CLUSTER_OFFSETS[index % CLUSTER_OFFSETS.length]}`}
          >
            <h3 className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.08em] text-accent">
              {category}
            </h3>
            <ul>
              {items.map((skill) => (
                <li
                  key={skill.id}
                  className="flex items-center justify-between gap-4 border-b border-border py-2 last:border-b-0"
                >
                  <span className="text-sm text-text-primary">{skill.name}</span>
                  <span className="font-mono text-[11px] tracking-[0.05em] text-accent">
                    L{skill.level}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.06em] text-text-muted">
              {items.length}{" "}
              {items.length === 1 ? dict.skills.countOne : dict.skills.countOther}
            </p>
          </div>
        ))}
      </SkillsMotion>
    </Section>
  );
}
