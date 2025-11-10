# Architecture Overview

Ce document décrit la structure du projet, les flux de données et les conventions techniques afin de faciliter la reprise par un autre développeur.

## Aperçu général

- **Framework**: React 18 + TypeScript 5
- **Bundler**: Vite 5
- **Styles**: Tailwind CSS 3 + design tokens (CSS variables)
- **Routing**: React Router
- **SEO**: react-helmet-async + JSON-LD
- **Tests**: Vitest (couverture ≥ 80%)
- **CI**: GitHub Actions (format, lint, typecheck, test, build, audit)
- **Hosting**: Netlify (headers sécurité, redirects, cache, functions)

## Arborescence

- `src/components/`
  - `Header.tsx`: en‑tête sticky + skip link + CTA “Appeler”
  - `GoogleReviewsBadge.tsx`: badge “Avis Google” (affiché si `VITE_GBP_URL`)
  - `QuickCall.tsx`: bouton mobile fixe “Appeler”
  - `Reviews.tsx`: liste des avis (consomme `src/lib/reviews.ts`)
  - `MapZones.tsx`: carte Leaflet (markers + popups vers routes villes)
- `src/pages/`
  - `Home` (hero, services, témoignages, “comment ça marche”)
  - `Services`, `Contact`
  - `ZonesIndex` (liste zones + carte), `Region`, `City`
  - `Legal` (mentions légales), `Privacy` (politique de confidentialité), `NotFound` (404)
- `src/routes/AppRoutes.tsx`: layout global + Meta (Helmet) + routing + footer
- `src/data/`
  - `locations.json`: données régions/départements/villes
  - `types.ts`, `locations.ts`: typage et helpers (finders)
- `src/utils/`
  - `styles.ts`: constantes de classes (btnPrimary, btnSecondary, ctaRow, etc.)
  - `seo.ts`: builders JSON‑LD (Service, FAQ, Breadcrumbs, WebSite)
  - `openingHours.ts`: logique d’horaires (badge “Ouvert maintenant”)
- `src/lib/`
  - `env.ts`: accès typé aux variables d’environnement (avec overrides tests)
  - `reviews.ts`: fetch normalisé des avis (Google ou endpoint custom)
- `public/`
  - `robots.txt`, `404.html`, **`screenshots/`** (à ajouter)
- `scripts/`
  - `generate-sitemap.mjs`: génère `dist/sitemap.xml` (postbuild)
  - `sync-tokens.mjs`: synchronise CSS tokens hex → RGB
- `netlify.toml`:
  - redirects API, headers de sécurité, cache immutable
  - functions: `netlify/functions/google-reviews.ts`

## Flux de données

- **Environnement (front)**: `src/lib/env.ts` lit `import.meta.env` (Vite)
  - `getGbpUrl()`: URL Google Business Profile (badge)
  - `getReviewsEndpoint()`: endpoint JSON des avis
- **Avis (serverless)**: `netlify/functions/google-reviews.ts`
  - Prend `GOOGLE_MAPS_API_KEY` et `GOOGLE_PLACE_ID`
  - Renvoie `{ reviews: [...] }` (max 5), avec cache 12h
  - Redirigé via Netlify en `/api/google-reviews`
- **Avis (front)**: `src/lib/reviews.ts` normalise les réponses, `src/components/Reviews.tsx` les affiche
- **SEO**:
  - Helmet par page: title/description/canonical/OG/Twitter
  - JSON‑LD injecté via `<script type="application/ld+json">` (helpers `src/utils/seo.ts`)
- **Sitemap/robots**:
  - `scripts/generate-sitemap.mjs` construit les URLs (SITE_URL configurable)
  - `public/robots.txt` référence le sitemap

## Conventions techniques

- TypeScript strict (no explicit `any`, gardes de type)
- ESLint strict (règles `no-unsafe-*`)
- CSS tokens via `src/styles/tokens.css` + mapping Tailwind dans `tailwind.config.js`
- Accessibilité et sémantique:
  - skip link (#main), landmarks, aria‑hidden sur SVG décoratifs
- Sécurité (Netlify headers):
  - HSTS, XFO, nosniff, Referrer‑Policy, Permissions‑Policy, COOP/CORP, CSP
  - Note: Leaflet requiert `style-src 'unsafe-inline'` pour compatibilité

## Points à compléter (TODO)

- SIRET, RC Pro, Adresse (footer, pages légales, Contact, JSON‑LD)
- Réseaux sociaux (sameAs), og:image par défaut
- Captures dans `public/screenshots/` (insérer dans README)
- Éventuelle migration d’images (WebP/AVIF + srcset/sizes)
- Option: retours d’avis Google réels via Netlify function (configurer clés)

## Prise en main rapide

1. `npm install && npm run dev`
2. `npm run lint:ci && npm run typecheck && npm run test:ci`
3. `npm run build` (génère `dist/` + `sitemap.xml`)
4. Déploiement Netlify (domaine `www.rcp-multiservices.com`)

Pour plus de détails, voir [README](./README.md) et [CONTRIBUTING](./CONTRIBUTING.md).