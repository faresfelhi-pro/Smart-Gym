import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { Why } from "@/components/Why";
import { Activities } from "@/components/Activities";
import { Planning } from "@/components/Planning";
import { Pricing } from "@/components/Pricing";
import { Coaches } from "@/components/Coaches";
import { Testimonials } from "@/components/Testimonials";
import { Gallery } from "@/components/Gallery";
import { Calculator } from "@/components/Calculator";
import { CtaBand } from "@/components/CtaBand";
import { Contact } from "@/components/Contact";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <Why />
      <Activities />
      <Planning />
      <Pricing />
      <Coaches />
      <Testimonials />
      <Gallery />
      <Calculator />
      <CtaBand />
      <Contact />
    </>
  );
}
