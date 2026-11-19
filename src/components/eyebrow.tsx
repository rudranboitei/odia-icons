import type { ReactNode } from "react"
import { Icon, iconsByName, type IconDef } from "@/lib/icons"

// Small pill with an icon — the eyebrow used above every section headline.
export function Eyebrow({
  children,
  icon = iconsByName["konark-wheel"],
}: {
  children: ReactNode
  icon?: IconDef
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
      <Icon def={icon} size={12} stroke={1.85} className="text-muted-foreground" />
      {children}
    </span>
  )
}
