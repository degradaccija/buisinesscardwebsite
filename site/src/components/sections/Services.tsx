import type { Dict } from "@/i18n";
import type { Locale, Service } from "@/lib/types";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ServiceCard } from "@/components/ui/ServiceCard";

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
      <SectionTitle index="05" title={dict.nav.services} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} locale={locale} />
        ))}
      </div>
    </Section>
  );
}
