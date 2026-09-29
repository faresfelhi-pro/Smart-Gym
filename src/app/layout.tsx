import type { ReactNode } from "react";

// The <html> element lives in app/[locale]/layout.tsx so it can carry the
// right `lang` and `dir`. This root layout only passes children through.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
