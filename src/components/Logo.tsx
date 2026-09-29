import Image from "next/image";
import { site } from "@/content/site";

/**
 * Uses the logo file from `site.logo` when provided; otherwise a
 * typographic wordmark so the demo never shows a broken image.
 */
export function Logo({ className = "" }: { className?: string }) {
  if (site.logo) {
    return (
      <Image src={site.logo.light} alt={site.shortName} width={160} height={48} className={`h-10 w-auto ${className}`} priority />
    );
  }
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} dir="ltr" lang="en">
      <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden className="text-green">
        <path d="M0 0h22l8 8v22H8l-8-8z" fill="currentColor" />
        <path d="M8 11v8M11.5 9v12M18.5 9v12M22 11v8M11.5 15h7" stroke="var(--on-green)" strokeWidth="2.2" strokeLinecap="square" fill="none" />
      </svg>
      <span className="display-latin display flex flex-col text-[1.15rem] leading-[0.95] text-chalk xs:block xs:text-[1.35rem] xs:leading-none">
        <span>Smart Gym</span> <span className="font-semibold text-muted">Ennasr</span>
      </span>
    </span>
  );
}
