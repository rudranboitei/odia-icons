"use client";

import Image from "next/image";

import { SITE } from "@/data/site";
import { InstallBox } from "./install-box";
import { Reveal } from "./reveal";

const BG = "/home-bg.jpeg";
const BG_POS = "14% 64%";

export function FinalCta() {
  const { finalCta } = SITE;

  return (
    <section
      id="install"
      className="relative scroll-mt-20 bg-[#141210] px-4 py-20 text-white sm:px-6 sm:py-28"
    >
      <Reveal className="mx-auto w-full max-w-[1080px]">
        <div className="relative isolate flex min-h-[24rem] items-center overflow-hidden rounded-[4px] bg-neutral-800 sm:min-h-[27rem]">
          {/* Your background image */}
          <Image
            src={BG}
            alt=""
            aria-hidden
            fill
            sizes="(min-width: 1080px) 1080px, 100vw"
            className="-z-10 scale-[1.6] object-cover"
            style={{ objectPosition: BG_POS, transformOrigin: BG_POS }}
          />
          {/* Lighter on the left so the text stays readable */}
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-black/30" />

          <div className="w-full max-w-[34rem] px-6 py-10 sm:px-12 sm:py-14">
            <p className="flex items-center gap-2 text-sm text-neutral-300">
              <span aria-hidden className="size-2 rounded-full bg-white" />
              {finalCta.eyebrow}
            </p>

            <h2 className="mt-3 text-[clamp(1.75rem,4.2vw,2.5rem)] leading-[1.15] font-medium tracking-tight text-balance">
              <span className="text-white">{finalCta.title}</span>
              {finalCta.accent && (
                <>
                  {" "}
                  <span className="text-neutral-400">{finalCta.accent}</span>
                </>
              )}
            </h2>

            {finalCta.description && (
              <p className="mt-4 max-w-md text-base leading-relaxed text-neutral-300">
                {finalCta.description}
              </p>
            )}

            <div className="mt-7 w-full max-w-md">
              <InstallBox className="relative" />
            </div>

            <p className="mt-4 inline-flex max-w-full items-center rounded-full border border-white/10 bg-white/10 px-3.5 py-1.5 text-[13px] leading-[1.3] text-neutral-300 backdrop-blur-sm">
              {finalCta.helper}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
