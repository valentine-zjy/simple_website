import { ArrowUpRight, Download } from "lucide-react";

import type { AccentPalette } from "@/lib/theme";
import { cn, isExternalHref } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  label: string;
  variant: "primary" | "secondary";
  accent: AccentPalette;
};

export function ButtonLink({
  href,
  label,
  variant,
  accent,
}: ButtonLinkProps) {
  const external = isExternalHref(href);

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
        variant === "primary"
          ? accent.buttonPrimary
          : accent.buttonSecondary,
      )}
    >
      {label}
      {href.endsWith(".pdf") ? (
        <Download className="h-4 w-4" />
      ) : (
        <ArrowUpRight className="h-4 w-4" />
      )}
    </a>
  );
}
