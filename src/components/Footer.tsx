import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { pick, site } from "@/content/site";
import { Logo } from "./Logo";
import { NAV } from "@/content/nav";
import { TodoBadge } from "./TodoBadge";
import { IconFacebook, IconInstagram, IconWhatsApp } from "./Icons";

export function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const tc = useTranslations("contact");
  const locale = useLocale();
  return (
    <footer className="border-t border-line">
      <div className="shell grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-[32ch] text-muted">{t("text")}</p>
          <p className="display display-latin mt-6 text-[2rem] text-green" lang="en">{site.hashtag}</p>
        </div>
        <nav aria-label={t("explore")}>
          <h2 className="mb-4 font-bold">{t("explore")}</h2>
          <ul className="grid gap-2 text-muted">
            {NAV.map((n) => (
              <li key={n.id}><Link href={`/#${n.id}`} className="hover:text-chalk">{tn(n.key)}</Link></li>
            ))}
            <li><Link href="/recrutement" className="hover:text-chalk">{t("jobs")}</Link></li>
          </ul>
        </nav>
        <div>
          <h2 className="mb-4 flex flex-wrap items-center gap-2 font-bold">{tc("hours")} <TodoBadge show={site.hours.todo} /></h2>
          <dl className="grid gap-3 text-muted">
            {site.hours.rows.map((r, i) => (
              <div key={i}>
                <dt>{pick(r.days, locale)}</dt>
                <dd className="font-semibold tabular-nums text-chalk" dir="ltr">{r.time}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h2 className="mb-4 font-bold">{t("follow")}</h2>
          <address className="not-italic text-muted">
            {pick(site.contact.address.street, locale)}
            <br />
            {pick(site.contact.address.city, locale)}
            <br />
            <a href={site.contact.phoneHref} className="mt-2 inline-block font-semibold text-chalk hover:text-green" dir="ltr">{site.contact.phoneIntl}</a>
          </address>
          <div className="mt-4 flex gap-1">
            <a href={site.contact.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid size-11 place-items-center border border-line hover:border-green hover:text-green"><IconInstagram /></a>
            <a href={site.contact.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid size-11 place-items-center border border-line hover:border-green hover:text-green"><IconFacebook /></a>
            <a href={site.contact.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid size-11 place-items-center border border-line hover:border-green hover:text-green"><IconWhatsApp className="size-5" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="shell py-6 pe-24 text-[0.875rem] text-muted">{t("rights", { year: new Date().getFullYear() })}</p>
      </div>
    </footer>
  );
}
