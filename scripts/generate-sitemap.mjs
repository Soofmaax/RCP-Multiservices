import { writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import locations from '../src/data/locations.json' assert { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Change this to your production domain
const SITE_URL = 'https://www.rcp-multiservices.com';

function url(loc) {
  return `  <url><loc>${loc}</loc></url>`;
}

function buildUrls() {
  const urls = new Set();
  urls.add(`${SITE_URL}/`);
  urls.add(`${SITE_URL}/zones`);

  for (const region of locations.regions) {
    for (const dept of region.departments) {
      for (const city of dept.cities) {
        urls.add(`${SITE_URL}/zones/${region.key}/${city.slug}`);
      }
    }
  }
  return Array.from(urls);
}

async function main() {
  const urls = buildUrls();
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(url),
    '</urlset>'
  ].join('\n');

  const distDir = resolve(__dirname, '../dist');
  try {
    await mkdir(distDir, { recursive: true });
  } catch (e) {
    // ignore
  }
  const out = resolve(distDir, 'sitemap.xml');
  await writeFile(out, body, 'utf8');
  console.log(`Sitemap written to ${out} with ${urls.length} URLs`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});