"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Copy, Layers, Languages, Package } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { SITE } from "@/data/site";

const SNIPPETS = [
  { label: "npm", cmd: `npm i ${SITE.npmPackage}` },
  { label: "shadcn registry", cmd: `npx shadcn add ${SITE.registryUrl}/konark-wheel.json` },
];

function CopyLine({ label, cmd }: { label: string; cmd: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(cmd);
    } catch {
      /* ignore */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 py-2 pr-2 pl-5">
      <span className="hidden w-28 shrink-0 text-xs text-muted-foreground sm:block">
        {label}
      </span>
      <code className="min-w-0 flex-1 truncate font-mono text-sm text-primary">
        {cmd}
      </code>
      <Button size="icon" variant="ghost" onClick={copy} aria-label={`Copy ${label} command`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "ok" : "copy"}
            initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.15 }}
          >
            {copied ? <Check /> : <Copy />}
          </motion.span>
        </AnimatePresence>
      </Button>
    </div>
  );
}

const FEATURES = [
  {
    icon: Layers,
    title: "Pixel-true 24px grid",
    body: "1.75px stroke, round caps and joins, currentColor. Every motif is checked to stay readable at 16px.",
  },
  {
    icon: Languages,
    title: "Odia-first search",
    body: "Every icon carries its ଓଡ଼ିଆ name plus a transliteration, so people can find it in either script.",
  },
  {
    icon: Package,
    title: "Tree-shakeable",
    body: "React components, raw SVG and a copy-paste registry. Importing one icon adds under 1KB gzipped.",
  },
];

export function InstallSection() {
  return (
    <section id="install" className="relative mx-auto max-w-5xl px-6 py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center"
      >
        <h2 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
          Drop it in. <span className="text-primary">Ship it today.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
          Use the package, or copy a single icon into your project the shadcn way.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mt-12 flex max-w-3xl flex-col gap-3"
      >
        {SNIPPETS.map((s) => (
          <CopyLine key={s.label} {...s} />
        ))}
      </motion.div>

      <div className="mt-16 grid gap-4 md:grid-cols-3">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
          >
            <Card className="h-full border-white/10 bg-white/[0.03]">
              <div className="grid size-11 place-items-center rounded-xl bg-primary/15 text-primary">
                <f.icon className="size-5" />
              </div>
              <CardTitle>{f.title}</CardTitle>
              <CardDescription>{f.body}</CardDescription>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
