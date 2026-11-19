import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";

const siteUrl = "https://odiaicon.com";

export const metadata: Metadata = {
  title: "odiaicon — Odia icons, free to use",
  description:
    "A free, open-source icon set drawn from Odisha's temples, textiles and living visual traditions. Copy any icon as SVG, JSX or React.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "odiaicon — Odia icons, free to use",
    description:
      "Konark chakras, Kalinga deulas, pattachitra fish and more — as clean, consistent line icons.",
    siteName: "odiaicon",
    type: "website",
  },
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
