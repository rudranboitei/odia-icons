"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Copy } from "@odiaui/icons-react";

import { SITE } from "@/data/site";
import { copyText } from "@/lib/clipboard";
import { Button } from "@/components/ui/button";
import { ShikiCode } from "@/components/shiki-code";
import { cn } from "@/lib/utils";

// The core conversion component: a copyable install command.
export function InstallBox({
  className,
  id,
}: {
  className?: string;
  id?: string;
}) {
  const { command, helper } = SITE.install;
  const [copied, setCopied] = useState(false);

  async function copy() {
    const ok = await copyText(command);
    if (!ok) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div
      id={id}
      className={cn("flex w-full max-w-lg flex-col items-center", className)}
    >
      <div className="flex w-full items-center gap-2 rounded-full border border-white/15 bg-black/45 p-1.5 pr-1.5 pl-4 shadow-sm backdrop-blur-md sm:pl-5">
        <span className="text-sm text-neutral-400 select-none">$</span>
        <ShikiCode
          code={command}
          lang="bash"
          className="min-w-0 flex-1 truncate text-left font-mono text-sm text-white"
        />
        <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
          <Button size="sm" onClick={copy} className="cursor-pointer bg-white text-black hover:bg-neutral-200">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={copied ? "copied" : "copy"}
                initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.15 }}
              >
                {copied ? (
                  <Check aria-hidden className="size-3.5" />
                ) : (
                  <Copy aria-hidden className="size-3.5" />
                )}
              </motion.span>
            </AnimatePresence>
            {copied ? "Copied" : "Copy"}
          </Button>
        </motion.div>
      </div>
      <p className="mt-3 text-[13px] leading-[1.2] tracking-[-0.03em] text-neutral-400">
        {helper}
      </p>
    </div>
  );
}
