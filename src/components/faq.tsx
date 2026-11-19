import { IconArrowUpRight } from "@tabler/icons-react"
import { siteConfig } from "@/lib/site-config"
import { SectionHeader } from "./section-header"

export function Faq() {
  const { faq, links } = siteConfig

  return (
    <section id="faq" className="scroll-mt-20 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <SectionHeader
          eyebrow={faq.eyebrow}
          title={faq.title}
          description={faq.description}
        />

        <div className="mt-10 divide-y overflow-hidden rounded-[1.75rem] border bg-card">
          {faq.items.map((item) => (
            <details key={item.q} name="odiaicon-faq" className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left text-[15px] font-medium text-[#171717] transition-colors hover:bg-muted/50 [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="relative flex size-6 shrink-0 items-center justify-center rounded-full border bg-background">
                  <span className="absolute h-px w-2.5 bg-foreground" />
                  <span className="absolute h-2.5 w-px bg-foreground transition-transform duration-200 group-open:scale-y-0" />
                </span>
              </summary>
              <p className="max-w-2xl px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
          <span>Still curious?</span>
          <a
            href={links.contribute}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-0.5 text-[#171717] underline-offset-4 hover:underline"
          >
            Ask on GitHub
            <IconArrowUpRight className="size-3.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
