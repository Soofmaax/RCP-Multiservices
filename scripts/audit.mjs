/**
 * Automated QA audit for a deployed preview URL.
 *
 * Usage:
 *   BASE_URL="https://deploy-preview-123--rcp-multiservices.netlify.app" node scripts/audit.mjs
 * or:
 *   npm run audit:site -- "https://deploy-preview-123--rcp-multiservices.netlify.app"
 *
 * Output:
 *   Writes a Markdown report to ./audit-report.md with ✅/❌/⚠️ statuses.
 *
 * Notes:
 * - Puppeteer and Lighthouse are optional. If not installed, the audit skips those parts with guidance.
 * - Install them if you want full automation:
 *     npm i -D puppeteer axe-core lighthouse chrome-launcher
 */

import { writeFile } from 'node:fs/promises';

// -------- config & helpers --------
const BASE_URL = process.env.BASE_URL || process.argv[2];
if (!BASE_URL) {
  console.error('ERROR: BASE_URL is required. Use env or pass as argument.\nExample: BASE_URL="https://preview-url" node scripts/audit.mjs');
  process.exit(1);
}

const to = (ms) => new AbortControllerTimeout(ms);
class AbortControllerTimeout {
  constructor(ms) {
    this.controller = new AbortController();
    this.signal = this.controller.signal;
    this.timer = setTimeout(() => this.controller.abort(), ms).unref?.();
  }
  clear() {
    clearTimeout(this.timer);
  }
}

async function safeFetch(url, opts = {}) {
  const abort = to(opts.timeout ?? 15000);
  try {
    const res = await fetch(url, { ...opts, signal: abort.signal });
    abort.clear();
    return res;
  } catch (err) {
    abort.clear();
    return { ok: false, status: 0, error: String(err) };
  }
}

async function fetchText(url, opts = {}) {
  const res = await safeFetch(url, opts);
  if (!res || !res.ok) return null;
  try {
    return await res.text();
  } catch {
    return null;
  }
}

// -------- 1) Link validation via sitemap --------
async function getSitemapUrls() {
  const sitemapUrl = new URL('/sitemap.xml', BASE_URL).href;
  const xml = await fetchText(sitemapUrl);
  if (!xml) return [];
  const locs = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1]);
  return locs;
}

async function checkLinks(urls) {
  const results = [];
  for (const u of urls) {
    const res = await safeFetch(u, { method: 'GET', timeout: 15000 });
    results.push({
      url: u,
      ok: !!res && !!res.ok,
      status: res && 'status' in res ? res.status : 0,
    });
  }
  return results;
}

// -------- 2) Lighthouse (optional) --------
async function runLighthouseIfAvailable() {
  try {
    const { launch } = await import('chrome-launcher');
    const lighthouse = await import('lighthouse');
    const chrome = await launch({ chromeFlags: ['--headless'] });
    const options = {
      logLevel: 'error',
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      port: chrome.port,
    };
    const runnerResult = await lighthouse.default(BASE_URL, options);
    await chrome.kill();
    const lhr = runnerResult.lhr;
    const scores = {
      performance: Math.round((lhr.categories.performance.score || 0) * 100),
      accessibility: Math.round((lhr.categories.accessibility.score || 0) * 100),
      bestPractices: Math.round((lhr.categories['best-practices'].score || 0) * 100),
      seo: Math.round((lhr.categories.seo.score || 0) * 100),
    };
    // Top opportunities (if performance < 90)
    let opportunities = [];
    if (scores.performance < 90 && lhr.audits) {
      opportunities = Object.values(lhr.audits)
        .filter((a) => a.details && a.details.type === 'opportunity' && a.scoreDisplayMode === 'numeric')
        .sort((a, b) => (b.numericValue || 0) - (a.numericValue || 0))
        .slice(0, 3)
        .map((a) => `- ${a.title} (${a.displayValue || ''})`);
    }
    return { scores, opportunities, skipped: false };
  } catch (e) {
    return { skipped: true, reason: 'Lighthouse not installed. Run: npm i -D lighthouse chrome-launcher' };
  }
}

