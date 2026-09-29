import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { activities } from "@/content/activities";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/recrutement", ...activities.map((a) => `/activites/${a.slug}`)];
  return paths.flatMap((p) =>
    routing.locales.map((l) => ({
      url: `${site.url}/${l}${p}`,
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1 : 0.7,
      alternates: { languages: Object.fromEntries(routing.locales.map((x) => [x, `${site.url}/${x}${p}`])) },
    })),
  );
}
