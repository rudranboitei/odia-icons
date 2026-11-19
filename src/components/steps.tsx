import { siteConfig } from "@/lib/site-config"
import { Icon, icons } from "@/lib/icons"
import { SectionHeader } from "./section-header"

export function Steps() {
  const { steps } = siteConfig

  return (
    <section className="px-5 py-20 lg:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow={steps.eyebrow}
          title={steps.title}
          description={steps.description}
        />

        <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-muted">
          <div
            aria-hidden
            className="flex h-40 items-center justify-center gap-4 overflow-hidden border-b border-border bg-muted"
          >
            {[...icons, ...icons].map((icon, i) => (
              <span
                key={`${icon.name}-${i}`}
                className="flex size-16 shrink-0 items-center justify-center rounded-xl border border-border bg-card sm:size-20"
              >
                <Icon
                  def={icon}
                  size={30}
                  stroke={1.3}
                  className="text-foreground"
                />
              </span>
            ))}
          </div>

          <ol className="grid divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {steps.items.map((item, i) => (
              <li key={item.title} className="p-6 sm:p-8">
                <span className="font-mono text-[13px] leading-[1.2] tracking-[-0.03em] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-[21px] leading-[1.4] font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
