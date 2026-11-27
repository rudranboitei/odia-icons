"use client"

import { useState, type ReactNode } from "react"
import Link from "next/link"
import { Instrument_Serif } from "next/font/google"
import { IconCheck, IconCopy, IconPackage } from "@tabler/icons-react"

import { ShikiCode } from "@/components/shiki-code"
import { SITE } from "@/data/site"
import { copyText } from "@/lib/clipboard"
import { ICON_COUNT } from "@/lib/icons.generated"

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400" })

const PKG = SITE.npmPackage
const SITE_URL = SITE.siteUrl

const MANAGERS = [
  { name: "npm", command: `npm install ${PKG}` },
  { name: "pnpm", command: `pnpm add ${PKG}` },
  { name: "yarn", command: `yarn add ${PKG}` },
  { name: "bun", command: `bun add ${PKG}` },
]

const USAGE = `import { Home } from "${PKG}"

export function Example() {
  return <Home size={32} />
}`

const STYLING = `import { Temple, KonarkWheel } from "${PKG}"

export function Example() {
  return (
    <div className="flex gap-4 text-orange-500">
      <Temple />
      <KonarkWheel size={40} strokeWidth={1.5} />
    </div>
  )
}`

const ACCESSIBLE = `import { Search } from "${PKG}"

export function SearchButton() {
  return (
    <button type="button" aria-label="Search">
      <Search aria-hidden="true" />
    </button>
  )
}`

const ALIAS = `import Link from "next/link"
import { Link as LinkIcon } from "${PKG}"`

const SPRITE = `<svg width="24" height="24" aria-hidden="true">
  <use href="/odiaicons-sprite.svg#odiaicons-home" />
</svg>`

const SHADCN = `npx shadcn@latest add ${SITE_URL}/r/home.json`

const PROPS = [
  { name: "size", type: "number | string", value: "24", note: "Width and height" },
  { name: "color", type: "string", value: "currentColor", note: "Icon colour" },
  { name: "strokeWidth", type: "number | string", value: "2", note: "Line thickness" },
  { name: "className", type: "string", value: "none", note: "CSS classes" },
]

const linkClass = "text-white underline underline-offset-4 hover:text-neutral-300"

function CodeBlock({
  code,
  lang,
  label,
}: {
  code: string
  lang: "bash" | "xml" | "jsx"
  label: ReactNode
}) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    const ok = await copyText(code)
    if (!ok) return
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-black/40">
      <div className="flex min-h-11 items-center justify-between gap-3 border-b border-white/10 py-1.5 pr-2 pl-4">
        <div className="text-[13px] text-neutral-500">{label}</div>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Copied" : "Copy code"}
          className="flex h-8 cursor-pointer items-center gap-1.5 rounded-lg px-2.5 text-[13px] text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          {copied ? (
            <IconCheck aria-hidden className="size-3.5" />
          ) : (
            <IconCopy aria-hidden className="size-3.5" />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-[1.7] text-neutral-200">
        <ShikiCode code={code} lang={lang} className="font-mono whitespace-pre" />
      </pre>
    </div>
  )
}

/** The install command, with a tab for each package manager. */
function PackageTabs() {
  const [active, setActive] = useState(MANAGERS[0])

  return (
    <CodeBlock
      code={active.command}
      lang="bash"
      label={
        <div role="group" aria-label="Package manager" className="-ml-2 flex gap-1">
          {MANAGERS.map((m) => (
            <button
              key={m.name}
              type="button"
              aria-pressed={m.name === active.name}
              onClick={() => setActive(m)}
              className={`cursor-pointer rounded-md px-2.5 py-1 transition-colors ${m.name === active.name
                ? "bg-white text-black"
                : "text-neutral-400 hover:text-white"
                }`}
            >
              {m.name}
            </button>
          ))}
        </div>
      }
    />
  )
}

function Section({
  id,
  heading,
  children,
}: {
  id: string
  heading: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-[17px] font-semibold tracking-tight text-white">{heading}</h2>
      <div className="mt-3 flex flex-col gap-4 text-[15.5px] leading-[1.75] text-neutral-400">
        {children}
      </div>
    </section>
  )
}

