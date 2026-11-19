import { IconArrowUpRight } from "@tabler/icons-react"
import { siteConfig } from "@/lib/site-config"
import { Icon, icons } from "@/lib/icons"
import { ActionLink } from "./actionlink"

export function Hero() {
  const { hero, name, links } = siteConfig

  return (
    <section className="flex flex-col items-center px-6 pt-10 text-center">
      <div className="flex items-center gap-2.5">
        <Icon
          def={icons[0]}
          size={26}
          stroke={1.5}
          className="text-[#171717]"
        />
        <span className="text-lg font-medium tracking-tight text-[#171717]">
          {name}
        </span>
      </div>

      <h1 className="text-hero-title mt-12 max-w-[16ch] text-balance">
        {hero.title}
      </h1>

      <p className="mt-6 max-w-xl text-base leading-relaxed text-balance text-muted-foreground sm:text-lg">
        {hero.subtitle}
      </p>

      <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <ActionLink href="#icons">{hero.primaryCta}</ActionLink>
        <ActionLink href={links.github} external variant="outline">
          {hero.secondaryCta}
          <IconArrowUpRight data-icon="inline-end" />
        </ActionLink>
      </div>
    </section>
  )
}
