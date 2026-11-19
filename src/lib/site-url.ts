// Canonical origin for metadata and sitemap URLs.
// Override with NEXT_PUBLIC_SITE_URL when deploying to a custom domain;
// on Vercel the preview/production URL is detected automatically.
const fallback = "https://odiaicons.com"

const configured =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : fallback)

export const siteUrl = new URL(configured).toString().replace(/\/$/, "")
