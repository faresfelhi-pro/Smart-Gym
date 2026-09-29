import { useTranslations } from "next-intl";
import { SectionHeading } from "./SectionHeading";
import { IconDumbbell, IconDrop, IconFloors, IconSpark, IconWave, IconWhistle } from "./Icons";

const ITEMS = [
  { key: "equipment", Icon: IconDumbbell },
  { key: "coaches", Icon: IconWhistle },
  { key: "lesmills", Icon: IconWave },
  { key: "floors", Icon: IconFloors },
  { key: "vibe", Icon: IconSpark },
  { key: "lockers", Icon: IconDrop },
] as const;

/** "Pourquoi Smart Gym": six reasons laid out as one ruled grid, not floating cards. */
export function Why() {
  const t = useTranslations("why");
  return (
    <section aria-labelledby="why-title" className="section">
      <div className="shell">
        <SectionHeading id="why-title" title={t("title")} intro={t("intro")} />
        <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map(({ key, Icon }) => (
            <li key={key} className="bg-graphite p-6 md:p-8">
              <Icon className="size-8 text-green" />
              <h3 className="h-card mt-6">{t(`items.${key}.title`)}</h3>
              <p className="mt-2 max-w-[34ch] text-muted">{t(`items.${key}.text`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
