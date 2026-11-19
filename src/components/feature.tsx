"use client";

/**
 * OdiaIcons: animated features section (bento grid, looping micro-demos)
 * Surfaces and type follow the site theme; accents use its blue brand gradient.
 */

import {
  MotionConfig,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

/* ------------------------------------------------------------------ */
/* Theme                                                               */
/* ------------------------------------------------------------------ */

const theme = {
  "--of-bg": "var(--background)",
  "--of-card": "var(--card)",
  "--of-inset": "var(--muted)",
  "--of-line": "var(--border)",
  "--of-ink": "var(--foreground)",
  "--of-text": "var(--foreground)",
  "--of-muted": "var(--muted-foreground)",
  "--of-faint": "var(--border-strong)",
  "--of-brand": "var(--brand-blue)",
  "--of-gradient": "var(--brand-gradient)",
} as CSSProperties;

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */

function useTicker(length: number, ms: number, active: boolean) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => setI((v) => (v + 1) % length), ms);
    return () => clearInterval(t);
  }, [length, ms, active]);
  return i;
}

function Typed({
  text,
  speed = 90,
  run = true,
}: {
  text: string;
  speed?: number;
  run?: boolean;
}) {
  const len = Array.from(text).length;
  const [n, setN] = useState(run ? 0 : len);
  const [config, setConfig] = useState({ text, speed, run });

  if (config.text !== text || config.speed !== speed || config.run !== run) {
    setConfig({ text, speed, run });
    setN(run ? 0 : len);
  }

  useEffect(() => {
    if (!run) return;
    const t = setInterval(
      () =>
        setN((v) => {
          if (v >= len) {
            clearInterval(t);
            return v;
          }
          return v + 1;
        }),
      speed,
    );
    return () => clearInterval(t);
  }, [len, speed, run]);
  return <>{Array.from(text).slice(0, n).join("")}</>;
}

function Cursor({ light = false }: { light?: boolean }) {
  return (
    <motion.span
      aria-hidden
      className={`ml-0.5 inline-block h-4 w-px translate-y-0.5 ${light ? "bg-primary-foreground" : "bg-[var(--of-ink)]"
        }`}
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
    />
  );
}

/* Konark-wheel style shape reused by a few demos (24x24 viewBox) */
const SPOKES = Array.from({ length: 8 }, (_, k) => {
  const a = (k * Math.PI) / 4;
  return {
    x1: 12 + 3 * Math.cos(a),
    y1: 12 + 3 * Math.sin(a),
    x2: 12 + 8 * Math.cos(a),
    y2: 12 + 8 * Math.sin(a),
  };
});

