"use client"

import { useEffect, useState } from "react"

import { SITE } from "@/data/site"

const REPO_PATH = new URL(SITE.github).pathname.replace(/^\/+|\/+$/g, "")

function GitHubMark({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  )
}

/** GitHub link with live star count. */
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
        /* Keep the fallback if GitHub is unreachable or rate-limited. */
      })

    return () => controller.abort()
  }, [])

  const count = stars === null ? null : stars.toLocaleString()
  const label =
    stars === null
      ? "Star on GitHub"
      : `Star on GitHub, ${count} ${stars === 1 ? "star" : "stars"}`

  return (
    <a
      href={SITE.links.github}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-black/[0.05] px-3 text-[13px] font-medium text-neutral-700 transition-colors hover:bg-black/[0.08] hover:text-neutral-950 focus-visible:ring-[3px] focus-visible:ring-black/10 focus-visible:outline-none ${className}`}
    >
      <GitHubMark className="size-4" />
      {count ? <span aria-hidden="true" className="tabular-nums">{count}</span> : null}
    </a>
  )
}
