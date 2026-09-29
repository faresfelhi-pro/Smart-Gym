/**
 * ACTIVITIES — cards on the home page and the /activites/[slug] pages.
 *
 * `todo: true` = not yet confirmed that SmartGym Ennasr offers it.
 * Les Mills programmes are licensed: keep only the ones the gym really runs.
 * `intensity` is 1 (gentle) to 5 (very intense). `duration` is in minutes.
 * `image`: path in /public/photos, or "" for a marked placeholder.
 */
import type { L } from "./site";

export type Activity = {
  slug: string;
  name: L;
  summary: L;
  intensity: 1 | 2 | 3 | 4 | 5;
  duration: number | null;
  lesMills: boolean;
  image: string;
  todo: boolean;
};

export const activities: Activity[] = [
  {
    slug: "musculation",
    name: { fr: "Musculation", ar: "كمال الأجسام", en: "Strength training" },
    summary: {
      fr: "Plateau libre et guidé, charges lourdes et machines de dernière génération.",
      ar: "أوزان حرة وآلات موجهة من أحدث جيل.",
      en: "Free weights and guided machines, from light work to heavy lifts.",
    },
    intensity: 4,
    duration: null,
    lesMills: false,
    image: "",
    todo: false,
  },
  {
    slug: "cardio",
    name: { fr: "Cardio", ar: "كارديو", en: "Cardio" },
    summary: {
      fr: "Tapis, vélos et rameurs face aux baies vitrées du 8ème étage.",
      ar: "أجهزة المشي والدراجات والتجديف أمام نوافذ الطابق الثامن.",
      en: "Treadmills, bikes and rowers facing the 8th-floor windows.",
    },
    intensity: 3,
    duration: null,
    lesMills: false,
    image: "",
    todo: true,
  },
  {
    slug: "cross-training",
    name: { fr: "Cross-training", ar: "كروس ترينينغ", en: "Cross-training" },
    summary: {
      fr: "Circuits fonctionnels en petit groupe : force, souffle et coordination.",
      ar: "تمارين وظيفية في مجموعات صغيرة: قوة وتحمل وتنسيق.",
      en: "Small-group functional circuits for strength, stamina and coordination.",
    },
    intensity: 5,
    duration: 45,
    lesMills: false,
    image: "",
    todo: true,
  },
  {
    slug: "bodypump",
    name: { fr: "BodyPump", ar: "BodyPump", en: "BodyPump" },
    summary: {
      fr: "Barre et poids légers en musique, tout le corps travaille en répétitions.",
      ar: "عمل بالعارضة وأوزان خفيفة على الموسيقى لكامل الجسم.",
      en: "A barbell and light weights set to music, working the whole body in reps.",
    },
    intensity: 4,
    duration: 55,
    lesMills: true,
    image: "",
    todo: true,
  },
  {
    slug: "bodycombat",
    name: { fr: "BodyCombat", ar: "BodyCombat", en: "BodyCombat" },
    summary: {
      fr: "Coups de poing et de pied inspirés des arts martiaux, sans contact.",
      ar: "لكمات وركلات مستوحاة من فنون القتال، دون احتكاك.",
      en: "Martial-arts punches and kicks, with no contact.",
    },
    intensity: 5,
    duration: 55,
    lesMills: true,
    image: "",
    todo: true,
  },
  {
    slug: "bodyattack",
    name: { fr: "BodyAttack", ar: "BodyAttack", en: "BodyAttack" },
    summary: {
      fr: "Cardio athlétique : courses, sauts et renforcement en alternance.",
      ar: "كارديو رياضي: جري وقفز وتقوية بالتناوب.",
      en: "Athletic cardio alternating runs, jumps and strength moves.",
    },
    intensity: 5,
    duration: 55,
    lesMills: true,
    image: "",
    todo: true,
  },
  {
    slug: "rpm",
    name: { fr: "RPM", ar: "RPM", en: "RPM" },
    summary: {
      fr: "Vélo indoor en rythme, côtes et sprints guidés par le coach.",
      ar: "دراجة داخلية على الإيقاع، صعود وسرعة بتوجيه المدرب.",
      en: "Indoor cycling to the beat, with climbs and sprints led by the coach.",
    },
    intensity: 4,
    duration: 45,
    lesMills: true,
    image: "",
    todo: true,
  },
  {
    slug: "bodybalance",
    name: { fr: "BodyBalance", ar: "BodyBalance", en: "BodyBalance" },
    summary: {
      fr: "Yoga, tai-chi et Pilates pour la souplesse et le gainage.",
      ar: "يوغا وتاي تشي وبيلاتس للمرونة وتقوية الجذع.",
      en: "Yoga, tai chi and Pilates for flexibility and core strength.",
    },
    intensity: 2,
    duration: 55,
    lesMills: true,
    image: "",
    todo: true,
  },
  {
    slug: "zumba",
    name: { fr: "Zumba & Dance", ar: "زومبا ورقص", en: "Zumba & Dance" },
    summary: {
      fr: "Chorégraphies faciles à suivre, pour se dépenser sans compter les minutes.",
      ar: "رقصات سهلة المتابعة لحرق الطاقة بمتعة.",
      en: "Easy-to-follow choreography that makes the minutes fly.",
    },
    intensity: 3,
    duration: 50,
    lesMills: false,
    image: "",
    todo: true,
  },
  {
    slug: "stretching",
    name: { fr: "Stretching", ar: "تمطيط", en: "Stretching" },
    summary: {
      fr: "Mobilité et récupération, idéal après une séance de musculation.",
      ar: "حركية واسترجاع، مثالي بعد حصة كمال الأجسام.",
      en: "Mobility and recovery, ideal after a strength session.",
    },
    intensity: 1,
    duration: 30,
    lesMills: false,
    image: "",
    todo: true,
  },
  {
    slug: "coaching-personnel",
    name: { fr: "Coaching personnel", ar: "تدريب شخصي", en: "Personal coaching" },
    summary: {
      fr: "Un coach, un programme écrit pour vous et un suivi séance après séance.",
      ar: "مدرب وبرنامج مخصص لك ومتابعة في كل حصة.",
      en: "One coach, a programme written for you and follow-up every session.",
    },
    intensity: 3,
    duration: 60,
    lesMills: false,
    image: "",
    todo: true,
  },
];
