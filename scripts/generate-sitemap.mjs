import { writeFile, mkdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Change this to your production domain
const SITE_URL = 'https://www.rcp-multiservices.com';

function url(loc) {
  return `  <url><loc>${loc}</loc></url>`;
}

async function loadLocations() {
  const jsonPath = resolve(__dirname, '../src/data/locations.json');
  const raw = await readFile(jsonPath, 'utf8');
  return JSON.parse(raw);
}

function buildUrls(locations) {
  const urls = new Set();
  urls.add(`${SITE_URL}/`);
  urls.add(`${SITE_URL}/zones`);
  urls.add(`${SITE_URL}/services`);
  urls.add(`${SITE_URL}/services/aide-a-domicile`);
  urls.add(`${SITE_URL}/services/menage-repassage`);
  urls.add(`${SITE_URL}/services/jardinage`);
  urls.add(`${SITE_URL}/contact`);

  for (const region of locations.regions) {
    // Region-level URL
    urls.add(`${SITE_URL}/zones/${region.key}`);
    for (const dept of region.departments) {
      for (const city of dept.cities) {
        urls.add(`${SITE_URL}/zones/${region.key}/${city.slug}`);
      }
    }
  }
  return Array.from(urls);
}

async function main() {
  const locations = await loadLocations();
  const urls = buildUrls(locations);
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(url),
    '</urlset>'
  ].join('\n');

  const distDir = resolve(__dirname, '../dist');
  try {
    await mkdir(distDir, { recursive: true });
  } catch {
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