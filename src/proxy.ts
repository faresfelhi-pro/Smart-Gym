import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/** Detects the visitor's language and routes to /fr, /ar or /en. */
export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals and any file with an extension.
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
