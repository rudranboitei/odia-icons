import { Icon, iconsByName, type IconDef } from "@/lib/icons";

/**
 * Landing-page icon subset. Metadata and SVG paths come from the generated
 * manifest, so the library stays the single source of truth.
 */
export type Category = "ui";

export type IconEntry = IconDef;

export const CATEGORIES: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ui", label: "UI" },
];

/** Icons used by the landing-page visuals, in display order. */
export const ICONS: IconEntry[] = ["home", "search", "message", "user"]
  .map((name) => iconsByName[name])
  .filter((icon): icon is IconEntry => Boolean(icon));

export function IconGlyph({
  icon,
  className,
  strokeWidth = 2,
}: {
  icon: IconEntry;
  className?: string;
  strokeWidth?: number;
}) {
  return <Icon def={icon} stroke={strokeWidth} className={className} />;
}

export const byName = (name: string) => iconsByName[name];
