import type { Dict } from "@/i18n";
import type { Locale, Service } from "@/lib/types";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ServiceCell } from "@/components/ui/ServiceCell";
import type { ServiceTreatment } from "@/components/ui/ServiceCell";
import { ServicesMotion } from "@/components/sections/ServicesMotion";

const TREATMENTS: ServiceTreatment[] = [
  "dominant",
  "plain",
  "tinted",
  "pattern",
  "wide",
];

export function Services({
  locale,
  dict,
  services,
}: {
  locale: Locale;
  dict: Dict;
  services: Service[];
}) {
  if (services.length === 0) return null;

  return (
    <Section id="services">
      <SectionTitle title={dict.nav.services} />
      <ServicesMotion className="grid gap-4 md:auto-rows-[96px] md:grid-cols-12">
        {services.map((service, index) => (
          <ServiceCell
            key={service.id}
            service={service}
            locale={locale}
            treatment={TREATMENTS[index] ?? "wide"}
          />
        ))}
      </ServicesMotion>
    </Section>
  );
}
