#!/usr/bin/env bash
# odia-icons.sh — seed, paste-in and validate icons for odiaicons.
# Run from the repo root (rudranboitei/odia-icons).
#
#   ./odia-icons.sh seed [--build]              write the 10 starter UI icons + meta, then validate
#   ./odia-icons.sh add [-c] <name> <odia> [category]
#                                               paste an SVG (Ctrl-D to finish) or use -c for clipboard
#   ./odia-icons.sh doctor                      read YOUR repo's real conventions and compare
#   ./odia-icons.sh check [name ...]            validate icons (all if none given)
#   ./odia-icons.sh build                       bun run icons:build
#
# Env: FORCE=1 overwrite existing, CATEGORY=ui, SINCE=0.1.0, CONTRIBUTOR=rudranboitei

set -euo pipefail

ICON_DIR="icons/outline"
META_DIR="meta"
CATEGORY="${CATEGORY:-ui}"
SINCE="${SINCE:-0.1.0}"
CONTRIBUTOR="${CONTRIBUTOR:-rudranboitei}"
FORCE="${FORCE:-0}"
STROKE="${STROKE:-2}"
MAX_BYTES=2048

if [[ -t 1 ]]; then R=$'\033[31m'; G=$'\033[32m'; Y=$'\033[33m'; N=$'\033[0m'; else R=""; G=""; Y=""; N=""; fi
ERRORS=0
fail() { echo "  ${R}✗${N} $1"; ERRORS=$((ERRORS + 1)); }
ok()   { echo "  ${G}✓${N} $1"; }
warn() { echo "  ${Y}!${N} $1"; }
die()  { echo "${R}error:${N} $1" >&2; exit 1; }

need_root() {
  [[ -f package.json && -d "$ICON_DIR" && -d "$META_DIR" ]] \
    || die "run this from the odia-icons repo root (needs package.json, $ICON_DIR/, $META_DIR/)"
}

json_arr() { # "a,b,c" -> ["a","b","c"]
  local IFS=',' out="" item
  for item in $1; do
    [[ -z "$item" ]] && continue
    out="${out:+$out, }\"$item\""
  done
  printf '[%s]' "$out"
}

write_meta() { # name odia tags aliases
  cat <<JSON
{
  "name": "$1",
  "odia": "$2",
  "category": "$CATEGORY",
  "tags": $(json_arr "$3"),
  "aliases": $(json_arr "$4"),
  "variants": ["outline"],
  "contributors": ["$CONTRIBUTOR"],
  "since": "$SINCE",
  "note": ""
}
JSON
}

# ---------- seeding ----------
SEEDED=""

seed_one() { # name odia tags aliases  (path data lines on stdin)
  local name="$1" odia="$2" tags="$3" aliases="$4" svg meta d
  svg="$ICON_DIR/$name.svg"; meta="$META_DIR/$name.json"
  if [[ ( -e "$svg" || -e "$meta" ) && "$FORCE" != "1" ]]; then
    warn "$name already exists, skipped (FORCE=1 to overwrite)"
    cat >/dev/null
    return 0
  fi
  {
    printf '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="%s" stroke-linecap="round" stroke-linejoin="round">\n' "$STROKE"
    while IFS= read -r d; do
      [[ -n "$d" ]] && printf '  <path d="%s"/>\n' "$d"
    done
    printf '</svg>\n'
  } > "$svg"
  write_meta "$name" "$odia" "$tags" "$aliases" > "$meta"
  SEEDED="$SEEDED $name"
  echo "  wrote $svg + $meta"
}

