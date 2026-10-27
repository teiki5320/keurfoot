# Keur Foot — illustrations originales

Illustrations créées avec OpenArt (modèle `nano-banana-2`, mode `text2image`, 4K), par planches de 4 (50 crédits la planche en 4K), puis découpées par `scripts/decouper-planche.mjs`.

## Style

Affiche sportive sérigraphiée : aplats vifs, motifs wax en texture, fond nuit, or, vert émeraude, touches de rouge. Composition dynamique.

**Interdits dans le prompt et à la vérification** : texte, lettres, chiffres, logos, écussons, blasons, emblèmes, marques, maillots officiels, visages, personnes reconnaissables. Les animaux symboles (lion, éléphant, fennec, aigle) sont dessinés librement, jamais dans un écusson. Les couleurs et motifs des drapeaux sont permis.

## Fichiers

`public/illustrations/<clé>.webp`, lus par `illustration(clé)` (`src/lib/illustrations.ts`) :

| Clé | Format | Scène |
|---|---|---|
| `accueil` | 3:2 | Ballon au-dessus d'un stade la nuit, rubans wax or et vert |
| `can` | 3:2 | Tribunes en fête, drapeaux et confettis |
| `boutique` | 3:2 | Écharpe, ballon, maillot sans logo, drapeau, baskets |
| `joueurs` | 3:2 | Chaussure qui frappe le ballon, éclats d'or |
| `selection-senegal` | 3:2 | Lion rugissant aux couleurs du drapeau, étoile verte |
| `selection-cote-d-ivoire` | 3:2 | Éléphant orange, blanc, vert |
| `selection-cameroun` | 3:2 | Lion bondissant vert, rouge, jaune, étoile jaune |
| `selection-maroc` | 3:2 | Lion à crinière en mosaïque rouge et verte, montagnes |
| `selection-algerie` | 3:2 | Fennec vert, blanc, rouge, croissant et étoile |
| `selection-mali` | 3:2 | Aigle vert, or, rouge au-dessus du stade |
| `conseil-<slug>` | 3:2 | Une scène par article |
| `top-<slug>` | 2:3 | Fond des épingles Pinterest (espace sombre en bas pour le titre) |

## Ajouter des illustrations

1. Écrire une planche de 4 scènes (« A 2x2 grid of four separate illustrations… separated by thin plain cream-white margins », style et interdits ci-dessus).
2. Vérifier le coût (`openart_model_cost`), générer, télécharger la planche dans le scratchpad.
3. `node scripts/decouper-planche.mjs planche.png 2 2 cle1 cle2 cle3 cle4` (ajouter `KEURFOOT_FORMAT=portrait` pour les fonds d'épingles 2:3).
4. Regarder chaque image : aucune marge crème, aucun texte, aucun logo, aucun visage.

## Photos libres et cartes des conseils (depuis le 27 octobre 2026)

Les conseils qui n'ont pas d'illustration originale reçoivent une image selon les règles de la veille actus (Studio : `docs/veille/decisions-v1.md`, section « Images ») :

1. **Wikimedia Commons**, puis **Openverse** en usage commercial (CC0, domaine public, CC BY, CC BY-SA), mots-clés en anglais. Auteur connu obligatoire. Jamais de photo de joueur, de logo ou d'écusson bien visible.
2. Sinon, **carte générée** aux couleurs du site (ballon, catégorie du conseil, « Keur Foot · Conseils »).

- Fichier : `public/illustrations/conseil-<slug>.webp`, WebP 1200 × 800 (3:2), servi par le site (aucun lien vers un serveur tiers).
- Crédit et texte alt : `src/lib/data/conseils-images.ts`. Affiché sous l'image de l'article : « Photo : auteur · licence » (lien vers la page d'origine) ou « Illustration : Keur Foot ». Sans entrée dans ce fichier, l'image est une illustration originale (« Illustration originale Keur Foot. »).
- On ne remplace pas une image existante ; jamais deux fois la même image sur le site (contrôlé par `tests/conseils.test.ts`, qui exige aussi une image pour chaque conseil).
