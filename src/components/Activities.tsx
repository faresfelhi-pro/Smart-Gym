import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { activities } from "@/content/activities";
import { pick } from "@/content/site";
import { PhotoSlot } from "./PhotoSlot";
import { SectionHeading } from "./SectionHeading";
import { Intensity } from "./Intensity";
import { TodoBadge } from "./TodoBadge";

export function Activities() {
  const t = useTranslations("activities");
  const locale = useLocale();
  return (
    <section id="activites" aria-labelledby="activities-title" className="section border-t border-line">
      <div className="shell">
        <SectionHeading id="activities-title" title={t("title")} intro={t("intro")} />
        <ul className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {activities.map((a, i) => {
            const name = pick(a.name, locale);
            const featured = i === 0;
            return (
              <li key={a.slug} className={featured ? "sm:col-span-2" : ""}>
                <Link href={`/activites/${a.slug}`} className="group block">
                  <div className="clip-chamfer relative overflow-hidden">
                    <PhotoSlot
                      src={a.image}
                      alt={name}
                      className={`${featured ? "aspect-[4/5] sm:aspect-[8/5]" : "aspect-[4/5]"} transition-transform duration-500 ease-out group-hover:scale-[1.04]`}
                      sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
                      quiet
                    />
                    {/* green floor line grows on hover */}
                    <span aria-hidden className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-green transition-transform duration-300 group-hover:scale-x-100 rtl:origin-right" />
                    {a.lesMills && (
                      <span className="absolute start-3 top-3 bg-graphite/85 px-2 py-1 text-[0.75rem] font-bold text-chalk">{t("lesMills")}</span>
                    )}
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-3">
                    <h3 className="h-card transition-colors group-hover:text-green">{name}</h3>
                    <TodoBadge show={a.todo} />
                  </div>
                  <p className="mt-2 max-w-[40ch] text-[0.975rem] text-muted">{pick(a.summary, locale)}</p>
                  <p className="mt-4 flex items-center gap-5 text-[0.875rem] text-chalk/80">
                    <span className="inline-flex items-center gap-2">
                      <Intensity level={a.intensity} />
                    </span>
                    <span>{a.duration ? t("minutes", { n: a.duration }) : t("free")}</span>
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
