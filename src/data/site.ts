/**
 * Edit these to match the real project. Badges only render values that are set.
 * This is the single source of copy, links and numbers for the whole site.
 */
export const SITE = {
  name: "OdiaIcons",
  tagline: "Icons with Odia soul.",
  description:
    "An open-source icon library rooted in Odisha: temples, Pattachitra, Odissi, festivals and food, plus a general UI set. Ships as React components, raw SVG and a shadcn-style registry.",
  github: "https://github.com/odiaui/odiaicons", // TODO: confirm repo URL
  siteUrl: "https://icons.odiaui.xyz",
  npmPackage: "@odiaui/icons",
  registryUrl: "https://icons.odiaui.xyz/r", // TODO: confirm registry path
  // Fill these with real numbers, or leave null to hide the badge.
  stars: null as number | null,
  installs: null as string | null,

  // ---- Added for the icon browser + playground ----------------------
  // Keep these URLs in sync with `github` above.
  links: {
    github: "https://github.com/odiaui/odiaicons", // TODO: confirm repo URL
    license: "https://github.com/odiaui/odiaicons/blob/main/LICENSE",
    contribute: "https://github.com/odiaui/odiaicons/issues/new",
    email: "mailto:hello@odiaicons.com",
    icons: "/icons",
  },
  install: {
    command: "npm install @odiaui/icons",
    helper: "Free and open source — works with npm, pnpm and yarn too.",
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
    title: "Icons shaped by Odisha.",
    subtitle:
      "A free icon set drawn from Odisha's temples, textiles and living traditions — five motifs on one shared grid, ready to export.",
    stats: [
      "5 hand-drawn motifs",
      "24 × 24 grid",
      "5 export formats",
      "No attribution needed",
    ],
    wordmark: { lead: "Meet", trail: "Odia" },
    display: { lead: "Icons", accent: "with soul." },
    lead: "Temples, Pattachitra, Odissi and festivals as clean 24px outline icons. Search them in English or ଓଡ଼ିଆ.",
    ctas: { install: "Install icons", browse: "Browse icons" },
    badges: {
      github: "Open source on GitHub",
      stars: "stars",
      installs: "installs",
      icons: "icons in this preview",
    },
  },

  explorer: {
    title: "The culture of Odisha, glyph by glyph.",
    accent: "glyph by glyph.",
    description:
      "Search by English name, tag, or Odia script. Click any icon to copy its JSX.",
    searchPlaceholder: "Search temple, ରଥ, lotus…",
    emptyPrefix: "No icons match",
  },

  featuresIntro: {
    eyebrow: "Why odiaicons",
    title: "Heritage you can drop into any product.",
    accent: "drop into",
    description:
      "A small, consistent icon set built from Odisha's temples, textiles and traditions.",
  },

  // media options per feature (optional):
  //   { type: "animation", name: "rooted" | "grid" | "copy-code" | "free" }
  //   { type: "video", src: "/features/clip.mp4" }
  //   { type: "gif", src: "/features/clip.gif" }
  features: [
    {
      title: "Rooted in Odisha",
      description:
        "Konark's chakra, Kalinga deulas, pattachitra fish and Sambalpuri weave — redrawn as clean line icons.",
      media: { type: "animation", name: "rooted" },
    },
    {
      title: "One shared grid",
      description:
        "Every icon is built on a 24 × 24 grid with 1.75px strokes and rounded caps, so they sit together in any row.",
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
        "MIT licensed. Use them in apps, posters, zines and side projects — no attribution needed.",
      media: { type: "animation", name: "free" },
    },
  ] as FeatureItem[],

  quote: {
    eyebrow: "Made in the open",
    text: "Odisha's visual language lives on temple walls, in woven cloth and on painted palm leaf. odiaicons turns those motifs into crisp, consistent icons that anyone can use.",
    author: "The odiaicons project",
    meta: "Independent · open source · made in Odisha",
    linkLabel: "Star on GitHub",
    stats: [
      { value: "5", label: "motifs" },
      { value: "4", label: "formats" },
      { value: "0", label: "dependencies" },
    ],
  },

  steps: {
    eyebrow: "From grid to production",
    title: "Drop Odisha into your next build.",
    accent: "Odisha",
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
          "Drop it into an app, a poster or a zine. No attribution required.",
      },
    ],
  },

  developer: {
    eyebrow: "Developer-first",
    title: "Built for developers, not just decks.",
    highlight: "developers",
    description:
      "Everything is a real file you can read, edit and version. No runtime, no wrapper components, no lock-in.",
    bullets: [
      "SVG, JSX, TSX and data URI exports",
      "24 × 24 grid with 1.75px strokes",
      "currentColor inherits your theme",
      "Stroke width you can change in one click",
      "Typed React components included",
      "MIT licensed — commercial use allowed",
    ],
    code: {
      fileName: "konark-wheel.svg",
      grid: "24 × 24",
      license: "MIT licensed",
      spec: "1.75 stroke · round caps",
    },
  },

  faq: {
    eyebrow: "Questions, answered",
    title: "Everything you need to know.",
    accent: "need to know.",
    description:
      "Licensing, installation and how to get your own motif into the set.",
    items: [
      {
        q: "Is odiaicons really free?",
        a: "Yes. The whole set is MIT licensed, so you can use it in personal, commercial and client work without paying or crediting anyone.",
      },
      {
        q: "Can I use the icons in a product?",
        a: "Yes. Apps, websites, packaging, posters — anything. Just don't resell the icons as your own icon set.",
      },
      {
        q: "How do I add an icon to my project?",
        a: "Install the package, or click any icon to copy it as SVG, JSX, a React component or a data URI. There is no runtime to configure.",
      },
      {
        q: "Can I request a motif?",
        a: "Yes. Open an issue with the motif, a reference image and where it comes from. Odisha has plenty left to draw.",
      },
      {
        q: "Do the icons match other sets?",
        a: "They are drawn on a 24 × 24 grid with 1.75px strokes and round caps, so they sit comfortably next to most line icon sets.",
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
    title: "It's time to use them.",
    accent: "use them.",
    description:
      "Five motifs from Odisha, ready for whatever you're building next.",
    helper: "No credit card. No sign-up. Just icons.",
  },

  footer: {
    wordmark: "odiaicons",
    tagline:
      "An open-source icon set shaped by Odisha's temples, textiles and living traditions.",
    note: "Made in Odisha, India.",
    licenseNote: "Free under the MIT licence.",
    year: 2026,
    links: [
      { label: "The set", href: "/icons" },
      { label: "Features", href: "/#features" },
      { label: "FAQ", href: "/#faq" },
      { label: "GitHub", href: "https://github.com/odiaui/odiaicons", external: true },
      {
        label: "MIT License",
        href: "https://github.com/odiaui/odiaicons/blob/main/LICENSE",
        external: true,
      },
      {
        label: "Contribute",
        href: "https://github.com/odiaui/odiaicons/issues/new",
        external: true,
      },
      { label: "Email", href: "mailto:hello@odiaicons.com" },
      {
        label: "Request an icon",
        href: "https://github.com/odiaui/odiaicons/issues/new",
        external: true,
      },
      { label: "Back to top", href: "#top" },
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
