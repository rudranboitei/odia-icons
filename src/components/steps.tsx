import { siteConfig } from "@/lib/site-config"
import { Icon, icons } from "@/lib/icons"
import { SectionHeader } from "./section-header"

export function Steps() {
  const { steps } = siteConfig

  return (
    <section className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow={steps.eyebrow}
          title={steps.title}
          description={steps.description}
        />

        <div className="mt-12 overflow-hidden rounded-[2rem] border bg-muted/40">
          <div
            aria-hidden
            className="flex h-40 items-center justify-center gap-4 overflow-hidden border-b bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px] sm:h-52"
          >
            {[...icons, ...icons].map((icon, i) => (
              <span
                key={`${icon.name}-${i}`}
                className="flex size-16 shrink-0 items-center justify-center rounded-2xl border bg-background shadow-xs sm:size-20"
              >
                <Icon
                  def={icon}
                  size={30}
                  stroke={1.3}
                  className="text-[#171717]"
                />
              </span>
            ))}
          </div>

          <ol className="grid divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {steps.items.map((item, i) => (
              <li key={item.title} className="p-6 sm:p-8">
                <span className="font-mono text-[13px] leading-[1.2] tracking-[-0.03em] text-[#1d1d1f] opacity-55">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-[21px] leading-[1.4] font-medium tracking-[-0.03em] text-[#1d1d1f]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[15px] leading-[1.3] font-medium tracking-[-0.03em] text-[#1d1d1f] opacity-80">
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
