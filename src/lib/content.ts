import "server-only";

import { access, readFile } from "node:fs/promises";
import path from "node:path";

import yaml from "js-yaml";

import type { ProfileData, SectionSlug, ThemeData } from "@/lib/types";

const CONTENT_DIR = path.join(process.cwd(), "content");
const PUBLIC_DIR = path.join(process.cwd(), "public");

const defaultProfile: ProfileData = {
  site: {
    title: "张嘉洋 | AI 大模型算法工程师",
    description:
      "张嘉洋的个人在线简历，聚焦 AI 大模型算法、对话系统、数据生产、模型微调与算法工程实践。",
    url: "https://example.com",
    language: "zh",
    supportedLanguages: ["en", "zh"],
  },
  personal: {
    name: "张嘉洋",
    englishName: "Jiayang Zhang",
    headline: "AI 大模型算法工程师 / 算法岗",
    shortBio:
      "面向 AI 大模型、对话系统、模型微调、数据生产与算法工程落地的算法工程师候选人。",
    location: "深圳 / 合肥 / 香港",
    age: "21",
    avatar: "/images/avatar.jpg",
    cv: "/张嘉洋-算法岗简历.pdf",
    phone: "18504210298",
    email: "2561993486@qq.com",
  },
  social: {
    email: "mailto:2561993486@qq.com",
    github: "",
    googleScholar: "",
    linkedin: "",
    x: "",
  },
  hero: {
    primaryButton: {
      label: "下载简历",
      href: "/张嘉洋-算法岗简历.pdf",
    },
    secondaryButton: {
      label: "联系我",
      href: "mailto:2561993486@qq.com",
    },
  },
  navigation: [],
  education: [],
  researchInterests: [],
  projects: [],
  publications: [],
  experience: [],
  skills: [],
};

const defaultTheme: ThemeData = {
  theme: {
    mode: "light",
    accentColor: "blue",
    background: {
      type: "image",
      image: "/images/background.jpg",
      overlay: true,
      overlayOpacity: 0.78,
    },
    layout: {
      maxWidth: "max-w-6xl",
      rounded: "rounded-2xl",
      cardShadow: "shadow-sm",
    },
    typography: {
      heading: "tracking-tight",
      body: "leading-7",
    },
    navbar: {
      sticky: true,
      blur: true,
    },
    footer: {
      text: "© 2026 张嘉洋. Built with Next.js and deployed on Vercel.",
    },
  },
};

const defaultSections: Record<SectionSlug, string> = {
  about:
    "My name is Jiayang Zhang, and I am seeking roles as an AI / LLM algorithm engineer. My experience covers LLM training systems, dialogue data production, model evaluation, SFT / GRPO / DPO optimization, traditional machine learning, and practical algorithm engineering.",
  "research-statement":
    "My technical focus is on LLM training and deployment in vertical scenarios, especially how data production, model evaluation, supervised fine-tuning, preference optimization, and engineering platforms can improve usefulness in real tasks.",
  bio: "Jiayang Zhang is a Computer Science undergraduate at Northeastern University and an incoming MSc student in Artificial Intelligence at City University of Hong Kong.",
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function mergeWithFallback<T>(fallback: T, input: unknown): T {
  if (Array.isArray(fallback)) {
    return (Array.isArray(input) ? input : fallback) as T;
  }

  if (isRecord(fallback) && isRecord(input)) {
    const merged: Record<string, unknown> = { ...fallback };

    for (const [key, value] of Object.entries(input)) {
      const fallbackValue = (fallback as Record<string, unknown>)[key];
      merged[key] =
        fallbackValue === undefined ? value : mergeWithFallback(fallbackValue, value);
    }

    return merged as T;
  }

  return (input ?? fallback) as T;
}

export async function readYamlFile<T>(
  relativePath: string,
  fallback: T,
): Promise<T> {
  const filePath = path.join(CONTENT_DIR, relativePath);

  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = yaml.load(raw);

    return mergeWithFallback(fallback, parsed);
  } catch (error) {
    console.error(`Failed to read YAML file: ${filePath}`, error);
    return fallback;
  }
}

export async function getProfile() {
  return readYamlFile("profile.yaml", defaultProfile);
}

export async function getTheme() {
  return readYamlFile("theme.yaml", defaultTheme);
}

export async function getSectionContent(
  section: SectionSlug,
  locale: "en" | "zh",
) {
  const fileCandidates =
    locale === "zh"
      ? [
          path.join(CONTENT_DIR, "sections", `${section}.zh.mdx`),
          path.join(CONTENT_DIR, "sections", `${section}.mdx`),
        ]
      : [path.join(CONTENT_DIR, "sections", `${section}.mdx`)];

  for (const filePath of fileCandidates) {
    try {
      return await readFile(filePath, "utf8");
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
        console.error(`Failed to read section content: ${filePath}`, error);
      }
    }
  }

  return defaultSections[section];
}

export async function publicAssetExists(assetPath: string) {
  const normalizedPath = assetPath.replace(/^\/+/, "");
  const fullPath = path.join(PUBLIC_DIR, normalizedPath);

  try {
    await access(fullPath);
    return true;
  } catch {
    return false;
  }
}
