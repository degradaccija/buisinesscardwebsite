import type { Locale } from "@/lib/types";
import en from "@/i18n/en";
import lv from "@/i18n/lv";

export const locales: Locale[] = ["en", "lv"];

export const defaultLocale: Locale = "en";

export const languageNames: Record<Locale, string> = {
  en: "English",
  lv: "Latviski",
};

export type Dict = typeof en;

const dictionaries: Record<Locale, Dict> = { en, lv };

export function isLocale(value: string): value is Locale {
  return (locales as string[]).includes(value);
}

export function getDictionary(locale: Locale): Dict {
  return dictionaries[locale];
}
