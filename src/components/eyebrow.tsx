import type { ReactNode } from "react"
import { Icon, icons, type IconDef } from "@/lib/icons"

// Small pill with an icon — the eyebrow used above every section headline.
export function Eyebrow({
  children,
  icon = icons[0],
}: {
  children: ReactNode
  icon?: IconDef
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border bg-background/80 py-1 pr-3 pl-1.5 text-[15px] font-medium tracking-[-0.03em] text-[#1d1d1f] shadow-xs backdrop-blur">
      <span className="flex size-5 items-center justify-center rounded-full bg-foreground text-background">
        <Icon def={icon} size={12} stroke={1.85} />
      </span>
      {children}
    </span>
  )
}
