"use client";

import { useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { testimonials } from "@/content/people";
import { pick } from "@/content/site";
import { SectionHeading } from "./SectionHeading";
import { TodoBadge } from "./TodoBadge";
import { IconArrow } from "./Icons";

export function Testimonials() {
  const t = useTranslations("testimonials");
  const locale = useLocale();
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const n = testimonials.length;
  const item = testimonials[i];
  const go = (d: number) => setI((v) => (v + d + n) % n);

  return (
    <section aria-labelledby="stories-title" className="section border-t border-line">
      <div className="shell">
        <SectionHeading id="stories-title" title={t("title")} intro={t("intro")} />

        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          {/* Testimonial slider */}
          <figure className="flex flex-col" aria-roledescription="carousel">
            <div className="relative min-h-[15rem] md:min-h-[17rem]" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  key={i}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
                  transition={{ duration: 0.3 }}
                >
                  <blockquote className="text-[1.5rem] leading-[1.35] font-medium text-chalk md:text-[1.875rem]">
                    <span aria-hidden className="display me-1 text-green">“</span>
                    {pick(item.quote, locale)}
                  </blockquote>
                  <figcaption className="mt-6 flex flex-wrap items-center gap-3">
                    <span className="font-bold">{item.author ?? t("authorPending")}</span>
                    <span className="text-muted">{pick(item.detail, locale)}</span>
                    <TodoBadge show={!item.author} />
                  </figcaption>
                </m.div>
              </AnimatePresence>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <button type="button" onClick={() => go(-1)} aria-label={t("prev")} className="grid size-12 place-items-center border border-line hover:border-green hover:text-green">
                <IconArrow className="-scale-x-100 rtl:scale-x-100" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label={t("next")} className="grid size-12 place-items-center border border-line hover:border-green hover:text-green">
                <IconArrow className="rtl:-scale-x-100" />
              </button>
              <p className="ms-2 text-[0.9375rem] tabular-nums text-muted" dir="ltr">
                {i + 1} / {n}
              </p>
            </div>
          </figure>

          <BeforeAfter />
        </div>
      </div>
    </section>
  );
}

/** Drag (or use arrow keys on) the handle to compare two photos. */
function BeforeAfter() {
  const t = useTranslations("testimonials");
  const [pos, setPos] = useState(50);
  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="h-card">{t("beforeAfterTitle")}</h3>
        <TodoBadge />
      </div>
      <div className="clip-chamfer relative aspect-[4/5] select-none overflow-hidden sm:aspect-[5/4]" dir="ltr">
        {/* "After" underneath, "Before" clipped on top */}
        <div className="hatch absolute inset-0 flex items-end justify-end p-4">
          <span className="bg-green px-2 py-1 text-[0.8125rem] font-bold text-on-green">{t("after")}</span>
        </div>
        <div className="absolute inset-0 flex items-end bg-surface-2 p-4" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <div className="hatch absolute inset-0 opacity-50" />
          <span className="relative bg-chalk px-2 py-1 text-[0.8125rem] font-bold text-graphite">{t("before")}</span>
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-y-0 w-0.5 bg-green shadow-[var(--glow)]" style={{ left: `${pos}%` }}>
          <span className="absolute top-1/2 left-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-green text-on-green">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 5l-4 5 4 5M13 5l4 5-4 5" /></svg>
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={t("slider")}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <p className="mt-3 text-[0.875rem] text-muted">{t("consent")}</p>
    </div>
  );
}
