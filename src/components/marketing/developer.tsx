"use client";

import { useState } from "react";
import { IconCheck, IconCopy } from "@tabler/icons-react";

import { SITE } from "@/data/site";
import { copyText } from "@/lib/clipboard";
import { iconsByName, toSvg } from "@/lib/icons";
import { InstallBox } from "./install-box";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";
import { ShikiCode } from "@/components/shiki-code";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    const ok = await copyText(text);
    if (!ok) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : "Copy code"}
      className="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors outline-none hover:bg-white/[0.06] hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
    >
      {copied ? (
        <IconCheck aria-hidden className="size-4 text-primary" />
      ) : (
        <IconCopy aria-hidden className="size-4" />
      )}
    </button>
  );
}

export function DeveloperSection() {
  const { developer } = SITE;
  const snippet = toSvg(iconsByName["konark-wheel"], { size: 32, stroke: 1.75 });

  return (
    <section id="developers" className="scroll-mt-20 px-5 py-14 sm:px-6 sm:py-16 lg:py-20">
      {/* minmax(0, 1fr) + min-w-0 keep long code from stretching the layout */}
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
        <Reveal className="min-w-0">
          <SectionHeader
            align="left"
            eyebrow={developer.eyebrow}
            title={developer.title}
            accent={developer.highlight}
            description={developer.description}
            className="max-w-xl"
          />

          <ul className="mt-6 space-y-3 sm:mt-8">
            {developer.bullets.map((bullet: string) => (
              <li
                key={bullet}
                className="flex items-start gap-3 text-[15px] leading-relaxed text-muted-foreground"
              >
                <IconCheck
                  aria-hidden
                  className="mt-1 size-4 shrink-0 text-primary"
                  stroke={2.5}
                />
                {bullet}
              </li>
            ))}
          </ul>

          <InstallBox className="mt-8 items-stretch sm:mt-10 lg:items-start" />
        </Reveal>

        <Reveal delay={0.1} className="min-w-0">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-card sm:rounded-3xl">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 py-2 pr-2 pl-4 sm:pl-5">
              <span className="min-w-0 truncate font-mono text-xs text-muted-foreground">
                {developer.code.fileName}
              </span>
              <div className="flex shrink-0 items-center gap-1">
                <span className="rounded-md bg-white/[0.05] px-2 py-1 font-mono text-[11px] text-muted-foreground">
                  {developer.code.grid}
                </span>
                <CopyButton text={snippet} />
              </div>
            </div>

            {/* Wraps instead of scrolling, so there is never a scrollbar */}
            <pre className="m-0 p-4 font-mono text-[12px] leading-[1.7] break-words whitespace-pre-wrap text-foreground sm:p-5 sm:text-[13px] [&_*]:whitespace-pre-wrap [&_*]:[overflow-wrap:anywhere]">
              <ShikiCode code={snippet} lang="xml" />
            </pre>

            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-white/10 px-4 py-2.5 text-xs text-muted-foreground sm:px-5">
              <span>{developer.code.license}</span>
              <span className="font-mono">{developer.code.spec}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
  