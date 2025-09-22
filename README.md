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

- Pages villes générées depuis `src/data/locations.json`:
  - Routes `/zones/:region/:city`
  - Balises Helmet (title, description, canonical, Open Graph)
  - JSON-LD: Service, Breadcrumb, FAQ
- Sitemap/robots:
  - `scripts/generate-sitemap.mjs` exécuté en `postbuild`
  - `public/robots.txt` inclut l’URL du sitemap
- Prérendu (SSG):
  - `vite-plugin-prerender` pour `/`, `/zones` et toutes les pages ville
  - Optionnel: ajouter d’autres routes à prérendre si besoin

## Avis Google (Netlify Functions)

- Le front consomme un endpoint JSON configurable:
  - Par défaut: `/api/google-reviews` (redirigé vers `/.netlify/functions/google-reviews`)
  - Overridable: `VITE_REVIEWS_ENDPOINT` (voir `.env.example`)
- Netlify function:
  - Fichier: `netlify/functions/google-reviews.ts`
  - Variables d’environnement à définir dans Netlify:
    - `GOOGLE_MAPS_API_KEY`: clé Google Maps avec Places API activée
    - `GOOGLE_PLACE_ID`: Place ID de l’établissement (obtenable via Place ID Finder)
  - CORS géré, renvoie `{ reviews: Review[] }` (max 5)
  - Cache en mémoire (12h) pour limiter les appels API
- Composants front:
  - `src/components/Reviews.tsx` (utilise `src/lib/reviews.ts`) — s’affiche sur chaque `CityPage`
  - `src/components/GoogleReviewsBadge.tsx` — affiche un badge “Avis Google” si `VITE_GBP_URL` est défini

### Ajouter vos clés, Place ID et URL Google Business

1) Dans Netlify, Site settings → Environment variables:
   - `GOOGLE_MAPS_API_KEY=...`
   - `GOOGLE_PLACE_ID=...`
2) Déployer. L’endpoint `/api/google-reviews` renverra les avis (si dispo).
3) Optionnel: Définir dans `.env` (Vite) l’URL de votre fiche:
   - `VITE_GBP_URL=https://g.page/r/xxxxxxxx` (le badge “Avis Google” s’affichera automatiquement)

## Scripts

- Format:
  - `npm run format` / `npm run format:check`
- Lint strict:
  - `npm run lint:ci` (échoue sur le moindre warning)
- Typecheck:
  - `npm run typecheck`
- Tests:
  - `npm run test` / `npm run test:ci` (avec coverage 80%)
- Build:
  - `npm run build` (puis `postbuild` génère `dist/sitemap.xml`)

## Déploiement Netlify

- `netlify.toml` fourni:
  - Publish: `dist`
  - Functions: `netlify/functions`
  - Redirect: `/api/*` → `/.netlify/functions/:splat`

## Personnalisation SEO

- Contenus par ville: modifiez `CityPage.tsx` pour enrichir (témoignages, sections locales).
- Ajoutez des villes dans `src/data/locations.json`. Le sitemap et le prérendu suivront automatiquement.
- Pages Services/Contact:
  - `src/pages/ServicesPage.tsx`
  - `src/pages/ContactPage.tsx`

## Contrib

- Respectez le formatage (Prettier) et les règles ESLint/TS.
- Ajoutez des tests pour maintenir la couverture au-dessus de 80%.