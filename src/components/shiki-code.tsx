"use client"

import { useEffect, useState } from "react"
import type { Highlighter } from "shiki"
import { cn } from "@/lib/utils"

let highlighterPromise: Promise<Highlighter> | null = null

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = import("shiki").then(({ createHighlighter }) =>
      createHighlighter({
        themes: ["github-light", "github-dark"],
        langs: ["bash", "xml", "jsx"],
      })
    )
  }
  return highlighterPromise
}

/** Syntax highlighting powered by Shiki, with light and dark token colors. */
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
            themes: { light: "github-light", dark: "github-dark" },
            defaultColor: false,
            structure: "inline",
          })
        )
      })
      .catch(() => {
        // Keep the plain text fallback if the highlighter cannot load.
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
