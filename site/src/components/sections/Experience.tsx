import { Fragment } from "react";
import type { Dict } from "@/i18n";
import type { ExperienceItem, Locale } from "@/lib/types";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { ExperienceMotion } from "@/components/sections/ExperienceMotion";

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
  return [start, end].filter(Boolean).join(" - ");
}

function railYear(item: ExperienceItem): number | null {
  const date = item.end_date ?? item.start_date;
  return date ? new Date(date).getFullYear() : null;
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

  const groups = [
    {
      type: "work" as const,
      label: dict.experience.groupWork,
      items: items.filter((item) => item.type === "work"),
    },
    {
      type: "education" as const,
      label: dict.experience.groupEducation,
      items: items.filter((item) => item.type === "education"),
    },
  ].filter((group) => group.items.length > 0);

  return (
    <Section id="experience">
      <SectionTitle title={dict.nav.experience} />
      <ExperienceMotion className="grid grid-cols-[36px_1fr] gap-x-4 lg:grid-cols-[140px_56px_1fr] lg:gap-x-0">
        {groups.map((group) => (
          <Fragment key={group.type}>
            <p
              data-xp-label
              className="col-span-2 mt-12 font-mono text-xs font-medium uppercase tracking-[0.1em] text-accent first:mt-0 lg:col-span-3"
            >
              {group.label}
            </p>
            {group.items.map((item, index) => {
              const first = index === 0;
              const last = index === group.items.length - 1;
              const railClass =
                first && last
                  ? ""
                  : first
                    ? "top-[18px] bottom-0"
                    : last
                      ? "top-0 h-[18px]"
                      : "top-0 bottom-0";
              const year = railYear(item);
              const period = formatPeriod(item, dict, locale);
              const title = locale === "en" ? item.title_en : item.title_lv;
              const organization =
                locale === "en" ? item.organization_en : item.organization_lv;
              const description =
                locale === "en" ? item.description_en : item.description_lv;
              return (
                <div key={item.id} data-xp-row className="contents">
                  <span className="hidden pt-1.5 pr-6 text-right font-mono text-xs tracking-[0.05em] text-text-muted lg:block">
                    {year ?? ""}
                  </span>
                  <div className="relative" aria-hidden="true">
                    {railClass ? (
                      <span
                        data-xp-rail
                        className={`absolute left-1/2 w-px -translate-x-1/2 bg-border ${railClass}`}
                      />
                    ) : null}
                    <span
                      data-xp-node
                      className="absolute left-1/2 top-3 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-background bg-accent"
                    />
                  </div>
                  <div data-xp-entry className="rounded-lg pb-12 pl-1 transition-colors hover:bg-surface lg:pl-2">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 pt-1.5">
                      <h3 className="font-display text-lg font-semibold leading-6 text-text-primary">
                        {title}
                      </h3>
                      <span className="font-mono text-sm text-accent">
                        {organization}
                      </span>
                      <Badge>{group.label}</Badge>
                    </div>
                    {description ? (
                      <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-text-muted text-pretty">
                        {description}
                      </p>
                    ) : null}
                    {period ? (
                      <p className="mt-3 font-mono text-xs tracking-[0.05em] text-text-muted">
                        {period}
                      </p>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </Fragment>
        ))}
      </ExperienceMotion>
    </Section>
  );
}
