import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";

import { MotionProvider } from "@/components/motion-provider";
import { SITE } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  title: `${SITE.name} – ${SITE.tagline}`,
  description: SITE.description,
  metadataBase: new URL(SITE.siteUrl),
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: `${SITE.name} – ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.siteUrl,
    siteName: SITE.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} – ${SITE.tagline}`,
    description: SITE.description,
  },
};

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

// Code blocks, inline code, and install commands.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const viewport: Viewport = {
  themeColor: "#E3C6B0",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`h-full antialiased ${geistSans.variable} ${jetbrainsMono.variable}`}
        suppressHydrationWarning
      >
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
