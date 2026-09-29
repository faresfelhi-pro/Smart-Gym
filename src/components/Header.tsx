"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { site } from "@/content/site";
import { NAV } from "@/content/nav";
import { Logo } from "./Logo";
import { useTrial } from "./TrialContext";
import { IconInstagram, IconFacebook } from "./Icons";

const LOCALE_LABEL: Record<string, string> = { fr: "FR", ar: "ع", en: "EN" };
const LOCALE_NAME: Record<string, string> = { fr: "Français", ar: "العربية", en: "English" };

export function Header() {
  const t = useTranslations("nav");
  const { openTrial } = useTrial();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll and allow Escape while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        solid ? "border-b border-line bg-graphite" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="shell flex h-[4.5rem] items-center gap-6">
        <Link href="/" aria-label={site.shortName} className="shrink-0" onClick={() => setMenuOpen(false)}>
          <Logo />
        </Link>

        <nav aria-label="Principal" className="ms-auto hidden xl:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.id}>
                <Link href={`/#${item.id}`} className="block px-3 py-2 text-[0.9375rem] font-medium text-chalk/80 transition-colors hover:text-green">
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ms-auto flex items-center gap-3 xl:ms-0">
          <LangSwitch className="hidden sm:flex" />
          <button type="button" onClick={() => openTrial()} className="btn btn-green btn-sm chamfer px-3 xs:px-4">
            {t("trial")}
          </button>
          <button
            type="button"
            className="relative grid size-11 place-items-center xl:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span aria-hidden className={`absolute h-0.5 w-6 bg-chalk transition-transform duration-300 ${menuOpen ? "rotate-45" : "-translate-y-[5px]"}`} />
            <span aria-hidden className={`absolute h-0.5 bg-chalk transition-all duration-300 ${menuOpen ? "w-6 -rotate-45" : "w-4 translate-x-1 translate-y-[5px] rtl:-translate-x-1"}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <m.div
            id="mobile-menu"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.7, 0, 0.2, 1] }}
            className="fixed inset-x-0 top-[4.5rem] bottom-0 flex flex-col overflow-y-auto bg-graphite xl:hidden"
          >
            <nav aria-label="Menu" className="shell flex-1 pt-6">
              <ul>
                {NAV.map((item, i) => (
                  <m.li
                    key={item.id}
                    initial={reduce ? false : { opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.04, duration: 0.3 }}
                    className="border-b border-line"
                  >
                    <Link
                      href={`/#${item.id}`}
                      onClick={() => setMenuOpen(false)}
                      className="display flex items-center justify-between py-3 text-[2.75rem] hover:text-green rtl:text-[2rem]"
                    >
                      {t(item.key)}
                    </Link>
                  </m.li>
                ))}
              </ul>
            </nav>
            <div className="shell flex flex-wrap items-center justify-between gap-4 py-6">
              <LangSwitch />
              <div className="flex gap-2">
                <a href={site.contact.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid size-11 place-items-center text-muted hover:text-chalk"><IconInstagram /></a>
                <a href={site.contact.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid size-11 place-items-center text-muted hover:text-chalk"><IconFacebook /></a>
              </div>
                          </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/** FR / ع / EN switcher. Keeps the visitor on the same page. */
export function LangSwitch({ className = "" }: { className?: string }) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  return (
    <ul aria-label={t("language")} className={`flex items-center border border-line ${className}`}>
      {routing.locales.map((l) => (
        <li key={l}>
          <Link
            href={pathname}
            locale={l}
            hrefLang={l}
            lang={l}
            aria-current={l === locale ? "true" : undefined}
            title={LOCALE_NAME[l]}
            className={`grid h-9 min-w-10 place-items-center px-2 text-[0.8125rem] font-bold transition-colors ${
              l === locale ? "bg-chalk text-graphite" : "text-muted hover:text-chalk"
            }`}
          >
            {LOCALE_LABEL[l]}
          </Link>
        </li>
      ))}
    </ul>
  );
}
