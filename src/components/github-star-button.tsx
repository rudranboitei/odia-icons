"use client"

import { useEffect, useState } from "react"
import { IconStarFilled } from "@tabler/icons-react"

import { SITE } from "@/data/site"

const REPO_PATH = new URL(SITE.github).pathname.replace(/^\/+|\/+$/g, "")

/**
 * GitHub star button with a live stargazer count.
 *
 * The count is fetched on the client so the static build stays offline-safe.
 * While loading, or if the request fails, the button still works and shows
 * "Star" instead of a number.
 */
export function GitHubStarButton({ className = "" }: { className?: string }) {
  const [stars, setStars] = useState<number | null>(SITE.stars)

  useEffect(() => {
    if (SITE.stars !== null) return

    const controller = new AbortController()

    fetch(`https://api.github.com/repos/${REPO_PATH}`, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      signal: controller.signal,
    })
      .then((response) =>
        response.ok
          ? response.json()
          : Promise.reject(new Error(`GitHub API ${response.status}`)),
      )
      .then((data: { stargazers_count?: unknown }) => {
        if (typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count)
        }
      })
      .catch(() => {
        /* Keep the fallback label if GitHub is unreachable or rate-limited. */
      })

    return () => controller.abort()
  }, [])

  const label =
    stars === null
      ? "Star on GitHub"
      : `Star on GitHub — ${stars.toLocaleString()} ${
          stars === 1 ? "star" : "stars"
        }`

  return (
    <a
      href={SITE.links.github}
      target="_blank"
      rel="noopener"
      aria-label={label}
      title={label}
      className={`inline-flex h-10 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-full bg-black/[0.05] px-3 text-[12px] font-semibold text-neutral-700 whitespace-nowrap transition-[background-color,color,box-shadow,transform] select-none hover:bg-black/[0.08] hover:text-neutral-950 focus-visible:ring-[3px] focus-visible:ring-black/10 focus-visible:outline-none active:scale-[0.98] max-sm:px-2.5 ${className}`}
    >
      <IconStarFilled aria-hidden className="size-3.5 text-orange-600" />
      <span className="min-w-[1ch] text-center tabular-nums">
        {stars === null ? "Star" : stars.toLocaleString()}
      </span>
    </a>
  )
}
