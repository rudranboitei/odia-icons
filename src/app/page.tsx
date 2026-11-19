import { DeveloperSection } from "@/components/developer"
import { Faq } from "@/components/faq"
import { Features } from "@/components/feature"
import { FinalCta } from "@/components/final-cta"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { Quote } from "@/components/quote"
import { SiteNav } from "@/components/site-nav"
import { Steps } from "@/components/steps"

// Reorder, remove or add sections right here.
export default function Home() {
  return (
    <main
      id="top"
      className="relative min-h-screen overflow-x-hidden bg-background text-foreground"
    >
      <SiteNav />
      <Hero />
      <Features />
      <Quote />
      <Steps />
      <DeveloperSection />
      <Faq />
      <FinalCta />
      <Footer />
    </main>
  )
}
