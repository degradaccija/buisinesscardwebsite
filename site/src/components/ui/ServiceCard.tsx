import { createElement } from "react";
import type { Service } from "@/lib/types";
import type { Locale } from "@/lib/types";
import { getServiceIcon } from "@/lib/icons";
import { GlowCard } from "@/components/ui/GlowCard";

export function ServiceCard({
  service,
  locale,
}: {
  service: Service;
  locale: Locale;
}) {
  const icon = getServiceIcon(service.icon);
  const title = locale === "en" ? service.title_en : service.title_lv;
  const description =
    locale === "en" ? service.description_en : service.description_lv;

  return (
    <GlowCard>
      {createElement(icon, { className: "h-7 w-7 text-accent", "aria-hidden": true })}
      <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-text-muted">{description}</p>
    </GlowCard>
  );
}
