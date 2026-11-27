"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IconCheck,
  IconCode,
  IconCopy,
  IconDownload,
  IconExternalLink,
  IconPackage,
} from "@tabler/icons-react";

import { SITE } from "@/data/site";
import { copyText } from "@/lib/clipboard";
import { cn } from "@/lib/utils";
import { iconsByName, toSvg } from "@/lib/icons";
import { InstallBox } from "./install-box";
import { Reveal } from "./reveal";
import { ShikiCode } from "@/components/shiki-code";

const BG = "/home-bg.jpeg";
const BG_POS = ["14% 64%", "52% 72%", "90% 68%"];
const STEP_ICONS = [IconPackage, IconCode, IconCheck];

/** Small square icon button under the glass card. */
const btn =
  "inline-flex size-10 cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-black/40 text-neutral-200 shadow-sm backdrop-blur-md transition-colors outline-none hover:bg-black/55 hover:text-white focus-visible:ring-2 focus-visible:ring-white/30";

export function DeveloperSection() {
  const { developer } = SITE;
  const snippet = toSvg(iconsByName["home"], { size: 32, stroke: 2 });

  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  async function copy() {
    const ok = await copyText(snippet);
    if (!ok) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function download() {
    const url = URL.createObjectURL(new Blob([snippet], { type: "image/svg+xml" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "home.svg";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section
      id="developers"
      className="scroll-mt-20 bg-[#141210] px-4 py-16 text-white sm:px-6 sm:py-24"
    >
      <Reveal className="mx-auto w-full max-w-[1080px]">
        {/* Eyebrow + two-tone heading */}
        <p className="flex items-center gap-2 text-sm text-neutral-400">
          <span aria-hidden className="size-2 rounded-full bg-white" />
          {developer.eyebrow}
        </p>
        <h2 className="mt-3 max-w-[640px] text-[clamp(1.75rem,4.2vw,2.5rem)] leading-[1.15] font-medium tracking-tight text-balance">
          <span className="text-neutral-900">{developer.title}</span>{" "}
          <span className="text-neutral-400">{developer.highlight}</span>
        </h2>

        <div className="mt-10 grid items-center gap-8 sm:mt-14 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:gap-0">
          {/* Image + glass card */}
          <div className="relative aspect-[1.1/1] w-full overflow-hidden rounded-[4px] bg-neutral-800 sm:aspect-[1.3/1]">
            <Image
              src={BG}
              alt=""
              aria-hidden
              fill
              sizes="(min-width: 768px) 600px, 100vw"
              className="scale-[1.9] object-cover transition-all duration-500"
              style={{
                objectPosition: BG_POS[active % BG_POS.length],
                transformOrigin: BG_POS[active % BG_POS.length],
              }}
            />
            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/35" />

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 sm:p-6">
              <div className="w-full max-w-sm overflow-hidden rounded-xl border border-white/10 bg-[#1f1d1a]/90 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.45)] backdrop-blur-md">
                <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
                  <span className="min-w-0 truncate font-mono text-xs text-neutral-400">
                    {developer.code.fileName}
                  </span>
                  <span className="shrink-0 rounded-md bg-white/10 px-2 py-0.5 font-mono text-[11px] text-neutral-300">
                    {developer.code.grid}
                  </span>
                </div>

                {/* Wraps instead of scrolling */}
                <pre className="m-0 p-4 font-mono text-[11px] leading-[1.7] break-words whitespace-pre-wrap text-neutral-200 sm:text-xs [&_*]:whitespace-pre-wrap [&_*]:[overflow-wrap:anywhere]">
                  <ShikiCode code={snippet} lang="xml" />
                </pre>

                <div className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-2 text-[11px] text-neutral-400">
                  <span>{developer.code.license}</span>
                  <span className="font-mono">{developer.code.spec}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button type="button" onClick={copy} aria-label={copied ? "Copied" : "Copy SVG"} className={btn}>
                  {copied ? <IconCheck aria-hidden className="size-4" /> : <IconCopy aria-hidden className="size-4" />}
                </button>
                <button type="button" onClick={download} aria-label="Download SVG" className={btn}>
                  <IconDownload aria-hidden className="size-4" />
                </button>
                <Link href={SITE.links.icons} aria-label="Browse all icons" className={btn}>
                  <IconExternalLink aria-hidden className="size-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Steps list */}
          <div className="min-w-0 md:pl-16 lg:pl-24">
            <ul>
              {developer.bullets.map((bullet: string, i: number) => {
                const on = i === active;
                const Icon = STEP_ICONS[i % STEP_ICONS.length];
                return (
                  <li key={bullet}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-current={on}
                      className={cn(
                        "flex w-full cursor-pointer items-start gap-3 border-l-2 py-4 pl-5 text-left outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-white/30",
                        on ? "border-white" : "border-white/10 hover:border-white/30"
                      )}
                    >
                      <Icon
                        aria-hidden
                        className={cn("mt-0.5 size-5 shrink-0", on ? "text-white" : "text-neutral-400")}
                      />
                      <span
                        className={cn(
                          "text-base leading-snug sm:text-lg",
                          on ? "text-white" : "text-neutral-400"
                        )}
                      >
                        {bullet}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <InstallBox className="mt-8 items-stretch lg:items-start" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
