"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Copy, Palette } from "@odiaui/icons-react";
import type { SVGProps } from "react";

function ArrowsDiagonal(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 4h4v4M14 10l6-6M8 20H4v-4M10 14l-6 6" />
    </svg>
  );
}

function Brush(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 3l3 3-12 12-4 1 1-4L18 3zM14 7l3 3" />
      <path d="M3 21c1-4 4-5 7-4" />
    </svg>
  );
}

import { SITE } from "@/data/site";
import { copyText } from "@/lib/clipboard";
import { cn } from "@/lib/utils";
import { iconsByName, toSvg } from "@/lib/icons";
import { ShikiCode } from "@/components/shiki-code";
import { Reveal } from "./reveal";

/* Copy for this section lives here so you don't need to touch SITE data. */
const COPY = {
  eyebrow: "Playground",
  title: "Make every icon fit your brand",
  accent: "— size, stroke and colour in one click.",
};

const BG = "/home-bg.jpeg";
const BG_POS = "52% 72%";

const NAMES = ["home", "search", "message", "lock", "bell"];

const COLORS = [
  { name: "White", value: "#ffffff" },
  { name: "Terracotta", value: "#b4693b" },
  { name: "Forest", value: "#2f6b4f" },
  { name: "Indigo", value: "#8b93e6" },
  { name: "Crimson", value: "#e06b6b" },
];

const FORMATS = ["React", "SVG"] as const;
type Format = (typeof FORMATS)[number];

