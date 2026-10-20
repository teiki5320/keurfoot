# Keur Foot

Le football africain pour tous les passionnés : sélections nationales, CAN, grands joueurs, classements Top 10,
boutique supporter (liens Amazon Partenaires) et conseils d'achat. Un site TOA KEUR, construit sur la base technique
de Keurbook (Next.js 16 statique, Tailwind 4, données dans le code).

## Commandes

| Commande | Rôle |
|---|---|
| `npm run dev` | Site en local sur http://localhost:3000 |
| `npm run lint`, `npm run typecheck`, `npm test` | Vérifications |
| `npm run build` | Site statique dans `out/` (génère d'abord les épingles Pinterest) |
| `npm run test:sortie` | Construit la version GitHub Pages et contrôle les 20 pages, les liens sous /keurfoot et les épingles |
| `node scripts/logos.mjs` | Régénère icônes, logo et image de partage depuis `docs/brand/` |

## Publication

- **Aujourd'hui** : version provisoire sur GitHub Pages, https://teiki5320.github.io/keurfoot/ (workflow
  `.github/workflows/pages.yml`, à chaque push sur `main`). Non indexée par Google, sans publicité.
- **Avec keurfoot.com** (Cloudflare Pages, comme Keurbook) :
  1. Ajouter les secrets `CLOUDFLARE_API_TOKEN` et `CLOUDFLARE_ACCOUNT_ID` dans GitHub (Settings → Secrets → Actions).
  2. Dans `deploy.yml`, remettre les déclencheurs `push` (main) ; dans `maintenance.yml`, appeler `deploy.yml`.
  3. Lancer `deploy.yml`, ajouter keurfoot.com et www au projet Cloudflare `keurfoot`.
  4. Désactiver GitHub Pages (Settings → Pages) et supprimer `pages.yml`.
  5. Créer les blocs AdSense et renseigner `ADSENSE_SLOTS` (`src/lib/config.ts`).
  6. Mettre à jour le lien de la carte Keur Foot sur toakeur.com.

## Règles

Voir `CLAUDE.md`, `docs/REDACTION.md` et `docs/CONTENU.md`.
