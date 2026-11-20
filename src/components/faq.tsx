import { IconArrowUpRight } from "@tabler/icons-react";

import { SITE } from "@/data/site";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";

export function Faq() {
  const { faq, links } = SITE;

  return (
    <section id="faq" className="scroll-mt-20 px-6 py-28">
      <Reveal className="mx-auto max-w-3xl">
        <SectionHeader
          eyebrow={faq.eyebrow}
          title={faq.title}
          accent={faq.accent}
          description={faq.description}
        />

        <div className="mt-10 divide-y divide-white/10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
          {faq.items.map((item) => (
            <details key={item.q} name="odiaicons-faq" className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left text-[18px] leading-[1.4] font-semibold tracking-tight text-foreground transition-colors outline-none hover:bg-white/[0.04] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="relative flex size-6 shrink-0 items-center justify-center rounded-full border border-white/10 bg-card">
                  <span className="absolute h-px w-2.5 bg-foreground" />
                  <span className="absolute h-2.5 w-px bg-foreground transition-transform duration-200 group-open:scale-y-0" />
                </span>
              </summary>
              <p className="max-w-2xl px-6 pb-6 text-[15px] leading-relaxed text-muted-foreground">
                {item.a}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[15px] text-muted-foreground">
          <span>{faq.more.label}</span>
          <a
            href={links.contribute}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 text-foreground underline underline-offset-4 transition-colors hover:text-primary"
          >
            {faq.more.linkLabel}
            <IconArrowUpRight aria-hidden className="size-3.5" stroke={1.75} />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
