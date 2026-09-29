"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { pick, site } from "@/content/site";
import { PhotoSlot } from "./PhotoSlot";
import { Barbell } from "./Barbell";
import { CountUp } from "./CountUp";
import { TodoBadge } from "./TodoBadge";
import { useTrial } from "./TrialContext";

const SLIDE_MS = 6000;

export function Hero() {
  const t = useTranslations("hero");
  const tc = useTranslations("common");
  const locale = useLocale();
  const reduce = useReducedMotion();
  const { openTrial } = useTrial();
  const [slide, setSlide] = useState(0);
  const slides = site.heroSlides;

  // Background crossfade. Paused for reduced motion.
  useEffect(() => {
    if (reduce || slides.length < 2) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % slides.length), SLIDE_MS);
    return () => clearInterval(id);
  }, [reduce, slides.length]);

  const line = (text: string, i: number) => (
    <span className="block overflow-hidden pb-[0.04em]">
      {/* Second line lands one beat (128 BPM) after the first. */}
      <span className="rise" style={{ animationDelay: `${0.1 + i * 0.47}s` }}>
        {text}
      </span>
    </span>
  );

  return (
    <section id="accueil" className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden pt-28 pb-8 md:pb-10">
      {/* Background slides */}
      <div className="absolute inset-0 -z-10">
        <AnimatePresence initial={false}>
          <m.div
            key={slide}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          >
            <PhotoSlot src={slides[slide].src} alt={pick(slides[slide].alt, locale)} className="h-full" priority={slide === 0} quiet />
          </m.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/80 to-graphite/30" />
        {/* Placeholder caption, only while the photos are missing */}
        {!slides[slide].src && site.showPlaceholderBadges && (
          <p className="absolute end-4 top-24 hidden max-w-[16rem] md:block text-end text-[0.8125rem] leading-snug text-muted md:end-10">
            <span className="block font-semibold text-sodium">{tc("photoMissing")}</span>
            {pick(slides[slide].alt, locale)}
          </p>
        )}
      </div>

      <div className="shell">
        <h1 className="display display-latin text-[clamp(4.1rem,17.2vw,12.5rem)] text-chalk rtl:text-right">
          <span className="sr-only">{site.shortName} : </span>
          <span lang="en" dir="ltr" className="block">
            {line(t("line1"), 0)}
            {line(t("line2"), 1)}
          </span>
        </h1>

        <div className="mt-6 grid items-end gap-6 md:mt-8 md:grid-cols-[minmax(0,34rem)_auto] md:justify-between">
          <p className="text-[1.0625rem] text-chalk/85 md:text-[1.1875rem]">{t("sub")}</p>
          <div className="flex flex-col gap-3 xs:flex-row">
            <button type="button" onClick={() => openTrial()} className="btn btn-green chamfer">
              {t("ctaTrial")}
            </button>
            <Link href="/#tarifs" className="btn btn-ghost chamfer">
              {t("ctaPricing")}
            </Link>
          </div>
        </div>

        <Barbell className="mt-8 md:mt-10" />

        <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-5 md:grid-cols-4">
          {site.stats.map((s, i) => (
            <div key={i} className="flex flex-col-reverse">
              <dt className="mt-1 text-[0.9375rem] leading-snug text-muted">
                {pick(s.label, locale)} <TodoBadge show={s.todo} className="ms-1" />
              </dt>
              <dd className="display display-latin text-[2.5rem] normal-case text-chalk md:text-[3.25rem]">
                <CountUp value={s.value} delay={0.4} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
