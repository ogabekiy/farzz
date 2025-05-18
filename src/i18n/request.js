import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // `[locale]` segmentiga mos keladigan tilni olamiz
  let locale =  await requestLocale;

  // Agar til noto‘g‘ri bo‘lsa, default tilga o‘tkazamiz
  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
