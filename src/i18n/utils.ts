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
  /** Looks up `key`, filling `{name}` placeholders from `values`. */
  return function t(
    key: keyof (typeof translations)[typeof defaultLang],
    values?: Record<string, string | number>,
  ) {
    const text = translations[lang][key] || translations[defaultLang][key];
    if (!values) return text;
    return text.replace(/\{(\w+)\}/g, (match, name) =>
      name in values ? String(values[name]) : match,
    );
  };
}
