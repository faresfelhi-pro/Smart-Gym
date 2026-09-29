import { useTranslations } from "next-intl";
import { whatsappLink } from "@/lib/whatsapp";
import { IconWhatsApp } from "./Icons";

/** The one place the green floods the page. */
export function CtaBand() {
  const t = useTranslations("ctaBand");
  const tw = useTranslations("wa");
  return (
    <section aria-labelledby="cta-title" className="bg-green text-on-green">
      <div className="shell grid gap-8 py-16 md:py-24 lg:grid-cols-[1fr_auto] lg:items-end">
        <h2 id="cta-title" className="display text-[clamp(3.5rem,2rem+7vw,9rem)] rtl:text-[clamp(2.5rem,1.5rem+4vw,5.5rem)]">
          <span className="block">{t("title")}</span>
          <span className="block opacity-70">{t("sub")}</span>
        </h2>
        <a
          href={whatsappLink(tw("default"))}
          target="_blank"
          rel="noopener noreferrer"
          className="btn chamfer self-end text-chalk [--chamfer-bg:var(--graphite)] hover:[--chamfer-bg:#000] focus-visible:outline-graphite"
        >
          <IconWhatsApp className="size-5 text-green" />
          {t("button")}
        </a>
      </div>
    </section>
  );
}
