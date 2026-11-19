import { siteConfig } from "@/lib/site-config"
import { Eyebrow } from "./eyebrow"
import { InstallBox } from "./install-box"
import { IconMarquee } from "./icon-marquee"

export function Hero() {
  const { hero } = siteConfig

  return (
    <section className="relative overflow-hidden px-5 pt-16 pb-6 text-center lg:px-6 sm:pt-24">
      <div className="flex flex-col items-center">
        <Eyebrow>{hero.eyebrow}</Eyebrow>

        <h1 className="text-hero-title mt-6 max-w-[16ch] text-balance">
          {hero.title}
        </h1>

        <p className="mt-6 max-w-2xl text-[21px] leading-relaxed font-medium tracking-[-0.03em] text-balance text-muted-foreground">
          {hero.subtitle}
        </p>

        <InstallBox id="install" className="mt-8" />

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] leading-[1.2] tracking-[-0.03em] text-muted-foreground">
          {hero.stats.map((stat) => (
            <li key={stat} className="flex items-center gap-2">
              <span aria-hidden className="size-1 rounded-full bg-border-strong" />
              {stat}
            </li>
          ))}
        </ul>
      </div>

      <IconMarquee className="mt-14" />
    </section>
  )
}