seed_all() {
  seed_one home "ଘର" "home,house,main,start,ଘର" "house" <<'PATHS'
M3.5 11.5L12 4l8.5 7.5
M5.5 10v9a1.5 1.5 0 0 0 1.5 1.5h10a1.5 1.5 0 0 0 1.5-1.5v-9
M10 20.5v-4a2 2 0 1 1 4 0
PATHS
  seed_one search "ଖୋଜ" "search,find,lookup,magnifier,ଖୋଜ" "find" <<'PATHS'
M10.5 3.5a7 7 0 1 0 0 14 7 7 0 0 0 0-14z
M15.5 15.5l3.2 3.2c.8.8 2 .6 2.3-.5
PATHS
  seed_one bell "ଘଣ୍ଟି" "bell,alert,notification,reminder,ଘଣ୍ଟି" "notification" <<'PATHS'
M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15z
M10 20.2c.4.5 1.1.8 2 .8s1.6-.3 2-.8
M12 5V4.2c0-.8.6-1.2 1.4-1
PATHS
  seed_one profile "ପ୍ରୋଫାଇଲ୍" "profile,user,account,person,avatar" "user" <<'PATHS'
M12 4.5a3.7 3.7 0 1 0 0 7.4 3.7 3.7 0 0 0 0-7.4z
M4.5 19.8c.5-3.6 3.5-5.8 7.5-5.8s6.5 1.6 7.2 4.5c.2.9-.4 1.7-1.4 1.7
PATHS
  seed_one settings "ସେଟିଂସ୍" "settings,preferences,controls,sliders,adjust" "preferences" <<'PATHS'
M4 8h9M4 16h3M11 16h9
M17 8h2.2c1 0 1.8.7 1.8 1.7
M15 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z
M9 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4z
PATHS
  seed_one download "ଡାଉନଲୋଡ୍" "download,save,arrow,tray" "save" <<'PATHS'
M12 4v11
M7.5 10.5L12 15l4.5-4.5
M4 19.5h12c1.7 0 3-.8 3-2.4
PATHS
  seed_one share "ବାଣ୍ଟ" "share,send,forward,arrow" "forward" <<'PATHS'
M15 5.5l5.5 5.5-5.5 5.5
M20.5 11H11a6.5 6.5 0 0 0-6.5 6.5c0 1.6 1 2.7 2.4 2.7
PATHS
  seed_one message "ବାର୍ତ୍ତା" "message,chat,comment,bubble,ବାର୍ତ୍ତା" "chat" <<'PATHS'
M8.5 16H5.5A2.5 2.5 0 0 1 3 13.5v-7A2.5 2.5 0 0 1 5.5 4h13A2.5 2.5 0 0 1 21 6.5v7a2.5 2.5 0 0 1-2.5 2.5H14
M8.5 16v2.3c0 1.2 1 1.8 1.9.9L14 16
M8 10h6
PATHS
  seed_one heart "ହୃଦୟ" "heart,like,love,favorite,ହୃଦୟ" "like" <<'PATHS'
M12 20.5C5.5 16 3.5 12.8 3.5 9.5 3.5 6.8 5.5 4.8 8 4.8c1.7 0 3.2.9 4 2.4.8-1.5 2.3-2.4 4-2.4 2.5 0 4.5 2 4.5 4.7 0 3.3-2 6.5-8.5 11z
PATHS
  seed_one bookmark "ବୁକମାର୍କ" "bookmark,save,saved,ribbon" "saved" <<'PATHS'
M7 3.5h10a1.5 1.5 0 0 1 1.5 1.5v14.5c0 .9-.9 1.3-1.6.8L12 16.6l-4.9 3.7c-.7.5-1.6.1-1.6-.8V5A1.5 1.5 0 0 1 7 3.5z
PATHS
  :
}

# ---------- validation ----------
check_meta() { # file name
  local f="$1" name="$2" runner=""
  if command -v bun >/dev/null 2>&1; then runner="bun"; elif command -v node >/dev/null 2>&1; then runner="node"; fi
  if [[ -z "$runner" ]]; then
    warn "no bun/node found, JSON structure not checked for $f"
    return 0
  fi
  local msg
  msg="$(META_FILE="$f" META_NAME="$name" "$runner" -e '
    const fs = require("fs");
    let j;
    try { j = JSON.parse(fs.readFileSync(process.env.META_FILE, "utf8")); }
    catch (e) { console.log("invalid JSON: " + e.message); process.exit(0); }
    const errs = [];
    for (const k of ["name","odia","category","tags","aliases","variants","contributors","since","note"])
      if (!(k in j)) errs.push("missing key \"" + k + "\"");
    if (j.name !== process.env.META_NAME) errs.push("name \"" + j.name + "\" does not match file name");
    if (!j.odia || typeof j.odia !== "string") errs.push("odia name is empty");
    if (!Array.isArray(j.tags) || j.tags.length === 0) errs.push("tags must be a non-empty array");
    if (!Array.isArray(j.variants) || !j.variants.includes("outline")) errs.push("variants must include \"outline\"");
    if (!Array.isArray(j.contributors) || j.contributors.length === 0) errs.push("contributors must be a non-empty array");
    console.log(errs.join("; "));
  ' 2>&1)" || true
  if [[ -n "$msg" ]]; then fail "meta/$name.json: $msg"; else ok "meta/$name.json structure"; fi
}

