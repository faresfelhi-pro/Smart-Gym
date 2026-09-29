"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";
import planning from "@/content/planning.json";
import { activities } from "@/content/activities";
import { pick } from "@/content/site";
import { SectionHeading } from "./SectionHeading";
import { TodoBadge } from "./TodoBadge";
import { useTrial } from "./TrialContext";

type Session = (typeof planning.sessions)[number];
const noop = () => () => {};

/**
 * Weekly class timetable from src/content/planning.json.
 * Desktop: the whole week as seven columns. Mobile: one day at a time (tabs).
 */
export function Planning() {
  const t = useTranslations("planning");
  const locale = useLocale();
  const { openTrial } = useTrial();
  const days = t.raw("days") as string[];
  const daysShort = t.raw("daysShort") as string[];
  // Open on today's tab: Monday (0) on the server, the real day in the browser.
  const today = useSyncExternalStore(noop, () => (new Date().getDay() + 6) % 7, () => 0);
  const [picked, setDay] = useState<number | null>(null);
  const day = picked ?? today;
  const [filter, setFilter] = useState<string>("all");


  const bySlug = useMemo(() => Object.fromEntries(activities.map((a) => [a.slug, a])), []);
  const used = useMemo(() => [...new Set(planning.sessions.map((s) => s.activity))], []);
  const visible = (s: Session) => filter === "all" || s.activity === filter;
  const forDay = (d: number) => planning.sessions.filter((s) => s.day === d && visible(s)).sort((a, b) => a.start.localeCompare(b.start));

  const name = (slug: string) => (bySlug[slug] ? pick(bySlug[slug].name, locale) : slug);

  const sessionCard = (s: Session, key: number) => (
    <li key={key} className="group relative border-s-2 border-green bg-surface px-3 py-3">
      <p className="text-[0.8125rem] font-semibold tabular-nums text-green" dir="ltr">{s.start}</p>
      <p className="h-card mt-1 text-[1.25rem] rtl:text-[1.05rem]">{name(s.activity)}</p>
      <p className="mt-1 text-[0.8125rem] text-muted">
        {t("sessionMeta", { floor: t("floor", { n: s.floor }), n: s.duration })}
      </p>
      <button
        type="button"
        onClick={() => openTrial(s.activity)}
        className="mt-2 text-[0.8125rem] font-semibold text-chalk underline decoration-green decoration-2 underline-offset-4 hover:text-green"
      >
        {t("book")}
        <span className="sr-only">, {name(s.activity)}, {days[s.day]} {s.start}</span>
      </button>
    </li>
  );

  const empty = <p className="border border-dashed border-line p-6 text-muted">{t("empty")}</p>;

  return (
    <section id="planning" aria-labelledby="planning-title" className="section border-t border-line">
      <div className="shell">
        <SectionHeading
          id="planning-title"
          title={t("title")}
          intro={t("intro")}
          aside={
            <p className="mt-3 flex flex-wrap items-center gap-2 text-[0.875rem] text-muted">
              <TodoBadge /> {t("note")}
            </p>
          }
        />

        {/* Activity filter */}
        <div role="group" aria-label={t("filterLabel")} className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:flex-wrap md:px-0">
          {["all", ...used].map((slug) => {
            const active = filter === slug;
            return (
              <button
                key={slug}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(slug)}
                className={`shrink-0 rounded-full border px-4 py-2 text-[0.9375rem] font-medium transition-colors ${
                  active ? "border-green bg-green text-on-green" : "border-line text-chalk/85 hover:border-chalk/50"
                }`}
              >
                {slug === "all" ? t("allActivities") : name(slug)}
              </button>
            );
          })}
        </div>

        {/* Mobile / tablet: day tabs */}
        <div className="lg:hidden">
          <div role="tablist" aria-label={t("dayLabel")} className="grid grid-cols-7 border border-line">
            {daysShort.map((d, i) => (
              <button
                key={i}
                role="tab"
                id={`day-tab-${i}`}
                aria-selected={day === i}
                aria-controls="day-panel"
                onClick={() => setDay(i)}
                className={`py-3 text-[0.875rem] font-bold transition-colors ${day === i ? "bg-chalk text-graphite" : "text-muted hover:text-chalk"}`}
              >
                <abbr title={days[i]} className="no-underline">{d}</abbr>
              </button>
            ))}
          </div>
          <div id="day-panel" role="tabpanel" aria-labelledby={`day-tab-${day}`} className="mt-4">
            {forDay(day).length ? (
              <ul className="grid gap-3 sm:grid-cols-2">{forDay(day).map(sessionCard)}</ul>
            ) : (
              empty
            )}
          </div>
        </div>

        {/* Desktop: full week */}
        <div className="hidden grid-cols-7 gap-3 lg:grid">
          {days.map((d, i) => {
            const list = forDay(i);
            return (
              <div key={i}>
                <h3 className={`mb-3 border-b pb-2 text-[0.9375rem] font-bold ${i === day ? "border-green text-chalk" : "border-line text-muted"}`}>{d}</h3>
                <ul className="grid gap-3">
                  {list.map(sessionCard)}
                </ul>
                {!list.length && <p aria-hidden className="h-24 border border-dashed border-line" />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
