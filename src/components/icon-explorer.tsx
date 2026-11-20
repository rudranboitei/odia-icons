"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CATEGORIES, ICONS, IconGlyph, type IconEntry } from "@/data/icons";
import { cn } from "@/lib/utils";

function pascal(name: string) {
  return name
    .split("-")
    .map((p) => p[0].toUpperCase() + p.slice(1))
    .join("");
}

function IconCard({ icon }: { icon: IconEntry }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(`<${pascal(icon.name)} />`);
    } catch {
      /* clipboard can be blocked; the visual feedback still plays */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  return (
    <motion.button
      layout
      type="button"
      onClick={copy}
      initial={{ opacity: 0, scale: 0.92, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      className="group relative flex aspect-[4/5] flex-col items-center justify-center gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-4 outline-none transition-colors hover:border-primary/40 hover:bg-white/[0.06] focus-visible:ring-[3px] focus-visible:ring-ring/50"
    >
      <IconGlyph
        icon={icon}
        className="size-10 text-white/85 transition-colors group-hover:text-primary"
      />
      <div className="text-center">
        <div className="text-sm font-medium text-white">{icon.odia}</div>
        <div className="mt-0.5 font-mono text-[11px] text-muted-foreground">
          {icon.name}
        </div>
      </div>

      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-3 right-3 grid size-6 place-items-center rounded-full bg-primary text-primary-foreground"
          >
            <Check className="size-3.5" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export function IconExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]["id"]>("all");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ICONS.filter((icon) => {
      if (category !== "all" && icon.category !== category) return false;
      if (!q) return true;
      return (
        icon.name.includes(q) ||
        icon.odia.includes(query.trim()) ||
        icon.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [query, category]);

  return (
    <section id="icons" className="relative mx-auto max-w-6xl px-6 py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-2xl text-center"
      >
        <h2 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
          The culture of Odisha, glyph by glyph.
        </h2>
        <p className="mt-5 text-lg text-muted-foreground">
          Search by English name, tag, or Odia script. Click any icon to copy its JSX.
        </p>
      </motion.div>

      <div className="mx-auto mt-12 max-w-xl">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search temple, ରଥ, lotus…"
            className="pl-12"
            aria-label="Search icons"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setCategory(c.id)}
            className="rounded-lg outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <Badge
              variant={category === c.id ? "active" : "outline"}
              className={cn("cursor-pointer px-4", category !== c.id && "hover:text-foreground")}
            >
              {c.label}
            </Badge>
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
      >
        <AnimatePresence mode="popLayout">
          {results.map((icon) => (
            <IconCard key={icon.name} icon={icon} />
          ))}
        </AnimatePresence>
      </motion.div>

      {results.length === 0 && (
        <p className="mt-16 text-center text-muted-foreground">
          No icons match “{query}”.
        </p>
      )}
    </section>
  );
}
