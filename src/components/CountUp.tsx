"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Counts the first number in `value` up from zero once on mount
 * ("13 500+" → 0+ … 13 500+). Non-numeric values render as-is.
 */
export function CountUp({ value, delay = 0 }: { value: string; delay?: number }) {
  const reduce = useReducedMotion();
  const match = value.match(/\d[\d\s .,]*/);
  const target = match ? Number(match[0].replace(/[^\d]/g, "")) : NaN;
  const [shown, setShown] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    if (reduce || !match || Number.isNaN(target) || started.current) return;
    started.current = true;
    const fmt = (n: number) => value.replace(match[0].trim(), n.toLocaleString("fr-FR").replace(/ /g, " "));
    let raf = 0;
    const t0 = performance.now() + delay * 1000;
    const tick = (now: number) => {
      const p = Math.min(1, Math.max(0, (now - t0) / 1400));
      const eased = 1 - Math.pow(1 - p, 4);
      setShown(fmt(Math.round(target * eased)));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setShown(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <span className="inline-block tabular-nums" dir="ltr">{shown}</span>;
}
