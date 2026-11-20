/**
 * Edit these to match the real project. Badges only render values that are set.
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
  },
  install: {
    command: "npm install @odiaui/icons",
  },
};

/**
 * Alias so the icon page files (`siteConfig.links.github`,
 * `siteConfig.install.command`, `siteConfig.name`) work unchanged.
 */
export const siteConfig = SITE;
