"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { TrialModal } from "./TrialModal";

type TrialCtx = { openTrial: (activitySlug?: string) => void };
const Ctx = createContext<TrialCtx>({ openTrial: () => {} });

/** Lets any button on the site open the free-trial booking modal. */
export function TrialProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ open: boolean; activity?: string }>({ open: false });
  const openTrial = useCallback((activity?: string) => setState({ open: true, activity }), []);
  return (
    // LazyMotion loads only the animation features we use (smaller bundle).
    // reducedMotion="user": transforms are skipped for visitors who ask for less motion.
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <Ctx.Provider value={{ openTrial }}>
          {children}
          <TrialModal open={state.open} initialActivity={state.activity} onClose={() => setState({ open: false })} />
        </Ctx.Provider>
      </MotionConfig>
    </LazyMotion>
  );
}

export const useTrial = () => useContext(Ctx);

/** A button that opens the trial modal; usable from server components. */
export function TrialButton({ children, className = "btn btn-green chamfer", activity }: { children: ReactNode; className?: string; activity?: string }) {
  const { openTrial } = useTrial();
  return (
    <button type="button" className={className} onClick={() => openTrial(activity)}>
      {children}
    </button>
  );
}
