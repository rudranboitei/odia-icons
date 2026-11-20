import { SITE } from "@/data/site";
import { IconMarquee } from "./icon-marquee";
import { InstallBox } from "./install-box";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";

export function FinalCta() {
  const { finalCta } = SITE;

  return (
    <section
      id="install"
      className="relative scroll-mt-20 overflow-hidden px-6 pt-28 pb-6 text-center"
    >
      <Reveal className="mx-auto max-w-4xl">
        <SectionHeader
          eyebrow={finalCta.eyebrow}
          title={finalCta.title}
          accent={finalCta.accent}
          description={finalCta.description}
          size="cta"
        />

        <div className="mt-10 flex justify-center">
          <InstallBox />
        </div>

        <p className="mt-6 text-[13px] leading-[1.2] tracking-[-0.03em] text-muted-foreground">
          {finalCta.helper}
        </p>
      </Reveal>

      <div className="mx-auto mt-16 max-w-6xl">
        <IconMarquee />
      </div>
    </section>
  );
}
