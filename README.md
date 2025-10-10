# RCP Multiservices — Vite + React + TypeScript

CI intégrée: Prettier (check), ESLint (strict), TypeScript (strict), Vitest (coverage 80%), Build Vite, Audit sécurité.

## Démarrer

- Installer
  - npm install
- Développement
  - npm run dev
- Lint / Typecheck / Tests
  - npm run lint
  - npm run typecheck
  - npm run test
- Build
  - npm run build
  - npm run preview

## SEO local (Île-de-France et Normandie)

- Pages villes depuis `src/data/locations.json`:
  - Routes `/zones/:region/:city`
  - Balises Helmet par page (title, description, canonical, Open Graph/Twitter)
  - JSON-LD: Service, Breadcrumb, FAQ, WebSite (home)
- Sitemap/robots:
  - `scripts/generate-sitemap.mjs` exécuté en `postbuild`
  - `public/robots.txt` inclut l’URL du sitemap
- Prérendu (SSG):
  - Actuellement non activé via plugin
  - Option: basculer vers Next.js (App Router, SSG+ISR) ou `vite-ssg` si nécessaire

## Avis Google (Netlify Functions)

- Front consomme un endpoint JSON:
  - Par défaut: `/api/google-reviews` (redirigé vers `/.netlify/functions/google-reviews`)
  - Overridable: `VITE_REVIEWS_ENDPOINT` (voir `.env.example`)
- Netlify function:
  - Fichier: `netlify/functions/google-reviews.ts`
  - Env variables dans Netlify:
    - `GOOGLE_MAPS_API_KEY`: clé Google Maps avec Places API activée
    - `GOOGLE_PLACE_ID`: Place ID de l’établissement (Place ID Finder)
  - CORS géré, renvoie `{ reviews: Review[] }` (max 5)
  - Cache en mémoire (12h) pour limiter les appels API
- Composants front:
  - `src/components/Reviews.tsx` (avec `src/lib/reviews.ts`) — sur `CityPage`
  - `src/components/GoogleReviewsBadge.tsx` — badge “Avis Google” si `VITE_GBP_URL` est défini
  - `src/components/QuickCall.tsx` — bouton “Appeler” mobile, affiché globalement

### Ajouter vos clés, Place ID et URL Google Business

1) Dans Netlify, Site settings → Environment variables:
   - `GOOGLE_MAPS_API_KEY=...`
   - `GOOGLE_PLACE_ID=...`
2) Déploiement: l’endpoint `/api/google-reviews` servira les avis.
3) Optionnel (front):
   - `VITE_GBP_URL=https://g.page/r/xxxxxxxx` (affiche le badge “Avis Google”)

## UX — ce qui a été ajouté

- Micro‑animations discrètes:
  - Boutons (primaires/secondaires): transition, hover scale
  - Liens villes: hover background bleu clair + transition
- CTA mobile “Appeler” rapide:
  - `QuickCall` (mobile only, fixed en bas à droite), tel:+33743670815
- Maillage interne “Villes proches”:
  - Sur `CityPage`, section listant jusqu’à 8 villes du même département
- FAQ enrichie:
  - Ajout d’une question “Qualifiés et assurés ?” sur `CityPage`

## Roadmap — à faire plus tard (guide)

- Créer vos comptes et Google Business Profile:
  - Récupérer l’URL publique GBP → définir `VITE_GBP_URL`
  - Récupérer le `GOOGLE_PLACE_ID` → définir dans Netlify avec `GOOGLE_MAPS_API_KEY`
  - (Optionnel) Ajouter les liens sameAs (GBP, LinkedIn, X/Twitter, Instagram, Facebook) dans le JSON‑LD LocalBusiness
- Ajouter un og:image par défaut:
  - Placer un asset (ex: `public/og-default.jpg`)
  - Référencer dans Helmet des pages (Open Graph/Twitter images)
- Étoffer le contenu SEO local:
  - Enrichir `src/data/locations.json` et les sections “Prestations”/“Villes proches”
  - Ajouter témoignages réels et agrégation d’avis (front consommera l’endpoint)
- Performance:
  - Optimiser images (WebP/AVIF), tailles explicites, lazy‑loading
  - Fonts locales avec `font-display: swap` (si besoin)
- Accessibilité:
  - Vérifier alt des images, labels des inputs, focus visible
- (Option) Migration SSG/ISR:
  - Migrer vers Next.js pour SSG+ISR (pages villes massives, rafraîchissement automatique)

## Scripts

- Format:
  - `npm run format` / `npm run format:check`
- Lint strict:
  - `npm run lint:ci` (échoue sur le moindre warning)
- Typecheck:
  - `npm run typecheck`
- Tests:
  - `npm run test` / `npm run test:ci` (coverage ≥ 80%)
- Build:
  - `npm run build` (puis `postbuild` génère `dist/sitemap.xml`)

## Déploiement Netlify

- `netlify.toml`:
  - Publish: `dist`
  - Functions: `netlify/functions`
  - Redirect: `/api/*` → `/.netlify/functions/:splat`

## Personnalisation SEO

- Pages:
  - `src/pages/CityPage.tsx`, `src/pages/ServicesPage.tsx`, `src/pages/ContactPage.tsx`, `src/pages/ZonesIndex.tsx`
- Données:
  - `src/data/locations.json` (+ types et helpers dans `src/data/locations.ts`)

## Contrib

- Respectez Prettier/ESLint/TS.
- Ajoutez des tests pour maintenir la couverture ≥ 80%.