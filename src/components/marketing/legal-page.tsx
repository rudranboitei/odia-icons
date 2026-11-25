import { Instrument_Serif } from "next/font/google"
import { IconCalendar } from "@tabler/icons-react"

import { SITE } from "@/data/site"

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400" })

export type LegalSection = {
  id: string
  heading: string
  body: readonly string[]
  list?: readonly string[]
}

export function LegalPage({
  title,
  description,
  updated,
  sections,
}: {
  title: string
  description: string
  updated: string
  sections: readonly LegalSection[]
}) {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-linear-to-b from-[#f1dfcc] via-[#f5e9db] to-[#f7f5f1] px-4 pt-32 pb-16 text-center sm:px-6 sm:pt-40 sm:pb-20">
        <div className="mx-auto flex w-full max-w-[760px] flex-col items-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/85 px-3.5 py-1.5 text-[12px] font-medium tracking-wide text-neutral-800 uppercase shadow-sm backdrop-blur">
            <span aria-hidden className="size-1.5 rounded-full bg-orange-600" />
            Legal
          </span>

          <h1 className="mt-6 text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.02] font-semibold tracking-tight text-balance text-neutral-900">
            {title}{" "}
            <span className={`${serif.className} font-normal tracking-[-0.03em] text-neutral-800`}>
              {SITE.name}.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-balance text-neutral-700 sm:text-lg">
            {description}
          </p>

          <span className="mt-7 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-[13px] text-neutral-600 backdrop-blur">
            <IconCalendar aria-hidden className="size-3.5" stroke={1.5} />
            Last updated: {updated}
          </span>
        </div>

        {/* Thin arch, like the fade into the content below */}
        <svg
          aria-hidden
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20 w-full text-black/[0.05] sm:h-28"
        >
          <path d="M0 120 C 480 0, 960 0, 1440 120" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </section>

      <article className="bg-[#f7f5f1] px-4 pb-20 text-neutral-900 sm:px-6 sm:pb-28">
        <div className="mx-auto w-full max-w-[640px]">
          <div className="flex flex-col gap-10">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="text-[17px] font-semibold tracking-tight text-neutral-900">
                  {section.heading}
                </h2>
                <div className="mt-3 flex flex-col gap-4 text-[15.5px] leading-[1.75] text-neutral-600">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.list && (
                    <ul className="flex list-disc flex-col gap-2 pl-5 marker:text-neutral-400">
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      </article>
    </>
  )
}
