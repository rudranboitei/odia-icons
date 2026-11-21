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
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: `${SITE.name} – ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.siteUrl,
    siteName: SITE.name,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${SITE.name} – ${SITE.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} – ${SITE.tagline}`,
    description: SITE.description,
    images: ["/twitter-card.png"],
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
  themeColor: "#141210",
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
