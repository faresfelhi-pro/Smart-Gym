import { useTranslations } from "next-intl";

/** Five small plates, filled up to the activity's intensity. */
export function Intensity({ level }: { level: number }) {
  const t = useTranslations("activities");
  return (
    <span role="img" aria-label={t("intensityOf", { level })} className="inline-flex h-4 items-end gap-[3px]">
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={`w-[5px] rounded-[1px] ${n <= level ? "bg-green" : "bg-line"}`}
          style={{ height: `${40 + n * 12}%` }}
        />
      ))}
    </span>
  );
}