export function InstallationGuide() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#141210] px-4 pt-32 pb-16 text-center sm:px-6 sm:pt-40 sm:pb-20">
        <div className="mx-auto flex w-full max-w-[760px] flex-col items-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3.5 py-1.5 text-[12px] font-medium tracking-wide text-neutral-200 uppercase shadow-sm backdrop-blur">
            <span aria-hidden className="size-1.5 rounded-full bg-white" />
            Docs
          </span>

          <h1 className="mt-6 text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.02] font-semibold tracking-tight text-balance text-white">
            Install{" "}
            <span className={`${serif.className} font-normal tracking-[-0.03em] text-neutral-500`}>
              {SITE.name}.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-balance text-neutral-400 sm:text-lg">
            Add Odisha icons to your project in a minute, as React components or plain SVG.
          </p>

          <span className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[13px] text-neutral-400 backdrop-blur">
            <IconPackage aria-hidden className="size-3.5" stroke={1.5} />
            {ICON_COUNT} icons · MIT licensed
          </span>
        </div>

        {/* Thin arch, like the fade into the content below */}
        <svg
          aria-hidden
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20 w-full text-white/[0.06] sm:h-28"
        >
          <path d="M0 120 C 480 0, 960 0, 1440 120" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </section>

      <article className="bg-[#141210] px-4 pb-20 text-white sm:px-6 sm:pb-28">
        <div className="mx-auto flex w-full max-w-[640px] min-w-0 flex-col gap-12">
          <Section id="install" heading="Install the package">
            <p>For React 18 or newer. TypeScript types are included.</p>
            <PackageTabs />
          </Section>

          <Section id="usage" heading="Use an icon">
            <p>
              Import icons by name. Names are the PascalCase form of the file name, so{" "}
              <code className="text-neutral-200">konark-wheel</code> becomes{" "}
              <code className="text-neutral-200">KonarkWheel</code>.
            </p>
            <CodeBlock code={USAGE} lang="jsx" label="Example.tsx" />
          </Section>

          <Section id="styling" heading="Change size and colour">
            <p>
              Icons use <code className="text-neutral-200">currentColor</code>, so they follow your
              text colour. You only ship the icons you import.
            </p>
            <CodeBlock code={STYLING} lang="jsx" label="Example.tsx" />
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full min-w-[480px] text-left text-[13.5px] text-neutral-400">
                <thead className="text-neutral-200">
                  <tr className="border-b border-white/10">
                    {["Prop", "Type", "Default", "Use"].map((h) => (
                      <th key={h} scope="col" className="px-4 py-2.5 font-medium">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PROPS.map((p) => (
                    <tr key={p.name} className="border-b border-white/5 last:border-0">
                      <td className="px-4 py-2.5 font-mono text-neutral-200">{p.name}</td>
                      <td className="px-4 py-2.5 font-mono">{p.type}</td>
                      <td className="px-4 py-2.5 font-mono">{p.value}</td>
                      <td className="px-4 py-2.5">{p.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>Any other SVG attribute or event handler works too, and refs are forwarded.</p>
          </Section>

          <Section id="accessibility" heading="Accessibility">
            <p>
              Hide decorative icons from screen readers. For icon-only buttons, put the label on the
              button.
            </p>
            <CodeBlock code={ACCESSIBLE} lang="jsx" label="SearchButton.tsx" />
          </Section>

          <Section id="svg" heading="Use plain SVG">
            <p>
              No React needed. Open any icon in the{" "}
              <Link href="/icons" className={linkClass}>
                icon browser
              </Link>{" "}
              to copy or download it. Each icon also has a direct file URL, such as{" "}
              <a href="/svg/outline/home.svg" className={`${linkClass} break-all`}>
                {SITE_URL}/svg/outline/home.svg
              </a>
              .
            </p>
            <p>
              To use many icons from one file, download the{" "}
              <a href="/odiaicons-sprite.svg" download className={linkClass}>
                SVG sprite
              </a>
              , put it in your public folder and reference an icon by its ID.
            </p>
            <CodeBlock code={SPRITE} lang="xml" label="index.html" />
          </Section>

          <Section id="shadcn" heading="Add one icon with shadcn">
            <p>
              In a project set up with shadcn, this adds the SVG file to{" "}
              <code className="text-neutral-200">components/icons</code>. Swap{" "}
              <code className="text-neutral-200">home</code> for any icon name.
            </p>
            <CodeBlock code={SHADCN} lang="bash" label="Terminal" />
          </Section>

          <Section id="troubleshooting" heading="Name clashes">
            <p>
              Some icon names, such as <code className="text-neutral-200">Link</code> and{" "}
              <code className="text-neutral-200">Image</code>, match common components. Rename them
              when you import.
            </p>
            <CodeBlock code={ALIAS} lang="jsx" label="Example.tsx" />
          </Section>

          <Section id="help" heading="Need help?">
            <p>
              <a href={SITE.links.contribute} target="_blank" rel="noopener noreferrer" className={linkClass}>
                Open an issue on GitHub
              </a>{" "}
              to report a problem or request an icon.
            </p>
          </Section>
        </div>
      </article>
    </>
  )
}
