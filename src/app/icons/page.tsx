import type { Metadata } from "next"
import { IconBrowser } from "@/components/icon-browser"

export const metadata: Metadata = {
  title: "Icons — odiaicons",
  description:
    "Browse 37 Odia icons: 19 Odisha motifs and a matching UI set on a 24 × 24 grid, free under MIT. Search in English or Odia and export as SVG, JSX or React.",
  alternates: { canonical: "/icons" },
  openGraph: {
    title: "Icons — odiaicons",
    description:
      "37 icons from Odisha and the UI around them, on one shared grid. Search, preview and export every icon.",
    url: "/icons",
  },
}

export default function IconsPage() {
  return <IconBrowser />
}
