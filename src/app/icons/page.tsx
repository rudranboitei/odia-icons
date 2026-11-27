import type { Metadata } from "next"
import { IconBrowser } from "@/components/icon-browser"
import { ICON_COUNT } from "@/lib/icons.generated"

export const metadata: Metadata = {
  title: "Icons — odiaicons",
  description: `Browse ${ICON_COUNT} hand-drawn icons on a 24 × 24 grid, free under MIT. Search in English or Odia and export as SVG, JSX or React.`,
  alternates: { canonical: "/icons" },
  openGraph: {
    title: "Icons — odiaicons",
    description: `${ICON_COUNT} icons on one shared grid, drawn with Odisha in mind. Search, preview and export every icon.`,
    url: "/icons",
  },
}

export default function IconsPage() {
  return <IconBrowser />
}
