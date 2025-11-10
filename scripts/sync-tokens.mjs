/**
 * Sync RGB triplets in src/styles/tokens.css from their corresponding hex variables.
 * Run: npm run tokens:sync
 */
import { readFile, writeFile } from 'node:fs/promises';

const TOKENS_PATH = 'src/styles/tokens.css';

// Variables that should produce a matching `--<name>-rgb: r g b;`
const VARS = [
  'color-primary',
  'color-secondary',
  'color-info',
  'color-success',
  'color-warning',
  'color-danger',
  'text-dark',
  'text-medium',
  'text-light',
  'bg-dark',
  'bg-light',
  'bg-info',
  'bg-success',
  'bg-warning',
  'bg-danger',
  'border-color',
];

function hexToRgbTuple(hex) {
  const h = hex.replace('#', '').trim();
  if (h.length === 3) {
    const r = parseInt(h[0] + h[0], 16);
    const g = parseInt(h[1] + h[1], 16);
    const b = parseInt(h[2] + h[2], 16);
    return [r, g, b];
  }
  if (h.length === 6) {
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return [r, g, b];
  }
  throw new Error(`Unsupported hex format: ${hex}`);
}

async function main() {
  let css = await readFile(TOKENS_PATH, 'utf8');

  for (const name of VARS) {
    const hexVarRe = new RegExp(`--${name}\\s*:\\s*#([0-9a-fA-F]{3,6})\\s*;`);
    const hexMatch = css.match(hexVarRe);
    if (!hexMatch) {
      console.warn(`Warn: hex variable --${name} not found; skipping.`);
      continue;
    }
    const hex = `#${hexMatch[1]}`;
    const [r, g, b] = hexToRgbTuple(hex);
    const rgbStr = `${r} ${g} ${b}`;

    const rgbVarRe = new RegExp(`--${name}-rgb\\s*:\\s*[^;]+\\s*;`);
    if (rgbVarRe.test(css)) {
      css = css.replace(rgbVarRe, `--${name}-rgb: ${rgbStr};`);
    } else {
      // Insert the -rgb line immediately after the hex declaration
      css = css.replace(hexVarRe, (m) => `${m}\n  --${name}-rgb: ${rgbStr};`);
    }
    console.log(`Updated --${name}-rgb: ${rgbStr}`);
  }

  await writeFile(TOKENS_PATH, css, 'utf8');
  console.log('tokens.css synced successfully.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});