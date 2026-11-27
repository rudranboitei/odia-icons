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

const BG = "/hero-bg.webp";
const BG_POS = ["14% 64%", "52% 72%", "90% 68%"];
const STEP_ICONS = [IconPackage, IconCode, IconCheck];

/** Small square icon button under the glass card. */
const btn =
  "inline-flex size-10 cursor-pointer items-center justify-center rounded-lg border border-black/10 bg-white/85 text-neutral-700 shadow-sm backdrop-blur-md transition-colors outline-none hover:bg-white hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-black/40";

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
      className="scroll-mt-20 bg-[#f6f4f0] px-4 py-16 text-neutral-900 sm:px-6 sm:py-24"
    >
      <Reveal className="mx-auto w-full max-w-[1080px]">
        {/* Eyebrow + two-tone heading */}
        <p className="flex items-center gap-2 text-sm text-neutral-500">
          <span aria-hidden className="size-2 rounded-full bg-neutral-400" />
          {developer.eyebrow}
        </p>
        <h2 className="mt-3 max-w-[640px] text-[clamp(1.75rem,4.2vw,2.5rem)] leading-[1.15] font-medium tracking-tight text-balance">
          <span className="text-neutral-900">{developer.title}</span>{" "}
          <span className="text-neutral-400">{developer.highlight}</span>
        </h2>

        <div className="mt-10 grid items-center gap-8 sm:mt-14 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:gap-0">
          {/* Image + glass card */}
          <div className="relative aspect-[1.1/1] w-full overflow-hidden rounded-[4px] bg-neutral-200 sm:aspect-[1.3/1]">
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
            <div className="absolute inset-0 bg-white/10" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/15" />

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 sm:p-6">
              <div className="w-full max-w-sm overflow-hidden rounded-xl border border-white/60 bg-white/80 shadow-[0_24px_50px_-20px_rgba(70,40,15,0.35)] backdrop-blur-md">
                <div className="flex items-center justify-between gap-3 border-b border-black/10 px-4 py-2.5">
                  <span className="min-w-0 truncate font-mono text-xs text-neutral-600">
                    {developer.code.fileName}
                  </span>
                  <span className="shrink-0 rounded-md bg-black/5 px-2 py-0.5 font-mono text-[11px] text-neutral-600">
                    {developer.code.grid}
                  </span>
                </div>

                {/* Wraps instead of scrolling */}
                <pre className="m-0 p-4 font-mono text-[11px] leading-[1.7] break-words whitespace-pre-wrap text-neutral-800 sm:text-xs [&_*]:whitespace-pre-wrap [&_*]:[overflow-wrap:anywhere]">
                  <ShikiCode code={snippet} lang="xml" />
                </pre>

                <div className="flex items-center justify-between gap-3 border-t border-black/10 px-4 py-2 text-[11px] text-neutral-600">
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
                        "flex w-full cursor-pointer items-start gap-3 border-l-2 py-4 pl-5 text-left outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-black/40",
                        on ? "border-neutral-900" : "border-black/10 hover:border-black/30"
                      )}
                    >
                      <Icon
                        aria-hidden
                        className={cn("mt-0.5 size-5 shrink-0", on ? "text-neutral-900" : "text-neutral-500")}
                      />
                      <span
                        className={cn(
                          "text-base leading-snug sm:text-lg",
                          on ? "text-neutral-900" : "text-neutral-500"
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
