# Guide des visuels (logos, images, OG) — RCP Multiservices

Objectif: centraliser tout ce qu’il faut déposer dans le dépôt (chemins, formats, tailles), pour rendre le site prêt en production et éviter les liens cassés (og:image, favicons, héros, témoignages).

Important
- Placez tous les fichiers dans le dossier `public/` (et `public/images/` pour les photos). Vite les servira directement.
- Noms en kebab-case sans accents (ex: `ile-de-france-paris`, `contact-hero.jpg`).
- Optimisez les images (WebP/AVIF + compression) pour de bonnes performances.

## 1) Logos & favicons

À déposer:
- `public/logo.svg` — logo principal (vectoriel, fond transparent)
- `public/logo-white.svg` — variante blanche (pour footer/hero teal si besoin)
- `public/favicon-32x32.png` — 32×32
- `public/favicon-16x16.png` — 16×16
- `public/apple-touch-icon.png` — 180×180 (iOS)
- (optionnel) `public/site.webmanifest` — manifeste PWA simple

Conseils:
- Préférez SVG pour le logo (résolution infinie).
- Exportez des PNG pour les favicons; utilisez un générateur (ex: RealFaviconGenerator) si besoin.
- Respectez les tailles exactes pour éviter un rendu flou.

## 2) Image de partage (Open Graph / Twitter)

À déposer:
- `public/og-default.jpg` — 1200×630 (ratio 1.91:1), ≤ 300 Ko si possible

Usage:
- Le code référence déjà `og-default.jpg` partout pour éviter les liens cassés. Vous pourrez plus tard créer des OG spécifiques par page si souhaité.

## 3) Images “Hero” par page

Dépôt recommandé:
- `public/images/home-hero.jpg` — 1600×1067 (≈ ratio 16:10)
- `public/images/services-hero.jpg` — 1600×1067
- `public/images/contact-hero.jpg` — 1600×1067
- `public/images/zones-hero.jpg` — 1600×1067
- (optionnel) `public/images/region-hero-ile-de-france.jpg` — 1600×1067
- (optionnel) `public/images/city-hero-ile-de-france-paris.jpg` — 1600×1067
- (optionnel) décliner `city-hero-{region}-{city}.jpg` au besoin

Astuce performance:
- Fournir aussi la variante WebP (ex: `home-hero.webp`, `services-hero.webp`) en plus du JPG si souhaité (nous pourrons basculer les sources).
- Garder taille ≤ 400 Ko idéalement.
- Alt descriptif: “Service à domicile — illustration”, “Prestations à domicile — illustration”, etc.

## 4) Image de fond “Témoignages”

À déposer:
- `public/images/testimonials-bg.jpg` — 1600×1067
- Option: `public/images/testimonials-bg.webp`

## 5) (Optionnel) Images OG par page

Si vous voulez des OG spécifiques (meilleur CTR):
- `public/og-home.jpg` — 1200×630
- `public/og-services.jpg` — 1200×630
- `public/og-contact.jpg` — 1200×630
- `public/og-zones.jpg` — 1200×630
- (optionnel) `public/og-city-ile-de-france-paris.jpg` — 1200×630

Nous pourrons ensuite référencer ces fichiers dans Helmet à la place de `og-default.jpg`.

## 6) Email signature (logo pour signature)

À déposer:
- `public/email/logo-email.png` — idéalement 160×160 (ou 128×128), fond transparent si possible

Nous pouvons l’intégrer dans `public/email-signature.html` si vous souhaitez remplacer le monogramme.

## 7) Nommage — conventions

- Kebab-case, pas d’accents: `ile-de-france`, `normandie`, `aide-a-domicile`
- Ville: `city-hero-ile-de-france-paris.jpg`
- Région: `region-hero-ile-de-france.jpg`
- OG: `og-default.jpg`, `og-home.jpg`, `og-services.jpg`
- Favicons: `favicon-32x32.png`, `favicon-16x16.png`, `apple-touch-icon.png`
- Logo: `logo.svg`, `logo-white.svg`

## 8) Où remplacer dans le code (quand les visuels seront prêts)

- Accueil (Home):
  - Fichier: `src/routes/AppRoutes.tsx`
  - Constante `heroImg`: remplacer l’URL Unsplash par `/images/home-hero.jpg`

- Services:
  - Fichier: `src/pages/ServicesPage.tsx`
  - Remplacer l’URL Unsplash par `/images/services-hero.jpg`

- Contact:
  - Fichier: `src/pages/ContactPage.tsx`
  - Remplacer l’URL Unsplash par `/images/contact-hero.jpg`

- Zones Index:
  - Fichier: `src/pages/ZonesIndex.tsx` (si une image héros est ajoutée)
  - Remplacer/ajouter `/images/zones-hero.jpg` si nécessaire

- Région:
  - Fichier: `src/pages/RegionPage.tsx`
  - Remplacer l’URL Unsplash par `/images/region-hero-ile-de-france.jpg` (ou selon la région)

- Ville:
  - Fichier: `src/pages/CityPage.tsx`
  - Remplacer l’URL Unsplash par `/images/city-hero-{region}-{city}.jpg`

- OG par défaut:
  - `index.html`: déjà mis à `og-default.jpg`
  - Helmet des pages: déjà ajouté `og-default.jpg`

## 9) Alt text — bonnes pratiques

- Toujours décrire succinctement l’image:
  - Héros: “Service à domicile — illustration”
  - Témoignages: “Témoignages — illustration”
  - Ville: “Ville de Paris — illustration”
- Éviter le texte inutile (“image”, “photo”). Aller au sens.

## 10) Checklist à cocher

- [ ] Logo: `public/logo.svg`, `public/logo-white.svg`
- [ ] Favicons: `public/favicon-32x32.png`, `public/favicon-16x16.png`, `public/apple-touch-icon.png`
- [ ] OG: `public/og-default.jpg` (1200×630)
- [ ] Héros:
  - [ ] `public/images/home-hero.jpg`
  - [ ] `public/images/services-hero.jpg`
  - [ ] `public/images/contact-hero.jpg`
  - [ ] `public/images/zones-hero.jpg`
  - [ ] (option) `public/images/region-hero-ile-de-france.jpg`
  - [ ] (option) `public/images/city-hero-ile-de-france-paris.jpg`
- [ ] Témoignages: `public/images/testimonials-bg.jpg`
- [ ] (option) WebP pour chaque héros
- [ ] (option) OG spécifiques par page
- [ ] (option) `public/email/logo-email.png`

Lorsque tout est déposé, je ferai une passe pour basculer le code sur vos fichiers locaux (au lieu des URLs Unsplash) et valider Lighthouse/SEO.