# Smart Gym Ennasr — site web

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion · next-intl (FR / AR / EN).

## Lancer en local
```bash
npm install
npm run dev          # http://localhost:3000  (redirige vers /fr)
npm run build && npm start   # version de production
```

## Modifier le contenu (sans toucher aux composants)
| Quoi | Où |
|---|---|
| Textes de l'interface (3 langues) | `messages/fr.json`, `ar.json`, `en.json` |
| Téléphone, adresse, horaires, stats, promo, photos du hero | `src/content/site.ts` |
| Activités | `src/content/activities.ts` |
| Planning | `src/content/planning.json` |
| Tarifs | `src/content/pricing.ts` |
| Coachs, témoignages, galerie | `src/content/people.ts` |
| Couleurs de la marque | `src/app/globals.css` (bloc `:root`) |

Les éléments à confirmer sont listés dans **TODO-CONTENT.md**.

## Déployer sur Vercel
1. Pousser le dossier sur GitHub.
2. Sur vercel.com → *Add New Project* → importer le dépôt (framework détecté : Next.js), puis *Deploy*.
3. Ajouter le domaine dans *Settings → Domains*, puis mettre à jour `site.url` dans `src/content/site.ts`.

Ou en ligne de commande : `npx vercel` puis `npx vercel --prod`.
