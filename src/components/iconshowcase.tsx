"use client"

import { useState } from "react"
import { siteConfig } from "@/lib/site-config"
import { Icon, icons, type IconDef } from "@/lib/icons"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { IconPlayground } from "./icon-playground"

export function IconShowcase() {
  const [active, setActive] = useState<IconDef | null>(null)

  return (
    <section id="icons" className="scroll-mt-10 px-6 pt-20">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              The set
            </p>
            <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em] text-[#171717] sm:text-3xl">
              {icons.length} icons, one shared grid.
            </h2>
          </div>
          <span className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
            32 × 32 · stroke
          </span>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-3xl border bg-border sm:grid-cols-6">
          {icons.map((icon) => (
            <button
              key={icon.name}
              type="button"
              onClick={() => setActive(icon)}
              aria-label={`Open ${icon.name} icon`}
              className="group flex aspect-square flex-col items-center justify-center gap-3 bg-background transition-colors hover:bg-muted/70 focus-visible:bg-muted focus-visible:outline-none"
            >
              <Icon
                def={icon}
                size={40}
                stroke={1.4}
                className="text-[#171717] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:scale-110"
              />
              <span className="text-xs text-muted-foreground">{icon.name}</span>
            </button>
          ))}
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          Click any icon to resize it, change the stroke and copy the code. All
          icons are free under the {""}
          <a
            href={siteConfig.links.license}
            target="_blank"
            rel="noopener"
            className="underline underline-offset-2 hover:text-foreground"
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
