import { IconArrowUpRight } from "@tabler/icons-react"
import { siteConfig } from "@/lib/site-config"
import { Icon, icons } from "@/lib/icons"
import { Eyebrow } from "./eyebrow"

export function Quote() {
  const { quote, links } = siteConfig

  return (
    <section className="px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border bg-card shadow-xs">
        <div className="grid gap-8 p-8 sm:grid-cols-[1.5fr_1fr] sm:gap-0 sm:p-12">
          <div className="sm:pr-10">
            <Eyebrow>{quote.eyebrow}</Eyebrow>
            <blockquote className="mt-6 text-2xl font-medium tracking-[-0.03em] text-balance text-[#171717] sm:text-3xl">
              “{quote.text}”
            </blockquote>
          </div>

          <div className="flex flex-col justify-between gap-8 border-t pt-8 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-10">
            <div className="flex items-center gap-3">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border bg-background">
                <Icon def={icons[0]} size={26} stroke={1.4} />
              </span>
              <div>
                <p className="text-sm font-medium text-[#171717]">
                  {quote.author}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {quote.meta}
                </p>
              </div>
            </div>

            <dl className="grid grid-cols-3 gap-3">
              {quote.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-2xl font-medium tracking-tight text-[#171717]">
                    {stat.value}
                  </dd>
                  <dd className="text-xs text-muted-foreground">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>

            <a
              href={links.github}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1 text-sm text-[#171717] underline-offset-4 hover:underline"
            >
              Star on GitHub
              <IconArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
