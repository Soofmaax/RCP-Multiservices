# Contributing Guide

Merci de contribuer à RCP Multiservices. Ce guide décrit comment installer, développer, tester, committer et livrer, afin qu'un autre développeur puisse prendre le relais facilement.

## Prérequis

- Node.js 20+
- npm
- (Optionnel) Netlify CLI pour tests locaux des functions

## Installation & Démarrage

```bash
npm install
npm run dev
```

## Scripts de qualité

- Format: `npm run format` / `npm run format:check`
- Lint: `npm run lint` / `npm run lint:ci` (aucun warning toléré)
- Typecheck: `npm run typecheck`
- Tests: `npm run test` / `npm run test:ci` (couverture ≥ 80%)
- Build: `npm run build` (génère `dist/` + `dist/sitemap.xml`)

## Conventions de code

- TypeScript strict (éviter `any`, préférer types utilitaires et gardes de type)
- Accessibilité:
  - Skip link (#main)
  - Landmarks et aria roles précis
  - Contraste suffisant, focus visible
- SEO:
  - Helmet par page (title/description/canonical/OG/Twitter)
  - JSON-LD (WebSite, Service, Breadcrumb, FAQ) via helpers
  - Sitemap/robots générés en postbuild
- Styles:
  - Tailwind + design tokens via `src/styles/tokens.css`
  - Pas de styles inline (sauf cas Leaflet nécessaires)

## Conventions de commits & branches

- Conventional Commits:
  - `feat: ...`, `fix: ...`, `chore: ...`, `docs: ...`, `test: ...`, `refactor: ...`
- Branches:
  - `feature/<short-slug>`
  - `fix/<short-slug>`
  - `chore/<short-slug>`
- Pull Requests:
  - CI verte obligatoire (format, lint, typecheck, tests, build, audit)
  - Tests et couverture à jour pour tout ajout/bugfix
  - Décrire précisément les changements dans la PR

## Architecture (aperçu)

- `src/components`: Composants réutilisables (Header, GoogleReviewsBadge, QuickCall, Reviews, MapZones)
- `src/pages`: Pages (Home, Services, Contact, ZonesIndex, Region, City, Legal, Privacy, 404)
- `src/routes/AppRoutes.tsx`: Routing et layout global
- `src/data/locations.json`: Données de zones (typées via `src/data/locations.ts`)
- `src/utils`: Helpers (styles classes, SEO builders, openingHours)
- `src/lib`: Environnement (`env.ts`), avis (`reviews.ts`)
- `public`: assets publics, `robots.txt`, `404.html`, `screenshots/` (captures à ajouter)
- `scripts`: `generate-sitemap.mjs`, `sync-tokens.mjs`
- `netlify.toml`: headers sécurité, redirects, cache; functions: `netlify/functions`

## Environnements & Secrets

- Fichier exemple: `.env.example` (front)
  - `VITE_GBP_URL` (URL Google Business pour badge “Avis Google”)
  - `VITE_REVIEWS_ENDPOINT` (optionnel, sinon `/api/google-reviews`)
- Netlify (functions):
  - `GOOGLE_MAPS_API_KEY`, `GOOGLE_PLACE_ID`
  - Configurer dans Netlify → Site settings → Environment variables

## Livraison

- S'assurer que:
  - Domaine `www.rcp-multiservices.com` aligné (canonical/OG/Twitter/robots/sitemap)
  - JSON-LD sans rating fictif (aggregateRating absent)
  - Headers Netlify appliqués (HSTS, XFO, nosniff, Referrer, Permissions, CSP, COOP/CORP, Cache-Control)
  - Accessibilité et performances (Lighthouse, Axe)
- Déployer sur Netlify (build Vite + postbuild sitemap)

## TODOs (infos à renseigner)

- SIRET (footer + Mentions légales)
- RC Pro (assureur + n° police)
- Adresse (Contact + JSON-LD)
- Réseaux sociaux (sameAs) et og:image par défaut
- Captures dans `public/screenshots/` et intégration dans README

Merci d'ouvrir des issues pour toute amélioration ou anomalie, et de proposer des PRs avec tests et CI verte.