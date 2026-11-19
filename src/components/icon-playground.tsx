"use client"

import { useState } from "react"
import { IconCopy, IconDownload } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/toast"
import { copyText } from "@/lib/clipboard"
import { formats, Icon, type IconDef } from "@/lib/icons"

type FormatId = (typeof formats)[number]["id"]

const extensions: Record<FormatId, string> = {
  svg: "svg",
  jsx: "jsx",
  tsx: "tsx",
  uri: "txt",
}

export function IconPlayground({ def }: { def: IconDef }) {
  const [size, setSize] = useState(112)
  const [stroke, setStroke] = useState(1.4)
  const [formatId, setFormatId] = useState<FormatId>("svg")

  const opts = { size, stroke }
  const format = formats.find((f) => f.id === formatId) ?? formats[0]
  const code = format.run(def, opts)
  const fileName =
    "file" in format && format.file
      ? format.file(def)
      : `${def.name}.${extensions[format.id]}`

  async function copy() {
    const copied = await copyText(code)
    if (copied) {
      toast.add({
        type: "success",
        title: "Copied to clipboard",
        description: `${def.name} · ${format.label}`,
        timeout: 2500,
      })
    } else {
      toast.add({
        type: "error",
        title: "Could not copy",
        description: "Your browser blocked clipboard access.",
        timeout: 3000,
      })
    }
  }

  function download() {
    const type = format.id === "svg" ? "image/svg+xml" : "text/plain"
    const url = URL.createObjectURL(new Blob([code], { type: `${type};charset=utf-8` }))
    const a = document.createElement("a")
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
    toast.add({
      type: "success",
      title: "Download started",
      description: fileName,
      timeout: 2500,
    })
  }

  return (
    <div className="flex flex-col gap-5">
      <DialogTitle className="sr-only">{def.name} icon</DialogTitle>

      <div className="grid gap-5 sm:grid-cols-[1.1fr_1fr]">
        <div className="flex min-h-44 items-center justify-center rounded-2xl border border-dashed bg-muted/40 p-6">
          <Icon def={def} size={size} stroke={stroke} className="text-[#171717]" />
        </div>

        <div className="flex flex-col justify-center gap-5">
          <div>
            <h3 className="text-base font-medium capitalize text-[#171717]">
              {def.name}
            </h3>
            <DialogDescription>
              {def.tags.join(" · ")} — tweak it, then copy or download.
            </DialogDescription>
          </div>

          <label className="flex flex-col gap-2">
            <span className="flex items-baseline justify-between text-xs text-muted-foreground">
              Size
              <span className="tabular-nums">{size}px</span>
            </span>
            <Slider
              value={[size]}
              onValueChange={(v) => setSize(Array.isArray(v) ? v[0] : v)}
              min={16}
              max={200}
              step={2}
              aria-label="Icon size"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="flex items-baseline justify-between text-xs text-muted-foreground">
              Stroke
              <span className="tabular-nums">{stroke.toFixed(1)}</span>
            </span>
            <Slider
              value={[stroke]}
              onValueChange={(v) => setStroke(Array.isArray(v) ? v[0] : v)}
              min={0.5}
              max={3}
              step={0.1}
              aria-label="Icon stroke width"
            />
          </label>
        </div>
      </div>

      <Tabs
        value={formatId}
        onValueChange={(value) => setFormatId(value as FormatId)}
      >
        <TabsList className="w-full">
          {formats.map((f) => (
            <TabsTrigger key={f.id} value={f.id}>
              {f.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {formats.map((f) => (
          <TabsContent key={f.id} value={f.id}>
            <pre className="mt-2 max-h-52 overflow-auto rounded-2xl bg-muted p-4 text-xs leading-relaxed whitespace-pre">
              <code>{f.run(def, opts)}</code>
            </pre>
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex flex-wrap justify-end gap-2">
        <Button variant="outline" onClick={copy}>
          <IconCopy data-icon="inline-start" />
          Copy
        </Button>
        <Button onClick={download}>
          <IconDownload data-icon="inline-start" />
          Download
        </Button>
      </div>
    </div>
  )
}
