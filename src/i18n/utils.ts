import { translations } from "./translations";
import { defaultLang, type Lang } from "./langs";

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split("/");
  if (lang in translations) return lang as Lang;
  return defaultLang;
}

export function getLangFromLegalUrl(url: URL) {
  const segments = url.pathname.split("/");
  const lang = segments[4];
  if (lang in translations) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof translations)[typeof defaultLang]) {
    return translations[lang][key] || translations[defaultLang][key];
  };
}
