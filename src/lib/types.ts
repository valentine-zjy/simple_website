export const SUPPORTED_LOCALES = ["en", "zh"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];
export type SectionSlug = "about" | "research-statement" | "bio";

export type LocalizedText = string | Partial<Record<Locale, string>>;

export type NavItem = {
  label: LocalizedText;
  href: string;
};

export type ProjectLinks = {
  paper: string;
  code: string;
  demo: string;
};

export type SiteData = {
  title: LocalizedText;
  description: LocalizedText;
  url: string;
  language: Locale;
  supportedLanguages?: Locale[];
};

export type ProfileData = {
  site: SiteData;
  personal: {
    name: LocalizedText;
    englishName?: string;
    headline: LocalizedText;
    shortBio: LocalizedText;
    location: LocalizedText;
    age?: string;
    avatar: string;
    cv: string;
    phone?: string;
    email?: string;
  };
  social: {
    email: string;
    github: string;
    googleScholar: string;
    linkedin: string;
    x: string;
  };
  hero: {
    primaryButton: {
      label: LocalizedText;
      href: string;
    };
    secondaryButton: {
      label: LocalizedText;
      href: string;
    };
  };
  navigation: NavItem[];
  education: Array<{
    institution: LocalizedText;
    degree: LocalizedText;
    period: string;
    location: LocalizedText;
    description: LocalizedText;
  }>;
  researchInterests: Array<{
    title: LocalizedText;
    description: LocalizedText;
  }>;
  projects: Array<{
    title: LocalizedText;
    description: LocalizedText;
    role: LocalizedText;
    tags: string[];
    links: ProjectLinks;
  }>;
  publications: Array<{
    title: LocalizedText;
    authors: LocalizedText;
    venue: LocalizedText;
    year: string;
    status: LocalizedText;
    links: {
      paper: string;
      code: string;
    };
  }>;
  experience: Array<{
    title: LocalizedText;
    organization: LocalizedText;
    period: string;
    location: LocalizedText;
    description: LocalizedText[];
  }>;
  skills: Array<{
    group: LocalizedText;
    items: string[];
  }>;
};

export type ThemeConfig = {
  mode: "light" | "dark";
  accentColor: "blue" | "slate" | "neutral" | string;
  background: {
    type: "image" | "none";
    image: string;
    overlay: boolean;
    overlayOpacity: number;
  };
  layout: {
    maxWidth: string;
    rounded: string;
    cardShadow: string;
  };
  typography: {
    heading: string;
    body: string;
  };
  navbar: {
    sticky: boolean;
    blur: boolean;
  };
  footer: {
    text: LocalizedText;
  };
};

export type ThemeData = {
  theme: ThemeConfig;
};
