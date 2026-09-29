import Image from "next/image";
import { useTranslations } from "next-intl";

type Props = {
  src: string;
  alt: string;
  /** Tailwind aspect class, e.g. "aspect-[4/5]". Omit when using `fill` in a sized parent. */
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Hide the "photo needed" caption (e.g. on very small thumbnails). */
  quiet?: boolean;
};

/**
 * A photo, or — while the gym's photos are not supplied — a clearly marked
 * hatched placeholder that names the shot we need.
 */
export function PhotoSlot({ src, alt, className = "", sizes = "100vw", priority, quiet }: Props) {
  const t = useTranslations("common");
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div role="img" aria-label={`${t("photoMissing")} : ${alt}`} className="hatch absolute inset-0 flex items-end p-4">
          {!quiet && (
            <p className="max-w-[22ch] text-[0.8125rem] leading-snug text-muted">
              <span className="block font-semibold text-sodium">{t("photoMissing")}</span>
              {alt}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
