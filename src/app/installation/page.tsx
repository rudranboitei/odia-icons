import type { Metadata } from "next"

import { PageShell } from "@/components/marketing/page-shell"
import { InstallationGuide } from "@/components/marketing/installation-guide"

export const metadata: Metadata = {
  title: "Installation — odiaicons",
  description:
    "Install odiaicons in React, copy raw SVG files, use the SVG sprite or add single icons with the shadcn CLI.",
  alternates: { canonical: "/installation" },
}

export default function InstallationPage() {
  return (
    <PageShell>
      <InstallationGuide />
    </PageShell>
  )
}
