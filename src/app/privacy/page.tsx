import type { Metadata } from "next"

import { LegalPage } from "@/components/marketing/legal-page"
import { PageShell } from "@/components/marketing/page-shell"

export const metadata: Metadata = {
  title: "Privacy policy — odiaicons",
  description:
    "Privacy policy for odiaicons: what we collect, what we do not collect, and how the site handles data.",
  alternates: { canonical: "/privacy" },
}

const SECTIONS = [
  {
    id: "overview",
    heading: "Overview",
    body: [
      "odiaicons is a small open-source project. We keep data collection to a minimum and do not sell personal information.",
      "This page explains what is collected when you browse the site, use the icon tools or contact us.",
    ],
  },
  {
    id: "what-we-collect",
    heading: "What we collect",
    body: [
      "We do not require an account to browse or download icons. The only personal data we receive is what you choose to send us.",
    ],
    list: [
      "Messages you send by email or through the contact form.",
      "Information you include in an issue or pull request on GitHub.",
      "Basic, aggregated traffic data from our hosting provider, if enabled.",
    ],
  },
  {
    id: "cookies",
    heading: "Cookies and local storage",
    body: [
      "The icon browser works without cookies. Any preferences, such as theme or recent searches, may be stored in your browser only.",
      "We do not use advertising cookies or cross-site tracking pixels.",
    ],
  },
  {
    id: "third-parties",
    heading: "Third-party services",
    body: [
      "The site is hosted on a third-party platform and links to GitHub. Those services have their own privacy policies.",
      "If we add analytics or a newsletter in future, this section will name the provider and explain the data involved.",
    ],
  },
  {
    id: "your-rights",
    heading: "Your choices",
    body: [
      "You can ask us to delete any message or personal data you have shared with us. Email rdrudra99.work@gmail.com and we will respond within a reasonable time.",
      "You can also clear any locally stored preferences through your browser settings.",
    ],
  },
  {
    id: "children",
    heading: "Children",
    body: [
      "The site is not directed at children under 13, and we do not knowingly collect personal information from them.",
    ],
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    body: [
      "We may update this policy as the site changes. The date at the top of the page shows the latest revision.",
    ],
  },
  {
    id: "contact",
    heading: "Contact",
    body: [
      "For privacy questions, email rdrudra99.work@gmail.com. For anything public, open an issue on GitHub.",
    ],
  },
] as const

export default function PrivacyPage() {
  return (
    <PageShell>
      <LegalPage
        title="Privacy at"
        description="Your information matters. We’re committed to handling your data responsibly and transparently."
        updated="23 November 2026"
        sections={[...SECTIONS]}
      />
    </PageShell>
  )
}
