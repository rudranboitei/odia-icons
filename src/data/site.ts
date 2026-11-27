import { ICON_COUNT } from "@/lib/icons.generated";

/**
 * Edit these to match the real project. Badges only render values that are set.
 * This is the single source of copy, links and numbers for the whole site.
 * Icon counts come from the generated manifest, never hardcoded here.
 */
const REPO = "https://github.com/rudranboitei/odia-icons"; // TODO: confirm repo URL

export const SITE = {
  name: "OdiaIcons",
  tagline: "Free Odisha icons, open source.",
  /** Meta description: keep it around 150-160 characters. */
  description:
    "Free, open-source Odisha-inspired SVG icons for React and web.",
  github: REPO,
  siteUrl: "https://icons.odiaui.xyz",
  npmPackage: "@odiaui/icons-react",
  registryUrl: "https://icons.odiaui.xyz/r",
  // Fill these with real numbers, or leave null to hide the badge.
  stars: null as number | null,
  installs: null as string | null,

  // ---- SEO: feed these into generateMetadata / metadata ---------------
  seo: {
    /** ~50 characters, keyword first. */
    title: "Odisha Icons: Free Open-Source SVG & React Icon Set",
    titleTemplate: "%s | OdiaIcons",
    keywords: [
      "Odisha icons",
      "Odia icons",
      "outline SVG icons",
      "open source icon library",
      "React icons",
      "SVG icons",
      "UI icon set",
      "Indian icon set",
    ],
    locale: "en_IN",
    ogImage: "/og-image.png", // 1200 x 630
    twitterCard: "summary_large_image" as const,
  },

  // ---- Added for the icon browser + playground ----------------------
  links: {
    github: REPO,
    license: `${REPO}/blob/main/LICENSE`,
    contribute: `${REPO}/issues/new`,
    email: "mailto:hello@odiaui.xyz",
    icons: "/icons",
  },
  install: {
    command: "npm install @odiaui/icons-react",
    helper: "Free and open source. Works with npm, pnpm and yarn too.",
  },

  // ---- Landing page -------------------------------------------------
  nav: [
    { label: "Icons", href: "/icons" },
    { label: "Features", href: "/#features" },
    { label: "Developers", href: "/#developers" },
    { label: "FAQ", href: "/#faq" },
  ],

  hero: {
    eyebrow: "Open source · MIT licensed",
    // Keep in sync with the <h1> in hero.tsx
    title: "Free Odisha icons, open-source SVG set.",
    subtitle:
      "Free, MIT-licensed icons drawn on a 24 × 24 grid, made with Odisha in mind. Search in English or Odia (ଓଡ଼ିଆ).",
    stats: [
      `${ICON_COUNT} hand-drawn icons`,
      "24 × 24 grid",
      "4 export formats",
      "No attribution needed",
    ],
    wordmark: { lead: "Meet", trail: "Odia" },
    display: { lead: "Icons", accent: "with soul." },
    lead: `A focused ${ICON_COUNT}-icon set on a 24px grid, made with Odisha in mind. Free, open source and searchable in English or ଓଡ଼ିଆ.`,
    ctas: { install: "Install icons", browse: "Browse icons" },
    badges: {
      github: "Open source on GitHub",
      stars: "stars",
      installs: "installs",
      icons: "icons in the set",
    },
  },

  explorer: {
    title: "Browse the icon set, glyph by glyph.",
    accent: "glyph by glyph.",
    description:
      "Search by English name, tag or Odia script. Click any icon to copy its SVG or JSX.",
    searchPlaceholder: "Search home, ଘର, message…",
    emptyPrefix: "No icons match",
  },

  featuresIntro: {
    eyebrow: "Why OdiaIcons",
    title: "A clean icon set you can drop into any product.",
    accent: "drop into",
    description:
      "A small, consistent set of icons drawn with Odisha in mind.",
  },

  // media options per feature (optional):
  //   { type: "animation", name: "rooted" | "grid" | "copy-code" | "free" }
  //   { type: "video", src: "/features/clip.mp4" }
  //   { type: "gif", src: "/features/clip.gif" }
  features: [
    {
      title: "Made with care",
      description:
        "Designed in Odisha and drawn as clean line icons with a consistent stroke and grid.",
      media: { type: "animation", name: "rooted" },
    },
    {
      title: "One shared grid",
      description:
        "Every icon is built on a 24 × 24 grid with 2px strokes and rounded caps, so they sit together in any row.",
      media: { type: "animation", name: "grid" },
    },
    {
      title: "Copy as code",
      description:
        "Export SVG, JSX, a typed React component or a data URI straight from the browser.",
      media: { type: "animation", name: "copy-code" },
    },
    {
      title: "Free for anything",
      description:
        "MIT licensed. Use them in apps, websites, posters and side projects with no attribution needed.",
      media: { type: "animation", name: "free" },
    },
  ] as FeatureItem[],

  quote: {
    eyebrow: "Made in the open",
    text: "OdiaIcons is a small, carefully drawn set that brings a bit of Odisha's craft sensibility to everyday interfaces. Clean lines, one grid, no noise.",
    author: "The OdiaIcons project",
    meta: "Independent · open source · made in Odisha",
    linkLabel: "Star on GitHub",
    stats: [
      { value: String(ICON_COUNT), label: "icons" },
      { value: "4", label: "formats" },
      { value: "0", label: "dependencies" },
    ],
  },

  steps: {
    eyebrow: "From grid to production",
    title: "Add Odisha icons to your next build",
    accent: "",
    description: "Three steps between the idea and the shipped interface.",
    items: [
      {
        title: "Pick your motif",
        description:
          "Browse the set and open any icon to preview it at the size you need.",
      },
      {
        title: "Copy the code",
        description: "Take clean SVG, JSX, a typed React component or a data URI.",
      },
      {
        title: "Ship it anywhere",
        description:
          "Drop it into an app, a website or a poster. No attribution required.",
      },
    ],
  },

  developer: {
    eyebrow: "Developer-first",
    title: "Odisha icons built for developers.",
    highlight: "developers",
    description:
      "Real SVG and React files you can read, edit and version. No runtime, no wrapper components, no lock-in.",
    bullets: [
      "SVG, JSX, TSX and data URI exports",
      "24 × 24 grid with 2px strokes",
      "currentColor inherits your theme",
      "Stroke width you can change in one click",
      "Typed React components included",
      "MIT licensed, commercial use allowed",
    ],
    code: {
      fileName: "home.svg",
      grid: "24 × 24",
      license: "MIT licensed",
      spec: "2 stroke · round caps",
    },
  },

  faq: {
    eyebrow: "Questions, answered",
    title: "Odisha icons, questions answered.",
    accent: "",
    description:
      "Licensing, installation, Odia search and how to get your own motif into the set.",
    items: [
      {
        q: "What is OdiaIcons?",
        a: `OdiaIcons is a free, open-source icon set drawn with Odisha in mind. The current release is a focused ${ICON_COUNT}-icon set on a 24 × 24 outline grid.`,
      },
      {
        q: "Are the icons really free?",
        a: "Yes. The whole set is MIT licensed, so you can use it in personal, commercial and client work without paying or crediting anyone.",
      },
      {
        q: "Can I use the icons in a product?",
        a: "Yes. Apps, websites, packaging, posters, anything, including commercial and resold products. If you redistribute the files, keep the MIT licence notice with them.",
      },
      {
        q: "How do I use the icons in React?",
        a: "Run npm install @odiaui/icons-react and import any icon as a React component. You can also click any icon to copy it as SVG, JSX or a data URI. There is no runtime to configure.",
      },
      {
        q: "Can I search the icons in Odia?",
        a: "Yes. Search by English name, tag or Odia script, for example ଘର for Home.",
      },
      {
        q: "Can I request a motif?",
        a: "Yes. Open an issue with the motif, a reference image and where it comes from. Odia motifs are on the roadmap and will follow the same 2px style.",
      },
      {
        q: "Do the icons match other sets?",
        a: "They are drawn on a 24 × 24 grid with 2px strokes and round caps, so they sit comfortably next to most line icon sets.",
      },
      {
        q: "Can I contribute an icon?",
        a: "Absolutely. Fork the repo, add your SVG to the set and open a pull request. Keep the grid, the stroke and the source notes.",
      },
    ],
    more: {
      label: "Still curious?",
      linkLabel: "Ask on GitHub",
    },
  },

  finalCta: {
    eyebrow: "Free to copy, remix and ship",
    title: "Start using the icons today.",
    accent: "the icons",
    description: `${ICON_COUNT} icons — a focused set drawn with Odisha in mind — free under MIT and ready for whatever you're building next.`,
    helper: "No credit card. No sign-up. Just icons.",
  },

  footer: {
    wordmark: "odiaicons",
    tagline:
      "An open-source icon set drawn with Odisha in mind.",
    note: "Made in Odisha, India.",
    licenseNote: "Free under the MIT licence.",
    year: 2026,
    links: [
      { label: "GitHub", href: REPO, external: true },
      { label: "MIT License", href: `${REPO}/blob/main/LICENSE`, external: true },
      { label: "Contribute", href: `${REPO}/issues/new`, external: true },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Email", href: "mailto:hello@odiaui.xyz" },
      { label: "Request an icon", href: `${REPO}/issues/new`, external: true },
    ],
  },
};

export type FeatureMedia =
  | { type: "animation"; name: "rooted" | "grid" | "copy-code" | "free" }
  | { type: "video"; src: string }
  | { type: "gif"; src: string };

export type FeatureItem = {
  title: string;
  description: string;
  media?: FeatureMedia;
};

/**
 * Alias so the icon page files (`siteConfig.links.github`,
 * `siteConfig.install.command`, `siteConfig.name`) work unchanged.
 */
export const siteConfig = SITE;
