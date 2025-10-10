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

- Hero sur la home:
  - Titre, sous‑titre géographique, CTA “Appeler”, 3 badges de réassurance (Assuré RC Pro, Intervenants qualifiés, Intervention rapide)
- Témoignages statiques (temporaire):
  - 3 avis affichés sur la home (seront remplacés par de vrais avis Google dès que l’endpoint sera prêt)
- Comment ça marche (home):
  - 3 étapes: Appel → Évaluation rapide → Intervention/Devis sous 24h + CTA “Appeler maintenant”
- Infos pratiques (home):
  - CESU accepté, délais, horaires, zones couvertes, modes de paiement
- Micro‑animations discrètes:
  - Boutons (primaires/secondaires): transition, hover scale
  - Liens villes: hover background bleu clair + transition
- CTA mobile “Appeler” rapide:
  - `QuickCall` (mobile only, fixed en bas à droite), tel:+33743670815
- Maillage interne “Villes proches”:
  - Sur `CityPage`, section listant jusqu’à 8 villes du même département
- FAQ enrichie:
  - Ajout d’une question “Qualifiés et assurés ?” sur `CityPage`

## À compléter avant déploiement (checklist)

- SIRET: remplacer “à compléter” (footer + Mentions légales)
- RC Pro: renseigner l’assureur et n° de police (footer + Mentions légales)
- Google Business Profile:
  - URL publique: définir `VITE_GBP_URL` (badge “Avis Google”)
  - Place ID: définir `GOOGLE_PLACE_ID` + `GOOGLE_MAPS_API_KEY` dans Netlify (avis live)
- Réseaux sociaux (optionnel): liens sameAs dans LocalBusiness (GBP, LinkedIn, X/Twitter, Instagram, Facebook)
- og:image par défaut (optionnel): `public/og-default.jpg` et référencer dans Helmet

## Roadmap — à faire plus tard (guide)

- Enrichir `src/data/locations.json` et les sections “Prestations”/“Villes proches”
- Ajouter témoignages réels (via endpoint) et agrégation d’avis
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