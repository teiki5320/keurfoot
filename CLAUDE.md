@AGENTS.md

- Site en français : textes UI, commentaires et messages en français.
- Contenus : respecter docs/REDACTION.md (rien d'inventé, sources citées, stats des joueurs en activité datées, jamais d'ASIN ni de prix inventés, aucun logo officiel ni photo de joueur).
- Ce que contient chaque page : docs/CONTENU.md. Cahier des charges et plan : docs/superpowers/.
- Données : écrites dans src/lib/data/* et content/conseils (site statique, sans base).
- Travail sur la branche main uniquement, sans branche ni pull request.
- Vérifications : `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.
