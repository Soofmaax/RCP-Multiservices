/** @type {import('next-sitemap').IConfig} */
const fs = require('node:fs');
const path = require('node:path');

const SITE_URL = 'https://www.rcp-multiservices.com';

function getCityPaths() {
  try {
    const jsonPath = path.resolve(__dirname, 'data', 'locations.json');
    const raw = fs.readFileSync(jsonPath, 'utf8');
    const data = JSON.parse(raw);
    /** @type {string[]} */
    const routes = [];
    routes.push('/zones');
    for (const region of data.regions) {
      for (const dpt of region.departments) {
        for (const city of dpt.cities) {
          routes.push(`/zones/${region.key}/${city.slug}`);
        }
      }
    }
    return routes;
  } catch {
    return ['/zones'];
  }
}

module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  outDir: 'public',
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  trailingSlash: false,
  additionalPaths: async (config) => {
    const extra = getCityPaths().map((loc) => ({
      loc,
      changefreq: 'weekly',
      priority: loc === '/zones' ? 0.8 : 0.7,
    }));
    // Ensure core pages present explicitly
    const core = [
      { loc: '/', priority: 1.0, changefreq: 'weekly' },
      { loc: '/services', priority: 0.8, changefreq: 'monthly' },
      { loc: '/contact', priority: 0.6, changefreq: 'monthly' },
    ];
    return [...core, ...extra];
  },
};