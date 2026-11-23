import * as React from "react"

/**
 * Shared bits for the /icons page. Visual style matches the landing page:
 * rounded-full controls, neutral palette, warm surfaces.
 */

/** Orange corner brackets, like the avatar tiles in the reference. */
export function Corners({ className = "size-2.5" }: { className?: string }) {
  const base = `pointer-events-none absolute ${className} border-orange-600`
  return (
    <>
      <span aria-hidden className={`${base} top-0 left-0 border-t border-l`} />
      <span aria-hidden className={`${base} top-0 right-0 border-t border-r`} />
      <span aria-hidden className={`${base} bottom-0 left-0 border-b border-l`} />
      <span aria-hidden className={`${base} right-0 bottom-0 border-r border-b`} />
    </>
  )
}

export function Tag({
  children,
  tone = "gray",
  className = "",
}: {
  children: React.ReactNode
  tone?: "gray" | "orange"
  className?: string
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] leading-none font-medium whitespace-nowrap ${
        tone === "orange"
          ? "bg-orange-100 text-orange-700"
          : "bg-black/[0.05] text-neutral-600"
      } ${className}`}
    >
      {children}
    </span>
  )
}

export function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded-md border border-black/10 bg-white px-1.5 py-0.5 text-[10px] font-medium text-neutral-500">
      {children}
    </kbd>
  )
}

type Variant = "solid" | "outline" | "soft" | "accent"
type Size = "sm" | "md" | "lg" | "icon" | "iconSm"

const BASE =
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full text-sm font-medium whitespace-nowrap outline-none transition-[background-color,border-color,color,box-shadow,transform] select-none active:scale-[0.98] focus-visible:ring-[3px] focus-visible:ring-black/10 disabled:pointer-events-none disabled:opacity-50"

const VARIANTS: Record<Variant, string> = {
  solid: "bg-neutral-950 text-white hover:bg-neutral-800",
  outline:
    "border border-black/10 bg-white text-neutral-700 hover:bg-black/[0.03] hover:text-neutral-950",
  soft: "bg-black/[0.05] text-neutral-700 hover:bg-black/[0.08] hover:text-neutral-950",
  accent: "bg-orange-100 text-orange-700 hover:bg-orange-200",
}

const SIZES: Record<Size, string> = {
  sm: "h-8 px-3 text-[13px]",
  md: "h-9 px-3.5 text-[13px]",
  lg: "h-10 px-4",
  icon: "size-9",
  iconSm: "size-8",
}

export function btn(variant: Variant = "solid", size: Size = "md", extra = "") {
  return `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${extra}`
}

export function MonoButton({
  variant = "solid",
  size = "md",
  className = "",
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
}) {
  return <button type={type} className={btn(variant, size, className)} {...props} />
}
