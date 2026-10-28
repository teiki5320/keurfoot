# Keur Foot — ce que contient chaque page

Référence du contenu (règles d'écriture : `docs/REDACTION.md`). Toutes les pages : en-tête, fil d'Ariane, pied de page légal avec la mention Amazon et « Un site TOA KEUR ».

## Accueil `/`

Héros avec le logo et la promesse ; carrousel des sélections ; Top 10 en vedette ; palmarès express de la CAN et prochaine édition ; aperçu de la boutique ; derniers conseils. Aucune publicité.

## Sélections

- `/selections` : grille des fiches (maillot dessiné, surnom, nombre de CAN gagnées).
- `/selection/[pays]` : bandeau aux couleurs du drapeau, surnom, chiffres clés (CAN, finales, Coupes du monde), histoire, 1 publicité après l'histoire, joueurs emblématiques (liens vers leurs fiches), maillot actuel avec lien Amazon, Top 10 et conseils liés, sources.

## Joueurs

- `/joueurs` : cartes (maillot dessiné avec le numéro, nom, pays, poste), filtre légendes / en activité.
- `/joueur/[nom]` : maillot dessiné, chiffres clés datés, biographie, 1 publicité, clubs, palmarès, lien vers la sélection, Top 10 où il figure, sources. Jamais de photo.

## CAN

- `/can` : histoire en bref, toutes les éditions (année, hôte, vainqueur, finaliste, score), classement des pays titrés, 1 publicité après le tableau, sources.
- `/can/prochaine-edition` : hôte(s), dates (ou « à confirmer »), format, sources et date de vérification.

## Top 10

- `/top-10` : cartes des classements.
- `/top-10/[slug]` : intro, critères ou « classement chiffré », 10 entrées numérotées, 2 publicités (après la 5e place et en fin de page), épingle Pinterest (1000 × 1500) et bouton « Épingler », liens vers les fiches, sources.

## Boutique

- `/boutique` : une section par catégorie (maillots, écharpes, drapeaux, ballons, crampons, buts pliables enfants, livres foot), liens Amazon, aucune publicité.
- `/boutique/maillots` : un bloc par sélection du site (maillot dessiné, lien Amazon, renvoi au guide des tailles).

## Conseils

- `/conseils` : liste des guides d'achat.
- `/conseils/[slug]` : question, réponse courte, sommaire, article, produits liés, 2 publicités, articles liés.

## Actus

- `/actus` : 20 actus lues en direct depuis la veille ; toute la carte ouvre l'article (page construite, sinon page de secours, sinon la source).
- `/actus/[adresse]` : article complet écrit par la veille (300 à 450 mots), construit avec le site : fil d'Ariane, titre, chapô, date et temps de lecture, image 16:9 et son crédit, intertitres, bloc « Pour aller plus loin » (fiche sélection de chaque pays africain de l'actu, fiches des joueurs cités par leur nom complet, tags de la veille), encadré « Sources », 1 publicité en fin d'article, 3 autres actus. Jamais de lien Amazon.
- `/actus/article?id=…` : page de secours (`noindex`, hors sitemap) pour un article arrivé après la dernière construction.

## Pages légales

Mentions légales, confidentialité, conditions d'utilisation (reprises de Keurbook, adaptées au football).
