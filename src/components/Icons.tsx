/**
 * Line icons drawn for the site (24px grid, 1.75 stroke, currentColor).
 * Kept inline so there is no icon-font request.
 */
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = (p: P) => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...p,
});

export const IconDumbbell = (p: P) => (
  <svg {...base(p)}><path d="M3 9v6M6 6v12M18 6v12M21 9v6M6 12h12" /></svg>
);
export const IconWhistle = (p: P) => (
  <svg {...base(p)}><circle cx="9" cy="14" r="5" /><path d="M13 11l8-4v4l-6 2M9 9V5" /></svg>
);
export const IconWave = (p: P) => (
  <svg {...base(p)}><path d="M2 12h3l2-6 3 12 3-9 2 5 2-2h5" /></svg>
);
export const IconFloors = (p: P) => (
  <svg {...base(p)}><path d="M4 21V9l8-5 8 5v12M4 13h16M4 17h16M10 21v-4h4v4" /></svg>
);
export const IconSpark = (p: P) => (
  <svg {...base(p)}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" /></svg>
);
export const IconDrop = (p: P) => (
  <svg {...base(p)}><path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" /><path d="M9 15a3 3 0 0 0 3 3" /></svg>
);
export const IconCheck = (p: P) => (
  <svg {...base(p)}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
);
export const IconArrow = (p: P) => (
  <svg {...base(p)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const IconClose = (p: P) => (
  <svg {...base(p)}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const IconPhone = (p: P) => (
  <svg {...base(p)}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
);
export const IconMail = (p: P) => (
  <svg {...base(p)}><rect x="3" y="5" width="18" height="14" rx="1" /><path d="m3 7 9 6 9-6" /></svg>
);
export const IconPin = (p: P) => (
  <svg {...base(p)}><path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></svg>
);
export const IconClock = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const IconInstagram = (p: P) => (
  <svg {...base(p)}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".5" fill="currentColor" /></svg>
);
export const IconFacebook = (p: P) => (
  <svg {...base(p)}><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" /></svg>
);
export const IconWhatsApp = (p: P) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5.1 5.2-1.4A9.9 9.9 0 1 0 12.04 2zm0 18.1a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3a8.2 8.2 0 1 1 7 3.9zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3z" />
  </svg>
);
