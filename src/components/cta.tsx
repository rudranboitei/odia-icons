import { IconArrowUpRight } from "@tabler/icons-react"
import { siteConfig } from "@/lib/site-config"
import { ActionLink } from "./actionlink"

export function Cta() {
  const { cta, links } = siteConfig

  return (
    <section className="flex flex-col items-center px-6 py-24 text-center">
      <h2 className="max-w-2xl text-3xl font-medium tracking-[-0.035em] text-balance text-[#171717] sm:text-5xl">
        {cta.heading}
      </h2>
      <p className="mt-5 max-w-md text-base leading-relaxed text-balance text-muted-foreground">
        {cta.description}
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <ActionLink
          href={`${links.github}/archive/refs/heads/main.zip`}
          external
        >
          {cta.primaryCta}
        </ActionLink>
        <ActionLink href={links.github} external variant="outline">
          {cta.secondaryCta}
          <IconArrowUpRight data-icon="inline-end" />
        </ActionLink>
      </div>
    </section>
  )
}
