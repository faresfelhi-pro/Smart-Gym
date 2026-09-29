import { pick, site } from "@/content/site";

/** schema.org HealthClub data for Google (address, phone, socials). */
export function JsonLd({ locale }: { locale: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "HealthClub",
    name: site.name,
    alternateName: site.shortName,
    url: `${site.url}/${locale}`,
    telephone: site.contact.phoneIntl,
    email: site.contact.email,
    slogan: "Be Smart.",
    address: {
      "@type": "PostalAddress",
      streetAddress: pick(site.contact.address.street, "fr"),
      addressLocality: "Cité Ennasr",
      addressRegion: "Ariana",
      addressCountry: "TN",
    },
    areaServed: ["Ennasr", "Ariana", "Tunis"],
    sameAs: [site.contact.instagram, site.contact.facebook],
    // openingHoursSpecification: add once the real hours are confirmed.
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
