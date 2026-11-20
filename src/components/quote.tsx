import { IconArrowUpRight } from "@tabler/icons-react";

import { SITE } from "@/data/site";
import { Eyebrow } from "./eyebrow";
import { Reveal } from "./reveal";

export function Quote() {
  const { quote, links } = SITE;

  return (
    <section className="relative overflow-hidden bg-foreground px-5 py-24 text-background sm:px-6 sm:py-32 lg:py-40">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-12 right-4 select-none font-serif text-[20rem] leading-none text-background/10 sm:right-10 lg:text-[28rem]"
      >
        “
      </span>

      <Reveal className="relative mx-auto max-w-6xl">
        <Eyebrow>{quote.eyebrow}</Eyebrow>

        <blockquote className="mt-10 max-w-5xl text-5xl leading-[0.95] font-semibold tracking-[-0.04em] text-balance sm:text-7xl lg:text-8xl">
          {quote.text}
        </blockquote>

        <div className="mt-16 grid gap-10 border-t border-background/20 pt-10 lg:grid-cols-[1fr_auto_auto] lg:items-end lg:gap-20">
          <div>
            <p className="text-lg font-medium tracking-[-0.02em]">
              {quote.author}
            </p>
            <p className="mt-1 text-sm text-background/60">{quote.meta}</p>
          </div>

          <dl className="flex gap-12">
            {quote.stats.map((stat) => (
              <div key={stat.label}>
                <dd className="text-4xl font-semibold tracking-[-0.04em]">
                  {stat.value}
                </dd>
                <dt className="mt-1 text-sm text-background/60">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>

          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-lg font-medium underline underline-offset-8 decoration-background/40 transition-colors hover:decoration-background"
          >
            {quote.linkLabel}
            <IconArrowUpRight
              aria-hidden
              className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              stroke={1.75}
            />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
