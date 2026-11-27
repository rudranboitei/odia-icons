#!/usr/bin/env node
/**
 * Generate typed React components from ../../../icons/outline/*.svg.
 *
 * Run from packages/react:
 *   node scripts/build.mjs
 *
 * The generated files live in packages/react/src and are gitignored.
 */
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(scriptDir, "..");
const iconsDir = path.resolve(scriptDir, "../../../icons/outline");
const srcDir = path.resolve(packageRoot, "src");

const ATTR_ALIASES = {
  class: "className",
  for: "htmlFor",
  "xlink:href": "xlinkHref",
  "xml:space": "xmlSpace",
  "xml:lang": "xmlLang",
  "xmlns:xlink": "xmlnsXlink",
};

/** `olive-ridley-turtle` -> `OliveRidleyTurtle`; digits get an `Icon` prefix. */
function toComponentName(fileName) {
  const base = fileName.replace(/\.svg$/i, "");
  const words = base.split(/[^a-zA-Z0-9]+/).filter(Boolean);

  if (words.length === 0) {
    throw new Error(`Cannot create a component name from "${fileName}".`);
  }

  let name = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

  if (/^[0-9]/.test(name)) {
    name = `Icon${name}`;
  }

  return name;
}

/** SVG attribute -> React/JSX attribute. Handles data-* and aria-*. */
function toReactAttributeName(name) {
  if (ATTR_ALIASES[name]) return ATTR_ALIASES[name];
  if (name.startsWith("data-") || name.startsWith("aria-")) return name;
  if (!name.includes("-") && !name.includes(":")) return name;

  const camel = name.replace(/[-:]+([a-zA-Z0-9])/g, (_, char) =>
    char.toUpperCase(),
  );

  return ATTR_ALIASES[camel] ?? camel;
}

/** Convert an inline CSS string into a React style object literal. */
function styleToObject(style) {
  const declarations = style
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean);

  const entries = [];

  for (const declaration of declarations) {
    const colon = declaration.indexOf(":");
    if (colon === -1) continue;

    const property = declaration.slice(0, colon).trim();
    const value = declaration.slice(colon + 1).trim();
    if (!property) continue;

    const camelProperty = property.startsWith("--")
      ? property
      : property.replace(/-([a-z])/g, (_, char) => char.toUpperCase());

    const key = camelProperty.startsWith("--")
      ? JSON.stringify(camelProperty)
      : camelProperty;

    entries.push(`${key}: ${JSON.stringify(value)}`);
  }

  return entries.length ? `{ ${entries.join(", ")} }` : "{}";
}

/** Parse and rewrite the attributes inside one opening tag. */
function convertAttributes(rawAttributes) {
  let attributes = rawAttributes.trim();
  let selfClosing = false;

  if (attributes.endsWith("/")) {
    selfClosing = true;
    attributes = attributes.slice(0, -1).trim();
  }

  if (!attributes) return { attributes: "", selfClosing };

  const output = [];
  const attributeRe =
    /([a-zA-Z_:][a-zA-Z0-9_.:-]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;

  let match;
  while ((match = attributeRe.exec(attributes)) !== null) {
    const rawName = match[1];
    const value = match[2] ?? match[3] ?? match[4];

    if (!rawName) continue;

    const name = toReactAttributeName(rawName);

    if (value === undefined) {
      output.push(name);
      continue;
    }

    if (rawName === "style") {
      output.push(`${name}={${styleToObject(value)}}`);
      continue;
    }

    const escaped = value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    output.push(`${name}="${escaped}"`);
  }

  return { attributes: output.join(" "), selfClosing };
}

/** Convert raw SVG inner markup into JSX child markup. */
function svgInnerToJsx(inner) {
  return inner
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<\?xml[\s\S]*?\?>/gi, "")
    .replace(/<!DOCTYPE[\s\S]*?>/gi, "")
    .replace(
      /<([a-zA-Z][\w:.-]*)([^>]*?)(\/?)>/g,
      (fullTag, tagName, rawAttributes, slash) => {
        const { attributes, selfClosing } = convertAttributes(rawAttributes);
        const isSelfClosing = slash === "/" || selfClosing;

        return `<${tagName}${attributes ? ` ${attributes}` : ""}${
          isSelfClosing ? " />" : ">"
        }`;
      },
    )
    .trim();
}

function componentSource(componentName, innerJsx) {
  const body = innerJsx.replace(/\n/g, "\n      ").trim();

  return `import * as React from "react";

export interface ${componentName}Props extends React.SVGProps<SVGSVGElement> {
  /** Width and height of the icon. Defaults to 24. */
  size?: number | string;
}

export const ${componentName} = React.forwardRef<
  SVGSVGElement,
  ${componentName}Props
>(({ size = 24, strokeWidth = 2, ...props }, ref) => (
  <svg
    ref={ref}
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    ${body}
  </svg>
));

${componentName}.displayName = "${componentName}";
`;
}

async function main() {
  let entries;

  try {
    entries = await readdir(iconsDir);
  } catch {
    throw new Error(
      `Could not read the icons directory at ${iconsDir}. ` +
        "Run this script from packages/react and make sure icons/outline exists.",
    );
  }

  const files = entries
    .filter((file) => file.toLowerCase().endsWith(".svg"))
    .sort((a, b) => a.localeCompare(b));

  if (files.length === 0) {
    throw new Error(`No SVG files found in ${iconsDir}.`);
  }

  const components = new Map();

  for (const file of files) {
    const componentName = toComponentName(file);

    if (components.has(componentName)) {
      throw new Error(
        `Both "${components.get(componentName)}" and "${file}" map to ` +
          `"${componentName}". Rename one of the SVG files.`,
      );
    }

    components.set(componentName, file);
  }

  await rm(srcDir, { recursive: true, force: true });
  await mkdir(srcDir, { recursive: true });

  const indexLines = [];

  for (const [componentName, file] of components) {
    const svg = await readFile(path.join(iconsDir, file), "utf8");
    const match = svg.match(/<svg\b[^>]*>([\s\S]*?)<\/svg>/i);

    if (!match) {
      throw new Error(`Could not find an <svg> element in "${file}".`);
    }

    const innerJsx = svgInnerToJsx(match[1]);

    if (!innerJsx) {
      throw new Error(`The SVG "${file}" has no inner markup.`);
    }

    await writeFile(
      path.join(srcDir, `${componentName}.tsx`),
      componentSource(componentName, innerJsx),
      "utf8",
    );

    indexLines.push(
      `export { ${componentName} } from "./${componentName}";`,
      `export type { ${componentName}Props } from "./${componentName}";`,
    );
  }

  await writeFile(
    path.join(srcDir, "index.ts"),
    `${indexLines.join("\n")}\n`,
    "utf8",
  );

  const readmePath = path.join(packageRoot, "README.md");
  const readme = await readFile(readmePath, "utf8");
  const syncedReadme = readme.replace(
    /- \d+ icons/g,
    `- ${components.size} icons`,
  );
  if (syncedReadme !== readme) {
    await writeFile(readmePath, syncedReadme, "utf8");
  }

  console.log(
    `Generated ${components.size} icon components in ${path.relative(
      process.cwd(),
      srcDir,
    )}.`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
