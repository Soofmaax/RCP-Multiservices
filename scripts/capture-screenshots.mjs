import { mkdir, writeFile, readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const SITE_URL = process.env.SITE_URL || 'https://www.rcp-multiservices.com';

// Pages to capture (path, output name, selector to wait for)
const PAGES = [
  { path: '/', name: 'hero-desktop', selector: 'h1.heading-1' },
  { path: '/zones', name: 'zones-map', selector: '.leaflet-container' },
  { path: '/zones/ile-de-france/paris', name: 'city-paris', selector: 'h1' },
  { path: '/services', name: 'services', selector: 'h1' },
  { path: '/contact', name: 'contact', selector: 'h1' },
];

async function ensureDir(dir) {
  try {
    await stat(dir);
  } catch {
    await mkdir(dir, { recursive: true });
  }
}

async function captureAll() {
  let puppeteer;
  try {
    // dynamic import to avoid mandatory devDependency if unused
    puppeteer = await import('puppeteer');
  } catch (e) {
    console.error(
      'Puppeteer n’est pas installé. Installez-le puis relancez:\n  npm i -D puppeteer\n  npm run screenshots',
    );
    process.exit(1);
  }

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const outDir = resolve('public/screenshots');
  await ensureDir(outDir);

  const results = [];
  for (const p of PAGES) {
    const url = new URL(p.path, SITE_URL).toString();
    console.log(`→ Capture ${url}`);
    await page.goto(url, { waitUntil: 'networkidle0' });
    try {
      await page.waitForSelector(p.selector, { timeout: 15000 });
    } catch {
      console.warn(`Sélecteur non trouvé: ${p.selector}. Capture quand même.`);
    }
    const outPath = resolve(outDir, `${p.name}.png`);
    await page.screenshot({ path: outPath, fullPage: true });
    results.push({ name: p.name, file: `public/screenshots/${p.name}.png`, url });
    console.log(`✓ Screenshot: ${outPath}`);
  }

  await browser.close();
  return results;
}

function buildMarkdownBlock(items) {
  const lines = [
    '<!-- screenshots:start -->',
    '',
    ...items.map(
      (it) =>
        `![${it.name}](${it.file})`,
    ),
    '',
    '<!-- screenshots:end -->',
  ];
  return lines.join('\n');
}

async function updateReadme(items) {
  const mdBlock = buildMarkdownBlock(items);
  const readmePath = resolve('README.md');
  let content = await readFile(readmePath, 'utf8');

  const startMarker = '<!-- screenshots:start -->';
  const endMarker = '<!-- screenshots:end -->';

  if (content.includes(startMarker) && content.includes(endMarker)) {
    const start = content.indexOf(startMarker);
    const end = content.indexOf(endMarker) + endMarker.length;
    const before = content.slice(0, start);
    const after = content.slice(end);
    content = `${before}${mdBlock}${after}`;
  } else {
    // Insert after "## Captures (Screenshots)" section header if markers not present
    const header = '## Captures (Screenshots)';
    const idx = content.indexOf(header);
    if (idx !== -1) {
      const insertPos = idx + header.length;
      content = `${content.slice(0, insertPos)}\n\n${mdBlock}\n${content.slice(insertPos)}`;
    } else {
      // Append at end
      content = `${content}\n\n${mdBlock}\n`;
    }
  }

  await writeFile(readmePath, content, 'utf8');
  console.log(`✓ README mis à jour avec les captures`);
}

async function main() {
  console.log(`Base URL: ${SITE_URL}`);
  const items = await captureAll();
  await updateReadme(items);
  console.log('Terminé.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});