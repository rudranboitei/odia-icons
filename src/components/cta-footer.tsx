"use client";

import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { SITE } from "@/data/site";

export function CtaFooter() {
  return (
    <>
      <section className="relative mx-auto max-w-4xl px-6 py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-5xl leading-[1.05] font-semibold tracking-tight text-white md:text-7xl">
            Come build with <span className="text-primary">Odisha.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-lg text-muted-foreground">
            Every icon is open source. Draw one, fix one, or just use them.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <Button size="lg" asChild>
                <a href="#install">Install icons</a>
              </Button>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <Button size="lg" variant="secondary" asChild>
                <a href={SITE.github} target="_blank" rel="noreferrer">
                  Contribute an icon
                </a>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <span>© 2026 {SITE.name}. Made in Odisha.</span>
          <nav className="flex gap-6">
            <a className="transition-colors hover:text-foreground" href={SITE.github}>
              GitHub
            </a>
            <a className="transition-colors hover:text-foreground" href="#icons">
              Icons
            </a>
            <a className="transition-colors hover:text-foreground" href="#install">
              Install
            </a>
          </nav>
        </div>
      </footer>
    </>
  );
}