const pascal = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/* Hairline slider with a filled track and a small round thumb. */
const thumb =
  "[&::-webkit-slider-thumb]:size-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-neutral-900 [&::-webkit-slider-thumb]:bg-[#1f1d1a] [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-runnable-track]:h-0.5 [&::-webkit-slider-thumb]:-mt-[6px] [&::-moz-range-thumb]:size-3.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-neutral-900 [&::-moz-range-thumb]:bg-[#1f1d1a]";

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <input
      type="range"
      aria-label={label}
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className={cn(
        "block h-3.5 w-full cursor-pointer appearance-none rounded-full bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-white/30",
        thumb
      )}
      style={{
        backgroundImage: `linear-gradient(to right, #ffffff ${pct}%, rgba(255,255,255,0.15) ${pct}%)`,
        backgroundSize: "100% 2px",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}

/* One row of the controls list: left line, icon, title, muted description. */
function Control({
  Icon,
  title,
  value,
  description,
  children,
}: {
  Icon: (props: SVGProps<SVGSVGElement>) => ReactNode;
  title: string;
  value?: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="border-l-2 border-white/10 py-4 pl-5 transition-colors duration-300 focus-within:border-[#ffffff]/50 hover:border-white/20">
      <div className="flex items-center gap-3">
        <Icon aria-hidden className="size-5 shrink-0 text-[#ffffff]" stroke="2" />
        <span className="text-base text-[#ffffff] sm:text-lg">{title}</span>
        {value && <span className="ml-auto font-mono text-xs text-neutral-400">{value}</span>}
      </div>
      <p className="mt-1 pl-8 text-sm leading-snug text-neutral-400">{description}</p>
      <div className="mt-3 pl-8">{children}</div>
    </div>
  );
}

export function PlaygroundSection() {
  const names = NAMES.filter((n) => iconsByName[n]);

  const [selected, setSelected] = useState(names[0] ?? NAMES[0]);
  const [size, setSize] = useState(48);
  const stroke = 2;
  const [color, setColor] = useState(COLORS[0].value);
  const [format, setFormat] = useState<Format>("React");
  const [copied, setCopied] = useState(false);

  const component = pascal(selected);

  const svg = (name: string, s: number) =>
    iconsByName[name] ? toSvg(iconsByName[name], { size: s, stroke }) : "";

  const reactCode = `import { ${component} } from "${SITE.npmPackage}"

<${component} size={${size}} strokeWidth={${stroke}} color="${color}" />`;
  const output = format === "React" ? reactCode : svg(selected, size);

  async function copy() {
    const ok = await copyText(output);
    if (!ok) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section
      id="playground"
      className="scroll-mt-20 bg-[#141210] px-4 py-20 text-[#ffffff] sm:px-6 sm:py-28"
    >
      <Reveal className="mx-auto w-full max-w-[1080px]">
        <p className="flex items-center gap-2 text-sm text-neutral-400">
          <span aria-hidden className="size-2 rounded-full bg-[#ffffff]" />
          {COPY.eyebrow}
        </p>
        <h2 className="mt-3 max-w-[640px] text-[clamp(1.75rem,4.2vw,2.5rem)] leading-[1.15] font-medium tracking-tight text-balance">
          <span className="text-[#ffffff]">{COPY.title}</span>{" "}
          <span className="text-neutral-400">{COPY.accent}</span>
        </h2>

        <div className="mt-10 grid items-center gap-8 sm:mt-14 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:gap-0">
          {/* Live preview on your background image */}
          <div className="relative aspect-[1.1/1] w-full overflow-hidden rounded-[4px] bg-neutral-800 sm:aspect-[1.3/1]">
            <Image
              src={BG}
              alt=""
              aria-hidden
              fill
              sizes="(min-width: 768px) 600px, 100vw"
              className="scale-[1.9] object-cover"
              style={{ objectPosition: BG_POS, transformOrigin: BG_POS }}
            />
            <div className="absolute inset-0 bg-[#1f1d1a]/10" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/15" />

            <div className="absolute inset-0 grid place-items-center p-4 sm:p-6">
              <div className="w-full max-w-sm overflow-hidden rounded-xl border border-white/10 bg-[#1f1d1a]/90 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.5)] backdrop-blur-md">
                <div className="grid h-36 place-items-center border-b border-white/10 sm:h-44" aria-live="polite">
                  <span
                    aria-label={`${component} icon preview`}
                    role="img"
                    className="inline-flex transition-colors duration-200"
                    style={{ color }}
                    dangerouslySetInnerHTML={{ __html: svg(selected, size) }}
                  />
                </div>

                <div className="grid grid-cols-5 gap-1.5 p-3">
                  {names.map((n) => {
                    const on = n === selected;
                    return (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setSelected(n)}
                        aria-label={pascal(n)}
                        aria-pressed={on}
                        className={cn(
                          "flex cursor-pointer flex-col items-center gap-1 rounded-lg border py-2 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-white/30",
                          on ? "border-[#ffffff]/50 bg-white/10" : "border-white/10 bg-white/5 hover:bg-white/10"
                        )}
                      >
                        <span
                          className="inline-flex"
                          style={{ color: on ? color : "#a3a3a3" }}
                          dangerouslySetInnerHTML={{ __html: svg(n, 22) }}
                        />
                        <span className="text-[9px] text-neutral-400 sm:text-[10px]">{pascal(n)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Controls, in the same list style as "How it works" */}
          <div className="min-w-0 md:pl-16 lg:pl-24">
            <Control
              Icon={ArrowsDiagonal}
              title="Size"
              value={`${size}px`}
              description="Crisp from 16 to 72 pixels."
            >
              <Slider label="Size" value={size} min={16} max={72} step={2} onChange={setSize} />
            </Control>

            <Control
              Icon={Palette}
              title="Colour"
              description="Inherits currentColor, or pick your own."
            >
              <div className="flex gap-2">
                {COLORS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setColor(c.value)}
                    aria-label={c.name}
                    aria-pressed={c.value === color}
                    className={cn(
                      "size-6 cursor-pointer rounded-full border border-white/10 outline-none transition-transform focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#141210]",
                      c.value === color &&
                      "ring-2 ring-[#ffffff] ring-offset-2 ring-offset-[#141210]"
                    )}
                    style={{ backgroundColor: c.value }}
                  />
                ))}
              </div>
            </Control>

            {/* Output: underline tabs + square icon button */}
            <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-[#1f1d1a]">
              <div className="flex items-center justify-between border-b border-white/10 pr-2 pl-1">
                <div role="tablist" aria-label="Output format" className="flex">
                  {FORMATS.map((f) => {
                    const on = f === format;
                    return (
                      <button
                        key={f}
                        type="button"
                        role="tab"
                        aria-selected={on}
                        onClick={() => setFormat(f)}
                        className={cn(
                          "relative cursor-pointer px-3 py-2.5 text-sm outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-white/30",
                          on ? "text-[#ffffff]" : "text-neutral-400 hover:text-neutral-200"
                        )}
                      >
                        {f}
                        {on && (
                          <span aria-hidden className="absolute inset-x-0 -bottom-px h-0.5 bg-[#ffffff]" />
                        )}
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={copy}
                  aria-label={copied ? "Copied" : "Copy"}
                  className="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-[#1f1d1a] text-neutral-300 outline-none transition-colors hover:bg-white/5 hover:text-[#ffffff] focus-visible:ring-2 focus-visible:ring-white/30"
                >
                  {copied ? <Check aria-hidden className="size-4" /> : <Copy aria-hidden className="size-4" />}
                </button>
              </div>
              <pre className="m-0 max-h-36 overflow-auto p-3 font-mono text-[12px] leading-relaxed break-all whitespace-pre-wrap text-neutral-300 sm:text-[13px]">
                <ShikiCode code={output} lang={format === "React" ? "jsx" : "xml"} />
              </pre>
            </div>

            <Link
              href={SITE.links.icons}
              className="group/cta mt-6 inline-flex h-10 items-center gap-2 rounded-full border border-white/10 bg-[#1f1d1a] px-5 text-sm font-medium text-[#ffffff] shadow-sm transition-colors hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Browse all Odisha icons
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-300 group-hover/cta:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
