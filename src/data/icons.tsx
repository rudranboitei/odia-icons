import type { ReactNode } from "react";

/**
 * Demo icon set for the landing page. Follows the OdiaIcons spec:
 * 24x24 viewBox, outline, 1.75 stroke, round caps/joins, currentColor.
 *
 * In production, replace this file with the generated `icons.json` manifest
 * (or import components from `@odiaui/icons`) so the site never hand-edits icon data.
 * Odia-script names below should be checked against your meta/*.json files.
 */
export type Category = "architecture" | "culture" | "art" | "festival" | "nature";

export type IconEntry = {
  name: string;
  odia: string;
  category: Category;
  tags: string[];
  paths: ReactNode;
};

export const CATEGORIES: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "architecture", label: "Architecture" },
  { id: "culture", label: "Culture" },
  { id: "art", label: "Art" },
  { id: "festival", label: "Festival" },
  { id: "nature", label: "Nature" },
];

export const ICONS: IconEntry[] = [
  {
    name: "konark-wheel",
    odia: "କୋଣାର୍କ ଚକ",
    category: "architecture",
    tags: ["konark", "chakra", "sun temple", "ଚକ"],
    paths: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="2" />
        <path d="M12 3v7M12 14v7M3 12h7M14 12h7M5.6 5.6l4.9 4.9M13.5 13.5l4.9 4.9M18.4 5.6l-4.9 4.9M10.5 13.5l-4.9 4.9" />
      </>
    ),
  },
  {
    name: "deula",
    odia: "ଦେଉଳ",
    category: "architecture",
    tags: ["temple", "jagannath", "puri", "ଦେଉଳ"],
    paths: (
      <>
        <path d="M12 3c1.5 2 2.5 3.5 2.5 5.5h-5C9.5 6.5 10.5 5 12 3Z" />
        <path d="M8 8.5h8l1 4H7l1-4Z" />
        <path d="M6 12.5h12l1 3H5l1-3Z" />
        <path d="M4 21v-5.5h16V21" />
        <path d="M10 21v-3a2 2 0 0 1 4 0v3" />
      </>
    ),
  },
  {
    name: "rath",
    odia: "ରଥ",
    category: "festival",
    tags: ["rath yatra", "chariot", "puri", "ରଥ"],
    paths: (
      <>
        <path d="M5 14h14v3H5z" />
        <path d="M7 14V9l5-4 5 4v5" />
        <path d="M12 5V3" />
        <circle cx="7.5" cy="19" r="2" />
        <circle cx="16.5" cy="19" r="2" />
      </>
    ),
  },
  {
    name: "padma",
    odia: "ପଦ୍ମ",
    category: "nature",
    tags: ["lotus", "flower", "ପଦ୍ମ"],
    paths: (
      <>
        <path d="M12 20c-3 0-6-2.5-6-6 2.5 0 4.5 1 6 3 1.500-2 3.500-3 6-3 0 3.500-3 6-6 6Z" />
        <path d="M12 17c-2-1.500-3-3.500-3-6.500 0-2 1.200-4 3-5.500 1.800 1.500 3 3.500 3 5.500 0 3-1 5-3 6.500Z" />
      </>
    ),
  },
  {
    name: "machha",
    odia: "ମାଛ",
    category: "nature",
    tags: ["fish", "chilika", "ମାଛ"],
    paths: (
      <>
        <path d="M3 12c3-4.500 8-6 12-3.500 2 1.200 3.500 2.500 6 3.500-2.500 1-4 2.300-6 3.500-4 2.500-9 1-12-3.500Z" />
        <circle cx="16" cy="11" r=".6" />
      </>
    ),
  },
  {
    name: "boita",
    odia: "ବୋଇତ",
    category: "festival",
    tags: ["boat", "bali jatra", "boita bandana", "ବୋଇତ"],
    paths: (
      <>
        <path d="M3 15h18l-2.500 4h-13L3 15Z" />
        <path d="M12 15V4M12 5l6 8h-6" />
      </>
    ),
  },
  {
    name: "shankha",
    odia: "ଶଙ୍ଖ",
    category: "culture",
    tags: ["conch", "shell", "ଶଙ୍ଖ"],
    paths: (
      <>
        <path d="M7 17c-2.500-1-3.500-3.500-2.500-6 1.500-3.500 6-6 10-5 3 .8 4.500 3.500 4 6.500-.6 3.500-4 6-7.500 5.500" />
        <path d="M9 14c0-2 1.500-3.500 4-3.500" />
      </>
    ),
  },
  {
    name: "deepa",
    odia: "ଦୀପ",
    category: "festival",
    tags: ["lamp", "diya", "kartika", "ଦୀପ"],
    paths: (
      <>
        <path d="M4 14h16c0 3-2.500 5-8 5s-8-2-8-5Z" />
        <path d="M12 14c-2-1.500-2-4 0-7 2 3 2 5.500 0 7Z" />
      </>
    ),
  },
  {
    name: "madala",
    odia: "ମାଦଳ",
    category: "culture",
    tags: ["drum", "music", "folk", "ମାଦଳ"],
    paths: (
      <>
        <path d="M5 8c0-1.100 3-2 7-2s7 .9 7 2v8c0 1.100-3 2-7 2s-7-.9-7-2V8Z" />
        <path d="M5 8c0 1.100 3 2 7 2s7-.9 7-2" />
        <path d="M5 13l3.500 2M19 13l-3.500 2" />
      </>
    ),
  },
  {
    name: "ghanta",
    odia: "ଘଣ୍ଟା",
    category: "culture",
    tags: ["bell", "temple", "ଘଣ୍ଟା"],
    paths: (
      <>
        <path d="M6 16v-5a6 6 0 0 1 12 0v5l1.500 2h-15L6 16Z" />
        <path d="M10 21h4" />
      </>
    ),
  },
  {
    name: "pataka",
    odia: "ପତାକା",
    category: "architecture",
    tags: ["flag", "patita pabana", "ପତାକା"],
    paths: (
      <>
        <path d="M6 21V3" />
        <path d="M6 4h12l-3 4 3 4H6" />
      </>
    ),
  },
  {
    name: "surya",
    odia: "ସୂର୍ଯ୍ୟ",
    category: "nature",
    tags: ["sun", "konark", "ସୂର୍ଯ୍ୟ"],
    paths: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.900 4.900 7 7M17 17l2.100 2.100M19.100 4.900 17 7M7 17l-2.100 2.100" />
      </>
    ),
  },
  {
    name: "parbata",
    odia: "ପର୍ବତ",
    category: "nature",
    tags: ["mountain", "hills", "ପର୍ବତ"],
    paths: <path d="M3 19l6-11 4 7 2-3 6 7H3Z" />,
  },
  {
    name: "nadia-gachha",
    odia: "ନଡ଼ିଆ ଗଛ",
    category: "nature",
    tags: ["coconut tree", "palm", "coast", "ନଡ଼ିଆ"],
    paths: (
      <>
        <path d="M12 21V11" />
        <path d="M12 11c-1-3-4-4.500-7-4 2 0 4.500 1 7 4Zm0 0c1-3 4-4.500 7-4-2 0-4.500 1-7 4Z" />
        <path d="M12 11c-.5-2.500-.5-4 0-6 .5 2 .5 3.500 0 6Z" />
      </>
    ),
  },
  {
    name: "ikat",
    odia: "ଇକତ",
    category: "art",
    tags: ["sambalpuri", "weave", "pattern", "ikat"],
    paths: (
      <>
        <path d="M12 3l9 9-9 9-9-9 9-9Z" />
        <path d="M12 8l4 4-4 4-4-4 4-4Z" />
      </>
    ),
  },
  {
    name: "pattachitra",
    odia: "ପଟ୍ଟଚିତ୍ର",
    category: "art",
    tags: ["scroll painting", "art", "ପଟ୍ଟଚିତ୍ର"],
    paths: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <rect x="7.500" y="6.500" width="9" height="11" rx="1" />
        <circle cx="12" cy="12" r="2" />
      </>
    ),
  },
];

export function IconGlyph({
  icon,
  className,
  strokeWidth = 1.75,
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
