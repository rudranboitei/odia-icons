import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { IconDef } from "@/lib/icons";

/**
 * Paints one phrase of the heading in the accent colour.
 * Splits on the FIRST match only, so a phrase that appears twice can no
 * longer swallow text (the old `split()` dropped everything after a 2nd match).
 */
function AccentHeading({ title, accent }: { title: string; accent?: string }) {
  const at = accent ? title.indexOf(accent) : -1;
  if (!accent || at === -1) return <>{title}</>;

  return (
    <>
      {title.slice(0, at)}
      <span className="text-primary">{accent}</span>
      {title.slice(at + accent.length)}
    </>
  );
}

/**
 * Shared section header: small label, headline, short subhead.
 *
 * The label is plain text (with a short rule when left-aligned) rather than
 * a pill with an icon, which was the most "template" part of the old header.
 * Props are unchanged so existing callers keep working; `icon` is accepted
 * but no longer drawn.
 */
export function SectionHeader({
  eyebrow,
  title,
  accent,
  description,
  align = "center",
  size = "section",
  titleId,
  className,
  children,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: ReactNode;
  align?: "center" | "left";
  /** @deprecated No longer rendered. Kept so existing call sites still type-check. */
  icon?: IconDef;
  size?: "section" | "cta";
  /** Put on the <h2> so a parent <section aria-labelledby> can point at it. */
  titleId?: string;
  className?: string;
  children?: ReactNode;
}) {
  const centered = align === "center";

  return (
    <header
      className={cn(
        "flex max-w-3xl flex-col",
        centered ? "mx-auto items-center text-center" : "items-start text-left",
        className,
      )}
    >
      <p className="flex items-center gap-3 text-[13px] font-medium tracking-[0.12em] text-primary uppercase">
        {!centered && <span aria-hidden className="h-px w-6 bg-primary/60" />}
        {eyebrow}
      </p>

      <h2
        id={titleId}
        className={cn(
          "mt-4 font-semibold tracking-[-0.035em] text-balance text-foreground sm:mt-5",
          size === "cta"
            ? "text-[2.5rem] leading-[1.03] sm:text-5xl md:text-6xl lg:text-7xl"
            : "text-[2rem] leading-[1.08] sm:text-4xl md:text-5xl lg:text-[3.25rem]",
        )}
      >
        <AccentHeading title={title} accent={accent} />
      </h2>

      {description && (
        <p
          className={cn(
            "mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-5 sm:text-lg",
            centered ? "text-balance" : "text-pretty",
          )}
        >
          {description}
        </p>
      )}

      {children}
    </header>
  );
}
