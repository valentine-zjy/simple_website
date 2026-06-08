import { Badge } from "@/components/Badge";
import type { AccentPalette } from "@/lib/theme";
import type { ProjectLinks } from "@/lib/types";

type ProjectCardProps = {
  title: string;
  description: string;
  role: string;
  tags: string[];
  links: ProjectLinks;
  roundedClassName: string;
  accent: AccentPalette;
  emptyLinksLabel: string;
};

export function ProjectCard({
  title,
  description,
  role,
  tags,
  links,
  roundedClassName,
  accent,
  emptyLinksLabel,
}: ProjectCardProps) {
  const availableLinks = [
    { key: "paper", label: "Paper", href: links.paper },
    { key: "code", label: "Code", href: links.code },
    { key: "demo", label: "Demo", href: links.demo },
  ].filter((item) => item.href);

  return (
    <article className={`border bg-white/80 p-5 ${roundedClassName}`}>
      <div className="space-y-3">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
          <p className="text-sm leading-7 text-slate-600">{description}</p>
          <p className="text-sm font-medium text-slate-700">{role}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} label={tag} />
          ))}
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          {availableLinks.length ? (
            availableLinks.map((item) => (
              <a
                key={item.key}
                href={item.href}
                target="_blank"
                rel="noreferrer noopener"
                className={`font-medium transition-colors ${accent.link}`}
              >
                {item.label}
              </a>
            ))
          ) : (
            <span className="text-slate-500">{emptyLinksLabel}</span>
          )}
        </div>
      </div>
    </article>
  );
}
