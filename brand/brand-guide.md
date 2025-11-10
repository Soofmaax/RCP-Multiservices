# Guide de marque — RCP Multiservices

Ce guide définit les éléments visuels pour garantir la cohérence entre le site et les supports imprimés (flyers, affiches, réseaux sociaux).

## 1) Couleurs (à valider/remplacer avec tes hex exacts)
- Primaire (Marque): Indigo 700 — `#4338CA` (exemple)
- Primaire foncé: Indigo 800 — `#3730A3`
- Secondaire (Action): Emerald 600 — `#059669`
- Neutres (Texte): Slate 900 `#0F172A`, Slate 600 `#475569`, Slate 50 `#F8FAFC`

Remplace ces valeurs par tes couleurs officielles:
- Marque primaire: `#______`
- Marque secondaire: `#______`
- Accent (CTA): `#______`
- Neutres: `#______`

## 2) Typographie
- Police recommandée web/impression: Inter (ou ta police de marque si existante)
- Hiérarchie:
  - Titre H1: 28–36 pt (web: text-3xl à 4xl)
  - Sous-titre H2: 22–28 pt (web: text-2xl à 3xl)
  - Corps: 11–12 pt (web: text-base)
- Interlignage: 1.3–1.5 pour lisibilité

## 3) Grille et mise en page
- Marges d’impression: 12–15 mm
- Grille: 2 colonnes pour la liste de services sur A4
- Éléments récurrents:
  - Bandeau supérieur avec logo + promesse + contact
  - Cartes services (bordures légères, coins arrondis)
  - Avantages en badges
  - CTA en bas à droite (contraste élevé)

## 4) Imagerie
- Style: authentique, chaleureux, situations réelles (aide à domicile, jardin, ménage)
- Éviter les stock trop génériques, privilégier la cohérence avec la promesse de marque

## 5) Ton et message
- Accroche claire: bénéfices concrets + rapidité
- Preuve: devis rapide, personnel qualifié, zone d’intervention
- CTA unique et visible: “Demander un devis”

## 6) Fichiers et intégrations
- Flyers HTML (impression via navigateur): `flyers/rcp-flyer-a4.html`
- À prévoir:
  - `flyers/rcp-flyer-a5.html` (format compact)
  - `flyers/social-story.html` (9:16 pour stories)
- Tailwind (site): valider les couleurs dans `tailwind.config.js` quand le dossier `src/` sera disponible.

---

Pour finaliser:
1. Envoie-moi tes codes couleurs hex officiels et la police de marque.
2. Je mets à jour ce guide, le `tailwind.config.js` et je génère les autres formats de flyers.