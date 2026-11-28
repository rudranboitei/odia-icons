import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";

import { MotionProvider } from "@/components/motion-provider";
import { SITE } from "@/data/site";
import { ICON_COUNT } from "@/lib/icons.generated";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: SITE.seo.title,
    template: SITE.seo.titleTemplate,
  },
  description: SITE.description,
  keywords: [...SITE.seo.keywords],
  metadataBase: new URL(SITE.siteUrl),
  alternates: {
    canonical: "/",
  },
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
    title: SITE.seo.title,
    description: SITE.description,
    url: SITE.siteUrl,
    siteName: SITE.name,
    locale: SITE.seo.locale,
    type: "website",
    images: [
      {
        url: SITE.seo.ogImage,
        width: 1200,
        height: 630,
        alt: SITE.seo.title,
      },
    ],
  },
  twitter: {
    card: SITE.seo.twitterCard,
    title: SITE.seo.title,
    description: SITE.description,
    images: [SITE.seo.ogImage],
  },
  category: "technology",
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: SITE.name,
      url: SITE.siteUrl,
      description: SITE.description,
      inLanguage: "en",
    },
    {
      "@type": "SoftwareSourceCode",
      name: SITE.npmPackage,
      description: SITE.description,
      url: SITE.siteUrl,
      codeRepository: SITE.github,
      license: "https://opensource.org/licenses/MIT",
      programmingLanguage: ["TypeScript", "SVG", "React"],
      runtimePlatform: "React",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      keywords: SITE.seo.keywords.join(", "),
      additionalProperty: [
        { "@type": "PropertyValue", name: "Icon count", value: String(ICON_COUNT) },
        { "@type": "PropertyValue", name: "Grid", value: "24x24" },
        { "@type": "PropertyValue", name: "Stroke", value: "2px" },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <GoogleTagManager gtmId="GTM-W7DMS5LX" />
      <body
        className={`h-full antialiased ${geistSans.variable} ${jetbrainsMono.variable}`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
