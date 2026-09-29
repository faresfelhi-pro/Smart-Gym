import { useTranslations } from "next-intl";
import { site } from "@/content/site";

/**
 * Small amber marker next to content that still needs the owner's
 * confirmation. Disappears everywhere when `site.showPlaceholderBadges` is off.
 */
export function TodoBadge({ show = true, className = "" }: { show?: boolean; className?: string }) {
  const t = useTranslations("common");
  if (!show || !site.showPlaceholderBadges) return null;
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-dashed border-sodium/70 px-2 py-0.5 align-middle font-sans text-[0.75rem] font-semibold leading-none rtl:leading-[1.3] tracking-normal text-sodium normal-case ${className}`}
    >
      <span className="size-1.5 rounded-full bg-sodium" aria-hidden />
      {t("todo")}
    </span>
  );
}
