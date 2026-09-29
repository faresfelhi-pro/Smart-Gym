# Contenu à confirmer avec le gérant — Smart Gym Ennasr

Tant que `showPlaceholderBadges: true` dans `src/content/site.ts`, chaque élément
non confirmé affiche un badge orange « à confirmer » sur le site.
Passez-le à `false` une fois tout remplacé.

## Identité
- [ ] **Logo** en SVG (idéal) ou PNG haute définition, + version blanche pour fond sombre
      → `public/brand/`, puis renseigner `site.logo` dans `src/content/site.ts`
- [ ] **Couleurs officielles** (code hex du vert de la marque) → `src/app/globals.css`, bloc `:root`
- [ ] **Nom de domaine** définitif → `site.url` dans `src/content/site.ts`

## Informations pratiques (`src/content/site.ts`)
- [ ] **Horaires d'ouverture** réels (actuellement : Lun–Ven 06:00–23:00, Sam–Dim 08:00–20:00)
- [ ] **Nombre de coachs**
- [ ] **Surface** totale en m² (sur les deux étages)
- [ ] **Nombre de cours par semaine**
- [ ] **Promo -25 % annuel** : toujours valable ? conditions ? (`site.promo.enabled`)

## Tarifs (`src/content/pricing.ts`)
- [ ] Prix **Mensuel / Trimestriel / Semestriel / Annuel** en DT (actuellement « XXX DT »)
- [ ] Ce qui est inclus dans chaque formule
- [ ] Frais d'inscription éventuels

## Activités (`src/content/activities.ts`)
- [ ] Liste réelle des activités proposées (vérifier sur Instagram)
- [ ] **Programmes Les Mills réellement sous licence** : BodyPump, BodyCombat, BodyAttack, RPM, BodyBalance — garder uniquement ceux proposés
- [ ] Durée et niveau d'intensité de chaque cours

## Planning (`src/content/planning.json`)
- [ ] Planning hebdomadaire réel : jour, heure, cours, étage (7 ou 8), coach

## Coachs (`src/content/people.ts`)
- [ ] Nom, spécialité, photo portrait et compte Instagram de chaque coach (avec leur accord)

## Témoignages & transformations (`src/content/people.ts`)
- [ ] 3 ou 4 témoignages **réels** de membres (prénom + ancienneté, avec accord écrit)
- [ ] Photos avant / après (avec accord écrit du membre)

## Photos (`public/photos/`, puis chemins dans les fichiers de contenu)
- [ ] Hero : 3 photos grand format (plateau musculation, cours collectif, cardio avec vue)
- [ ] Une photo par activité
- [ ] Galerie : 9 photos (rack, vue sur Ennasr, cours, haltères, accueil, coach, RPM, vestiaires, soirée)
- [ ] Image de partage (Open Graph) 1200×630

## Traductions
- [ ] Relecture des textes **arabes** et **anglais** par un locuteur natif (`messages/ar.json`, `messages/en.json`)

## Pages restantes (phase 2)
- [ ] `/activites/[slug]` — fiche détaillée par activité
- [ ] `/recrutement` — formulaire de candidature
- [ ] Page 404 aux couleurs de la marque
