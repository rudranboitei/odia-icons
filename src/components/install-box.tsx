"use client"

import { useState } from "react"
import { IconCheck, IconCopy } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { copyText } from "@/lib/clipboard"
import { siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"

// The core conversion component: a copyable install command.
export function InstallBox({
  className,
  id,
}: {
  className?: string
  id?: string
}) {
  const { command, helper } = siteConfig.install
  const [copied, setCopied] = useState(false)

  async function copy() {
    const ok = await copyText(command)
    if (!ok) {
      toast.add({
        type: "error",
        title: "Could not copy",
        description: "Your browser blocked clipboard access.",
        timeout: 3000,
      })
      return
    }

    setCopied(true)
    toast.add({
      type: "success",
      title: "Command copied",
      description: command,
      timeout: 2500,
    })
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      id={id}
      className={cn("flex w-full max-w-lg flex-col items-center", className)}
    >
      <div className="flex w-full items-center gap-2 rounded-xl border border-border bg-muted p-1.5 pl-4">
        <span className="text-sm text-muted-foreground select-none">$</span>
        <code className="min-w-0 flex-1 truncate text-left font-mono text-sm text-foreground">
          {command}
        </code>
        <Button
          size="lg"
          onClick={copy}
          className="h-10 px-4 cursor-pointer"
        >
          {copied ? (
            <IconCheck data-icon="inline-start" />
          ) : (
            <IconCopy data-icon="inline-start" />
          )}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <p className="mt-2 text-[13px] leading-[1.2] tracking-[-0.03em] text-muted-foreground">{helper}</p>
    </div>
  )
}
