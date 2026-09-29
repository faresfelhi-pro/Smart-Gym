import { useLocale, useTranslations } from "next-intl";
import { coaches } from "@/content/people";
import { pick, site } from "@/content/site";
import { PhotoSlot } from "./PhotoSlot";
import { SectionHeading } from "./SectionHeading";
import { TodoBadge } from "./TodoBadge";
import { IconInstagram } from "./Icons";

export function Coaches() {
  const t = useTranslations("coaches");
  const locale = useLocale();
  return (
    <section id="coachs" aria-labelledby="coaches-title" className="section border-t border-line">
      <div className="shell">
        <SectionHeading id="coaches-title" title={t("title")} intro={t("intro")} />
        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
          {coaches.map((c, i) => {
            const name = c.name ?? t("namePending");
            return (
              <li key={i}>
                <PhotoSlot src={c.photo} alt={`${name}, ${pick(c.specialty, locale)}`} className="clip-chamfer aspect-[3/4]" sizes="(min-width: 1024px) 25vw, 50vw" quiet />
                <div className="mt-4 flex items-start justify-between gap-2">
                  <div>
                    <h3 className="h-card text-[1.5rem]">{name}</h3>
                    <TodoBadge show={!c.name} className="mt-1.5" />
                  </div>
                  <a
                    href={c.instagram || site.contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("instagram", { name })}
                    className="-me-2 grid size-11 shrink-0 place-items-center text-muted hover:text-green"
                  >
                    <IconInstagram />
                  </a>
                </div>
                <p className="mt-2 text-[0.9375rem] text-muted">{pick(c.specialty, locale)}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
