# Keur Foot — règles de rédaction des contenus

À lire avant d'écrire une fiche sélection, une fiche joueur, une donnée de la CAN, un Top 10, un produit de la boutique ou un article Conseils. Voir aussi `docs/CONTENU.md` (ce que contient chaque page) et `src/lib/types.ts` (champs exacts).

## Règles générales

1. Tout est en **français**, ton chaleureux et vivant, pour un supporter de la diaspora en France qui connaît le foot mais pas forcément toute l'histoire.
2. **Rien d'inventé.** Chaque chiffre (titres, finales, sélections, buts, années, scores, dates) vient d'une source fiable et vérifiée. Une donnée qu'on ne peut pas vérifier n'est pas publiée : `null`, ou on n'en parle pas.
3. **Sources citées** : chaque fiche a un tableau `sources` d'au moins 2 adresses `https://` précises (la page exacte, pas l'accueil du site), dont au moins une hors Wikipédia pour les chiffres.
4. **Statistiques datées** : pour un joueur en activité, sélections et buts relevés à une date précise (`statsAsOf`), affichée sur la page (« au 1er octobre 2026 »).
5. **Classements** : un Top 10 « meilleurs » est un choix de la rédaction (`kind: "selection"`) et affiche ses critères ; un Top 10 chiffré (`kind: "classement"`) ne contient que des faits.
6. **Écrit par nous** : textes originaux, jamais recopiés ni paraphrasés de près d'un autre site.
7. **Amazon** : jamais d'ASIN ni de prix inventés. Sans ASIN vérifié à la main, `asin: null` et une recherche Amazon précise (`amazonQuery`).
8. **Droits** : aucun logo, écusson ou emblème officiel (fédérations, CAF, FIFA, clubs, équipementiers), aucune photo de joueur. Les joueurs sont représentés par un maillot dessiné par le site.
9. Périmètre : les 54 pays africains (`src/lib/countries.ts`), Maghreb compris.

## Méthode de vérification

1. Partir de Wikipédia (FR puis EN) pour repérer les faits.
2. Confirmer chaque chiffre sur une source primaire ou spécialisée : CAF (cafonline.com), FIFA (fifa.com, inside.fifa.com), RSSSF (rsssf.org), fédération nationale, presse sportive (L'Équipe, BBC Sport, Reuters, AFP).
3. En cas de désaccord entre sources, prendre la source officielle ou la plus récente, et le dire dans le texte si l'écart est connu (« selon la CAF »).
4. Noter l'adresse exacte de chaque page consultée dans `sources`, et la date du jour dans `updatedAt`.
5. Noms historiques : un pays qui a gagné sous un autre nom garde son slug actuel, avec le nom d'époque dans `winnerAs` / `runnerUpAs` (« Zaïre » pour la RD Congo, « République arabe unie » pour l'Égypte).

## Fiche sélection (`Selection`)

- `intro` : 1 ou 2 phrases. `history` : 3 à 5 paragraphes de 200 à 900 caractères (naissance de la sélection, grandes heures, CAN, Coupe du monde, aujourd'hui).
- `canTitles` et `canFinals` doivent correspondre exactement à `CAN_EDITIONS` (test automatique).
- `legends` : 4 à 8 joueurs, une phrase « pourquoi » chacun.
- `jersey.label` : « Maillot domicile du Sénégal » ; l'équipementier seulement s'il est vérifié.

## Fiche joueur (`Player`)

- `intro` : 1 ou 2 phrases. `bio` : 3 à 6 paragraphes (débuts, carrière en club, sélection, style, héritage).
- `clubs` : clubs principaux dans l'ordre. `honours` : titres et distinctions vérifiés.
- `caps` / `goals` : équipe nationale A uniquement.

## Top 10 (`TopList`)

- Exactement 10 entrées, rangs de 1 à 10 (égalités permises : même rang).
- `pinTitle` : 60 caractères au plus (titre de l'épingle Pinterest).
- `criteria` : obligatoire pour `kind: "selection"`.

## Articles Conseils (`content/conseils/<slug>.md`)

En-tête entre deux lignes `---`, une clé par ligne, listes séparées par des virgules :

```
---
title: Comment choisir sa taille de maillot de foot ?
description: (70 à 160 caractères, pour Google)
date: 2026-10-17
theme: acheter
resume: (réponse courte, 2 ou 3 phrases)
produits: maillots
---
Corps en Markdown, parties en « ## ». Liens internes : /selection/<slug>, /joueur/<slug>, /top-10/<slug>, /boutique, /can, /conseils/<slug>.
```

- `title` : la question, terminée par « ? ».
- Tailles et mesures : seulement des repères généraux, présentés comme indicatifs ; renvoyer au guide de taille du vendeur.
