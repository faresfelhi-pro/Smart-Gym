import { defineRouting } from "next-intl/routing";

/** Supported languages. French is the default and has no URL prefix change. */
export const routing = defineRouting({
  locales: ["fr", "ar", "en"],
  defaultLocale: "fr",
});

export type Locale = (typeof routing.locales)[number];

/** Arabic is the only right-to-left locale. */
export const isRtl = (locale: string) => locale === "ar";
