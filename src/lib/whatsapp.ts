import { site } from "@/content/site";

/** Builds a wa.me link with a pre-filled message. */
export function whatsappLink(message?: string) {
  if (!message) return site.contact.whatsapp;
  return `${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Tunisian mobile/landline numbers: 8 digits, optional +216 / 00216 prefix. */
export function isValidTunisianPhone(value: string) {
  const digits = value.replace(/[\s.-]/g, "").replace(/^(\+216|00216)/, "");
  return /^\d{8}$/.test(digits);
}
