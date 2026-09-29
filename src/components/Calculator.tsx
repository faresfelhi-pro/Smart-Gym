"use client";

import { useId, useState } from "react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "./SectionHeading";
import { useTrial } from "./TrialContext";

type Sex = "male" | "female";
const LEVELS = [
  { key: "sedentary", factor: 1.2 },
  { key: "light", factor: 1.375 },
  { key: "moderate", factor: 1.55 },
  { key: "high", factor: 1.725 },
] as const;

// BMI scale shown on the gauge.
const MIN = 15;
const MAX = 40;
const ZONES = [
  { key: "under", to: 18.5, color: "#7d8a83" },
  { key: "normal", to: 25, color: "var(--green)" },
  { key: "over", to: 30, color: "var(--sodium)" },
  { key: "obese", to: MAX, color: "#ff6b5e" },
] as const;

/** BMI + daily calories (Mifflin-St Jeor). Everything recalculates live. */
export function Calculator() {
  const t = useTranslations("calc");
  const { openTrial } = useTrial();
  const id = useId();
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState(28);
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(75);
  const [level, setLevel] = useState<(typeof LEVELS)[number]["key"]>("light");

  const bmi = weight / (height / 100) ** 2;
  const zone = ZONES.find((z) => bmi < z.to) ?? ZONES[ZONES.length - 1];
  const bmr = 10 * weight + 6.25 * height - 5 * age + (sex === "male" ? 5 : -161);
  const tdee = bmr * LEVELS.find((l) => l.key === level)!.factor;
  const round = (n: number) => Math.round(n / 10) * 10;
  const kcal = {
    maintain: round(tdee),
    lose: round(Math.max(sex === "male" ? 1500 : 1200, tdee - 500)),
    gain: round(tdee + 300),
  };
  const marker = ((Math.min(MAX, Math.max(MIN, bmi)) - MIN) / (MAX - MIN)) * 100;

  return (
    <section aria-labelledby="calc-title" className="section border-t border-line">
      <div className="shell">
        <SectionHeading id="calc-title" title={t("title")} intro={t("intro")} />

        <div className="grid border border-line lg:grid-cols-2">
          {/* Inputs */}
          <form className="grid gap-7 p-5 sm:p-8" onSubmit={(e) => e.preventDefault()}>
            <fieldset>
              <legend className="mb-2 text-[0.9375rem] font-semibold">{t("sex")}</legend>
              <div className="grid grid-cols-2 border border-line">
                {(["male", "female"] as const).map((s) => (
                  <label key={s} className={`cursor-pointer py-3 text-center font-semibold transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-green ${sex === s ? "bg-chalk text-graphite" : "text-muted hover:text-chalk"}`}>
                    <input type="radio" name={`${id}-sex`} value={s} checked={sex === s} onChange={() => setSex(s)} className="sr-only" />
                    {t(s)}
                  </label>
                ))}
              </div>
            </fieldset>

            <Slider id={`${id}-age`} label={t("age")} unit={t("ageUnit")} min={14} max={80} value={age} onChange={setAge} />
            <Slider id={`${id}-h`} label={t("height")} unit="cm" min={140} max={210} value={height} onChange={setHeight} />
            <Slider id={`${id}-w`} label={t("weight")} unit="kg" min={40} max={160} value={weight} onChange={setWeight} />

            <fieldset>
              <legend className="mb-2 text-[0.9375rem] font-semibold">{t("activity")}</legend>
              <div className="grid grid-cols-2 gap-2">
                {LEVELS.map((l) => (
                  <label key={l.key} className={`cursor-pointer border px-3 py-2.5 text-[0.9375rem] transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-green ${level === l.key ? "border-green bg-green/10 text-chalk" : "border-line text-muted hover:text-chalk"}`}>
                    <input type="radio" name={`${id}-lvl`} value={l.key} checked={level === l.key} onChange={() => setLevel(l.key)} className="sr-only" />
                    {t(`levels.${l.key}`)}
                  </label>
                ))}
              </div>
            </fieldset>
          </form>

          {/* Results */}
          <div className="flex flex-col border-t border-line bg-surface p-5 sm:p-8 lg:border-t-0 lg:border-s" aria-live="polite">
            <p className="text-[0.9375rem] font-semibold text-muted">{t("bmi")}</p>
            <div className="mt-1 flex flex-wrap items-baseline gap-x-4">
              <output className="display display-latin text-[6rem] tabular-nums md:text-[7.5rem]" dir="ltr">{bmi.toFixed(1)}</output>
              <p className="text-[1.125rem] font-bold" style={{ color: zone.color }}>{t(`zones.${zone.key}`)}</p>
            </div>

            {/* Gauge */}
            <div className="relative mt-4" dir="ltr" aria-hidden>
              <div className="flex h-2.5 gap-[2px]">
                {ZONES.map((z, i) => {
                  const from = i === 0 ? MIN : ZONES[i - 1].to;
                  return <span key={z.key} style={{ flex: z.to - from, background: z.color, opacity: z.key === zone.key ? 1 : 0.35 }} />;
                })}
              </div>
              <span className="absolute -top-1.5 h-5.5 w-1 -translate-x-1/2 bg-chalk transition-[left] duration-300" style={{ left: `${marker}%` }} />
              <div className="relative mt-2 h-4 text-[0.75rem] tabular-nums text-muted">
                {[MIN, 18.5, 25, 30, MAX].map((v, i, all) => (
                  <span
                    key={v}
                    className={`absolute ${i === 0 ? "" : i === all.length - 1 ? "-translate-x-full" : "-translate-x-1/2"}`}
                    style={{ left: `${((v - MIN) / (MAX - MIN)) * 100}%` }}
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>

            <p className="mt-10 text-[0.9375rem] font-semibold text-muted">{t("calories")}</p>
            <dl className="mt-3 grid grid-cols-3 gap-px border border-line bg-line">
              {(["lose", "maintain", "gain"] as const).map((k) => (
                <div key={k} className={`p-3 sm:p-4 ${k === "maintain" ? "bg-graphite" : "bg-surface"}`}>
                  <dt className="text-[0.8125rem] leading-tight text-muted">{t(k)}</dt>
                  <dd className="display display-latin mt-2 text-[2rem] tabular-nums sm:text-[2.5rem]" dir="ltr">{kcal[k]}</dd>
                  <dd className="text-[0.75rem] text-muted">kcal</dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 text-[0.875rem] text-muted">{t("disclaimer")}</p>
            <div className="mt-auto pt-8">
              <button type="button" onClick={() => openTrial("coaching-personnel")} className="btn btn-green chamfer w-full sm:w-auto">
                {t("cta")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Slider({ id, label, unit, min, max, value, onChange }: { id: string; label: string; unit: string; min: number; max: number; value: number; onChange: (n: number) => void }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <label htmlFor={id} className="text-[0.9375rem] font-semibold">{label}</label>
        <span className="text-[1.125rem] font-bold tabular-nums">
          {value} <span className="text-[0.875rem] font-normal text-muted">{unit}</span>
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range w-full"
        style={{ ["--pct" as string]: `${pct}%` }}
      />
    </div>
  );
}
