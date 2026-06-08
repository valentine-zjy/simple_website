import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
  className: string;
  roundedClassName: string;
  shadowClassName: string;
};

export function Section({
  id,
  title,
  description,
  icon,
  children,
  className,
  roundedClassName,
  shadowClassName,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`border p-6 sm:p-8 ${className} ${roundedClassName} ${shadowClassName}`}
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-tight text-slate-950">
            {icon}
            <span>{title}</span>
          </h2>
          {description ? (
            <p className="mt-2 text-sm font-medium uppercase tracking-[0.14em] text-slate-500">
              {description}
            </p>
          ) : null}
        </div>
      </div>
      {children}
    </section>
  );
}
