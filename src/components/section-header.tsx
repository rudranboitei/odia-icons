import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./eyebrow";
import type { IconDef } from "@/lib/icons";

/** Splits one phrase out of a heading and paints it cream. */
function AccentHeading({
  title,
  accent,
}: {
  title: string;
  accent?: string;
}) {
  if (!accent || !title.includes(accent)) return <>{title}</>;

  const [before, after] = title.split(accent);
  return (
    <>
      {before}
      <span className="text-primary">{accent}</span>
      {after}
    </>
  );
}

// Shared section header: eyebrow pill → headline → one-line subhead.
export function SectionHeader({
  eyebrow,
  title,
  accent,
  description,
  align = "center",
  icon,
  size = "section",
  className,
  children,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: ReactNode;
  align?: "center" | "left";
  icon?: IconDef;
  size?: "section" | "cta";
  className?: string;
  children?: ReactNode;
}) {
  return (
    <header
      className={cn(
        "flex max-w-4xl flex-col",
        align === "center" ? "mx-auto items-center text-center" : "items-start text-left",
        className,
      )}
    >
      <Eyebrow icon={icon}>{eyebrow}</Eyebrow>
      <h2
        className={cn(
          "mt-6 font-semibold tracking-tight text-balance text-foreground",
          size === "cta"
            ? "text-5xl leading-[1.05] md:text-7xl"
            : "text-4xl leading-[1.05] md:text-6xl",
        )}
      >
        <AccentHeading title={title} accent={accent} />
      </h2>
      {description && (
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-balance text-muted-foreground md:text-xl">
          {description}
        </p>
      )}
      {children}
    </header>
  );
}
