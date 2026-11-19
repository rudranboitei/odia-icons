// ✏️ EDIT ALL TEXT, LINKS AND ASSET PATHS HERE.
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

const github = "https://github.com/odia-icon/odia-icon"

export const siteConfig = {
  name: "odiaicon",

  links: {
    github,
    license: `${github}/blob/main/LICENSE`,
    email: "mailto:hello@odiaicon.com",
    icons: "#icons",
    contribute: `${github}/issues/new`,
  },

  // Files live in /public
  assets: {
    qr: "/qr.svg",
    headerLogo: "/headerlogo.svg",
    phoneVideo: "/videojuly.mp4",
    phoneFrame: "/17proframe.svg",
    giantFlower: "/giantflower.png",
    footerWordmark: "/footer.svg",
  },

  iconDock: {
    ariaLabel: "View the odiaicon project on GitHub",
    caption: "Free & open",
  },

  hero: {
    title: "Icons shaped by Odisha.",
    subtitle:
      "A free, open-source icon set drawn from Odisha's temples, textiles and living traditions — ready for your next product.",
    primaryCta: "Explore the icons",
    secondaryCta: "View on GitHub",
  },

  mission:
    "Odisha's visual language lives on temple walls, in woven cloth and on painted palm leaf. odiaicon turns those motifs into crisp, consistent icons that anyone can use.",

  featuresIntro: {
    eyebrow: "Why odiaicon",
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
        "Every icon is built on a 32 × 32 grid with rounded caps, so they sit together in any row.",
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

  cta: {
    heading: "Build something that feels like home.",
    description:
      "The whole set is free under the MIT licence. Take it, remix it, ship it.",
    primaryCta: "Get the icon set",
    secondaryCta: "Contribute an icon",
  },

  footer: {
    wordmark: "odiaicons",
    tagline:
      "An open-source icon set shaped by Odisha's temples, textiles and living traditions.",
    note: "Made in Odisha, India.",
    year: 2026,
  },

  footerLinks: [
    { label: "Icons", href: "#icons", external: false },
    { label: "GitHub", href: github, external: true },
    { label: "MIT License", href: `${github}/blob/main/LICENSE`, external: true },
    { label: "Email", href: "mailto:hello@odiaicon.com", external: false },
  ],
}

export type SiteConfig = typeof siteConfig
