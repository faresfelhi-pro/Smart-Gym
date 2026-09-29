/**
 * COACHES, TESTIMONIALS AND GALLERY — all PLACEHOLDERS.
 * Never publish invented names or reviews: replace with real ones
 * (with the person's consent) before going live.
 */
import type { L } from "./site";

export type Coach = { name: string | null; specialty: L; photo: string; instagram: string };

export const coaches: Coach[] = [
  { name: null, specialty: { fr: "Musculation et prise de masse", ar: "كمال الأجسام وزيادة الكتلة", en: "Strength and muscle gain" }, photo: "", instagram: "" },
  { name: null, specialty: { fr: "Les Mills BodyPump et RPM", ar: "Les Mills BodyPump و RPM", en: "Les Mills BodyPump and RPM" }, photo: "", instagram: "" },
  { name: null, specialty: { fr: "Cross-training et préparation physique", ar: "كروس ترينينغ وإعداد بدني", en: "Cross-training and conditioning" }, photo: "", instagram: "" },
  { name: null, specialty: { fr: "Cardio-danse et remise en forme", ar: "رقص رياضي واستعادة اللياقة", en: "Dance cardio and getting back in shape" }, photo: "", instagram: "" },
];

export type Testimonial = { quote: L; author: string | null; detail: L };

export const testimonials: Testimonial[] = [
  {
    quote: { fr: "Emplacement du témoignage d'un membre. Demandez à 3 ou 4 membres fidèles une phrase sur leur expérience.", ar: "مكان شهادة أحد الأعضاء. اطلبوا من 3 أو 4 أعضاء جملة عن تجربتهم.", en: "Placeholder for a member's testimonial. Ask 3 or 4 regular members for one sentence about their experience." },
    author: null,
    detail: { fr: "Membre depuis —", ar: "عضو منذ —", en: "Member since —" },
  },
  {
    quote: { fr: "Emplacement d'un deuxième témoignage, idéalement sur les cours collectifs.", ar: "مكان شهادة ثانية، ويفضل عن الحصص الجماعية.", en: "Placeholder for a second testimonial, ideally about group classes." },
    author: null,
    detail: { fr: "Membre depuis —", ar: "عضو منذ —", en: "Member since —" },
  },
  {
    quote: { fr: "Emplacement d'un troisième témoignage, par exemple sur le suivi des coachs.", ar: "مكان شهادة ثالثة، مثلا عن متابعة المدربين.", en: "Placeholder for a third testimonial, for example about coach follow-up." },
    author: null,
    detail: { fr: "Membre depuis —", ar: "عضو منذ —", en: "Member since —" },
  },
];

/** Gallery photos. `ratio` is width / height, used for the masonry layout. */
export type Photo = { src: string; alt: L; ratio: number };

export const gallery: Photo[] = [
  { src: "", ratio: 4 / 5, alt: { fr: "Rack à squat du plateau musculation", ar: "رف السكوات في قاعة الأوزان", en: "Squat rack on the weight floor" } },
  { src: "", ratio: 3 / 2, alt: { fr: "Vue d'Ennasr depuis l'espace cardio", ar: "إطلالة على النصر من فضاء الكارديو", en: "View of Ennasr from the cardio area" } },
  { src: "", ratio: 1, alt: { fr: "Cours de BodyPump en salle collective", ar: "حصة BodyPump", en: "BodyPump class in the studio" } },
  { src: "", ratio: 3 / 4, alt: { fr: "Haltères alignés", ar: "صف من الدمبلز", en: "Row of dumbbells" } },
  { src: "", ratio: 16 / 10, alt: { fr: "Accueil du 7ème étage", ar: "استقبال الطابق السابع", en: "7th-floor reception" } },
  { src: "", ratio: 4 / 5, alt: { fr: "Coach avec un membre", ar: "مدرب مع أحد الأعضاء", en: "Coach with a member" } },
  { src: "", ratio: 3 / 2, alt: { fr: "Salle de vélo RPM", ar: "قاعة دراجات RPM", en: "RPM cycling studio" } },
  { src: "", ratio: 1, alt: { fr: "Vestiaires", ar: "غرف تبديل الملابس", en: "Changing rooms" } },
  { src: "", ratio: 4 / 5, alt: { fr: "Soirée événement à la salle", ar: "سهرة حدث في القاعة", en: "Event night at the gym" } },
];
