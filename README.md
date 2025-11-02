# RCP Multiservices

[![Live](https://img.shields.io/badge/Live-rcp--multiservices.com-success?logo=netlify)](https://www.rcp-multiservices.com/)
[![React](https://img.shields.io/badge/React-18-61dafb?logo=react&labelColor=20232a)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/TailwindCSS-3-38bdf8?logo=tailwindcss&labelColor=0f172a)](https://tailwindcss.com/)
[![ESLint](https://img.shields.io/badge/ESLint-Strict-4b32c3?logo=eslint)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-Enabled-ff69b4?logo=prettier)](https://prettier.io/)
[![Vitest](https://img.shields.io/badge/Tests-Coverage%20%E2%89%A5%2080%25-brightgreen?logo=vitest)](https://vitest.dev/)

Site vitrine “services à domicile” optimisé pour le SEO local (Île‑de‑France & Normandie), hébergé sur Netlify. Stack moderne, CI stricte, accessibilité et sécurité prises au sérieux.

## Sommaire

- Aperçu
- Démo & Liens
- Stack & Architecture
- Fonctionnalités clés
- Qualité & CI
- Démarrage & Scripts
- Déploiement Netlify
- Sécurité & Headers
- Accessibilité (WCAG AA)
- Performance (Core Web Vitals)
- SEO technique
- Variables d’environnement
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

## Stack & Architecture

- React 18, TypeScript 5, Vite 5, Tailwind CSS 3
- Routing via React Router
- Helmet pour SEO (title, description, canonical, OG/Twitter)
- JSON‑LD injecté côté client
- Netlify Functions pour avis Google (endpoints sécurisés)

Arborescence (extraits):
- src/
  - components/ (Header, Badge Google Reviews, QuickCall, Reviews, MapZones)
  - pages/ (Home, Services, Contact, ZonesIndex, Region, City, Legal, Privacy, 404)
  - routes/ (AppRoutes)
  - data/ (locations.json + types/helpers)
  - utils/ (styles, SEO helpers, openingHours)
  - lib/ (env, reviews)
- public/ (robots.txt, 404.html)
- scripts/ (generate-sitemap.mjs, sync-tokens.mjs)
- netlify.toml (headers, redirects, functions)

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

## Qualité & CI

- ESLint strict (type‑aware), TypeScript strict
- Prettier format:check
- Vitest avec couverture minimale ≥ 80%
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

## Sécurité & Headers

- Strict‑Transport‑Security, X‑Frame‑Options, X‑Content‑Type‑Options, Referrer‑Policy, Permissions‑Policy
- Cross‑Origin‑Opener‑Policy, Cross‑Origin‑Resource‑Policy
- CSP (Note): Leaflet utilise des styles inline dynamiques → style‑src contient 'unsafe‑inline' pour compatibilité.
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

## Licence

Ce projet est publié sous licence MIT. Voir [LICENSE](./LICENSE).