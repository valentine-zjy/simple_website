type ExperienceCardProps = {
  title: string;
  organization: string;
  period: string;
  location: string;
  description: string[];
  roundedClassName: string;
};

export function ExperienceCard({
  title,
  organization,
  period,
  location,
  description,
  roundedClassName,
}: ExperienceCardProps) {
  return (
    <article className={`border bg-white/80 p-5 ${roundedClassName}`}>
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
          <p className="text-sm font-medium text-slate-700">{organization}</p>
        </div>
        <div className="space-y-1 text-sm text-slate-600 md:text-right">
          <p>{period}</p>
          <p>{location}</p>
        </div>
      </div>
      <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-600">
        {description.map((item) => (
          <li key={item} className="list-disc pl-1 marker:text-slate-400">
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
