import { Fragment, type ReactNode } from "react"

const SUBCOMMANDS = new Set([
  "add",
  "build",
  "create",
  "dev",
  "exec",
  "i",
  "install",
  "remove",
  "run",
  "uninstall",
  "update",
])

/** Colors a shell command without changing the text that gets copied. */
export function ShellCode({
  command,
  className,
}: {
  command: string
  className?: string
}) {
  const parts = command.split(/(\s+)/).filter(Boolean)
  let word = 0

  return (
    <code className={className}>
      {parts.map((part, index) => {
        if (/^\s+$/.test(part)) {
          return <Fragment key={index}>{part}</Fragment>
        }

        const position = word++
        const style =
          position === 0
            ? "text-sky-600 dark:text-sky-400"
            : part.startsWith("-") || SUBCOMMANDS.has(part)
              ? "text-violet-600 dark:text-violet-400"
              : "text-emerald-600 dark:text-emerald-400"

        return (
          <span key={index} className={style}>
            {part}
          </span>
        )
      })}
    </code>
  )
}

const MARKUP_TOKENS =
  /(<!--[\s\S]*?-->)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(<\/?[A-Za-z][\w.-]*)|(\/?>)|([A-Za-z_:][\w:.-]*)(?=\s*=)|(\b\d+(?:\.\d+)?\b)|(#[0-9a-fA-F]{3,8}\b)/g

/** Colors SVG and JSX snippets with a small dependency-free tokenizer. */
export function MarkupCode({
  code,
  className,
}: {
  code: string
  className?: string
}) {
  const nodes: ReactNode[] = []
  let cursor = 0

  for (const match of code.matchAll(MARKUP_TOKENS)) {
    const index = match.index ?? 0
    if (index > cursor) nodes.push(code.slice(cursor, index))

    const style = match[1]
      ? "text-zinc-500 italic"
      : match[2]
        ? "text-emerald-600 dark:text-emerald-400"
        : match[3] || match[4]
          ? "text-sky-600 dark:text-sky-400"
          : match[5]
            ? "text-violet-600 dark:text-violet-400"
            : "text-amber-600 dark:text-amber-400"

    nodes.push(
      <span key={index} className={style}>
        {match[0]}
      </span>
    )
    cursor = index + match[0].length
  }

  if (cursor < code.length) nodes.push(code.slice(cursor))

  return <code className={className}>{nodes}</code>
}
