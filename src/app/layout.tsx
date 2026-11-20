import type { Metadata, Viewport } from "next";
import { Inter_Tight, Pixelify_Sans } from "next/font/google";

import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
});

const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-pixelify",
});

export const metadata: Metadata = {
  title: "OdiaIcons – Icons with Odia soul",
  description:
    "Open-source icon library rooted in Odisha. React components, raw SVG and a shadcn-style registry.",
  metadataBase: new URL("https://icons.odiaui.xyz"),
  openGraph: {
    title: "OdiaIcons – Icons with Odia soul",
    description:
      "Temples, Pattachitra, Odissi, festivals and food as clean 24px outline icons.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#141414",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${interTight.variable} ${pixelify.variable}`}>
        {children}
        {/* <Toaster /> */}
      </body>
    </html>
  );
}
