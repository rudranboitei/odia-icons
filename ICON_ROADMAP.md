# OdiaUI Icons — Design Roadmap

## Current Status
- Existing icons: 72 (UI starter set)
- Icon grid: 24x24
- Stroke width: 2px
- Style: Minimal, monochrome, outline
- Stroke caps: Rounded
- Stroke joins: Rounded

> The old 1.5px set is backed up at `backup/old-icons-2026-11-26.tar.gz`. The redesign priorities below apply when those motifs return in the new 2px style.

## Design References
- Minimal monochrome UI icons
- Clean SaaS / shadcn-style interface
- Consistent strokes
- No unnecessary fills, shadows, or gradients
- Cultural icons should remain recognizable but minimal

## Icons to Redesign — Priority 1

1. OliveRidleyTurtle
   - Improve shell definition
   - Make head and flippers more recognizable
   - Ensure silhouette reads at 16px

2. Elephant
   - Refine head and trunk
   - Improve silhouette at small sizes

3. Mridanga
   - Improve drum proportions
   - Make the drum shape more recognizable

4. Paddy
   - Improve grain arrangement
   - Avoid generic plant appearance

5. Swing
   - Make hanging ropes and seat clearer

6. Fish
   - Improve body and tail proportions
7
  folder ==> redeing this icon

## Icons to Polish — Priority 2

- Boita
- Mango
- Kite
- Lotus

## Icons to Keep — No Redesign Needed

- Bell
- Calendar
- ChartBar
- CheckCircle
- CloseCircle
- DeulTemple
- Download
- Edit
- Folder
- Heart
- Home
- KonarkWheel
- Lock
- Mail
- PlusCircle
- Rasagola
- Search
- Settings
- Star
- Trash
- User

## Next Icon Batch — 15 Icons

### Odisha Heritage & Culture
- Jagannath
- Sankha
- Rath
- Odissi
- Gotipua
- Sambalpuri
- Pipili
- Tarakasi
- Kalash
- Udayagiri

### Functional UI
- Eye
- Clock
- Inbox
- Image
- Menu
-command
-code
-terminal
-arrow angled , traight
plus
minus
multipley
etc



### Social Icon
-Github
-google
-facebook
-whatapp
-facebook
-instagram

## Quality Checklist

- [ ] Consistent 24x24 viewBox
- [ ] Consistent 2px stroke
- [ ] Rounded line caps
- [ ] Rounded line joins
- [ ] Optically centered
- [ ] Recognizable at 16px
- [ ] Looks balanced at 20px and 24px
- [ ] Consistent visual weight with existing icons
- [ ] Cultural icons remain minimal
- [ ] No unnecessary details




palm-leaf-manuscript (tala patra), which suits docs, writing and Odia literature
pattachitra (a painted scroll with a brush)
sambalpuri-ikat, a diamond-and-wave textile motif
odisha-map, the state outline, useful for location and region pickers
namaskar, the folded-hands greeting, for welcome and empty states
kalash, the auspicious pot with mango leaves, for success and launch states
chhau-mask, which replaces "Raghurajpur mask" because it's more recognisable
dhauli-stupa
rath-chariot, a simplified Rath Yatra chariot
nila-chakra, the wheel atop the Puri temple
chhena-poda
odissi-mudra, a hand gesture

Batch after that: chilika-dolphin, flamingo, tiger (Simlipal), dhokra-horse, pipili-umbrella, tarakasi (filigree), khaja, dahibara, tulasi-chaura, shankha, bansuri, ghungroo, tahia-crown, hirakud-dam, udayagiri-caves, odia-script (ଅ), mahua, pitha. Together with batch one, that takes you to about 67













Here's what else I found in your repo and on the site. I'm calling these out in priority order.

## Biggest gap: the set itself
- **The old set was mostly generic UI.** It has been backed up and replaced by the 72-icon 2px UI starter set. The Odia motifs below still need to be redrawn in the new style.
- **Pattachitra and Odissi are in your copy but not in the set.** I couldn't find a matching icon for either. Add them or drop the words from the headline.
- **Icons worth adding first:** Jagannath eyes, Odissi dancer or mudra, Pattachitra scroll or motif, Dhauli stupa, Chilika bird, Raghurajpur mask, Rath Yatra chariot, a jhoti pattern, a sambalpuri ikat motif and a Pahala rasagola bowl. Aim for 50 to 60 Odia motifs before a big push.
- **Every icon in `meta/*.json` is marked `needs-review`.** Several notes say "Odia spelling needs a native check". Ask a native Odia speaker to confirm the Odia names (I used ରସଗୋଲା, ଦୀପ, ପଦ୍ମ in the video), then flip the status. A wrong Odia word will get noticed on launch day.

## Discoverability
- **No `robots.txt` and no JSON-LD.** You have `sitemap.ts` but no robots file. Add `robots.ts`, and add `SoftwareSourceCode` or `WebSite` schema so Google understands the site.
- **No analytics.** Add Plausible, Umami or Vercel Analytics so you can see which post drives traffic. Without it you can't tell what's working.
- **Search keywords.** Pages for "Odisha icons", "Indian icons", "Konark icon SVG" and "Pattachitra icons" would capture long-tail searches. Even one `/icons/[name]` page per icon, with its own title and description, helps a lot.

## Credibility and polish
- **GitHub repo:** add topics (`icons`, `svg`, `odisha`, `react`, `shadcn`, `design-system`), a social preview image (your OG image), and a pinned repo. Add a CONTRIBUTING.md and issue templates for "request an icon".
- **npm package:** there's a `publish.yml`, so also add a README preview image, a `homepage` link and keywords to the package.
- **Accessibility:** run a quick pass. I counted only about 47 `aria-label` or empty-`alt` spots across the components, so check icon-only buttons (copy, download), keyboard focus on the grid, and contrast on the muted gray text.
- **Version it:** `0.1.0` is fine, but tag a GitHub release and keep a CHANGELOG so people see it's maintained.

## Product ideas that help adoption
- **Figma file or plugin** for designers. This is probably the biggest reach multiplier.
- **Icon font and a CDN/sprite link** for non-React users. You already have `odiaicons-sprite.svg`, so document it.
- **Download all as ZIP** on the icons page.
- **Weight options:** offer thin and regular, or filled variants, later.

## Before you post
Do these four first, in order: finish the Odia spelling check, add 10 to 15 more Odisha motifs, add robots and analytics, and add repo topics. Everything else can wait until after launch.

Want me to write a prioritized icon-request list with names, Odia spellings to verify and drawing notes, or generate the `robots.ts`, JSON-LD and metadata code for you?
