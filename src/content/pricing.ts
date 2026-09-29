/**
 * PRICING — membership plans in Tunisian dinars.
 * All prices are PLACEHOLDERS ("XXX DT") until the owner confirms them.
 */
import type { L } from "./site";

export type Plan = {
  id: string;
  name: L;
  months: number;
  price: string; // shown as-is, e.g. "120 DT"
  perMonth?: string; // optional, e.g. "95 DT / mois"
  perks: L[];
  highlight: boolean;
  todo: boolean;
};

const allAccess: L = { fr: "Accès musculation et cardio", ar: "دخول قاعة كمال الأجسام والكارديو", en: "Weights and cardio access" };
const classes: L = { fr: "Cours collectifs inclus", ar: "الحصص الجماعية مشمولة", en: "Group classes included" };
const program: L = { fr: "Programme d'entraînement offert", ar: "برنامج تدريبي مجاني", en: "Free training programme" };
const followUp: L = { fr: "Bilan avec un coach chaque mois", ar: "تقييم شهري مع مدرب", en: "Monthly check-in with a coach" };

export const plans: Plan[] = [
  { id: "monthly", name: { fr: "Mensuel", ar: "شهري", en: "Monthly" }, months: 1, price: "XXX DT", perks: [allAccess, classes], highlight: false, todo: true },
  { id: "quarterly", name: { fr: "Trimestriel", ar: "ثلاثي", en: "Quarterly" }, months: 3, price: "XXX DT", perks: [allAccess, classes, program], highlight: false, todo: true },
  { id: "biannual", name: { fr: "Semestriel", ar: "سداسي", en: "6 months" }, months: 6, price: "XXX DT", perks: [allAccess, classes, program], highlight: false, todo: true },
  { id: "annual", name: { fr: "Annuel", ar: "سنوي", en: "Annual" }, months: 12, price: "XXX DT", perks: [allAccess, classes, program, followUp], highlight: true, todo: true },
];
