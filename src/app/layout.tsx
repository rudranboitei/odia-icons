import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";

const siteUrl = "https://odiaicons.com";

export const metadata: Metadata = {
  title: "odiaicons — Odia icons, free to use",
  description:
    "A free, open-source icon set drawn from Odisha's temples, textiles and living visual traditions. Copy any icon as SVG, JSX or React.",
  metadataBase: new URL(siteUrl),
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
    title: "odiaicons",
    description:
      "Konark chakras, Kalinga deulas, pattachitra fish and more — as clean, consistent line icons.",
    url: siteUrl,
    siteName: "odiaicons",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "odiaicons",
    description:
      "Konark chakras, Kalinga deulas, pattachitra fish and more — as clean, consistent line icons.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