function WheelPaths() {
  return (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="2.5" />
      {SPOKES.map((s, i) => (
        <line key={i} {...s} />
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Card shell: scroll-in + in-view detection                           */
/* ------------------------------------------------------------------ */

type CardProps = {
  title: string;
  desc: string;
  index: number;
  className?: string;
  visualClass?: string;
  children: (active: boolean) => ReactNode;
};

function Card({
  title,
  desc,
  index,
  className = "",
  visualClass = "h-56",
  children,
}: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduce = useReducedMotion();
  const active = inView && !reduce;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] as const }}
      className={`flex flex-col rounded-2xl border border-[var(--of-line)] bg-[var(--of-card)] p-3 transition-colors duration-300 hover:border-brand-blue/40 ${className}`}
    >
      <div
        className={`relative w-full overflow-hidden rounded-xl bg-[var(--of-inset)] p-4 ${visualClass}`}
      >
        {children(active)}
      </div>
      <div className="px-2 pb-3 pt-5">
        <h3 className="text-[15px] font-medium text-[var(--of-text)]">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-[var(--of-muted)]">{desc}</p>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Demo 1: icon drawn on the 24px grid with a scanner line             */
/* ------------------------------------------------------------------ */

function DrawDemo({ active }: { active: boolean }) {
  const D = 4.2;
  const draw = (delay: number) => ({
    initial: { pathLength: 1 },
    animate: active ? { pathLength: [0, 1, 1, 0] } : { pathLength: 1 },
    transition: {
      duration: D,
      times: [0, 0.45, 0.85, 1],
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay,
    },
  });

  const lines = Array.from({ length: 13 }, (_, i) => i * 2);

  return (
    <div className="relative flex h-full items-center justify-center">
      <div className="relative aspect-square h-full">
        <svg viewBox="0 0 24 24" className="h-full w-full" fill="none">
          {lines.map((p) => (
            <g key={p} stroke="var(--hairline)" strokeWidth="0.05">
              <line x1={p} y1="0" x2={p} y2="24" />
              <line x1="0" y1={p} x2="24" y2={p} />
            </g>
          ))}
          <rect
            x="2"
            y="2"
            width="20"
            height="20"
            rx="1"
            stroke="var(--of-brand)"
            strokeOpacity="0.5"
            strokeWidth="0.12"
            strokeDasharray="0.5 0.5"
          />
          <g stroke="var(--of-ink)" strokeWidth="1.2" strokeLinecap="round">
            <motion.circle cx="12" cy="12" r="8" {...draw(0)} />
            <motion.circle cx="12" cy="12" r="2.5" {...draw(0.15)} />
            {SPOKES.map((s, i) => (
              <motion.line key={i} {...s} {...draw(0.3 + i * 0.08)} />
            ))}
          </g>
        </svg>

        <motion.div
          aria-hidden
          className="absolute bottom-0 top-0 w-0.5 bg-[image:var(--of-gradient)] [box-shadow:0_0_12px_rgba(59,130,246,0.45)]"
          initial={{ left: "0%" }}
          animate={active ? { left: ["0%", "100%"] } : { left: "50%" }}
          transition={{ duration: D / 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
      </div>

      <span className="absolute left-0 top-0 font-mono text-[10px] text-[var(--of-muted)]">
        24 × 24
      </span>
      <span className="absolute right-0 top-0 font-mono text-[10px] text-[var(--of-muted)]">
        stroke 1.75
      </span>
      <span className="absolute bottom-0 left-0 font-mono text-[10px] text-[var(--of-muted)]">
        2px safe area
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Demo 2: Odia-script search                                          */
/* ------------------------------------------------------------------ */

const QUERIES = [
  { q: "ଚକ", hits: ["konark-wheel", "chakra", "dharma-wheel"] },
  { q: "rath", hits: ["rath-yatra", "chariot", "jagannath"] },
  { q: "pakhala", hits: ["pakhala", "rice-bowl", "dalma"] },
];

function SearchDemo({ active }: { active: boolean }) {
  const i = useTicker(QUERIES.length, 3400, active);
  const { q, hits } = QUERIES[i];

  return (
    <div className="mx-auto flex h-full w-full max-w-xs flex-col gap-3">
      <div className="flex items-center gap-2 rounded-full border border-[var(--of-line)] bg-card px-4 py-2.5">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--of-brand)" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <span className="text-sm font-medium text-[var(--of-text)]">
          <Typed text={q} run={active} />
          <Cursor />
        </span>
      </div>
      <ul key={i} className="space-y-2">
        {hits.map((h, k) => (
          <motion.li
            key={h}
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + k * 0.12, duration: 0.4 }}
            className={`flex items-center gap-3 rounded-xl border bg-card px-3 py-2 ${k === 0 ? "border-brand-blue/40" : "border-[var(--of-line)]"}`}
          >
            <span className="grid h-6 w-6 place-items-center rounded-md bg-muted">
              <span className="h-2 w-2 rounded-full bg-[image:var(--of-gradient)]" />
            </span>
            <span className="font-mono text-xs text-[var(--of-muted)]">{h}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Demo 3: copy as SVG / JSX / import                                  */
/* ------------------------------------------------------------------ */

const TABS = [
  { label: "SVG", code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">…</svg>' },
  { label: "JSX", code: "<KonarkWheel size={24} />" },
  { label: "Import", code: 'import { KonarkWheel } from "odiaicons"' },
];

function CopyDemo({ active }: { active: boolean }) {
  const i = useTicker(TABS.length, 2600, active);

  return (
    <div className="mx-auto flex h-full w-full max-w-xs flex-col justify-center gap-5">
      <div className="flex justify-center gap-2">
        {TABS.map((t, k) => (
          <div
            key={t.label}
            className={`relative rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors duration-300 ${i === k ? "text-white" : "bg-card text-[var(--of-muted)]"
              }`}
          >
            {i === k && (
              <motion.span
                layoutId="odia-copy-tab"
                className="absolute inset-0 rounded-full bg-[image:var(--of-gradient)]"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative">{t.label}</span>
          </div>
        ))}
      </div>

      <div className="relative rounded-xl border border-[var(--of-line)] bg-card p-3.5">
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="break-all font-mono text-[11px] leading-relaxed text-[var(--of-text)]"
        >
          {TABS[i].code}
        </motion.p>
        <motion.span
          key={`pill-${i}`}
          initial={{ opacity: 0, scale: 0.85, y: 4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1, type: "spring", stiffness: 400, damping: 22 }}
          className="absolute -top-3 right-3 flex items-center gap-1 rounded-full bg-[image:var(--of-gradient)] px-2.5 py-0.5 text-[10px] font-semibold text-white"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12 5 5L20 7" />
          </svg>
          Copied
        </motion.span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Demo 4: live stroke-width customizer                                */
/* ------------------------------------------------------------------ */

function StrokeDemo({ active }: { active: boolean }) {
  const sw = useMotionValue(1.75);
  const pos = useTransform(sw, [1, 2.75], ["8%", "92%"]);
  const label = useTransform(sw, (v) => `${v.toFixed(2)}px`);

  useEffect(() => {
    if (!active) {
      sw.set(1.75);
      return;
    }
    const c = animate(sw, [1, 2.75, 1], { duration: 4.4, repeat: Infinity, ease: "easeInOut" });
    return () => c.stop();
  }, [active, sw]);

  return (
    <div className="flex h-full flex-col items-center justify-between">
      <motion.svg
        viewBox="0 0 24 24"
        className="h-24 w-24"
        fill="none"
        stroke="url(#stroke-demo-gradient)"
        strokeLinecap="round"
        style={{ strokeWidth: sw }}
      >
        <defs>
          <linearGradient id="stroke-demo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--brand-cyan)" />
            <stop offset="100%" stopColor="var(--brand-blue)" />
          </linearGradient>
        </defs>
        <WheelPaths />
      </motion.svg>

      <div className="w-full max-w-[14rem]">
        <div className="mb-2 flex justify-between font-mono text-[10px] text-[var(--of-muted)]">
          <span>stroke-width</span>
          <motion.span className="text-brand-blue">{label}</motion.span>
        </div>
        <div className="relative h-1.5 rounded-full bg-border">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-[image:var(--of-gradient)]"
            style={{ width: pos }}
          />
          <motion.div
            className="absolute top-1/2 -ml-2 -mt-2 h-4 w-4 rounded-full border-2 border-brand-blue bg-card"
            style={{ left: pos }}
          />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Demo 5: tiny bundle size                                            */
/* ------------------------------------------------------------------ */

function BundleDemo({ active }: { active: boolean }) {
  const kb = useMotionValue(0.8);
  const txt = useTransform(kb, (v) => `${v.toFixed(1)} KB`);

  useEffect(() => {
    if (!active) {
      kb.set(0.8);
      return;
    }
    kb.set(0);
    const c = animate(kb, 0.8, { duration: 1.6, ease: "easeOut" });
    return () => c.stop();
  }, [active, kb]);

  return (
    <div className="mx-auto flex h-full w-full max-w-xs flex-col justify-center gap-5">
      <div>
        <div className="mb-1.5 flex justify-between font-mono text-[11px] text-[var(--of-muted)]">
          <span>Icon font</span>
          <span>48 KB</span>
        </div>
        <div className="h-2.5 rounded-full bg-border">
          <motion.div
            className="h-full rounded-full bg-[var(--of-faint)]"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </div>
      </div>
      <div>
        <div className="mb-1.5 flex justify-between font-mono text-[11px] text-brand-blue">
          <span>OdiaIcons · 1 icon</span>
          <motion.span>{txt}</motion.span>
        </div>
        <div className="h-2.5 rounded-full bg-border">
          <motion.div
            className="h-full rounded-full bg-[image:var(--of-gradient)]"
            initial={{ width: 0 }}
            whileInView={{ width: "3%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Demo 6: ship anywhere                                               */
/* ------------------------------------------------------------------ */

const CHIPS = ["React", "SVG", "Sprite", "Icon font", "shadcn CLI", "npm"];
const CMD = "npm install odiaicons";

function ShipDemo({ active }: { active: boolean }) {
  return (
    <div className="mx-auto flex h-full w-full max-w-2xl flex-col items-center justify-center gap-6">
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {CHIPS.map((c, i) => (
          <motion.span
            key={c}
            animate={active ? { y: [0, -6, 0] } : { y: 0 }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
            className="rounded-full border border-[var(--of-line)] bg-card px-4 py-1.5 text-xs font-medium text-[var(--of-text)] transition-colors hover:border-brand-blue/50"
          >
            {c}
          </motion.span>
        ))}
      </div>
      <div className="w-full rounded-xl bg-foreground px-4 py-3 font-mono text-[11px] text-background/80 sm:text-xs">
        <span className="text-brand-blue">$ </span>
        <span className="break-all text-background">
          <Typed text={CMD} speed={28} run={active} />
        </span>
        <Cursor light />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mini features row                                                   */
/* ------------------------------------------------------------------ */

const MINI = [
  {
    title: "3 variants",
    desc: "Outline, solid and duotone for every icon.",
    d: ["M12 2 2 7l10 5 10-5-10-5Z", "m2 17 10 5 10-5", "m2 12 10 5 10-5"],
  },
  {
    title: "Dark mode ready",
    desc: "Uses currentColor, so icons follow your theme.",
    d: ["M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"],
  },
  {
    title: "Typed React API",
    desc: "size, color, strokeWidth, variant and title props.",
    d: ["m16 18 6-6-6-6", "m8 6-6 6 6 6"],
  },
  {
    title: "AI agent friendly",
    desc: "llms.txt and an MCP server for coding agents.",
    d: ["M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z"],
  },
  {
    title: "Accessible",
    desc: "aria-hidden by default, labelled when you pass a title.",
    d: ["M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z", "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"],
  },
  {
    title: "MIT licensed",
    desc: "Free for personal and commercial projects.",
    d: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"],
  },
];

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export default function FeaturesSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="features"
        style={theme}
        className="bg-[var(--of-bg)] px-5 py-24 text-[var(--of-text)] lg:px-6 md:py-32"
      >
        <div className="mx-auto max-w-6xl">
          {/* header */}
          <div className="mx-auto max-w-2xl text-center">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full bg-[image:var(--of-gradient)] px-3.5 py-1 text-xs font-semibold text-white"
            >
              <span aria-hidden className="size-1.5 rounded-full bg-white/90" />
              Features
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-5 text-4xl font-semibold tracking-tight text-[var(--of-ink)] md:text-5xl"
            >
              The <span className="bg-[image:var(--of-gradient)] bg-clip-text text-transparent">Odisha</span> icon stack
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-4 text-base leading-relaxed text-[var(--of-muted)] md:text-lg"
            >
              Culture-first icons, drawn on a strict grid and shipped everywhere
              you build. Everything you need to make Odisha part of your UI.
            </motion.p>
          </div>

          {/* bento */}
          <div className="mt-14 grid gap-4 md:grid-cols-6">
            <Card
              index={0}
              className="md:col-span-4"
              visualClass="h-72"
              title="Drawn on a strict 24px grid"
              desc="Every icon follows the same rules: 24×24 canvas, 1.75px round strokes and a 2px safe area. Konark wheels, Pattachitra motifs and Odissi poses stay crisp at 16px."
            >
              {(a) => <DrawDemo active={a} />}
            </Card>

            <Card
              index={1}
              className="md:col-span-2"
              visualClass="h-72"
              title="Search in Odia or English"
              desc="Find icons by name, tag or Odia script. Type ଚକ or wheel and get the same result."
            >
              {(a) => <SearchDemo active={a} />}
            </Card>

            <Card
              index={2}
              className="md:col-span-2"
              title="Copy it your way"
              desc="One click copies SVG, JSX or the import line. PNG and SVG downloads included."
            >
              {(a) => <CopyDemo active={a} />}
            </Card>

            <Card
              index={3}
              className="md:col-span-2"
              title="Customize live"
              desc="Tune size, stroke width and color right in the browser, then copy exactly what you see."
            >
              {(a) => <StrokeDemo active={a} />}
            </Card>

            <Card
              index={4}
              className="md:col-span-2"
              title="Tree-shakeable by default"
              desc="Import one icon, ship one icon. No barrel-file bloat and zero runtime dependencies."
            >
              {(a) => <BundleDemo active={a} />}
            </Card>

            <Card
              index={5}
              className="md:col-span-6"
              visualClass="h-52"
              title="Ship it anywhere"
              desc="React components, raw SVG, a sprite sheet, an icon font and a shadcn-style registry. Pick what fits your stack."
            >
              {(a) => <ShipDemo active={a} />}
            </Card>
          </div>

          {/* mini features */}
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {MINI.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="rounded-2xl border border-[var(--of-line)] bg-[var(--of-card)] p-4 transition-colors duration-300 hover:border-brand-blue/40"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="text-brand-blue"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  {m.d.map((d) => (
                    <path key={d} d={d} />
                  ))}
                </svg>
                <h4 className="mt-3 text-sm font-medium text-[var(--of-text)]">{m.title}</h4>
                <p className="mt-1 text-xs leading-relaxed text-[var(--of-muted)]">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
