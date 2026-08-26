import type { Locale } from "@/lib/types";

export function switchLocalePath(pathname: string, nextLocale: Locale): string {
  const segments = pathname.split("/");
  if (segments[1] === "en" || segments[1] === "lv") {
    segments[1] = nextLocale;
    return segments.join("/") || `/${nextLocale}`;
  }
  return `/${nextLocale}${pathname === "/" ? "" : pathname}`;
}
