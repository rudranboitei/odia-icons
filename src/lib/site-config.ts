// ✏️ EDIT ALL TEXT, LINKS AND COPY HERE.
// Every section reads from this file, so you rarely need to touch the components.

export type FeatureMedia =
  | { type: "animation"; name: "rooted" | "grid" | "copy-code" | "free" }
  | { type: "video"; src: string }
  | { type: "gif"; src: string }

export type FeatureItem = {
  title: string
  description: string
  media?: FeatureMedia
}

const github = "https://github.com/rudranboitei/odia-icons"
const license = `${github}/blob/main/LICENSE`
const issues = `${github}/issues/new`
const email = "mailto:hello@odiaicons.com"

export const siteConfig = {
  name: "odiaicons",

  links: {
    github,
    license,
    email,
    icons: "/icons",
    contribute: issues,
  },

  nav: [
    { label: "Icons", href: "/icons" },
    { label: "Features", href: "/#features" },
    { label: "Developers", href: "/#developers" },
    { label: "FAQ", href: "/#faq" },
  ],

  // The main conversion component — repeated in the hero, developer and final sections.
  install: {
    command: "bun add odiaicons",
    helper: "Free and open source — works with npm, pnpm and yarn too.",
  },

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
  },

  featuresIntro: {
    eyebrow: "Why odiaicons",
    title: "Heritage you can drop into any product.",
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
    stats: [
      { value: "5", label: "motifs" },
      { value: "4", label: "formats" },
      { value: "0", label: "dependencies" },
    ],
  },

  steps: {
    eyebrow: "From grid to production",
    title: "Drop Odisha into your next build.",
    description:
      "Three steps between the idea and the shipped interface.",
    items: [
      {
        title: "Pick your motif",
        description:
          "Browse the set and open any icon to preview it at the size you need.",
      },
      {
        title: "Copy the code",
        description:
          "Take clean SVG, JSX, a typed React component or a data URI.",
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
  },

  faq: {
    eyebrow: "Questions, answered",
    title: "Everything you need to know.",
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
  },

  finalCta: {
    eyebrow: "Free to copy, remix and ship",
    title: "It's time to use them.",
    description:
      "Five motifs from Odisha, ready for whatever you're building next.",
    helper: "No credit card. No sign-up. Just icons.",
  },

  footer: {
    wordmark: "odiaicons",
    tagline:
      "An open-source icon set shaped by Odisha's temples, textiles and living traditions.",
    note: "Made in Odisha, India.",
    year: 2026,
    links: [
      { label: "The set", href: "/icons" },
      { label: "Features", href: "/#features" },
      { label: "FAQ", href: "/#faq" },
      { label: "GitHub", href: github, external: true },
      { label: "MIT License", href: license, external: true },
      { label: "Contribute", href: issues, external: true },
      { label: "Email", href: email },
      { label: "Request an icon", href: issues, external: true },
      { label: "Back to top", href: "#top" },
    ],
  },
}

export type SiteConfig = typeof siteConfig
