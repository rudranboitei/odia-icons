"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IconArrowRight,
  IconArrowsDiagonal,
  IconBrush,
  IconCheck,
  IconCopy,
  IconPalette,
} from "@tabler/icons-react";

import { SITE } from "@/data/site";
import { copyText } from "@/lib/clipboard";
import { cn } from "@/lib/utils";
import { iconsByName, toSvg } from "@/lib/icons";
import { Reveal } from "./reveal";

/* Copy for this section lives here so you don't need to touch SITE data. */
const COPY = {
  eyebrow: "Playground",
  title: "Make every icon fit your brand",
  accent: "— size, stroke and colour in one click.",
};

const BG = "/hero-bg.webp";
const BG_POS = "52% 72%";

const NAMES = ["home", "search", "message", "lock", "bell"];

const COLORS = [
  { name: "Ink", value: "#171717" },
  { name: "Terracotta", value: "#b4693b" },
  { name: "Forest", value: "#2f6b4f" },
  { name: "Indigo", value: "#3b4cb4" },
  { name: "Crimson", value: "#b4333b" },
];

const FORMATS = ["React", "SVG"] as const;
type Format = (typeof FORMATS)[number];

const pascal = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/* Hairline slider with a filled track and a small round thumb. */
const thumb =
  "[&::-webkit-slider-thumb]:size-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-neutral-900 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-runnable-track]:h-0.5 [&::-webkit-slider-thumb]:-mt-[6px] [&::-moz-range-thumb]:size-3.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-neutral-900 [&::-moz-range-thumb]:bg-white";

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
        "block h-3.5 w-full cursor-pointer appearance-none rounded-full bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-black/40",
        thumb
      )}
      style={{
        backgroundImage: `linear-gradient(to right, #171717 ${pct}%, rgba(0,0,0,0.15) ${pct}%)`,
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
  Icon: typeof IconBrush;
  title: string;
  value?: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="border-l-2 border-black/10 py-4 pl-5 transition-colors duration-300 focus-within:border-neutral-900 hover:border-black/30">
      <div className="flex items-center gap-3">
        <Icon aria-hidden className="size-5 shrink-0 text-neutral-900" stroke={2} />
        <span className="text-base text-neutral-900 sm:text-lg">{title}</span>
        {value && <span className="ml-auto font-mono text-xs text-neutral-500">{value}</span>}
      </div>
      <p className="mt-1 pl-8 text-sm leading-snug text-neutral-500">{description}</p>
      <div className="mt-3 pl-8">{children}</div>
    </div>
  );
}

export function PlaygroundSection() {
  const names = NAMES.filter((n) => iconsByName[n]);

  const [selected, setSelected] = useState(names[0] ?? NAMES[0]);
  const [size, setSize] = useState(48);
  const [stroke, setStroke] = useState(2);
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
      className="scroll-mt-20 bg-[#f6f4f0] px-4 py-16 text-neutral-900 sm:px-6 sm:py-24"
    >
      <Reveal className="mx-auto w-full max-w-[1080px]">
        <p className="flex items-center gap-2 text-sm text-neutral-500">
          <span aria-hidden className="size-2 rounded-full bg-neutral-400" />
          {COPY.eyebrow}
        </p>
        <h2 className="mt-3 max-w-[640px] text-[clamp(1.75rem,4.2vw,2.5rem)] leading-[1.15] font-medium tracking-tight text-balance">
          <span className="text-neutral-900">{COPY.title}</span>{" "}
          <span className="text-neutral-400">{COPY.accent}</span>
        </h2>

        <div className="mt-10 grid items-center gap-8 sm:mt-14 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:gap-0">
          {/* Live preview on your background image */}
          <div className="relative aspect-[1.1/1] w-full overflow-hidden rounded-[4px] bg-neutral-200 sm:aspect-[1.3/1]">
            <Image
              src={BG}
              alt=""
              aria-hidden
              fill
              sizes="(min-width: 768px) 600px, 100vw"
              className="scale-[1.9] object-cover"
              style={{ objectPosition: BG_POS, transformOrigin: BG_POS }}
            />
            <div className="absolute inset-0 bg-white/10" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/15" />

            <div className="absolute inset-0 grid place-items-center p-4 sm:p-6">
              <div className="w-full max-w-sm overflow-hidden rounded-xl border border-white/60 bg-white/85 shadow-[0_24px_50px_-20px_rgba(70,40,15,0.35)] backdrop-blur-md">
                <div className="grid h-36 place-items-center border-b border-black/10 sm:h-44" aria-live="polite">
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
                          "flex cursor-pointer flex-col items-center gap-1 rounded-lg border py-2 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-black/40",
                          on ? "border-neutral-900 bg-white" : "border-black/10 bg-white/60 hover:bg-white"
                        )}
                      >
                        <span
                          className="inline-flex"
                          style={{ color: on ? color : "#525252" }}
                          dangerouslySetInnerHTML={{ __html: svg(n, 22) }}
                        />
                        <span className="text-[9px] text-neutral-500 sm:text-[10px]">{pascal(n)}</span>
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
              Icon={IconArrowsDiagonal}
              title="Size"
              value={`${size}px`}
              description="Crisp from 16 to 72 pixels."
            >
              <Slider label="Size" value={size} min={16} max={72} step={2} onChange={setSize} />
            </Control>

            <Control
              Icon={IconBrush}
              title="Stroke"
              value={String(stroke)}
              description="Match the weight of your type."
            >
              <Slider label="Stroke" value={stroke} min={1} max={2.5} step={0.25} onChange={setStroke} />
            </Control>

            <Control
              Icon={IconPalette}
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
                      "size-6 cursor-pointer rounded-full border border-black/10 outline-none transition-transform focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f4f0]",
                      c.value === color &&
                      "ring-2 ring-neutral-900 ring-offset-2 ring-offset-[#f6f4f0]"
                    )}
                    style={{ backgroundColor: c.value }}
                  />
                ))}
              </div>
            </Control>

            {/* Output: underline tabs + square icon button */}
            <div className="mt-4 overflow-hidden rounded-xl border border-black/10 bg-white">
              <div className="flex items-center justify-between border-b border-black/10 pr-2 pl-1">
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
                          "relative cursor-pointer px-3 py-2.5 text-sm outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-black/40",
                          on ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-800"
                        )}
                      >
                        {f}
                        {on && (
                          <span aria-hidden className="absolute inset-x-0 -bottom-px h-0.5 bg-neutral-900" />
                        )}
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={copy}
                  aria-label={copied ? "Copied" : "Copy"}
                  className="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg border border-black/10 bg-white text-neutral-600 outline-none transition-colors hover:bg-neutral-50 hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-black/40"
                >
                  {copied ? <IconCheck aria-hidden className="size-4" /> : <IconCopy aria-hidden className="size-4" />}
                </button>
              </div>
              <pre className="m-0 max-h-36 overflow-hidden p-3 font-mono text-[11px] leading-relaxed break-all whitespace-pre-wrap text-neutral-700 sm:text-xs">
                {output}
              </pre>
            </div>

            <Link
              href={SITE.links.icons}
              className="group/cta mt-6 inline-flex h-10 items-center gap-2 rounded-full border border-black/10 bg-white px-5 text-sm font-medium text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Browse all Odisha icons
              <IconArrowRight
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
