"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { gallery } from "@/content/people";
import { pick } from "@/content/site";
import { PhotoSlot } from "./PhotoSlot";
import { SectionHeading } from "./SectionHeading";
import { IconArrow, IconClose } from "./Icons";

/** Masonry grid (CSS columns) with a keyboard-friendly lightbox. */
export function Gallery() {
  const t = useTranslations("gallery");
  const locale = useLocale();
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const n = gallery.length;

  const show = (i: number) => {
    setOpen(i);
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();
  const step = useCallback((d: number) => setOpen((v) => (v === null ? v : (v + d + n) % n)), [n]);

  useEffect(() => {
    if (open === null) return;
    const rtl = document.documentElement.dir === "rtl";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(rtl ? -1 : 1);
      if (e.key === "ArrowLeft") step(rtl ? 1 : -1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  const current = open === null ? null : gallery[open];

  return (
    <section id="galerie" aria-labelledby="gallery-title" className="section border-t border-line">
      <div className="shell">
        <SectionHeading id="gallery-title" title={t("title")} intro={t("intro")} />
        <ul className="columns-2 gap-3 md:columns-3 md:gap-4">
          {gallery.map((p, i) => {
            const alt = pick(p.alt, locale);
            return (
              <li key={i} className="mb-3 break-inside-avoid md:mb-4">
                <button type="button" onClick={() => show(i)} aria-label={t("open", { alt })} className="group block w-full overflow-hidden">
                  <div style={{ aspectRatio: p.ratio }} className="relative transition-transform duration-500 group-hover:scale-[1.03]">
                    <PhotoSlot src={p.src} alt={alt} className="absolute inset-0" sizes="(min-width: 768px) 33vw, 50vw" />
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <dialog
        ref={dialog}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === dialog.current && close()}
        aria-label={current ? pick(current.alt, locale) : t("title")}
        className="m-auto h-dvh max-h-none w-screen max-w-none bg-graphite/95 p-0 text-chalk backdrop:bg-black/80"
      >
        {current && open !== null && (
          <div className="flex h-full flex-col" onClick={(e) => e.target === e.currentTarget && close()}>
            <div className="shell flex h-16 shrink-0 items-center justify-between">
              <p className="text-[0.9375rem] tabular-nums text-muted" dir="ltr">{t("count", { i: open + 1, n })}</p>
              <button type="button" onClick={close} aria-label={t("close")} className="grid size-11 place-items-center hover:text-green" autoFocus>
                <IconClose />
              </button>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-20">
              <div className="relative max-h-full w-full max-w-5xl" style={{ aspectRatio: current.ratio, maxWidth: `min(64rem, calc((100dvh - 9rem) * ${current.ratio}))` }}>
                <PhotoSlot src={current.src} alt={pick(current.alt, locale)} className="absolute inset-0" sizes="100vw" />
              </div>
              <button type="button" onClick={() => step(-1)} aria-label={t("prev")} className="absolute start-2 grid size-12 place-items-center bg-graphite/80 hover:text-green md:start-6">
                <IconArrow className="-scale-x-100 rtl:scale-x-100" />
              </button>
              <button type="button" onClick={() => step(1)} aria-label={t("next")} className="absolute end-2 grid size-12 place-items-center bg-graphite/80 hover:text-green md:end-6">
                <IconArrow className="rtl:-scale-x-100" />
              </button>
            </div>
            <p className="shell py-4 text-center text-muted">{pick(current.alt, locale)}</p>
          </div>
        )}
      </dialog>
    </section>
  );
}
