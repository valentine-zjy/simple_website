import Image from "next/image";
import {
  BookOpenText,
  BriefcaseBusiness,
  GraduationCap,
  Mail,
  MapPin,
  Microscope,
  ScrollText,
  Wrench,
} from "lucide-react";

import { ButtonLink } from "@/components/ButtonLink";
import { ExperienceCard } from "@/components/ExperienceCard";
import { Footer } from "@/components/Footer";
import { MarkdownContent } from "@/components/MarkdownContent";
import { Navbar } from "@/components/Navbar";
import { ProjectCard } from "@/components/ProjectCard";
import { Section } from "@/components/Section";
import {
  getProfile,
  getSectionContent,
  getTheme,
  publicAssetExists,
} from "@/lib/content";
import type { Locale } from "@/lib/types";
import {
  getThemeBackgroundStyle,
  getThemeSurfaceClasses,
  resolveAccentPalette,
  resolveLayoutClasses,
} from "@/lib/theme";
import {
  normalizeLocale,
  resolveText,
  stripMailto,
} from "@/lib/utils";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const uiCopy = {
  en: {
    heroEyebrow: "AI / LLM Resume",
    bio: "Profile",
    about: "About",
    education: "Education",
    research: "Technical Focus",
    researchStatement: "Current Focus",
    experience: "Internship Experience",
    projects: "Selected Projects",
    publications: "Research & Competitions",
    skills: "Skills",
    contact: "Contact",
    social: "Quick Contact",
    email: "Email",
    github: "GitHub",
    googleScholar: "Google Scholar",
    linkedin: "LinkedIn",
    x: "X",
    phoneNote: "Phone available upon request.",
    noPublicLink: "No public link available.",
  },
  zh: {
    heroEyebrow: "AI 大模型算法简历",
    bio: "个人简介",
    about: "关于我",
    education: "教育背景",
    research: "技术方向",
    researchStatement: "当前关注",
    experience: "实习经历",
    projects: "项目经历",
    publications: "科研与竞赛",
    skills: "技能",
    contact: "联系方式",
    social: "快速联系",
    email: "邮箱",
    github: "GitHub",
    googleScholar: "Google Scholar",
    linkedin: "LinkedIn",
    x: "X",
    phoneNote: "电话可在沟通时提供。",
    noPublicLink: "暂无公开链接。",
  },
} satisfies Record<Locale, Record<string, string>>;

