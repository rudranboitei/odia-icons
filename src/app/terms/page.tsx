import type { Metadata } from "next"

import { LegalPage } from "@/components/marketing/legal-page"
import { PageShell } from "@/components/marketing/page-shell"

export const metadata: Metadata = {
  title: "Terms & conditions — odiaicons",
  description:
    "Terms and conditions for using odiaicons: the MIT-licensed icon set, the website and the export tools.",
  alternates: { canonical: "/terms" },
}

const SECTIONS = [
  {
    id: "acceptance",
    heading: "Acceptance of terms",
    body: [
      "By using odiaicons, you agree to these terms. If you do not agree, please do not use the site or the icon set.",
      "These terms apply to the website, the icon files and any downloadable exports. The icons themselves are also governed by the MIT licence, which always applies to the icon files.",
    ],
  },
  {
    id: "licence",
    heading: "Icon licence",
    body: [
      "The icon set is released under the MIT licence. You can use the icons in personal, commercial and client projects without paying or crediting us.",
      "You can redistribute, bundle or resell the icons, including as part of another icon set, as long as the MIT licence notice is included with the files. The odiaicons name, logo and site design are not covered by the MIT licence and may not be used to imply endorsement.",
    ],
  },
  {
    id: "website-use",
    heading: "Website use",
    body: ["Please use the site as intended and do not:"],
    list: [
      "Attempt to disrupt, scrape aggressively or overload the site.",
      "Copy the site’s design, copy or branding for a competing icon library.",
      "Misrepresent odiaicons as your own project.",
    ],
  },
  {
    id: "contributions",
    heading: "Contributions",
    body: [
      "If you submit an icon, code or suggestion, you confirm that you have the right to share it and that it can be published under the project’s MIT licence.",
      "We may edit, decline or remove contributions to keep the set consistent and legally safe.",
    ],
  },
  {
    id: "warranty",
    heading: "No warranty",
    body: [
      "The site and icons are provided “as is”, without warranties of any kind. We do not guarantee that every icon is accurate, complete or suitable for your specific use.",
      "To the fullest extent permitted by law, odiaicons is not liable for any loss or damage arising from use of the site or the icons.",
    ],
  },
  {
    id: "changes",
    heading: "Changes to these terms",
    body: [
      "We may update these terms as the project grows. The updated date at the top of this page will change when we do.",
      "If a change is significant, we’ll call it out on the site or in the repository.",
    ],
  },
  {
    id: "contact",
    heading: "Contact",
    body: [
      "Questions about these terms? Email hello@odiaui.xyz or open an issue in the GitHub repository.",
    ],
  },
] as const

export default function TermsPage() {
  return (
    <PageShell>
      <LegalPage
        title="Terms at"
        description="The rules are simple: the icons are MIT licensed and free to use. Here are the details for the site, exports and contributions."
        updated="25 November 2026"
        sections={[...SECTIONS]}
      />
    </PageShell>
  )
}
