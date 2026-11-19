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
      <div className="relative mx-auto w-full max-w-340 border-x border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 -left-4 h-full w-4 bg-[length:10px_10px] text-foreground/10 [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] md:-left-10 md:w-10 2xl:-left-14 2xl:w-14"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 -right-4 h-full w-4 bg-[length:10px_10px] text-foreground/10 [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] md:-right-10 md:w-10 2xl:-right-14 2xl:w-14"
        />
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
