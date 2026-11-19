import type { Metadata } from "next"
import { IconBrowser } from "@/components/icon-browser"

export const metadata: Metadata = {
  title: "Icons — odiaicons",
  description:
    "Browse the odiaicons set: five Odia motifs drawn on a 24 × 24 grid, free under the MIT licence. Search in English or Odia and export as SVG, JSX or PNG.",
  alternates: { canonical: "/icons" },
  openGraph: {
    title: "Icons — odiaicons",
    description:
      "Five motifs from Odisha on one shared grid. Search, preview and export every icon.",
    url: "/icons",
  },
}

export default function IconsPage() {
  return <IconBrowser />
}
