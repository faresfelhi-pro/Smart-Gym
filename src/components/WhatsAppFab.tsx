import { useTranslations } from "next-intl";
import { whatsappLink } from "@/lib/whatsapp";
import { IconWhatsApp } from "./Icons";

/** Floating WhatsApp button. `end-*` puts it bottom-right in LTR and bottom-left in Arabic. */
export function WhatsAppFab() {
  const t = useTranslations("fab");
  const tw = useTranslations("wa");
  return (
    <a
      href={whatsappLink(tw("default"))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("label")}
      className="fixed end-4 bottom-4 z-40 grid size-14 place-items-center rounded-full bg-green text-on-green shadow-[var(--glow),0_8px_24px_rgb(0_0_0/0.4)] transition-transform hover:scale-105 md:end-6 md:bottom-6"
    >
      <IconWhatsApp className="size-7" />
    </a>
  );
}
