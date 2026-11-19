import { Cta } from "@/components/cta"
import { Features } from "@/components/feature"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { IconDock } from "@/components/icondock"
import { IconShowcase } from "@/components/iconshowcase"
import { Mission } from "@/components/mission"

// Reorder, remove or add sections right here.
export default function Home() {
  return (
    <main
      id="top"
      className="relative min-h-screen overflow-x-hidden bg-background text-foreground"
    >
      <IconDock />
      <Hero />
      <IconShowcase />
      <Mission />
      <Features />
      <Cta />
      <Footer />
    </main>
  )
}
