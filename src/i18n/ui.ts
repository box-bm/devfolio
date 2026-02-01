export const languages = {
  en: "English",
  es: "Español",
};

export const LANG_CODES = Object.keys(languages) as Array<
  keyof typeof languages
>;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = "en";

export const ui = {
  en: {
    // header
    "nav.about": "About",
    "nav.project": "Projects",
    "nav.contact": "Contact",
    "nav.guides": "Guides",

    //legal
    "legal.privacy": "Privacy Policy",
    "legal.terms": "Terms of Service",
    "legal.languages": "Languages",
    "legal.app": "App",
    "legal.version": "Version",
    "legal.effectiveDate": "Effective Date",

    // footer
    "footer.label": "Build with Astro",

    // titles
    "title.guides": "Guides - BoxDev",

    // keywords
    readMore: "Read More",
    "guides.getInTouch.title": "Get in Touch",
    "guides.getInTouch.description":
      "If you have any questions, suggestions, or need assistance, feel free to reach out. I'm here to help!",
  },
  es: {
    // header
    "nav.about": "Sobre Mi",
    "nav.project": "Proyectos",
    "nav.contact": "Contacto",
    "nav.guides": "Guías",

    // legal
    "legal.privacy": "Política de Privacidad",
    "legal.terms": "Términos de Servicio",
    "legal.languages": "Idiomas",
    "legal.app": "Aplicación",
    "legal.version": "Versión",
    "legal.effectiveDate": "Fecha de Vigencia",

    // footer
    "footer.label": "Construido con Astro",

    // titles
    "title.guides": "Guías - BoxDev",

    // keywords
    readMore: "Leer Más",
    "guides.getInTouch.title": "Ponte en Contacto",
    "guides.getInTouch.description":
      "Si tienes alguna pregunta, sugerencia o necesitas ayuda, no dudes en contactarme. ¡Estoy aquí para ayudarte!",
  },
};