export default async function Home({ searchParams }: PageProps) {
  const [profile, theme] = await Promise.all([getProfile(), getTheme()]);
  const params = await searchParams;
  const defaultLocale = normalizeLocale(profile.site.language);
  const locale = normalizeLocale(params.lang, defaultLocale);
  const copy = uiCopy[locale];

  const [aboutSource, researchSource, bioSource, avatarExists, backgroundExists] =
    await Promise.all([
      getSectionContent("about", locale),
      getSectionContent("research-statement", locale),
      getSectionContent("bio", locale),
      publicAssetExists(profile.personal.avatar),
      publicAssetExists(theme.theme.background.image),
    ]);

  const accent = resolveAccentPalette(theme.theme.accentColor);
  const layout = resolveLayoutClasses(theme.theme);
  const surfaceClassName = getThemeSurfaceClasses(theme.theme, accent);
  const supportedLanguages: Locale[] =
    profile.site.supportedLanguages?.length === 2
      ? profile.site.supportedLanguages
      : ["en", "zh"];

  const emailHref = profile.social.email;
  const emailText = profile.personal.email || stripMailto(emailHref);
  const socialEntries = [
    {
      key: "email",
      label: copy.email,
      href: profile.social.email,
      text: emailText,
    },
    {
      key: "github",
      label: copy.github,
      href: profile.social.github,
      text: profile.social.github,
    },
    {
      key: "googleScholar",
      label: copy.googleScholar,
      href: profile.social.googleScholar,
      text: profile.social.googleScholar,
    },
    {
      key: "linkedin",
      label: copy.linkedin,
      href: profile.social.linkedin,
      text: profile.social.linkedin,
    },
    {
      key: "x",
      label: copy.x,
      href: profile.social.x,
      text: profile.social.x,
    },
  ].filter((item) => item.href);

  return (
    <>
      <Navbar
        navigation={profile.navigation}
        name={resolveText(profile.personal.name, locale)}
        lang={locale}
        supportedLanguages={supportedLanguages}
        sticky={theme.theme.navbar.sticky}
        blur={theme.theme.navbar.blur}
        maxWidthClass={layout.maxWidth}
        accent={accent}
      />
      <main className="pb-16">
        <div className={`mx-auto w-full px-4 pt-6 sm:px-6 ${layout.maxWidth}`}>
          <section
            className={`relative overflow-hidden border ${surfaceClassName} ${layout.rounded}`}
          >
            {backgroundExists ? (
              <>
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={getThemeBackgroundStyle(theme.theme)}
                />
                {theme.theme.background.overlay ? (
                  <div
                    className="absolute inset-0 bg-white"
                    style={{
                      opacity: theme.theme.background.overlayOpacity,
                    }}
                  />
                ) : null}
              </>
            ) : null}
            <div className="relative grid gap-10 px-6 py-10 sm:px-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:px-10">
              <div className="space-y-6">
                <div className="space-y-3">
                  <p
                    className={`text-sm font-semibold uppercase tracking-[0.18em] ${accent.kicker}`}
                  >
                    {copy.heroEyebrow}
                  </p>
                  <div className="space-y-2">
                    <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                      {resolveText(profile.personal.name, locale)}
                    </h1>
                    {profile.personal.englishName ? (
                      <p className="text-sm font-medium uppercase tracking-[0.14em] text-slate-500">
                        {profile.personal.englishName}
                      </p>
                    ) : null}
                  </div>
                  <p className="text-lg font-medium text-slate-800">
                    {resolveText(profile.personal.headline, locale)}
                  </p>
                  <p
                    className={`max-w-2xl text-base ${accent.muted} ${layout.body}`}
                  >
                    {resolveText(profile.personal.shortBio, locale)}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {resolveText(profile.personal.location, locale)}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <a className={`transition-colors ${accent.link}`} href={emailHref}>
                      {emailText}
                    </a>
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <ButtonLink
                    href={profile.hero.primaryButton.href || profile.personal.cv}
                    label={resolveText(profile.hero.primaryButton.label, locale)}
                    variant="primary"
                    accent={accent}
                  />
                  <ButtonLink
                    href={profile.hero.secondaryButton.href || profile.social.email}
                    label={resolveText(profile.hero.secondaryButton.label, locale)}
                    variant="secondary"
                    accent={accent}
                  />
                </div>

                <div className="flex flex-wrap gap-4 text-sm">
                  {socialEntries.map((entry) => (
                    <a
                      key={entry.key}
                      className={`font-medium transition-colors ${accent.link}`}
                      href={entry.href}
                      target={entry.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        entry.href.startsWith("http")
                          ? "noreferrer noopener"
                          : undefined
                      }
                    >
                      {entry.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div
                  className={`border bg-white/90 p-5 ${layout.rounded} ${layout.cardShadow}`}
                >
                  <div className="flex items-start gap-4">
                    {avatarExists ? (
                      <Image
                        src={profile.personal.avatar}
                        alt={resolveText(profile.personal.name, locale)}
                        width={112}
                        height={112}
                        className="h-28 w-28 rounded-2xl object-cover ring-1 ring-slate-200"
                        priority
                      />
                    ) : (
                      <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-slate-100 text-3xl font-semibold text-slate-500 ring-1 ring-slate-200">
                        {resolveText(profile.personal.name, locale).slice(0, 1)}
                      </div>
                    )}
                    <div className="space-y-2">
                      <p
                        className={`text-sm font-semibold uppercase tracking-[0.16em] ${accent.kicker}`}
                      >
                        {copy.bio}
                      </p>
                      <MarkdownContent source={bioSource} compact />
                    </div>
                  </div>
                </div>

                <div
                  className={`border bg-white/90 p-5 ${layout.rounded} ${layout.cardShadow}`}
                >
                  <p
                    className={`mb-3 text-sm font-semibold uppercase tracking-[0.16em] ${accent.kicker}`}
                  >
                    {copy.social}
                  </p>
                  <dl className="space-y-3 text-sm">
                    {socialEntries.map((entry) => (
                      <div
                        key={entry.key}
                        className="flex items-start justify-between gap-3 border-b border-slate-200/70 pb-3 last:border-b-0 last:pb-0"
                      >
                        <dt className="font-medium text-slate-700">{entry.label}</dt>
                        <dd className="text-right">
                          <a
                            className={`break-all transition-colors ${accent.link}`}
                            href={entry.href}
                            target={
                              entry.href.startsWith("http") ? "_blank" : undefined
                            }
                            rel={
                              entry.href.startsWith("http")
                                ? "noreferrer noopener"
                                : undefined
                            }
                          >
                            {entry.text}
                          </a>
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-4 text-sm text-slate-500">{copy.phoneNote}</p>
                </div>
              </div>
            </div>
          </section>

          <div className="mt-8 space-y-8">
            <Section
              id="about"
              title={copy.about}
              icon={<BookOpenText className="h-5 w-5" />}
              className={surfaceClassName}
              roundedClassName={layout.rounded}
              shadowClassName={layout.cardShadow}
            >
              <MarkdownContent source={aboutSource} />
            </Section>

            <Section
              id="education"
              title={copy.education}
              icon={<GraduationCap className="h-5 w-5" />}
              className={surfaceClassName}
              roundedClassName={layout.rounded}
              shadowClassName={layout.cardShadow}
            >
              <div className="space-y-5">
                {profile.education.map((item) => (
                  <div
                    key={`${resolveText(item.institution, locale)}-${item.period}`}
                    className="grid gap-2 border-b border-slate-200/70 pb-5 last:border-b-0 last:pb-0 md:grid-cols-[minmax(0,1fr)_auto]"
                  >
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-slate-950">
                        {resolveText(item.institution, locale)}
                      </h3>
                      <p className="text-sm font-medium text-slate-700">
                        {resolveText(item.degree, locale)}
                      </p>
                      <p className="text-sm text-slate-600">
                        {resolveText(item.description, locale)}
                      </p>
                    </div>
                    <div className="space-y-1 text-sm text-slate-600 md:text-right">
                      <p>{item.period}</p>
                      <p>{resolveText(item.location, locale)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section
              id="research"
              title={copy.research}
              description={copy.researchStatement}
              icon={<Microscope className="h-5 w-5" />}
              className={surfaceClassName}
              roundedClassName={layout.rounded}
              shadowClassName={layout.cardShadow}
            >
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]">
                <MarkdownContent source={researchSource} />
                <div className="grid gap-4 sm:grid-cols-2">
                  {profile.researchInterests.map((item) => (
                    <div
                      key={resolveText(item.title, locale)}
                      className={`border bg-white/80 p-4 ${layout.rounded}`}
                    >
                      <h3 className="text-base font-semibold text-slate-950">
                        {resolveText(item.title, locale)}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600">
                        {resolveText(item.description, locale)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            <Section
              id="experience"
              title={copy.experience}
              icon={<BriefcaseBusiness className="h-5 w-5" />}
              className={surfaceClassName}
              roundedClassName={layout.rounded}
              shadowClassName={layout.cardShadow}
            >
              <div className="space-y-5">
                {profile.experience.map((item) => (
                  <ExperienceCard
                    key={`${resolveText(item.title, locale)}-${item.period}`}
                    title={resolveText(item.title, locale)}
                    organization={resolveText(item.organization, locale)}
                    period={item.period}
                    location={resolveText(item.location, locale)}
                    description={item.description.map((entry) =>
                      resolveText(entry, locale),
                    )}
                    roundedClassName={layout.rounded}
                  />
                ))}
              </div>
            </Section>

            <Section
              id="projects"
              title={copy.projects}
              icon={<ScrollText className="h-5 w-5" />}
              className={surfaceClassName}
              roundedClassName={layout.rounded}
              shadowClassName={layout.cardShadow}
            >
              <div className="grid gap-5 lg:grid-cols-2">
                {profile.projects.map((project) => (
                  <ProjectCard
                    key={resolveText(project.title, locale)}
                    title={resolveText(project.title, locale)}
                    description={resolveText(project.description, locale)}
                    role={resolveText(project.role, locale)}
                    tags={project.tags}
                    links={project.links}
                    roundedClassName={layout.rounded}
                    accent={accent}
                    emptyLinksLabel={copy.noPublicLink}
                  />
                ))}
              </div>
            </Section>

            <Section
              id="publications"
              title={copy.publications}
              icon={<BookOpenText className="h-5 w-5" />}
              className={surfaceClassName}
              roundedClassName={layout.rounded}
              shadowClassName={layout.cardShadow}
            >
              <div className="space-y-4">
                {profile.publications.map((item) => (
                  <article
                    key={`${resolveText(item.title, locale)}-${item.year || resolveText(item.status, locale)}`}
                    className={`border bg-white/80 p-5 ${layout.rounded}`}
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-slate-950">
                          {resolveText(item.title, locale)}
                        </h3>
                        <p className="text-sm text-slate-700">
                          {resolveText(item.authors, locale)}
                        </p>
                        <p className="text-sm text-slate-600">
                          {resolveText(item.venue, locale)}
                        </p>
                      </div>
                      <div className="space-y-1 text-sm text-slate-600 md:text-right">
                        <p>{item.year || "-"}</p>
                        <p>{resolveText(item.status, locale)}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-4 text-sm">
                      {item.links.paper ? (
                        <a
                          className={`font-medium transition-colors ${accent.link}`}
                          href={item.links.paper}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          Paper
                        </a>
                      ) : null}
                      {item.links.code ? (
                        <a
                          className={`font-medium transition-colors ${accent.link}`}
                          href={item.links.code}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          Code
                        </a>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </Section>

            <Section
              id="skills"
              title={copy.skills}
              icon={<Wrench className="h-5 w-5" />}
              className={surfaceClassName}
              roundedClassName={layout.rounded}
              shadowClassName={layout.cardShadow}
            >
              <div className="grid gap-4 lg:grid-cols-2">
                {profile.skills.map((group) => (
                  <div
                    key={resolveText(group.group, locale)}
                    className={`border bg-white/80 p-5 ${layout.rounded}`}
                  >
                    <h3 className="text-base font-semibold text-slate-950">
                      {resolveText(group.group, locale)}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-700"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section
              id="contact"
              title={copy.contact}
              icon={<Mail className="h-5 w-5" />}
              className={surfaceClassName}
              roundedClassName={layout.rounded}
              shadowClassName={layout.cardShadow}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {socialEntries.map((entry) => (
                  <a
                    key={entry.key}
                    href={entry.href}
                    target={entry.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      entry.href.startsWith("http")
                        ? "noreferrer noopener"
                        : undefined
                    }
                    className={`border bg-white/80 p-5 transition-colors hover:border-slate-300 ${layout.rounded}`}
                  >
                    <p className="text-sm font-medium text-slate-700">
                      {entry.label}
                    </p>
                    <p className={`mt-2 text-sm ${accent.link}`}>{entry.text}</p>
                  </a>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-500">{copy.phoneNote}</p>
            </Section>
          </div>
        </div>
      </main>
      <Footer
        text={resolveText(theme.theme.footer.text, locale)}
        maxWidthClass={layout.maxWidth}
      />
    </>
  );
}
