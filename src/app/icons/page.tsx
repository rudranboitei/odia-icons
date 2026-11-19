import type { Metadata } from "next"
import { Footer } from "@/components/footer"
import { IconShowcase } from "@/components/iconshowcase"
import { SiteNav } from "@/components/site-nav"

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
  return (
    <main
      id="top"
      className="relative min-h-screen overflow-x-hidden bg-background text-foreground"
    >
      <SiteNav />
      <IconShowcase
        eyebrow="The icon set"
        title="Browse the icons."
        description="Five motifs from Odisha, drawn on a 24 × 24 grid. Search in English or Odia, filter by category, then open any tile to copy or download."
      />
      <Footer />
    </main>
  )
}
