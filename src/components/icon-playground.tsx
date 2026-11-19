"use client"

import { useState } from "react"
import { IconCopy, IconDownload } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { SheetDescription, SheetTitle } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/toast"
import { copyText } from "@/lib/clipboard"
import { formats, Icon, toSvg, type IconDef } from "@/lib/icons"

type FormatId = (typeof formats)[number]["id"]

const extensions: Record<FormatId, string> = {
  svg: "svg",
  jsx: "jsx",
  tsx: "tsx",
  import: "tsx",
  uri: "txt",
}

const previewSizes = [16, 24, 32, 48]

function saveBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export function IconPlayground({ def }: { def: IconDef }) {
  const [size, setSize] = useState(112)
  const [stroke, setStroke] = useState(1.75)
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
    saveBlob(new Blob([code], { type: `${type};charset=utf-8` }), fileName)
    toast.add({
      type: "success",
      title: "Download started",
      description: fileName,
      timeout: 2500,
    })
  }

  function downloadPng() {
    const svg = toSvg(def, { size, stroke })
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }))
    const image = new Image()

    image.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = size
      canvas.height = size
      const context = canvas.getContext("2d")
      if (context) context.drawImage(image, 0, 0, size, size)
      URL.revokeObjectURL(url)
      canvas.toBlob((blob) => {
        if (!blob) return
        const pngName = `${def.name}-${size}px.png`
        saveBlob(blob, pngName)
        toast.add({
          type: "success",
          title: "Download started",
          description: pngName,
          timeout: 2500,
        })
      }, "image/png")
    }

    image.onerror = () => {
      URL.revokeObjectURL(url)
      toast.add({
        type: "error",
        title: "Could not export PNG",
        description: "Try the SVG export instead.",
        timeout: 3000,
      })
    }

    image.src = url
  }

  return (
    <div className="flex min-w-0 flex-col gap-5">
      <SheetTitle className="sr-only">{def.name} icon</SheetTitle>

      <div className="grid gap-5 sm:grid-cols-[1.1fr_1fr]">
        <div className="flex min-h-44 items-center justify-center rounded-2xl border border-dashed bg-muted/40 p-6">
          <Icon def={def} size={size} stroke={stroke} className="text-foreground" />
        </div>

        <div className="flex flex-col justify-center gap-5">
          <div>
            <h3 className="text-[21px] leading-[1.4] font-medium capitalize tracking-[-0.03em] text-foreground">
              {def.name.replaceAll("-", " ")}
            </h3>
            <p className="mt-0.5 text-[13px] leading-[1.2] tracking-[-0.03em] text-foreground opacity-55">
              {def.odia} · {def.category} · {def.variants.join(", ")} · since{" "}
              {def.since}
            </p>
            <SheetDescription className="mt-2 text-[15px] leading-[1.3] font-medium tracking-[-0.03em] text-foreground opacity-80">
              {def.tags.join(" · ")} — tweak it, then copy or download.
            </SheetDescription>
          </div>

          <label className="flex flex-col gap-2">
            <span className="flex items-baseline justify-between text-[13px] leading-[1.2] tracking-[-0.03em] text-foreground opacity-55">
              Size
              <span className="tabular-nums">{size}px</span>
            </span>
            <Slider
              value={[size]}
              onValueChange={(v) => setSize(Array.isArray(v) ? v[0] : v)}
              min={12}
              max={128}
              step={2}
              aria-label="Icon size"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="flex items-baseline justify-between text-[13px] leading-[1.2] tracking-[-0.03em] text-foreground opacity-55">
              Stroke
              <span className="tabular-nums">{stroke.toFixed(2)}</span>
            </span>
            <Slider
              value={[stroke]}
              onValueChange={(v) => setStroke(Array.isArray(v) ? v[0] : v)}
              min={0.5}
              max={3}
              step={0.05}
              aria-label="Icon stroke width"
            />
          </label>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border-black/10 bg-white p-4 text-[#171717]">
          <p className="text-[13px] leading-[1.2] tracking-[-0.03em] text-[#171717]/55">
            On light
          </p>
          <div className="mt-3 flex items-end justify-between px-1">
            {previewSizes.map((previewSize) => (
              <Icon key={previewSize} def={def} size={previewSize} stroke={1.75} />
            ))}
          </div>
        </div>
        <div className="rounded-2xl border bg-[#111111] p-4">
          <p className="text-[13px] leading-[1.2] tracking-[-0.03em] text-white/55">
            On dark
          </p>
          <div className="mt-3 flex items-end justify-between px-1 text-white">
            {previewSizes.map((previewSize) => (
              <Icon key={previewSize} def={def} size={previewSize} stroke={1.75} />
            ))}
          </div>
        </div>
      </div>

      {def.note && (
        <p className="rounded-2xl border bg-muted/40 px-4 py-3 text-[13px] leading-[1.4] tracking-[-0.03em] text-foreground opacity-80">
          {def.note}
        </p>
      )}

      <Tabs
        value={formatId}
        onValueChange={(value) => setFormatId(value as FormatId)}
        className="min-w-0"
      >
        <TabsList className="w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {formats.map((f) => (
            <TabsTrigger key={f.id} value={f.id} className="min-w-fit flex-none px-2 text-[13px]">
              {f.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {formats.map((f) => (
          <TabsContent key={f.id} value={f.id}>
            <pre className="mt-2 max-h-52 w-full min-w-0 overflow-auto rounded-2xl bg-muted p-4 text-xs leading-relaxed whitespace-pre [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
        <Button variant="outline" onClick={downloadPng}>
          <IconDownload data-icon="inline-start" />
          PNG
        </Button>
        <Button onClick={download}>
          <IconDownload data-icon="inline-start" />
          Download
        </Button>
      </div>
    </div>
  )
}
