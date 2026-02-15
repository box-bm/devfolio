export enum UiKey {
  // Navigation
  "nav.about" = "nav.about",
  "nav.projects" = "nav.projects",
  "nav.contact" = "nav.contact",
  "nav.guides" = "nav.guides",

  // Portfolio – Hero
  "portfolio.hero.title" = "portfolio.hero.title",
  "portfolio.hero.caption" = "portfolio.hero.caption",

  // Portfolio – About
  "portfolio.about.title" = "portfolio.about.title",
  "portfolio.about.description1" = "portfolio.about.description1",
  "portfolio.about.description2" = "portfolio.about.description2",

  // Portfolio – Experience
  "portfolio.about.experience.projects.description" = "portfolio.about.experience.projects.description",
  "portfolio.about.experience.techAndTools.title" = "portfolio.about.experience.techAndTools.title",
  "portfolio.about.experience.techAndTools.description" = "portfolio.about.experience.techAndTools.description",

  // Portfolio – Skills & Tech
  "portfolio.about.skillsAndTech.title" = "portfolio.about.skillsAndTech.title",
  "portfolio.about.skillsAndTech.frameworksAndLibraries" = "portfolio.about.skillsAndTech.frameworksAndLibraries",
  "portfolio.about.skillsAndTech.languages" = "portfolio.about.skillsAndTech.languages",
  "portfolio.about.skillsAndTech.tools" = "portfolio.about.skillsAndTech.tools",

  // Portfolio – Why work with me
  "portfolio.about.whyWorkWithMe.title" = "portfolio.about.whyWorkWithMe.title",

  "portfolio.about.whyWorkWithMe.designAndDevelopment.title" = "portfolio.about.whyWorkWithMe.designAndDevelopment.title",
  "portfolio.about.whyWorkWithMe.designAndDevelopment.description" = "portfolio.about.whyWorkWithMe.designAndDevelopment.description",

  "portfolio.about.whyWorkWithMe.userApproach.title" = "portfolio.about.whyWorkWithMe.userApproach.title",
  "portfolio.about.whyWorkWithMe.userApproach.description" = "portfolio.about.whyWorkWithMe.userApproach.description",

  "portfolio.about.whyWorkWithMe.performance.title" = "portfolio.about.whyWorkWithMe.performance.title",
  "portfolio.about.whyWorkWithMe.performance.description" = "portfolio.about.whyWorkWithMe.performance.description",

  // Portfolio – Fun fact
  "portfolio.about.funFact.title" = "portfolio.about.funFact.title",
  "portfolio.about.funFact.description" = "portfolio.about.funFact.description",

  // Portfolio – Projects
  "portfolio.projects.title" = "portfolio.projects.title",
  "portfolio.projects.description" = "portfolio.projects.description",

  "portfolio.projects.app1.title" = "portfolio.projects.app1.title",
  "portfolio.projects.app1.description" = "portfolio.projects.app1.description",

  "portfolio.projects.app2.title" = "portfolio.projects.app2.title",
  "portfolio.projects.app2.description" = "portfolio.projects.app2.description",

  "portfolio.projects.app3.title" = "portfolio.projects.app3.title",
  "portfolio.projects.app3.description" = "portfolio.projects.app3.description",

  "portfolio.projects.viewAll" = "portfolio.projects.viewAll",

  // Portfolio – Contact
  "portfolio.contact.title" = "portfolio.contact.title",
  "portfolio.contact.description" = "portfolio.contact.description",
  "portfolio.contact.sendEmail" = "portfolio.contact.sendEmail",
  "portfolio.contact.connectOnLinkedin" = "portfolio.contact.connectOnLinkedin",
  "portfolio.contact.caption" = "portfolio.contact.caption",

  // Legal
  "legal.privacy" = "legal.privacy",
  "legal.terms" = "legal.terms",
  "legal.languages" = "legal.languages",
  "legal.app" = "legal.app",
  "legal.version" = "legal.version",
  "legal.effectiveDate" = "legal.effectiveDate",

  // Legal
  "title.legal" = "title.legal",
  "legal.title" = "legal.title",

  // Guides
  "title.guides" = "title.guides",
  "guides.title" = "guides.title",
  "guides.createdAt" = "guides.createdAt",
  "guides.updatedAt" = "guides.updatedAt",
  "guides.contact.title" = "guides.contact.title",
  "guides.contact.description" = "guides.contact.description",

  // Footer
  "footer.label" = "footer.label",

  // General
  "general.readmore" = "general.readmore",
  "general.projects" = "general.projects",
  "general.contact" = "general.contact",
  "general.years" = "general.years",
}

export type UiKeys = `${UiKey}`;

export type UiDict = { [K in UiKey]: string };
