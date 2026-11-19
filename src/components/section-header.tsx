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
        "flex max-w-2xl flex-col",
        align === "center" ? "mx-auto items-center text-center" : "items-start text-left",
        className
      )}
    >
      <Eyebrow icon={icon}>{eyebrow}</Eyebrow>
      <h2 className="mt-5 text-3xl font-medium tracking-[-0.035em] text-balance text-[#171717] sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-xl text-base text-balance text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
      {children}
    </header>
  )
}
