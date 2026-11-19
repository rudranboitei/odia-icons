import { siteConfig } from "@/lib/site-config"
import { SectionHeader } from "./section-header"
import { InstallBox } from "./install-box"
import { IconMarquee } from "./icon-marquee"

export function FinalCta() {
  const { finalCta } = siteConfig

  return (
    <section
      id="get-icons"
      className="relative overflow-hidden px-6 pt-20 pb-6 text-center sm:pt-28"
    >
      <SectionHeader
        eyebrow={finalCta.eyebrow}
        title={finalCta.title}
        description={finalCta.description}
      />

      <div className="mt-8 flex justify-center">
        <InstallBox />
      </div>

      <p className="mt-6 text-[13px] leading-[1.2] tracking-[-0.03em] text-[#1d1d1f] opacity-55">{finalCta.helper}</p>

      <IconMarquee className="mt-16" />
    </section>
  )
}
