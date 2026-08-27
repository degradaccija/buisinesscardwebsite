import { createElement } from "react";
import type { Locale, Service } from "@/lib/types";
import { getServiceIcon } from "@/lib/icons";

export type ServiceTreatment = "dominant" | "plain" | "tinted" | "pattern" | "wide";

const SPAN_CLASSES: Record<ServiceTreatment, string> = {
  dominant: "border-accent/40 md:col-span-7 md:row-span-3",
  plain: "md:col-span-5 md:row-span-3",
  tinted: "md:col-span-5 md:row-span-3",
  pattern: "md:col-span-7 md:row-span-3",
  wide: "md:col-span-12 md:row-span-2",
};

const SURFACE_CLASSES: Record<ServiceTreatment, string> = {
  dominant: "bg-surface",
  plain: "bg-surface",
  tinted: "bg-surface-2",
  pattern: "bg-surface",
  wide: "bg-surface",
};

const DOT_PATTERN: Record<string, string> = {
  backgroundImage: "radial-gradient(var(--color-border) 1px, transparent 1px)",
  backgroundSize: "14px 14px",
};

export function ServiceCell({
  service,
  locale,
  treatment,
}: {
  service: Service;
  locale: Locale;
  treatment: ServiceTreatment;
}) {
  const icon = getServiceIcon(service.icon);
  const title = locale === "en" ? service.title_en : service.title_lv;
  const description =
    locale === "en" ? service.description_en : service.description_lv;
  const dominant = treatment === "dominant";
  const wide = treatment === "wide";

  return (
    <article
      data-service-cell
      style={treatment === "pattern" ? DOT_PATTERN : undefined}
      className={`group rounded-xl border border-border p-6 transition-[border-color,background-color,transform] duration-300 ease-snap hover:border-accent/40 hover:bg-surface-2 motion-safe:hover:-translate-y-0.5 md:p-8 ${SPAN_CLASSES[treatment]} ${SURFACE_CLASSES[treatment]} ${
        wide ? "md:flex md:items-center md:gap-8" : ""
      }`}
    >
      <span
        className={`inline-flex shrink-0 items-center justify-center rounded-full border border-border bg-surface-2 text-accent transition-colors duration-300 group-hover:border-accent/40 ${
          dominant ? "h-12 w-12" : "h-10 w-10"
        } ${wide ? "mb-4 md:mb-0" : "mb-5"}`}
        aria-hidden="true"
      >
        {createElement(icon, { className: dominant ? "h-6 w-6" : "h-5 w-5" })}
      </span>
      <div className="min-w-0">
        <h3
          className={`font-display font-semibold text-text-primary ${
            dominant ? "text-xl md:text-2xl" : "text-lg"
          }`}
        >
          {title}
        </h3>
        <p
          className={`mt-2 text-sm leading-relaxed text-text-muted text-pretty ${
            dominant ? "max-w-[46ch]" : ""
          }`}
        >
          {description}
        </p>
      </div>
    </article>
  );
}
