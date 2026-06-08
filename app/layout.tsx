import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Simple Website",
  description: "A simple Next.js website deployed on Vercel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
