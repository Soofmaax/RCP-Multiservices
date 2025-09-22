import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import prerender from 'vite-plugin-prerender';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function buildPrerenderRoutes() {
  try {
    const jsonPath = resolve(__dirname, 'src/data/locations.json');
    const raw = readFileSync(jsonPath, 'utf8');
    const data = JSON.parse(raw);
    const routes = new Set(['/','/zones']);
    for (const region of data.regions) {
      for (const dept of region.departments) {
        for (const city of dept.cities) {
          routes.add(`/zones/${region.key}/${city.slug}`);
        }
      }
    }
    return Array.from(routes);
  } catch {
    return ['/', '/zones'];
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    prerender({
      routes: buildPrerenderRoutes(),
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
