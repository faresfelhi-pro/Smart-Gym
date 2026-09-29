"use client";

import { useId, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { activities } from "@/content/activities";
import { pick, site } from "@/content/site";
import { isValidTunisianPhone, whatsappLink } from "@/lib/whatsapp";
import { SectionHeading } from "./SectionHeading";
import { TodoBadge } from "./TodoBadge";
import { IconClock, IconMail, IconPhone, IconPin, IconWhatsApp } from "./Icons";

const GOALS = ["fitness", "weight", "muscle", "classes", "other"] as const;

export function Contact() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const id = useId();
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [sent, setSent] = useState(false);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const phone = String(f.get("phone") ?? "").trim();
    const next = {
      name: name ? undefined : t("errors.name"),
      phone: isValidTunisianPhone(phone) ? undefined : t("errors.phone"),
    };
    setErrors(next);
    if (next.name || next.phone) {
      document.getElementById(next.name ? `${id}-name` : `${id}-phone`)?.focus();
      return;
    }
    const goal = t(`goals.${f.get("goal") as (typeof GOALS)[number]}`);
    const act = activities.find((a) => a.slug === f.get("activity"));
    const message = t("message", { name, phone, goal, activity: act ? pick(act.name, locale) : t("anyActivity") });
    window.open(whatsappLink(message), "_blank", "noopener");
    setSent(true);
  }

  const c = site.contact;

  return (
    <section id="contact" aria-labelledby="contact-title" className="section">
      <div className="shell">
        <SectionHeading id="contact-title" title={t("title")} intro={t("intro")} />

        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <form onSubmit={submit} noValidate className="grid content-start gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id={`${id}-name`} label={t("name")} error={errors.name} required={t("required")}>
                <input id={`${id}-name`} name="name" autoComplete="name" className="field" aria-required aria-invalid={!!errors.name} aria-describedby={errors.name ? `${id}-name-err` : undefined} />
              </Field>
              <Field id={`${id}-phone`} label={t("phone")} error={errors.phone} required={t("required")}>
                <input id={`${id}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="58 805 805" dir="ltr" className="field rtl:text-end" aria-required aria-invalid={!!errors.phone} aria-describedby={errors.phone ? `${id}-phone-err` : undefined} />
              </Field>
            </div>
            <Field id={`${id}-goal`} label={t("goal")}>
              <select id={`${id}-goal`} name="goal" className="field" defaultValue="fitness">
                {GOALS.map((g) => <option key={g} value={g}>{t(`goals.${g}`)}</option>)}
              </select>
            </Field>
            <Field id={`${id}-act`} label={t("activity")}>
              <select id={`${id}-act`} name="activity" className="field" defaultValue="">
                <option value="">{t("anyActivity")}</option>
                {activities.map((a) => <option key={a.slug} value={a.slug}>{pick(a.name, locale)}</option>)}
              </select>
            </Field>
            <button type="submit" className="btn btn-green chamfer mt-2 justify-self-start max-sm:w-full">
              <IconWhatsApp className="size-5" />
              {t("submit")}
            </button>
            {sent && <p role="status" className="border-s-2 border-green ps-3 text-[0.9375rem]">{t("sent")}</p>}
          </form>

          <div>
            <h3 className="h-card">{t("infoTitle")}</h3>
            <ul className="mt-6 grid gap-5">
              <Row icon={<IconPin />}>
                <address className="not-italic">
                  {pick(c.address.street, locale)}
                  <br />
                  <span className="text-muted">{pick(c.address.city, locale)}, {pick(c.address.country, locale)}</span>
                </address>
                <a href={c.mapLink} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block font-semibold text-green underline underline-offset-4">{t("directions")}</a>
              </Row>
              <Row icon={<IconPhone />}>
                <a href={c.phoneHref} className="font-semibold hover:text-green" dir="ltr">{c.phoneIntl}</a>
              </Row>
              <Row icon={<IconMail />}>
                <a href={`mailto:${c.email}`} className="break-all hover:text-green">{c.email}</a>
              </Row>
              <Row icon={<IconClock />}>
                <p className="flex flex-wrap items-center gap-2 font-semibold">{t("hours")} <TodoBadge show={site.hours.todo} /></p>
                <dl className="mt-1 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-muted">
                  {site.hours.rows.map((r, i) => (
                    <div key={i} className="contents">
                      <dt>{pick(r.days, locale)}</dt>
                      <dd className="tabular-nums text-chalk" dir="ltr">{r.time}</dd>
                    </div>
                  ))}
                </dl>
              </Row>
            </ul>
          </div>
        </div>

        <div className="mt-14 border border-line">
          <iframe
            title={t("mapTitle")}
            src={c.mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[22rem] w-full md:h-[28rem]"
            style={{ filter: "invert(0.92) hue-rotate(180deg) saturate(0.6) contrast(0.9)" }}
          />
        </div>
      </div>
    </section>
  );
}

function Field({ id, label, error, required, children }: { id: string; label: string; error?: string; required?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[0.9375rem] font-semibold">
        {label}
        {required && <span className="ms-1.5 text-[0.8125rem] font-normal text-muted">({required})</span>}
      </label>
      {children}
      {error && <p id={`${id}-err`} className="mt-1.5 text-[0.875rem] text-[#ff8a7f]">{error}</p>}
    </div>
  );
}

function Row({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="flex gap-4">
      <span className="mt-0.5 shrink-0 text-green">{icon}</span>
      <div className="min-w-0">{children}</div>
    </li>
  );
}
