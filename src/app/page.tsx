import type { ReactNode } from "react"
import { DeveloperSection } from "@/components/developer"
import { Faq } from "@/components/faq"
import FeaturesSection from "@/components/feature"
import { FinalCta } from "@/components/final-cta"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { Quote } from "@/components/quote"
import { SiteNav } from "@/components/site-nav"
import { Steps } from "@/components/steps"

/**
 * One row of the framed page: a full-width hairline underneath,
 * content stays inside the centered column.
 */
function Block({
  id,
  last = false,
  children,
}: {
  id?: string
  last?: boolean
  children: ReactNode
}) {
  return (
    <div
      id={id}
      className={last ? "scroll-mt-20" : "scroll-mt-20 border-b border-border"}
    >
      {children}
    </div>
  )
}

// Reorder, remove or add sections right here.
export default function Home() {
  return (
    <main
      id="top"
      className="relative min-h-screen overflow-x-clip bg-background text-foreground"
    >
      {/* Framed column: space on both sides + vertical hairlines */}
      <div className="mx-auto w-full max-w-[1480px] border-x border-border">
        <SiteNav />
        <Block>
          <Hero />
        </Block>
        <Block id="features">
          <FeaturesSection />
        </Block>
        <Block>
          <Quote />
        </Block>
        <Block id="install">
          <Steps />
        </Block>
        <Block id="developers">
          <DeveloperSection />
        </Block>
        <Block id="faq">
          <Faq />
        </Block>
        <Block>
          <FinalCta />
        </Block>
        <Block last>
          <Footer />
        </Block>
      </div>
    </main>
  )
}
