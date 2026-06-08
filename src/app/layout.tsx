import type { Metadata } from "next";

import { getProfile } from "@/lib/content";
import "./globals.css";

function getMetadataBase(url: string) {
  try {
    return new URL(url);
  } catch {
    return undefined;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  const title =
    typeof profile.site.title === "string"
      ? profile.site.title
      : profile.site.title.en || profile.site.title.zh || "Academic Portfolio";
  const description =
    typeof profile.site.description === "string"
      ? profile.site.description
      : profile.site.description.en ||
        profile.site.description.zh ||
        "Personal academic portfolio";

  return {
    title,
    description,
    metadataBase: getMetadataBase(profile.site.url),
    openGraph: {
      title,
      description,
      url: profile.site.url,
      siteName: title,
      type: "website",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
