import type { ReactNode } from "react";

/**
 * Demo icon set for the landing page. Follows the OdiaIcons spec:
 * 24x24 viewBox, outline, 1.5 stroke, round caps/joins, currentColor.
 */
export type Category = "architecture" | "culture" | "art" | "festival" | "nature" | "ui";

export type IconEntry = {
  name: string;
  odia: string;
  category: Category;
  tags: string[];
  paths: ReactNode;
};

export const CATEGORIES: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "culture", label: "Culture" },
  { id: "ui", label: "UI" },
];

export const ICONS: IconEntry[] = [
  {
    name: "deepa",
    odia: "ଦୀପ",
    category: "culture",
    tags: ["deepa", "diya", "lamp", "light", "ଦୀପ"],
    paths: (
      <>
        <path d="M3.5 13h17c0 3.4-3.6 5.3-8.5 5.3S3.5 16.4 3.5 13z" />
        <path d="M12 2.8c1.6 1.8 2.6 3.3 2.6 4.5a2.6 2.6 0 0 1-5.2 0c0-1.2 1-2.7 2.6-4.5z" />
        <path d="M8.5 21.2h7" />
      </>
    ),
  },
  {
    name: "home",
    odia: "ଘର",
    category: "ui",
    tags: ["home", "house", "start", "ଘର"],
    paths: (
      <>
        <path d="M4 10.5 12 3.5l8 7V18a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 18z" />
        <path d="M9.5 20.5v-4.5a2.5 2.5 0 0 1 5 0v4.5" />
      </>
    ),
  },
];

export function IconGlyph({
  icon,
  className,
  strokeWidth = 1.5,
}: {
  icon: IconEntry;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {icon.paths}
    </svg>
  );
}

export const byName = (name: string) => ICONS.find((i) => i.name === name)!;
