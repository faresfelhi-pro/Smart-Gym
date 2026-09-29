/**
 * SITE CONTENT — the single place to edit facts about the gym.
 *
 * Anything marked `todo: true` is a placeholder that must be confirmed with
 * the gym owner (see TODO-CONTENT.md). While `showPlaceholderBadges` is on,
 * those values carry a small amber "à confirmer" marker on the site.
 */
import type { Locale } from "@/i18n/routing";

/** A string translated into every site language. */
export type L = Record<Locale, string>;

export const pick = (value: L, locale: string) =>
  value[locale as Locale] ?? value.fr;

export const site = {
  name: "SMART GYM ENNASR",
  shortName: "SmartGym Ennasr",
  hashtag: "#be_smart",
  url: "https://smartgym-ennasr.vercel.app", // TODO: replace with the real domain

  /** Turn off before going live, once every placeholder is replaced. */
  showPlaceholderBadges: true,

  /**
   * Logo file in /public (e.g. "/brand/logo.svg"). Leave null to use the
   * typographic wordmark. For a PNG logo, also provide a white version.
   */
  logo: null as null | { dark: string; light: string },

  contact: {
    phoneDisplay: "58 805 805",
    phoneIntl: "+216 58 805 805",
    phoneHref: "tel:+21658805805",
    whatsapp: "https://wa.me/21658805805",
    email: "smartgymennasr@gmail.com",
    instagram: "https://www.instagram.com/smartgymennasr/",
    facebook: "https://www.facebook.com/smartgymennasr/",
    address: {
      street: {
        fr: "7ème et 8ème étage, au-dessus de MG Ennasr",
        ar: "الطابق السابع والثامن، فوق MG النصر",
        en: "7th & 8th floor, above MG Ennasr",
      } as L,
      city: { fr: "Cité Ennasr, Ariana", ar: "حي النصر، أريانة", en: "Cité Ennasr, Ariana" } as L,
      country: { fr: "Tunisie", ar: "تونس", en: "Tunisia" } as L,
    },
    mapEmbed:
      "https://www.google.com/maps?q=MG+Ennasr,+Cit%C3%A9+Ennasr,+Ariana,+Tunisie&z=16&output=embed",
    mapLink: "https://www.google.com/maps/search/?api=1&query=MG+Ennasr+Cit%C3%A9+Ennasr+Ariana",
  },

  /** Opening hours — PLACEHOLDER, to confirm with the owner. */
  hours: {
    todo: true,
    rows: [
      { days: { fr: "Lundi – Vendredi", ar: "الإثنين – الجمعة", en: "Monday – Friday" } as L, time: "06:00 – 23:00" },
      { days: { fr: "Samedi – Dimanche", ar: "السبت – الأحد", en: "Saturday – Sunday" } as L, time: "08:00 – 20:00" },
    ],
  },

  /** Hero stats. Only the Facebook community figure is confirmed. */
  stats: [
    { value: "13 500+", label: { fr: "membres de la communauté", ar: "عضو في المجتمع", en: "community members" } as L, todo: false },
    { value: "—", label: { fr: "coachs diplômés", ar: "مدربين معتمدين", en: "certified coaches" } as L, todo: true },
    { value: "— m²", label: { fr: "sur deux étages", ar: "على طابقين", en: "over two floors" } as L, todo: true },
    { value: "—", label: { fr: "cours par semaine", ar: "حصة في الأسبوع", en: "classes a week" } as L, todo: true },
  ],

  /** Promo banner above the pricing cards. Set `enabled: false` to hide it. */
  promo: {
    enabled: true,
    text: {
      fr: "-25 % sur l'abonnement annuel",
      ar: "تخفيض 25% على الاشتراك السنوي",
      en: "25% off the annual membership",
    } as L,
    detail: {
      fr: "Offre à durée limitée, conditions à l'accueil.",
      ar: "عرض لفترة محدودة، الشروط لدى الاستقبال.",
      en: "Limited-time offer, ask at the front desk for details.",
    } as L,
  },

  /**
   * Hero background slides. Put photos in /public/photos and list them here.
   * An empty `src` shows a marked placeholder instead.
   */
  heroSlides: [
    { src: "", alt: { fr: "Plateau de musculation au 7ème étage", ar: "قاعة كمال الأجسام في الطابق السابع", en: "Weight floor on the 7th floor" } as L },
    { src: "", alt: { fr: "Cours collectif Les Mills", ar: "حصة جماعية Les Mills", en: "Les Mills group class" } as L },
    { src: "", alt: { fr: "Espace cardio avec vue sur Ennasr", ar: "فضاء الكارديو مع إطلالة على النصر", en: "Cardio area overlooking Ennasr" } as L },
  ],
};
