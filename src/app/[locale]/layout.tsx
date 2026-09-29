import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Big_Shoulders, Archivo, Cairo } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, isRtl } from "@/i18n/routing";
import { site } from "@/content/site";
import { TrialProvider } from "@/components/TrialContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { JsonLd } from "@/components/JsonLd";
import "../globals.css";

const bigShoulders = Big_Shoulders({ subsets: ["latin"], axes: ["opsz"], variable: "--font-bs", display: "swap" });
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });
const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo", display: "swap", preload: false });

export const viewport: Viewport = { themeColor: "#101412" };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(site.url),
    title: { default: t("title"), template: `%s | ${site.shortName}` },
    description: t("description"),
    keywords: t("keywords"),
    alternates: {
      canonical: `/${locale}`,
      languages: { fr: "/fr", ar: "/ar", en: "/en", "x-default": "/fr" },
    },
    openGraph: {
      type: "website",
      siteName: site.shortName,
      title: t("title"),
      description: t("description"),
      locale: { fr: "fr_TN", ar: "ar_TN", en: "en_US" }[locale],
      url: `/${locale}`,
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const tc = await getTranslations({ locale, namespace: "common" });

  return (
    <html
      lang={locale}
      dir={isRtl(locale) ? "rtl" : "ltr"}
      className={`${bigShoulders.variable} ${archivo.variable} ${cairo.variable}`}
    >
      <body>
        <a href="#main" className="sr-only z-[70] bg-green px-4 py-3 font-bold text-on-green focus:not-sr-only focus:fixed focus:start-4 focus:top-4">
          {tc("skip")}
        </a>
        <NextIntlClientProvider>
          <TrialProvider>
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <WhatsAppFab />
          </TrialProvider>
        </NextIntlClientProvider>
        <JsonLd locale={locale} />
      </body>
    </html>
  );
}
