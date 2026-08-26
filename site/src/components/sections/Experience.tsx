import type { Dict } from "@/i18n";
import type { ExperienceItem, Locale } from "@/lib/types";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TimelineItem } from "@/components/ui/TimelineItem";

function formatDate(date: string | null, locale: Locale): string | null {
  if (!date) return null;
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "lv-LV", {
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function formatPeriod(
  item: ExperienceItem,
  dict: Dict,
  locale: Locale,
): string | null {
  const start = formatDate(item.start_date, locale);
  const end = item.end_date
    ? formatDate(item.end_date, locale)
    : dict.experience.present;
  if (!start && !end) return null;
  return [start, end].filter(Boolean).join(" — ");
}

export function Experience({
  locale,
  dict,
  items,
}: {
  locale: Locale;
  dict: Dict;
  items: ExperienceItem[];
}) {
  if (items.length === 0) return null;

  return (
    <Section id="experience">
      <SectionTitle index="03" title={dict.nav.experience} />
      <ul>
        {items.map((item) => (
          <TimelineItem
            key={item.id}
            title={locale === "en" ? item.title_en : item.title_lv}
            organization={
              locale === "en" ? item.organization_en : item.organization_lv
            }
            period={formatPeriod(item, dict, locale) ?? ""}
            description={
              locale === "en" ? item.description_en : item.description_lv
            }
            badge={
              item.type === "education"
                ? dict.experience.education
                : dict.experience.work
            }
          />
        ))}
      </ul>
    </Section>
  );
}
