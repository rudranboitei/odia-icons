import { IconCheck } from "@tabler/icons-react";

import { SITE } from "@/data/site";
import { iconsByName, toSvg } from "@/lib/icons";
import { InstallBox } from "./install-box";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";
import { ShikiCode } from "./shiki-code";

export function DeveloperSection() {
  const { developer } = SITE;
  const snippet = toSvg(iconsByName["konark-wheel"], { size: 32, stroke: 1.75 });

  return (
    <section id="developers" className="scroll-mt-20 px-6 py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <SectionHeader
            align="left"
            eyebrow={developer.eyebrow}
            title={developer.title}
            accent={developer.highlight}
            description={developer.description}
            className="max-w-xl"
          />

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {developer.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-2.5 text-[15px] leading-relaxed text-muted-foreground"
              >
                <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <IconCheck aria-hidden className="size-2.5" stroke={3} />
                </span>
                {bullet}
              </li>
            ))}
          </ul>

          <InstallBox className="mt-9 items-start" />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-card">
            <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="ml-2 font-mono text-[11px] text-muted-foreground">
                {developer.code.fileName}
              </span>
              <span className="ml-auto rounded-full border border-white/10 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                {developer.code.grid}
              </span>
            </div>

            <div className="p-3">
              <pre className="overflow-x-auto rounded-2xl bg-black/30 p-5 font-mono text-[11px] leading-relaxed text-foreground">
                <ShikiCode code={snippet} lang="xml" />
              </pre>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 px-5 py-3 text-[11px] text-muted-foreground">
              <span>{developer.code.license}</span>
              <span className="font-mono">{developer.code.spec}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
