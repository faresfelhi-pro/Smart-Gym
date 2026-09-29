"use client";

import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Big uppercase section title with a one-time "rise from the floor" reveal.
 * This is the only scroll-triggered motion on the page; cards stay still.
 */
export function SectionHeading({ id, title, intro, aside }: { id?: string; title: string; intro?: string; aside?: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <div className="mb-12 grid gap-6 md:mb-16 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-end">
      <h2 id={id} className="display h-section overflow-hidden pb-[0.05em]">
        <m.span
          className="block"
          initial={reduce ? false : { y: "100%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 0.7, ease: [0.2, 0.9, 0.1, 1] }}
        >
          {title}
        </m.span>
      </h2>
      {(intro || aside) && (
        <div className="lg:pb-3">
          {intro && <p className="lede">{intro}</p>}
          {aside}
        </div>
      )}
    </div>
  );
}
