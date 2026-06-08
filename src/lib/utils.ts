import type { Locale, LocalizedText } from "@/lib/types";
import { SUPPORTED_LOCALES } from "@/lib/types";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function normalizeLocale(
  value: string | string[] | undefined,
  fallback: Locale = "en",
): Locale {
  const candidate = Array.isArray(value) ? value[0] : value;

  return SUPPORTED_LOCALES.includes(candidate as Locale)
    ? (candidate as Locale)
    : fallback;
}

export function resolveText(
  value: LocalizedText | undefined,
  locale: Locale,
  fallback = "",
) {
  if (!value) {
    return fallback;
  }

  if (typeof value === "string") {
    return value;
  }

  return value[locale] || value.en || value.zh || fallback;
}

export function localizeHref(href: string, locale: Locale) {
  if (href.startsWith("#")) {
    return `/?lang=${locale}${href}`;
  }

  return href;
}

export function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function stripMailto(value: string) {
  return value.replace(/^mailto:/, "");
}
