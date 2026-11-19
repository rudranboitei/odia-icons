"use client"

import { useState } from "react"
import { siteConfig } from "@/lib/site-config"
import { Icon, icons, type IconDef } from "@/lib/icons"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { IconPlayground } from "./icon-playground"
import { SectionHeader } from "./section-header"

export function IconShowcase() {
  const [active, setActive] = useState<IconDef | null>(null)

  return (
    <section id="icons" className="scroll-mt-20 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          eyebrow="The set"
          title="Six motifs. One shared grid."
          description="Every icon is free to use, ready to export. Open any tile to make it yours."
        />

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {icons.map((icon) => (
            <button
              key={icon.name}
              type="button"
              onClick={() => setActive(icon)}
              aria-label={`Open ${icon.name} icon`}
              className="group flex aspect-[4/3] flex-col items-center justify-center gap-4 rounded-3xl border bg-card p-6 shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
            >
              <Icon
                def={icon}
                size={52}
                stroke={1.35}
                className="text-[#171717] transition-transform duration-300 group-hover:scale-110"
              />
              <span className="flex flex-col items-center gap-1">
                <span className="text-[21px] leading-[1.4] font-medium capitalize tracking-[-0.03em] text-[#1d1d1f]">
                  {icon.name}
                </span>
                <span className="text-[13px] leading-[1.2] tracking-[-0.03em] text-[#1d1d1f] opacity-55">
                  {icon.tags.slice(0, 2).join(" · ")}
                </span>
              </span>
            </button>
          ))}
        </div>

        <p className="mt-5 text-center text-[13px] leading-[1.4] tracking-[-0.03em] text-[#1d1d1f] opacity-55">
          Click any icon to resize it, change the stroke and copy the code. All
          icons are free under the{" "}
          <a
            href={siteConfig.links.license}
            target="_blank"
            rel="noopener"
            className="underline underline-offset-2 hover:text-[#1d1d1f]"
          >
            MIT licence
          </a>
          .
        </p>
      </div>

      <Dialog
        open={active !== null}
        onOpenChange={(open) => {
          if (!open) setActive(null)
        }}
      >
        <DialogContent className="max-h-[88dvh] overflow-y-auto sm:max-w-2xl">
          {active && <IconPlayground def={active} />}
        </DialogContent>
      </Dialog>
    </section>
  )
}
