"use client"

import { useEffect, useState } from "react"
import type { Highlighter } from "shiki"
import { cn } from "@/lib/utils"

/** One place to change the theme. It must be the same in both spots below. */
const THEME = "github-light"

let highlighterPromise: Promise<Highlighter> | null = null

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = import("shiki").then(({ createHighlighter }) =>
      createHighlighter({
        themes: [THEME],
        langs: ["bash", "xml", "jsx"],
      })
    )
  }
  return highlighterPromise
}

/** Syntax highlighting powered by Shiki, using the GitHub Light theme. */
export function ShikiCode({
  code,
  lang,
  className,
}: {
  code: string
  lang: "bash" | "xml" | "jsx"
  className?: string
}) {
  const [html, setHtml] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    getHighlighter()
      .then((highlighter) => {
        if (!active) return
        setHtml(
          highlighter.codeToHtml(code, {
            lang,
            theme: THEME,
            structure: "inline",
          })
        )
      })
      .catch((error) => {
        // Keep the plain text fallback, but say why so it is not a silent failure.
        console.error("ShikiCode: could not highlight", error)
      })

    return () => {
      active = false
    }
  }, [code, lang])

  if (html) {
    return (
      <code
        className={cn("shiki", className)}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }

  return <code className={className}>{code}</code>
}
