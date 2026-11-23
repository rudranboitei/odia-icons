import * as React from "react"

/**
 * Shared bits for the icons page so every button, tag and bracket
 * comes from one place and matches the dashboard reference.
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
      className={`rounded-md px-2 py-1 text-[11px] leading-none tracking-wide whitespace-nowrap uppercase ${tone === "orange"
        ? "bg-orange-100 text-orange-700"
        : "bg-black/[0.06] text-neutral-600"
        } ${className}`}
    >
      {children}
    </span>
  )
}

export function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded bg-black/[0.06] px-1.5 py-0.5 font-mono text-[10px] text-neutral-500">
      {children}
    </kbd>
  )
}

type Variant = "solid" | "outline" | "soft" | "accent"
type Size = "sm" | "md" | "lg" | "icon" | "iconSm"

const BASE =
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md font-mono text-[12px] tracking-wide whitespace-nowrap uppercase outline-none transition-[background-color,border-color,color,transform] select-none active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f5f5] disabled:pointer-events-none disabled:opacity-50"

const VARIANTS: Record<Variant, string> = {
  solid: "bg-neutral-900 text-white hover:bg-neutral-700",
  outline:
    "border border-black/10 bg-white text-neutral-700 hover:border-black/30 hover:text-neutral-900",
  soft: "bg-black/[0.06] text-neutral-700 hover:bg-black/[0.09] hover:text-neutral-900",
  accent: "bg-orange-100 text-orange-700 hover:bg-orange-200",
}

const SIZES: Record<Size, string> = {
  sm: "h-8 px-2.5",
  md: "h-9 px-3",
  lg: "h-10 px-3.5",
  icon: "size-9",
  iconSm: "size-7",
}

/** Class string, so anchors and motion elements can wear the same button style. */
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