check_one() { # name
  local name="$1" svg meta bytes vals bad
  svg="$ICON_DIR/$name.svg"; meta="$META_DIR/$name.json"
  echo "$name"
  [[ -f "$svg" ]] || { fail "$svg not found"; return 0; }

  [[ "$name" =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]] && ok "kebab-case name" || fail "name must be kebab-case (a-z, 0-9, dashes)"

  bytes=$(wc -c < "$svg" | tr -d ' ')
  if (( bytes <= MAX_BYTES )); then ok "size ${bytes}B (max $MAX_BYTES)"; else fail "size ${bytes}B is over the $MAX_BYTES B budget"; fi

  grep -q '<svg[^>]*xmlns="http://www.w3.org/2000/svg"' "$svg" && ok "xmlns" || fail "missing xmlns=\"http://www.w3.org/2000/svg\""
  grep -q 'viewBox="0 0 24 24"' "$svg" && ok "24x24 grid (viewBox)" || fail "viewBox must be \"0 0 24 24\""

  vals="$(grep -oE 'stroke-width="[^"]*"' "$svg" | sort -u || true)"
  if [[ "$vals" == "stroke-width=\"$STROKE\"" ]]; then ok "stroke-width $STROKE"; else fail "stroke-width must be exactly $STROKE everywhere (found: ${vals:-none})"; fi

  vals="$(grep -oE 'stroke="[^"]*"' "$svg" | sort -u || true)"
  if [[ "$vals" == 'stroke="currentColor"' ]]; then ok "stroke=currentColor"; else fail "stroke must be \"currentColor\" only (found: ${vals:-none})"; fi

  grep -q 'stroke-linecap="round"' "$svg" && ok "round caps" || fail "stroke-linecap=\"round\" missing"
  grep -q 'stroke-linejoin="round"' "$svg" && ok "round joins" || fail "stroke-linejoin=\"round\" missing"

  bad="$(grep -oE 'fill="[^"]*"' "$svg" | grep -v 'fill="none"' || true)"
  if [[ -z "$bad" ]]; then ok "no fills"; else fail "fills are not allowed (found: $bad)"; fi
  grep -qE 'fill="none"' "$svg" && ok "fill=none" || fail "root needs fill=\"none\""

  if grep -qiE '#[0-9a-f]{3,8}\b|rgba?\(|hsla?\(' "$svg"; then fail "hard-coded colors found, use currentColor"; else ok "no hard-coded colors"; fi
  if grep -qiE '<(style|script|image|text|filter|mask|foreignObject|use)\b' "$svg"; then fail "disallowed element (style/script/image/text/filter/mask/use)"; else ok "clean elements"; fi
  grep -q '<path\|<circle\|<line\|<rect\|<polyline\|<polygon\|<ellipse' "$svg" && ok "has shapes" || fail "no drawable shapes"

  if [[ -f "$meta" ]]; then check_meta "$meta" "$name"; else fail "$meta not found"; fi
}


# ---------- doctor: learn the repo's real conventions ----------
top_values() { # attr-regex files... -> most common values, one per line "count value"
  local re="$1"; shift
  grep -ohE "$re" "$@" 2>/dev/null | sort | uniq -c | sort -rn | head -5 | sed 's/^ *//' || true
}

cmd_doctor() {
  need_root
  local existing=() f n
  for f in "$ICON_DIR"/*.svg; do [[ -e "$f" ]] && existing+=("$f"); done
  echo "Repo check"
  if (( ${#existing[@]} == 0 )); then
    warn "no icons in $ICON_DIR yet, nothing to learn from"
  else
    ok "${#existing[@]} existing icons in $ICON_DIR"
    echo "  stroke-width used by your icons:"; top_values 'stroke-width="[^"]*"' "${existing[@]}" | sed 's/^/      /'
    echo "  viewBox used by your icons:";      top_values 'viewBox="[^"]*"' "${existing[@]}" | sed 's/^/      /'
    local dom
    dom="$(top_values 'stroke-width="[^"]*"' "${existing[@]}" | head -1 | sed -E 's/^[0-9]+ stroke-width="([^"]*)"/\1/' || true)"
    if [[ -n "$dom" && "$dom" != "$STROKE" ]]; then
      warn "your icons mostly use stroke-width $dom but this script enforces $STROKE (set STROKE=$dom to match, or leave as is)"
    fi
  fi
  local metas=()
  for f in "$META_DIR"/*.json; do [[ -e "$f" ]] && metas+=("$f"); done
  if (( ${#metas[@]} > 0 )); then
    echo "  categories used in meta/:"; top_values '"category": *"[^"]*"' "${metas[@]}" | sed 's/^/      /'
    if ! grep -qE "\"category\": *\"$CATEGORY\"" "${metas[@]}"; then
      warn "no existing icon uses category \"$CATEGORY\", pick one above with CATEGORY=<name> ./odia-icons.sh seed"
    fi
  fi
  # name / alias collisions for the starter set
  local names="home search bell profile settings download share message heart bookmark" hit=0
  for n in $names; do
    if [[ -e "$ICON_DIR/$n.svg" ]]; then continue; fi
    if (( ${#metas[@]} > 0 )) && grep -lE "\"(name|aliases)\".*\"$n\"" "${metas[@]}" >/dev/null 2>&1; then
      warn "\"$n\" is already used as a name or alias in another meta file, it may clash"; hit=1
    fi
  done
  (( hit == 0 )) && ok "no name/alias clashes for the starter icons"
  if [[ -f package.json ]]; then
    grep -q '"icons:validate"' package.json && ok "icons:validate script found" || warn "no icons:validate script in package.json"
    grep -q '"icons:build"' package.json && ok "icons:build script found" || warn "no icons:build script in package.json"
  fi
  command -v bun >/dev/null 2>&1 && ok "bun $(bun --version)" || warn "bun not found on PATH"
  [[ -f SKILL.md ]] && ok "SKILL.md present: read it once, these checks mirror the README, SKILL.md is the final authority" || warn "SKILL.md not found"
}

run_repo_validate() {
  echo
  if [[ -f package.json ]] && grep -q '"icons:validate"' package.json && command -v bun >/dev/null 2>&1; then
    echo "repo validator: bun run icons:validate"
    bun run icons:validate || ERRORS=$((ERRORS + 1))
  else
    warn "skipped 'bun run icons:validate' (bun or the script was not found), run it yourself"
  fi
}

cmd_check() {
  need_root
  local names=("$@") f
  if (( ${#names[@]} == 0 )); then
    for f in "$ICON_DIR"/*.svg; do
      [[ -e "$f" ]] || continue
      f="${f##*/}"; names+=("${f%.svg}")
    done
  fi
  (( ${#names[@]} > 0 )) || die "no icons found in $ICON_DIR"
  local n
  for n in "${names[@]}"; do check_one "$n"; done
  run_repo_validate
  echo
  if (( ERRORS > 0 )); then echo "${R}$ERRORS problem(s) found${N}"; return 1; fi
  echo "${G}all checks passed${N}"
}

cmd_build() { need_root; bun run icons:build; }

cmd_seed() {
  need_root
  local build=0
  [[ "${1:-}" == "--build" ]] && build=1
  cmd_doctor
  echo
  echo "Seeding starter icons"
  seed_all
  if [[ -z "$SEEDED" ]]; then echo "nothing new to check"; return 0; fi
  # shellcheck disable=SC2086
  cmd_check $SEEDED
  (( build == 1 )) && cmd_build
  return 0
}

clip_read() {
  if command -v pbpaste >/dev/null 2>&1; then pbpaste
  elif command -v wl-paste >/dev/null 2>&1; then wl-paste
  elif command -v xclip >/dev/null 2>&1; then xclip -selection clipboard -o
  elif command -v powershell.exe >/dev/null 2>&1; then powershell.exe -command Get-Clipboard | tr -d '\r'
  else die "no clipboard tool found (pbpaste, wl-paste, xclip), paste into the terminal instead"
  fi
}

cmd_add() {
  need_root
  local use_clip=0
  if [[ "${1:-}" == "-c" || "${1:-}" == "--clipboard" ]]; then use_clip=1; shift; fi
  local name="${1:-}" odia="${2:-}" cat_="${3:-$CATEGORY}"
  [[ -n "$name" && -n "$odia" ]] || die "usage: $0 add [-c] <name> <odia-name> [category]"
  [[ "$name" =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]] || die "name must be kebab-case, e.g. konark-wheel"
  if [[ ( -e "$ICON_DIR/$name.svg" || -e "$META_DIR/$name.json" ) && "$FORCE" != "1" ]]; then
    die "$name already exists (FORCE=1 to overwrite)"
  fi
  local svg
  if (( use_clip == 1 )); then
    svg="$(clip_read)"
  else
    [[ -t 0 ]] && echo "Paste the SVG, then press Ctrl-D on a new line:"
    svg="$(cat)"
  fi
  [[ "$svg" == *"<svg"* && "$svg" == *"</svg>"* ]] || die "that does not look like an SVG (needs <svg ...> ... </svg>)"
  printf '%s\n' "$svg" > "$ICON_DIR/$name.svg"
  CATEGORY="$cat_" write_meta "$name" "$odia" "$name" "" > "$META_DIR/$name.json"
  echo "wrote $ICON_DIR/$name.svg + $META_DIR/$name.json (edit tags/aliases in the json)"
  cmd_check "$name"
}

usage() { sed -n '2,14p' "$0" | sed 's/^# \{0,1\}//'; }

case "${1:-help}" in
  seed)  shift; cmd_seed "$@" ;;
  add)   shift; cmd_add "$@" ;;
  doctor) cmd_doctor ;;
  check) shift; cmd_check "$@" ;;
  build) cmd_build ;;
  help|-h|--help) usage ;;
  *) usage; exit 1 ;;
esac
