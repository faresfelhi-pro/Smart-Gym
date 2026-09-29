import { useLocale, useTranslations } from "next-intl";
import { plans } from "@/content/pricing";
import { pick, site } from "@/content/site";
import { SectionHeading } from "./SectionHeading";
import { TodoBadge } from "./TodoBadge";
import { TrialButton } from "./TrialContext";
import { IconCheck } from "./Icons";

export function Pricing() {
  const t = useTranslations("pricing");
  const locale = useLocale();
  return (
    <section id="tarifs" aria-labelledby="pricing-title" className="section border-t border-line">
      <div className="shell">
        <SectionHeading id="pricing-title" title={t("title")} intro={t("intro")} />

        {/* Promo banner — toggle with site.promo.enabled */}
        {site.promo.enabled && (
          <div className="mb-8 flex flex-col gap-1 border border-sodium/60 bg-sodium/10 px-5 py-4 sm:flex-row sm:items-baseline sm:gap-4">
            <p className="display text-[2rem] text-sodium rtl:text-[1.5rem]">{pick(site.promo.text, locale)}</p>
            <p className="text-[0.9375rem] text-chalk/80">{pick(site.promo.detail, locale)}</p>
          </div>
        )}

        <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((p) => {
            const name = pick(p.name, locale);
            return (
              <li
                key={p.id}
                className={`relative flex flex-col p-6 md:p-7 ${
                  p.highlight ? "border-2 border-green bg-surface shadow-[0_0_48px_-12px_var(--green)]" : "border border-line"
                }`}
              >
                {p.highlight && (
                  <p className="absolute -top-3.5 start-6 bg-green px-3 py-1 text-[0.8125rem] font-bold text-on-green">{t("best")}</p>
                )}
                <h3 className="h-card">{name}</h3>
                <p className="mt-1 text-[0.9375rem] text-muted">{t("months", { n: p.months })}</p>
                <p className="display display-latin mt-6 text-[3.75rem] text-chalk" dir="ltr">{p.price}</p>
                {p.perMonth && <p className="text-[0.9375rem] text-muted">{p.perMonth}</p>}
                <TodoBadge show={p.todo} className="mt-2 self-start" />
                <ul className="mt-6 grid gap-2.5 border-t border-line pt-6 text-[0.975rem]">
                  {p.perks.map((perk, i) => (
                    <li key={i} className="flex gap-2.5">
                      <IconCheck className="mt-0.5 size-5 shrink-0 text-green" />
                      {pick(perk, locale)}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <TrialButton className={`btn chamfer w-full ${p.highlight ? "btn-green" : "btn-ghost"}`}>{t("cta", { plan: name })}</TrialButton>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 text-[0.875rem] text-muted">{t("footnote")}</p>
      </div>
    </section>
  );
}
