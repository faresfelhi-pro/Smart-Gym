/**
 * The hero's signature element: a barbell whose plates behave like an
 * equalizer, pulsing at 128 BPM — the gym's "ambiance rythmée".
 *
 * On load the plates slide onto the sleeves one by one (like loading a bar),
 * then the beat starts. With reduced motion the bar is simply shown loaded.
 */

// Inner → outer. h = % of the barbell height, w = px thickness.
const PLATES = [
  { h: 100, w: 18, kind: "solid", lo: 0.8 },
  { h: 100, w: 18, kind: "solid", lo: 0.72 },
  { h: 80, w: 13, kind: "outline", lo: 0.55 },
  { h: 64, w: 11, kind: "outline", lo: 0.45 },
  { h: 48, w: 8, kind: "thin", lo: 0.38, desktopOnly: true },
  { h: 34, w: 6, kind: "thin", lo: 0.3, desktopOnly: true },
] as const;

const LOAD_START = 0.55; // s, after the headline lands
const LOAD_STEP = 0.09;

export function Barbell({ className = "" }: { className?: string }) {
  const beatDelay = LOAD_START + PLATES.length * LOAD_STEP + 0.25;

  const side = (dir: 1 | -1) => (
    <div className={`flex h-full items-center gap-[3px] ${dir === 1 ? "flex-row-reverse" : ""}`}>
      {/* sleeve tip */}
      <span className={`h-3 w-5 bg-[#7c8680] md:w-8 ${dir === -1 ? "rounded-s-sm" : "rounded-e-sm"}`} />
      {[...PLATES].reverse().map((p, ri) => {
        const i = PLATES.length - 1 - ri; // inner index
        return (
          <span
            key={i}
            className={`plate-load flex h-full items-center ${"desktopOnly" in p ? "max-md:hidden" : ""}`}
            style={{ ["--from" as string]: `${dir * -60}px`, animationDelay: `${LOAD_START + i * LOAD_STEP}s` }}
          >
            <span
              className="plate block rounded-[3px]"
              style={{
                height: `${p.h}%`,
                width: p.w,
                ["--lo" as string]: p.lo,
                ["--rest" as string]: 1,
                animationDelay: `${beatDelay + i * 0.035}s`,
                background: p.kind === "solid" ? "var(--green)" : p.kind === "outline" ? "var(--graphite)" : "#48524c",
                boxShadow:
                  p.kind === "solid"
                    ? "var(--glow), inset 0 0 0 1px color-mix(in oklab, white 25%, transparent)"
                    : p.kind === "outline"
                      ? "inset 0 0 0 2px var(--green)"
                      : "none",
              }}
            />
          </span>
        );
      })}
      {/* collar */}
      <span className="h-7 w-2.5 rounded-[2px] bg-[#9aa39e] md:h-9" />
    </div>
  );

  return (
    <div aria-hidden className={`flex h-[5.5rem] items-center md:h-[7rem] ${className}`} dir="ltr">
      {side(-1)}
      {/* bar with knurled grips */}
      <span
        className="bar-extend h-[7px] flex-1 origin-center"
        style={{
          background:
            "linear-gradient(90deg, #6c7771 0 12%, transparent 12% 88%, #6c7771 88%), repeating-linear-gradient(90deg, #56615b 0 2px, #7a857f 2px 4px)",
        }}
      />
      {side(1)}
    </div>
  );
}
