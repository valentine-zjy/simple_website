import type { CSSProperties } from "react";

import type { ThemeConfig } from "@/lib/types";

type LayoutToken =
  | "max-w-5xl"
  | "max-w-6xl"
  | "rounded-xl"
  | "rounded-2xl"
  | "shadow-none"
  | "shadow-sm"
  | "shadow-md";

export type AccentPalette = {
  buttonPrimary: string;
  buttonSecondary: string;
  link: string;
  muted: string;
  kicker: string;
  navLink: string;
  languageActive: string;
};

const accentPalettes: Record<string, AccentPalette> = {
  blue: {
    buttonPrimary:
      "border border-blue-700 bg-blue-700 text-white hover:bg-blue-800",
    buttonSecondary:
      "border border-blue-200 bg-blue-50 text-blue-800 hover:border-blue-300 hover:bg-blue-100",
    link: "text-blue-700 hover:text-blue-800",
    muted: "text-slate-700",
    kicker: "text-blue-700",
    navLink: "hover:text-blue-700",
    languageActive: "border-blue-700 bg-blue-700 text-white",
  },
  slate: {
    buttonPrimary:
      "border border-slate-800 bg-slate-800 text-white hover:bg-slate-900",
    buttonSecondary:
      "border border-slate-300 bg-slate-100 text-slate-800 hover:border-slate-400 hover:bg-slate-200",
    link: "text-slate-800 hover:text-slate-950",
    muted: "text-slate-700",
    kicker: "text-slate-700",
    navLink: "hover:text-slate-900",
    languageActive: "border-slate-900 bg-slate-900 text-white",
  },
  neutral: {
    buttonPrimary:
      "border border-neutral-800 bg-neutral-800 text-white hover:bg-neutral-900",
    buttonSecondary:
      "border border-neutral-300 bg-neutral-100 text-neutral-800 hover:border-neutral-400 hover:bg-neutral-200",
    link: "text-neutral-800 hover:text-neutral-950",
    muted: "text-slate-700",
    kicker: "text-neutral-700",
    navLink: "hover:text-neutral-900",
    languageActive: "border-neutral-900 bg-neutral-900 text-white",
  },
};

const maxWidthMap: Record<string, string> = {
  "max-w-5xl": "max-w-5xl",
  "max-w-6xl": "max-w-6xl",
};

const roundedMap: Record<string, string> = {
  "rounded-xl": "rounded-xl",
  "rounded-2xl": "rounded-2xl",
};

const shadowMap: Record<string, string> = {
  "shadow-none": "shadow-none",
  "shadow-sm": "shadow-sm",
  "shadow-md": "shadow-md",
};

const bodyMap: Record<string, string> = {
  "leading-6": "leading-6",
  "leading-7": "leading-7",
  "leading-8": "leading-8",
};

function mapToken(
  value: string,
  tokenMap: Record<string, string>,
  fallback: LayoutToken | "leading-7",
) {
  return tokenMap[value] || tokenMap[fallback];
}

export function resolveAccentPalette(accentColor: string) {
  return accentPalettes[accentColor] || accentPalettes.blue;
}

export function resolveLayoutClasses(theme: ThemeConfig) {
  return {
    maxWidth: mapToken(theme.layout.maxWidth, maxWidthMap, "max-w-6xl"),
    rounded: mapToken(theme.layout.rounded, roundedMap, "rounded-2xl"),
    cardShadow: mapToken(theme.layout.cardShadow, shadowMap, "shadow-sm"),
    body: mapToken(theme.typography.body, bodyMap, "leading-7"),
  };
}

export function getThemeSurfaceClasses(
  theme: ThemeConfig,
  accent: AccentPalette,
) {
  const base = theme.mode === "light" ? "bg-white/88" : "bg-slate-950/90";

  return `${base} border-slate-200/80 ${accent.muted}`;
}

export function getThemeBackgroundStyle(theme: ThemeConfig): CSSProperties {
  if (theme.background.type !== "image") {
    return {};
  }

  return {
    backgroundImage: `url(${theme.background.image})`,
  };
}
