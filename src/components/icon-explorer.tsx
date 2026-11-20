"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { Check, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CATEGORIES, ICONS, IconGlyph, type IconEntry } from "@/data/icons";
import { SITE } from "@/data/site";
import { cn } from "@/lib/utils";

function pascal(name: string) {
  return name
    .split("-")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
}

function IconCard({ icon, index }: { icon: IconEntry; index: number }) {
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
      type="button"
      onClick={copy}
      aria-label={`Copy ${icon.name} JSX`}
      initial={{ opacity: 0, scale: 0.97, y: 14 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      transition={{
        duration: 0.45,
        delay: Math.min(index % 12, 11) * 0.025,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex aspect-[4/5] flex-col items-center justify-center gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-4 outline-none transition-colors hover:border-primary/40 hover:bg-white/[0.06] focus-visible:ring-[3px] focus-visible:ring-ring/50"
    >
      <IconGlyph
        icon={icon}
        className="size-10 text-foreground/85 transition-colors group-hover:text-primary"
      />
      <div className="text-center">
        <div className="text-sm font-medium text-foreground">{icon.odia}</div>
        <div className="mt-0.5 font-mono text-[11px] text-muted-foreground">
          {icon.name}
        </div>
      </div>

      <AnimatePresence>
        {copied && (
          <motion.span
            aria-hidden
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
  const [category, setCategory] =
    useState<(typeof CATEGORIES)[number]["id"]>("all");
  const { explorer } = SITE;

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ICONS.filter((icon) => {
      if (category !== "all" && icon.category !== category) return false;
      if (!q) return true;
      return (
        icon.name.includes(q) ||
        icon.odia.includes(query.trim()) ||
        icon.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }, [query, category]);

  const [titleBefore, titleAfter] = explorer.title.includes(explorer.accent)
    ? explorer.title.split(explorer.accent)
    : [explorer.title, ""];

  return (
    <MotionConfig reducedMotion="user">
      <section id="icons" className="relative scroll-mt-20 px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-4xl font-semibold tracking-tight text-balance text-foreground md:text-6xl">
              {titleBefore}
              {explorer.title.includes(explorer.accent) && (
                <span className="text-primary">{explorer.accent}</span>
              )}
              {titleAfter}
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              {explorer.description}
            </p>
          </motion.div>

          <div className="mx-auto mt-12 max-w-xl">
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={explorer.searchPlaceholder}
                className="pl-12"
                aria-label="Search icons"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCategory(item.id)}
                aria-pressed={category === item.id}
                className="rounded-full outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                <Badge
                  variant={category === item.id ? "active" : "outline"}
                  className={cn(
                    "cursor-pointer rounded-full px-4 py-2",
                    category !== item.id && "hover:text-foreground",
                  )}
                >
                  {item.label}
                </Badge>
              </button>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            <AnimatePresence>
              {results.map((icon, index) => (
                <IconCard key={icon.name} icon={icon} index={index} />
              ))}
            </AnimatePresence>
          </div>

          {results.length === 0 && (
            <p className="mt-16 text-center font-pixel text-2xl font-bold text-foreground">
              {explorer.emptyPrefix} “{query}”.
            </p>
          )}
        </div>
      </section>
    </MotionConfig>
  );
}
