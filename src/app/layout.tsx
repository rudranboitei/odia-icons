import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toast";
import { siteUrl } from "@/lib/site-url";

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
    type: "website",
    // The image is supplied by app/opengraph-image.png so every route inherits it.
  },
  twitter: {
    card: "summary_large_image",
    title: "odiaicons",
    description:
      "Konark chakras, Kalinga deulas, pattachitra fish and more — as clean, consistent line icons.",
    // The image is supplied by app/twitter-image.png.
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
