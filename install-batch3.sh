#!/usr/bin/env bash
# Run from the repo root: bash install-batch3.sh
set -e
mkdir -p icons/outline meta
cat > icons/outline/chart-bar.svg <<'EOF_SVG'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="3.5" width="17" height="17" rx="2.5"/><path d="M8 16.5v-3M12 16.5V8M16 16.5v-5.5"/></svg>
EOF_SVG
cat > meta/chart-bar.json <<'EOF_JSON'
{
  "name": "chart-bar",
  "odia": "ଚାର୍ଟ",
  "category": "ui",
  "tags": [
    "chart",
    "bar-chart",
    "analytics",
    "graph",
    "stats",
    "dashboard",
    "ଚାର୍ଟ"
  ],
  "aliases": [
    "bar-chart",
    "analytics"
  ],
  "variants": [
    "outline"
  ],
  "contributors": [
    "rudranboitei"
  ],
  "since": "0.1.0",
  "status": "needs-review",
  "note": "Odia text is a transliteration of the English word; needs a native check."
}
EOF_JSON
cat > icons/outline/trash.svg <<'EOF_SVG'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 6.5h17"/><path d="M9.5 6.5V5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1.5"/><path d="M5.5 9.5h13l-.9 8.5a2.5 2.5 0 0 1-2.5 2.5H8.9A2.5 2.5 0 0 1 6.4 18z"/></svg>
EOF_SVG
cat > meta/trash.json <<'EOF_JSON'
{
  "name": "trash",
  "odia": "ଅଳିଆ",
  "category": "ui",
  "tags": [
    "trash",
    "bin",
    "delete",
    "remove",
    "garbage",
    "dashboard",
    "ଅଳିଆ"
  ],
  "aliases": [
    "bin",
    "delete"
  ],
  "variants": [
    "outline"
  ],
  "contributors": [
    "rudranboitei"
  ],
  "since": "0.1.0",
  "status": "needs-review",
  "note": "Odia text is a guess and needs a native check."
}
EOF_JSON
cat > icons/outline/download.svg <<'EOF_SVG'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5v11M7.5 10.5l4.5 4.5 4.5-4.5"/><path d="M4.5 15.5v2a2.5 2.5 0 0 0 2.5 2.5h10a2.5 2.5 0 0 0 2.5-2.5v-2"/></svg>
EOF_SVG
cat > meta/download.json <<'EOF_JSON'
{
  "name": "download",
  "odia": "ଡାଉନଲୋଡ୍",
  "category": "ui",
  "tags": [
    "download",
    "save",
    "arrow",
    "import",
    "tray",
    "dashboard",
    "ଡାଉନଲୋଡ୍"
  ],
  "aliases": [],
  "variants": [
    "outline"
  ],
  "contributors": [
    "rudranboitei"
  ],
  "since": "0.1.0",
  "status": "needs-review",
  "note": "Odia text is a transliteration of the English word; needs a native check."
}
EOF_JSON
cat > icons/outline/kite.svg <<'EOF_SVG'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 18 9.4 12 15.75 6 9.4z"/><path d="M12 3v12.75M6 9.4h12"/><path d="M12 15.75c-1.4.7-1.4 1.5 0 2.2s1.4 1.5 0 2.3"/></svg>
EOF_SVG
cat > meta/kite.json <<'EOF_JSON'
{
  "name": "kite",
  "odia": "ଗୁଡ଼ି",
  "category": "culture",
  "tags": [
    "kite",
    "gudi",
    "sky",
    "flying",
    "play",
    "odisha",
    "ଗୁଡ଼ି"
  ],
  "aliases": [],
  "variants": [
    "outline"
  ],
  "contributors": [
    "rudranboitei"
  ],
  "since": "0.1.0",
  "status": "needs-review",
  "note": "Odia spelling needs a native check."
}
EOF_JSON
cat > icons/outline/lotus.svg <<'EOF_SVG'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4.5c2.4 2.9 3 6.2 0 10.5-3-4.3-2.4-7.6 0-10.5z"/><path d="M3.5 10.5c3.2.2 5.6 1.8 8.5 5.5 2.9-3.7 5.3-5.3 8.5-5.5-.6 5.8-4.2 9-8.5 9s-7.9-3.2-8.5-9z"/></svg>
EOF_SVG
cat > meta/lotus.json <<'EOF_JSON'
{
  "name": "lotus",
  "odia": "ପଦ୍ମ",
  "category": "nature",
  "tags": [
    "lotus",
    "padma",
    "flower",
    "nature",
    "water",
    "odisha",
    "ପଦ୍ମ"
  ],
  "aliases": [
    "padma"
  ],
  "variants": [
    "outline"
  ],
  "contributors": [
    "rudranboitei"
  ],
  "since": "0.1.0",
  "status": "needs-review",
  "note": "The lotus is also a religious symbol: do a culture review before release. Odia spelling needs a native check."
}
EOF_JSON
wc -c icons/outline/chart-bar.svg icons/outline/trash.svg icons/outline/download.svg icons/outline/kite.svg icons/outline/lotus.svg
bun run icons:validate && bun run icons:build
