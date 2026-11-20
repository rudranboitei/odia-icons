import { IconArrowUpRight } from "@tabler/icons-react";

import { SITE } from "@/data/site";
import { Icon, iconsByName } from "@/lib/icons";
import { Eyebrow } from "./eyebrow";
import { Reveal } from "./reveal";

export function Quote() {
  const { quote, links } = SITE;

  return (
    <section className="px-6 py-28">
      <Reveal className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
          <div className="grid gap-8 p-8 sm:grid-cols-[1.5fr_1fr] sm:gap-0 sm:p-12">
            <div className="sm:pr-10">
              <Eyebrow>{quote.eyebrow}</Eyebrow>
              <blockquote className="mt-6 text-2xl leading-[1.2] font-semibold tracking-tight text-balance text-foreground sm:text-3xl">
                “{quote.text}”
              </blockquote>
            </div>

            <div className="flex flex-col justify-between gap-8 border-t border-white/10 pt-8 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-10">
              <div className="flex items-center gap-3">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-background">
                  <Icon def={iconsByName["konark-wheel"]} size={26} stroke={1.4} />
                </span>
                <div>
                  <p className="text-[15px] leading-relaxed font-medium tracking-[-0.03em] text-foreground">
                    {quote.author}
                  </p>
                  <p className="mt-0.5 text-[13px] leading-[1.2] tracking-[-0.03em] text-muted-foreground">
                    {quote.meta}
                  </p>
                </div>
              </div>

              <dl className="grid grid-cols-3 gap-3">
                {quote.stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="text-2xl font-semibold tracking-tight text-foreground">
                      {stat.value}
                    </dd>
                    <dd className="text-[13px] leading-[1.2] tracking-[-0.03em] text-muted-foreground">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>

              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[15px] font-medium tracking-[-0.03em] text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
              >
                {quote.linkLabel}
                <IconArrowUpRight aria-hidden className="size-4" stroke={1.75} />
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
