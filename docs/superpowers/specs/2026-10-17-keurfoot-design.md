# Keur Foot — cahier des charges (validé le 2026-10-17)

> **Mise à jour du 21 octobre 2026** : document d'origine conservé tel quel, sauf l'identifiant Amazon. Le site n'est plus publié sur GitHub Pages ni sur Cloudflare Pages : le domaine keurfoot.com a été acheté et le site y est en ligne depuis le 20 octobre 2026, sur un Worker de fichiers statiques Cloudflare (`wrangler.jsonc`, voir le README). L'identifiant Amazon est désormais `keurfootfr-21` (nouveau compte Amazon Partenaires du 18 octobre 2026, l'ancien `keurfoot-21` est fermé).

## Intention

Keur Foot (keurfoot.com, domaine pas encore acheté) : le football africain pour tous les passionnés (et non plus « pour la diaspora en France », décision du 2026-10-20). Sélections nationales, CAN, grands joueurs africains, équipement de supporter. Monétisation : liens Amazon Partenaires (tag `keurfootfr-21`) et Google AdSense (même éditeur que Keurbook).

Modèle technique : le site Keurbook (`~/Dev/apps/Keurbook`, dépôt `teiki5320/keurbook`). On reprend sa stack, sa structure, son déploiement, sa gestion des liens Amazon, des cookies, des mentions légales et son pied de page « Un site TOA KEUR ». On ne reprend aucun contenu.

## Décisions de l'utilisateur

1. Périmètre : toute l'Afrique, Maghreb compris.
2. Les 20 premières pages ci-dessous sont validées telles quelles.
3. Pas encore de domaine : publication provisoire sur GitHub Pages (`https://teiki5320.github.io/keurfoot/`), **non indexée** jusqu'à l'arrivée de keurfoot.com, puis Cloudflare Pages comme Keurbook.
4. Logo fourni par l'utilisateur le 2026-10-17 : ballon noir, or et vert dans un anneau doré, « KEURFOOT .COM » argent et or. Fichiers dans `docs/brand/` (transparent, fond noir, fond blanc).
5. Travail uniquement sur la branche `main` du dépôt `teiki5320/keurfoot`, sans branche ni pull request. Seule exception hors de ce dossier : la carte Keur Foot dans la section « Sites » de toakeur.com (`~/Dev/apps/toakeur`).
6. Thème sombre : fond noir, or et vert comme le logo sur fond noir.
7. Carte Keur Foot sur toakeur.com ajoutée dès la mise en ligne, avec le lien GitHub Pages, remplacé par keurfoot.com plus tard.
8. Réponses à l'utilisateur : en points numérotés, avec des choix numérotés.

## Arborescence

| Rubrique | Adresses |
|---|---|
| Accueil | `/` |
| Sélections | `/selections` → `/selection/[pays]` (palmarès, histoire, joueurs emblématiques, maillot actuel avec lien Amazon) |
| Joueurs | `/joueurs` → `/joueur/[nom]` (historiques et actuels) |
| CAN | `/can` (toutes les éditions, palmarès) ; `/can/prochaine-edition` |
| Boutique supporter | `/boutique` (maillots, écharpes, drapeaux, ballons, crampons, buts pliables enfants, livres foot) ; `/boutique/maillots` |
| Top 10 | `/top-10` → `/top-10/[slug]`, une épingle Pinterest par page |
| Conseils | `/conseils` → `/conseils/[slug]` (guides d'achat) |
| Légal | `/mentions-legales`, `/confidentialite`, `/conditions` |

## Les 20 premières pages

1. Sélection Sénégal
2. Sélection Côte d'Ivoire
3. Sélection Cameroun
4. Sélection Maroc
5. Sélection Algérie
6. Sélection Mali
7. Joueur Didier Drogba
8. Joueur Samuel Eto'o
9. Joueur Sadio Mané
10. Joueur Achraf Hakimi
11. CAN : toutes les éditions et le palmarès
12. La prochaine CAN (pays hôte et dates vérifiés au moment de l'écrire)
13. Boutique supporter (toutes catégories)
14. Maillots des sélections africaines
15. Top 10 : les meilleurs joueurs sénégalais de l'histoire
16. Top 10 : les meilleurs joueurs ivoiriens de l'histoire
17. Top 10 : les meilleurs buteurs de l'histoire de la CAN
18. Top 10 : les pays les plus titrés à la CAN
19. Conseils : comment choisir sa taille de maillot de foot ?
20. Conseils : quel but de foot pliable choisir pour un enfant ?

## Règles de contenu

1. Tout en français, ton chaleureux et vivant, pour tous les passionnés de football africain.
2. **Rien d'inventé** : chaque chiffre (titres, sélections, buts, années, scores) vient d'au moins une source fiable (CAF, FIFA, RSSSF, Wikipédia, L'Équipe, fédérations), citée en bas de page. Une donnée non vérifiable n'est pas publiée.
3. Statistiques d'un joueur en activité : toujours datées (« au 1er octobre 2026 »).
4. Les classements « meilleurs » affichent leurs critères et se présentent comme « notre sélection » ; les classements chiffrés (buteurs, titres) sont des faits.
5. Textes écrits par nous, jamais recopiés ni paraphrasés de près.
6. Amazon : jamais d'ASIN ni de prix inventés ; sans ASIN vérifié, le lien mène à une recherche Amazon avec le tag.

## Droits et images

1. Aucun logo officiel (fédérations, CAF, FIFA, clubs), aucun écusson, aucune photo de joueur sans licence.
2. Illustrations originales (OpenArt, comme Keurbook) : sans texte, sans visage reconnaissable, sans logo ni maillot officiel reproduit.
3. Joueurs représentés par un maillot dessiné par le site (couleurs du drapeau, numéro, poste), jamais par leur visage.
4. Les couleurs des drapeaux sont libres d'usage ; les écussons de fédérations ne le sont pas.

## Pinterest

Une épingle verticale de 1000 × 1500 px par page Top 10 (illustration, titre, signature Keur Foot), générée au build, et un bouton « Épingler » sur la page.

## Design

Mobile d'abord, dynamique, couleurs vives tirées du logo : noir profond, or, vert émeraude, avec le rouge en accent ; titres en capitales condensées. Cartes qui défilent au doigt. Le logo `docs/brand/keurfoot-logo-transparent.png` sert d'en-tête, de pied de page, d'icônes et d'image de partage.

## Publicité

AdSense coupé pendant la phase GitHub Pages (pas de site validé). Emplacements prévus pour Cloudflare : fiche sélection 1, fiche joueur 1, page CAN 1, Top 10 2, conseil 2 ; aucun sur l'accueil, les listes, la boutique, les pages légales.

## Laissé au constructeur

Mise en page fine, textes, choix des produits de la boutique (catégories imposées), ordre des sections de l'accueil.
