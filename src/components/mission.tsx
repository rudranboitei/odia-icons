import { siteConfig } from "@/lib/site-config"

export function Mission() {
  return (
    <section className="px-6 py-24">
      <p className="mx-auto max-w-2xl text-center text-xl leading-relaxed text-balance text-[#171717] sm:text-2xl">
        {siteConfig.mission}
      </p>
    </section>
  )
}
