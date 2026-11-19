import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Eyebrow } from "./eyebrow"
import type { IconDef } from "@/lib/icons"

// Shared section header: eyebrow pill → headline → one-line subhead.
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  icon,
  className,
  children,
}: {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: "center" | "left"
  icon?: IconDef
  className?: string
  children?: ReactNode
}) {
  return (
    <header
      className={cn(
        "flex max-w-4xl flex-col",
        align === "center" ? "mx-auto items-center text-center" : "items-start text-left",
        className
      )}
    >
      <Eyebrow icon={icon}>{eyebrow}</Eyebrow>
      <h2 className="mt-6 text-3xl leading-[1.05] font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-6 max-w-2xl text-[21px] leading-relaxed font-medium tracking-[-0.03em] text-balance text-muted-foreground">
          {description}
        </p>
      )}
      {children}
    </header>
  )
}