// -------- 3) Accessibility via Axe (optional) --------
async function runAxeOnPages(pages = []) {
  try {
    const puppeteer = await import('puppeteer');
    const browser = await puppeteer.launch({ headless: true });
    const results = [];
    for (const pageUrl of pages) {
      const page = await browser.newPage();
      await page.goto(pageUrl, { waitUntil: 'networkidle0' });
      // inject axe from CDN
      await page.addScriptTag({ url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.7.2/axe.min.js' });
      const axeResults = await page.evaluate(async () => {
        // eslint-disable-next-line no-undef
        const r = await axe.run(document, {
          runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] },
        });
        return r;
      });
      const violations = (axeResults.violations || []).filter(
        (v) => v.impact === 'critical' || v.impact === 'serious',
      );
      results.push({ page: pageUrl, violations });
      await page.close();
    }
    await browser.close();
    return { results, skipped: false };
  } catch (e) {
    return { skipped: true, reason: 'Puppeteer/Axe not installed. Run: npm i -D puppeteer axe-core' };
  }
}

// -------- 4) Security headers --------
async function checkSecurityHeaders() {
  const res = await safeFetch(BASE_URL, { method: 'GET' });
  const headers = res && 'headers' in res ? res.headers : null;
  const read = (name) => (headers ? headers.get(name) : null);
  return {
    hsts: read('strict-transport-security'),
    xfo: read('x-frame-options'),
    xcto: read('x-content-type-options'),
    csp: read('content-security-policy'),
    referrer: read('referrer-policy'),
    coop: read('cross-origin-opener-policy'),
    corp: read('cross-origin-resource-policy'),
    permissions: read('permissions-policy'),
  };
}

// -------- 5) SEO technical --------
async function checkSEO() {
  const robotsUrl = new URL('/robots.txt', BASE_URL).href;
  const sitemapUrl = new URL('/sitemap.xml', BASE_URL).href;
  const robotsOk = !!(await safeFetch(robotsUrl));
  const sitemapOkRes = await safeFetch(sitemapUrl);
  const sitemapOk = !!sitemapOkRes && !!sitemapOkRes.ok;

  // Use puppeteer if available to read meta tags
  let homepage = { title: null, description: null, ogTitle: null, ogDescription: null, ogImage: null };
  try {
    const puppeteer = await import('puppeteer');
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    homepage.title = await page.title();
    homepage.description = await page.$eval('meta[name="description"]', (el) => el.getAttribute('content'));
    homepage.ogTitle = await page.$eval('meta[property="og:title"]', (el) => el.getAttribute('content'));
    homepage.ogDescription = await page.$eval('meta[property="og:description"]', (el) => el.getAttribute('content'));
    homepage.ogImage = await page.$eval('meta[property="og:image"]', (el) => el.getAttribute('content'));
    await browser.close();
  } catch {
    // fallback: mark as unknown if puppeteer not installed
  }
  return { robotsOk, sitemapOk, homepage };
}

// -------- generate report --------
function statusLine(ok, what) {
  return `${ok ? '✅' : '❌'} ${what}`;
}
function warnLine(ok, what) {
  return `${ok ? '✅' : '⚠️'} ${what}`;
}

