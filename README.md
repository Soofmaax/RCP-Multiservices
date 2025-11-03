# RCP Multiservices

[![Live](https://img.shields.io/badge/Live-rcp--multiservices.com-success?logo=netlify)](https://www.rcp-multiservices.com/)
[![React](https://img.shields.io/badge/React-18-61dafb?logo=react&labelColor=20232a)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/TailwindCSS-3-38bdf8?logo=tailwindcss&labelColor=0f172a)](https://tailwindcss.com/)
[![ESLint](https://img.shields.io/badge/ESLint-Strict-4b32c3?logo=eslint)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-Enabled-ff69b4?logo=prettier)](https://prettier.io/)
[![Vitest](https://img.shields.io/badge/Tests-Coverage%20%E2%89%A5%2080%25-brightgreen?logo=vitest)](https://vitest.dev/)
[![CI](https://img.shields.io/badge/CI-GitHub%20Actions-blue?logo=githubactions)](.github/workflows/ci.yml)

Site vitrine “services à domicile” optimisé pour le SEO local (Île‑de‑France & Normandie), hébergé sur Netlify. Stack moderne, CI stricte, accessibilité et sécurité prises au sérieux.

## Sommaire

- Aperçu
- Démo & Liens
- Captures (Screenshots)
- Stack & Architecture
- Fonctionnalités clés
- Qualité & CI
- Démarrage & Scripts
- Déploiement Netlify
- Audit automatisé de PR
- Sécurité & Headers
- Accessibilité (WCAG AA)
- Performance (Core Web Vitals)
- SEO technique
- Variables d’environnement
- Infos à renseigner (TODO)
- Contribuer
- Licence

## Aperçu

Ce projet React + TypeScript (Vite) propose:
- Pages locales `/zones/:region/:city` (Île‑de‑France, Normandie)
- Métadonnées par page (Helmet), JSON‑LD structurés (WebSite, Service, Breadcrumb, FAQ)
- Sitemap & robots générés automatiquement
- Intégration future d’avis Google via Netlify Functions
- Design tokens CSS + Tailwind, animations discrètes, CTA “Appeler” bien mis en avant

## Démo & Liens

- Live: https://www.rcp-multiservices.com/
- robots.txt: https://www.rcp-multiservices.com/robots.txt
- sitemap.xml: https://www.rcp-multiservices.com/sitemap.xml

## Captures (Screenshots)

Générez et insérez automatiquement les captures dans le README:
```bash
# installez Puppeteer si nécessaire
npm i -D puppeteer
# capture et mise à jour du README
npm run screenshots
```

<!-- screenshots:start -->

<!-- screenshots:end -->

## Stack & Architecture

- React 18, TypeScript 5, Vite 5, Tailwind CSS 3
- Routing via React Router
- Helmet pour SEO (title, description, canonical, OG/Twitter)
- JSON‑LD injecté côté client
- Netlify Functions pour avis Google (endpoints sécurisés)

Arborescence (extraits):
- src/
  - components/ (Header, GoogleReviewsBadge, QuickCall, Reviews, MapZones)
  - pages/ (Home, Services, Contact, ZonesIndex, Region, City, Legal, Privacy, 404)
  - routes/ (AppRoutes)
  - data/ (locations.json + types/helpers)
  - utils/ (styles, SEO helpers, openingHours)
  - lib/ (env, reviews)
- public/ (robots.txt, 404.html, screenshots/)
- scripts/ (generate-sitemap.mjs, sync-tokens.mjs)
- netlify.toml (headers, redirects, functions)

Note monorepo: Le dossier `next/` contient un prototype Next.js non utilisé en production. Il est conservé à titre d’exemple mais hors périmètre CI/Build.

## Fonctionnalités clés

- SEO Local:
  - Pages ville depuis `src/data/locations.json`
  - Helmet + JSON‑LD par page
  - Sitemap postbuild, robots.txt pointant vers sitemap
- Accessibilité:
  - Skip link (#main), landmarks clairs, aria‑hidden sur SVG décoratifs
- UX:
  - Hero avec CTA “Appeler” + badges de réassurance
  - “Comment ça marche” (3 étapes)
  - “Villes proches” (maillage interne)
  - Carte interactive Leaflet (zones)
- Performances:
  - Lazy loading, dimensions d’images explicites
  - Preconnect pour images & tuiles
- Sécurité:
  - Headers: HSTS, XFO, nosniff, Referrer‑Policy, Permissions‑Policy, COOP/CORP
  - CSP restrictive (avec style‑src 'unsafe‑inline' compatible Leaflet)
- Consentement cookies:
  - Bannière de consentement (nécessaires toujours actifs, analytics optionnel)
  - Analytics (GA4) et Microsoft Clarity initialisés uniquement si consentement + variables d’environnement présentes

## Qualité & CI

- ESLint strict (type‑aware), TypeScript strict
- Prettier format:check
- Vitest avec couverture minimale ≥ 80% (tests unitaires couvrant pages, lib, utils)
- Build Vite
- Audit sécurité (npm audit)
- CI GitHub Actions (Format, Lint, Typecheck, Test, Build, Audit)

## Démarrage & Scripts

- Installer:
  - `npm install`
- Développement:
  - `npm run dev`
- Format / Lint / Typecheck / Tests:
  - `npm run format:check` / `npm run format`
  - `npm run lint` / `npm run lint:ci`
  - `npm run typecheck`
  - `npm run test` / `npm run test:ci`
- Build & Preview:
  - `npm run build` (puis `postbuild` génère `dist/sitemap.xml`)
  - `npm run preview`

## Déploiement Netlify

- `netlify.toml`:
  - publish: `dist`
  - functions: `netlify/functions`
  - redirects: `/api/*` → `/.netlify/functions/:splat`
  - headers (sécurité + cache immuable sur assets/images)
- Domaine:
  - `www.rcp-multiservices.com` en primary
  - Redirection apex → www configurée
- CSP:
  - Pour activer GA4, ajoutez `https://www.googletagmanager.com` à `script-src`
  - Pour activer Microsoft Clarity, ajoutez `https://www.clarity.ms` à `script-src`

## Audit automatisé de PR

Exécutez un audit qualité automatisé sur l’URL de prévisualisation (Netlify/Vercel) de la Pull Request.

Pré-requis (optionnels mais recommandés):
- Lighthouse + Chrome launcher: `npm i -D lighthouse chrome-launcher`
- Puppeteer + Axe: `npm i -D puppeteer axe-core`

Commandes:
```bash
# avec variable d'environnement
BASE_URL="https://deploy-preview-123--rcp-multiservices.netlify.app" npm run audit:site

# ou en argument
npm run audit:site -- "https://deploy-preview-123--rcp-multiservices.netlify.app"
```

Le script `scripts/audit.mjs`:
- Valide tous les liens du site via le sitemap (404/5xx)
- Lance Lighthouse (si installé) et remonte les scores Performance, Accessibilité, Bonnes pratiques, SEO
- Lance Axe sur 3 pages (Accueil, Services, Contact) et liste les violations crit./serious
- Inspecte les en‑têtes HTTP (HSTS, XFO, XCTO, CSP, Referrer‑Policy, Permissions‑Policy, COOP/CORP)
- Vérifie `/robots.txt`, `/sitemapde la homepage (title, description, OG)

Sortie:
- Un rapport Markdown est écrit dans `./audit-report.md` que vous pouvez copier-coller dans le commentaire de la PR.

## Sécurité & Headers

- Strict‑Transport‑Security, X‑Frame‑Options, X‑Content‑Type‑Options, Referrer‑Policy, Permissions‑Policy
- Cross‑Origin‑Opener‑Policy, Cross‑Origin‑Resource‑Policy
- CSP (Note): Leaflet utilise des styles inline dynamiques → style‑src contient 'unsafe‑inline' pour compatibilité.
- Pour activer Google Analytics (GA4), ajoutez `https://www.googletagmanager.com` à `script-src` dans la CSP.
- Pour activer Microsoft Clarity, ajoutez `https://www.clarity.ms` à `script-src` dans la CSP.
- Cache‑Control (immutable) sur /assets/* et /images/*

## Accessibilité (WCAG AA)

- Navigation clavier: skip link “Aller au contenu”
- Landmarks: sections et aria‑label (carte des zones)
- Contrastes: palette lisible (teal/navy/white), hover/focus visibles
- Images: alt descriptifs, lazy + dimensions

## Performance (Core Web Vitals)

- Images: lazy, width/height, decoding="async"
- Preconnect/dns‑prefetch: Unsplash & OSM tiles
- Recommandé pour aller plus loin:
  - WebP/AVIF + srcset/sizes pour hero/overlay
  - Fonts locales si CSP très stricte (font‑src)

## SEO technique

- Canonical / OG / Twitter alignés sur domaine prod
- JSON‑LD (WebSite, Service, Breadcrumb, FAQ)
- robots.txt & sitemap.xml générés
- AggregateRating retiré tant qu’il n’y a pas d’avis authentiques

## Variables d’environnement

- Front:
  - `VITE_GBP_URL` — URL publique Google Business (affiche badge “Avis Google”)
  - `VITE_REVIEWS_ENDPOINT` — URL endpoint avis (par défaut `/api/google-reviews`)
- Netlify Functions:
  - `GOOGLE_MAPS_API_KEY` — clé API Maps (Places)
  - `GOOGLE_PLACE_ID` — Place ID établissement

Voir `.env.example` et config Netlify (Site settings → Environment variables).

## Infos à renseigner (TODO)

- SIRET: à compléter (footer + Mentions légales)
- RC Pro: assureur + n° de police (footer + Mentions légales)
- Adresse: à compléter (Contact + JSON‑LD)
- Réseaux sociaux (sameAs dans JSON‑LD): LinkedIn, X/Twitter, Instagram, Facebook
- og:image par défaut: ajouter `public/og-default.webp` et référencer dans Helmet
- Images de hero: à personnaliser plus tard (laisser en l’état pour le moment). Pages et fichiers concernés:
  - Accueil: `src/routes/AppRoutes.tsx`
  - Services: `src/pages/ServicesPage.tsx`
  - Contact: `src/pages/ContactPage.tsx`
  - Zones (index): `src/pages/ZonesIndex.tsx`
  - Région: `src/pages/RegionPage.tsx`
  - Ville: `src/pages/CityPage.tsx`
- Micro‑animations étendues (optionnel): à appliquer plus tard sur cartes témoignages et listes de départements/zones (stagger, hover, fade), en conservant `prefers-reduced-motion`.

## Contribuer

Voir [CONTRIBUTING.md](./CONTRIBUTING.md) pour les conventions de commits (Conventional Commits), branchement (`feature/*`, `fix/*`, `chore/*`), exécution des scripts, CI et guidelines de code (TypeScript strict, accessibilité, SEO).

## Licence

Ce projet est publié sous licence MIT. Voir [LICENSE](./LICENSE).