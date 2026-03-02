export const locales = ["en", "tr", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
