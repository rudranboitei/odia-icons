import type { ReactNode } from "react"
import type { VariantProps } from "class-variance-authority"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ActionLinkProps = {
  href: string
  children: ReactNode
  external?: boolean
  className?: string
} & VariantProps<typeof buttonVariants>

// Anchor styled like the shadcn Button — used for links in the Hero and CTA.
export function ActionLink({
  href,
  children,
  external,
  variant = "default",
  size = "lg",
  className,
}: ActionLinkProps) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
      className={cn(
        buttonVariants({ variant, size }),
        "h-11 rounded-full px-6 text-[15px]",
        className
      )}
    >
      {children}
    </a>
  )
}
