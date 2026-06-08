import type { AccentPalette } from "@/lib/theme";
import type { Locale, NavItem } from "@/lib/types";
import { cn, localizeHref, resolveText } from "@/lib/utils";

type NavbarProps = {
  navigation: NavItem[];
  name: string;
  lang: Locale;
  supportedLanguages: Locale[];
  sticky: boolean;
  blur: boolean;
  maxWidthClass: string;
  accent: AccentPalette;
};

export function Navbar({
  navigation,
  name,
  lang,
  supportedLanguages,
  sticky,
  blur,
  maxWidthClass,
  accent,
}: NavbarProps) {
  return (
    <header
      className={cn(
        "z-40 border-b border-slate-200/80",
        sticky && "sticky top-0",
        blur ? "bg-white/82 backdrop-blur-md" : "bg-white/95",
      )}
    >
      <div
        className={`mx-auto flex w-full items-center justify-between gap-4 px-4 py-3 sm:px-6 ${maxWidthClass}`}
      >
        <a
          href={`/?lang=${lang}`}
          className="text-sm font-semibold tracking-tight text-slate-950"
        >
          {name}
        </a>
        <nav className="hidden items-center gap-5 text-sm text-slate-600 lg:flex">
          {navigation.map((item) => (
            <a
              key={`${resolveText(item.label, lang)}-${item.href}`}
              href={localizeHref(item.href, lang)}
              className={`transition-colors hover:text-slate-950 ${accent.navLink}`}
            >
              {resolveText(item.label, lang)}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {supportedLanguages.map((item) => {
            const active = item === lang;

            return (
              <a
                key={item}
                href={`/?lang=${item}`}
                className={cn(
                  "rounded-full border px-3 py-1 text-sm font-medium transition-colors",
                  active
                    ? accent.languageActive
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900",
                )}
              >
                {item === "en" ? "EN" : "中文"}
              </a>
            );
          })}
        </div>
      </div>
      <nav className="border-t border-slate-200/70 lg:hidden">
        <div
          className={`mx-auto flex w-full gap-4 overflow-x-auto px-4 py-3 text-sm text-slate-600 sm:px-6 ${maxWidthClass}`}
        >
          {navigation.map((item) => (
            <a
              key={`${resolveText(item.label, lang)}-mobile-${item.href}`}
              href={localizeHref(item.href, lang)}
              className={`whitespace-nowrap transition-colors hover:text-slate-950 ${accent.navLink}`}
            >
              {resolveText(item.label, lang)}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
