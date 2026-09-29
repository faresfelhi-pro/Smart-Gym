"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { m, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { activities } from "@/content/activities";
import { pick } from "@/content/site";
import { isValidTunisianPhone, whatsappLink } from "@/lib/whatsapp";
import { IconClose, IconWhatsApp } from "./Icons";

type Props = { open: boolean; initialActivity?: string; onClose: () => void };

/**
 * Free-trial booking. Uses the native <dialog> element for focus trapping and
 * Escape-to-close; submitting opens WhatsApp with a pre-filled message.
 */
export function TrialModal({ open, initialActivity, onClose }: Props) {
  const t = useTranslations("trial");
  const te = useTranslations("contact.errors");
  const locale = useLocale();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [today, setToday] = useState("");

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      setErrors({});
      setToday(new Date().toISOString().slice(0, 10));
      d.showModal();
    } else if (!open && d.open) d.close();
  }, [open]);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const next = {
      name: name ? undefined : te("name"),
      phone: isValidTunisianPhone(phone) ? undefined : te("phone"),
    };
    setErrors(next);
    if (next.name || next.phone) return;

    const slug = String(data.get("activity") ?? "");
    const activity = activities.find((a) => a.slug === slug);
    const message = t("message", {
      name,
      phone,
      date: String(data.get("date") || "—"),
      activity: activity ? pick(activity.name, locale) : "—",
    });
    window.open(whatsappLink(message), "_blank", "noopener");
    onClose();
  }

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby={`${id}-title`}
      className="m-auto w-[min(34rem,calc(100%-2rem))] bg-transparent p-0 text-chalk backdrop:bg-black/75 backdrop:backdrop-blur-sm"
    >
      {open && (
        <m.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          className="border border-line bg-surface p-6 sm:p-8"
        >
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 id={`${id}-title`} className="display text-[2.25rem] sm:text-[2.75rem] rtl:text-[1.9rem]">{t("title")}</h2>
              <p className="mt-2 text-muted">{t("intro")}</p>
            </div>
            <button type="button" onClick={onClose} aria-label={t("close")} className="-me-2 -mt-1 grid size-11 shrink-0 place-items-center text-muted hover:text-chalk">
              <IconClose />
            </button>
          </div>

          <form onSubmit={submit} noValidate className="grid gap-4">
            <Field id={`${id}-name`} label={t("name")} error={errors.name}>
              <input id={`${id}-name`} name="name" autoComplete="name" className="field" aria-invalid={!!errors.name} aria-describedby={errors.name ? `${id}-name-err` : undefined} />
            </Field>
            <Field id={`${id}-phone`} label={t("phone")} error={errors.phone}>
              <input id={`${id}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="58 805 805" dir="ltr" className="field rtl:text-end" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? `${id}-phone-err` : undefined} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id={`${id}-date`} label={t("date")}>
                <input id={`${id}-date`} name="date" type="date" min={today} className="field" />
              </Field>
              <Field id={`${id}-activity`} label={t("activity")}>
                <select id={`${id}-activity`} name="activity" defaultValue={initialActivity ?? ""} key={initialActivity} className="field">
                  <option value="">—</option>
                  {activities.map((a) => (
                    <option key={a.slug} value={a.slug}>{pick(a.name, locale)}</option>
                  ))}
                </select>
              </Field>
            </div>
            <button type="submit" className="btn btn-green chamfer mt-2 w-full">
              <IconWhatsApp className="size-5" />
              {t("submit")}
            </button>
          </form>
        </m.div>
      )}
    </dialog>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[0.9375rem] font-semibold">{label}</label>
      {children}
      {error && <p id={`${id}-err`} className="mt-1.5 text-[0.875rem] text-[#ff8a7f]">{error}</p>}
    </div>
  );
}