async function main() {
  const urls = await getSitemapUrls();
  const linkResults = urls.length ? await checkLinks(urls) : [];
  const broken = linkResults.filter((r) => !r.ok || (r.status && r.status >= 400));

  const lighthouse = await runLighthouseIfAvailable();
  const a11y = await runAxeOnPages([
    new URL('/', BASE_URL).href,
    new URL('/services', BASE_URL).href,
    new URL('/contact', BASE_URL).href,
  ]);
  const security = await checkSecurityHeaders();
  const seo = await checkSEO();

  const lines = [];
  lines.push(`# Audit Qualité — ${BASE_URL}\n`);

  // 1) Links
  lines.push(`## 1) Validation des Liens`);
  if (!urls.length) {
    lines.push(`⚠️ Impossible de lire le sitemap à ${new URL('/sitemap.xml', BASE_URL).href}. Vérifiez qu'il est bien généré et déployé.`);
  } else {
    lines.push(`${statusLine(!broken.length, `Aucun lien brisé détecté parmi ${urls.length} URLs`)}`);
    if (broken.length) {
      lines.push(`Liens brisés:`);
      for (const b of broken) lines.push(`- ${b.url} (status: ${b.status || 'N/A'})`);
    }
  }
  lines.push('');

  // 2) Lighthouse
  lines.push(`## 2) Audit de Performance (Lighthouse)`);
  if (lighthouse.skipped) {
    lines.push(`⚠️ Lighthouse non installé. Installez et relancez:\n\`npm i -D lighthouse chrome-launcher\`\n\`BASE_URL="${BASE_URL}" npm run audit:site\``);
  } else {
    const s = lighthouse.scores;
    lines.push(`Scores: Performance ${s.performance}, Accessibilité ${s.accessibility}, Bonnes Pratiques ${s.bestPractices}, SEO ${s.seo}`);
    if (s.performance < 90 && lighthouse.opportunities.length) {
      lines.push(`Principales opportunités:`);
      lighthouse.opportunities.forEach((o) => lines.push(o));
    }
  }
  lines.push('');

  // 3) Accessibilité (Axe)
  lines.push(`## 3) Audit d’Accessibilité (Axe)`);
  if (a11y.skipped) {
    lines.push(`⚠️ Puppeteer/Axe non installés. Installez et relancez:\n\`npm i -D puppeteer axe-core\``);
  } else {
    for (const r of a11y.results) {
      const vio = r.violations;
      lines.push(`- Page: ${r.page}`);
      if (!vio.length) {
        lines.push(`  ✅ Aucune violation “critical/serious”`);
      } else {
        lines.push(`  ❌ Violations “critical/serious” (${vio.length}) :`);
        vio.forEach((v) => {
          lines.push(`    - [${v.impact}] ${v.id}: ${v.help}`);
          if (v.nodes?.length) {
            const example = v.nodes[0];
            const target = Array.isArray(example.target) ? example.target[0] : '';
            lines.push(`      Exemple: ${target}`);
          }
        });
      }
    }
  }
  lines.push('');

  // 4) Sécurité (HTTP headers)
  lines.push(`## 4) Audit de Sécurité (En-têtes HTTP)`);
  lines.push(`${warnLine(!!security.hsts, 'Strict-Transport-Security')}`);
  lines.push(`${warnLine(!!security.xfo, 'X-Frame-Options')}`);
  lines.push(`${warnLine(!!security.xcto, 'X-Content-Type-Options')}`);
  lines.push(`${warnLine(!!security.csp, 'Content-Security-Policy')}`);
  lines.push(`${warnLine(!!security.referrer, 'Referrer-Policy')}`);
  lines.push(`${warnLine(!!security.permissions, 'Permissions-Policy')}`);
  lines.push(`${warnLine(!!security.coop, 'Cross-Origin-Opener-Policy')}`);
  lines.push(`${warnLine(!!security.corp, 'Cross-Origin-Resource-Policy')}`);
  lines.push('');

  // 5) SEO technique
  lines.push(`## 5) Validation SEO Technique`);
  lines.push(`${warnLine(seo.robotsOk, 'robots.txt accessible')}`);
  lines.push(`${warnLine(seo.sitemapOk, 'sitemap.xml accessible')}`);
  if (seo.homepage.title || seo.homepage.description || seo.homepage.ogTitle || seo.homepage.ogDescription || seo.homepage.ogImage) {
    lines.push(`- Homepage meta:`);
    lines.push(`  - title: ${seo.homepage.title || 'N/A'}`);
    lines.push(`  - description: ${seo.homepage.description || 'N/A'}`);
    lines.push(`  - og:title: ${seo.homepage.ogTitle || 'N/A'}`);
    lines.push(`  - og:description: ${seo.homepage.ogDescription || 'N/A'}`);
    lines.push(`  - og:image: ${seo.homepage.ogImage || 'N/A'}`);
  } else {
    lines.push(`⚠️ Métas non inspectées (Puppeteer non installé).`);
  }
  lines.push('');

  const report = lines.join('\n');
  await writeFile('audit-report.md', report, 'utf8');
  console.log(`Audit report written to audit-report.md for ${BASE_URL}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});