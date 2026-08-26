import type { Dict } from "@/i18n";
import type { Skill } from "@/lib/types";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { GlowCard } from "@/components/ui/GlowCard";
import { SkillBar } from "@/components/ui/SkillBar";

export function Skills({ dict, skills }: { dict: Dict; skills: Skill[] }) {
  if (skills.length === 0) return null;

  const groups = new Map<string, Skill[]>();
  for (const skill of skills) {
    const group = groups.get(skill.category) ?? [];
    group.push(skill);
    groups.set(skill.category, group);
  }

  return (
    <Section id="skills">
      <SectionTitle index="02" title={dict.nav.skills} />
      <div className="grid gap-6 md:grid-cols-2">
        {[...groups.entries()].map(([category, items]) => (
          <GlowCard key={category}>
            <h3 className="mb-4 font-mono text-sm text-accent">{category}</h3>
            <div className="space-y-4">
              {items.map((skill) => (
                <SkillBar key={skill.id} name={skill.name} level={skill.level} />
              ))}
            </div>
          </GlowCard>
        ))}
      </div>
    </Section>
  );
}
