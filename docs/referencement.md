# Journal du référencement

Tenu par la routine « Référencement du jour » (le samedi pour Keur Foot). Une page travaillée n'est pas retouchée avant 28 jours : Google a besoin de ce temps pour réagir.

## 24 octobre 2026

Données : Search Console relevée par le Studio, du 24 septembre au 22 octobre 2026 (28 jours). Le site est jeune : quatre pages seulement sont en 2e page (places 4 à 20), avec peu de vues.

### Gains rapides (pages en 2e page)

| Date | Page | Recherches visées | Place et vues au moment du travail | Titre avant → après |
|---|---|---|---|---|
| 24/10/2026 | /joueur/yaya-toure | « yaya touré », « yaya toure », « equipe yaya toure » | 12,9 sur « yaya touré » ; 18 vues, 0 clic | titre inchangé (« Yaya Touré : carrière, palmarès et statistiques ») ; nouvelle description : CAN 2015, 4 fois joueur africain de l'année, Barcelone, Manchester City, clubs |
| 24/10/2026 | /joueur/didier-drogba | « didier drogba », « drogba » | 12,2 ; 8 vues, 0 clic | titre inchangé ; nouvelle description : 65 buts, Marseille, Chelsea, Ligue des champions 2012 |
| 24/10/2026 | /joueur/el-hadji-diouf | « el hadji diouf », « elhaj diouf » | 10,5 ; 3 vues, 0 clic | titre inchangé ; nouvelle description : Sénégal 2002, 2 fois joueur africain de l'année, Lens, Liverpool, Bolton |
| 24/10/2026 | /top-10/meilleurs-joueurs-marocains | « meilleur joueur du maroc », « qui est le meilleur joueur du maroc » | 7 à 11 ; 3 vues, 0 clic | « Les 10 meilleurs joueurs marocains de l'histoire » → « Les 10 meilleurs joueurs du Maroc de l'histoire » (titre et h1) ; description qui pose la question ; paragraphe visible qui y répond (Ahmed Faras pour la rédaction, Achraf Hakimi 2e) |

- Les titres et h1 des pages joueurs reprenaient déjà le nom recherché : seule la description (champ `seoDescription` des joueurs) a changé.
- Liens internes : ces quatre pages en avaient déjà plusieurs (Top 10 de leur pays, Top 10 des joueurs africains de l'année, fiche de leur sélection, page Joueurs ; le Top 10 du Maroc depuis la fiche Maroc et la page d'Achraf Hakimi). Rien ajouté.
- Pages à relire le 21 novembre 2026 ou après.

### Fiches enrichies vérifiées le 24 octobre 2026

- Déjà en place : BreadcrumbList sur toutes les pages à fil d'Ariane, Article sur les Conseils, ItemList sur les Top 10 et les pages d'entrée, Person sur les joueurs, WebSite sur l'accueil.
- Ajouté : Organization (nom, adresse, logo) sur l'accueil ; Article sur chaque Top 10 (titre, description, date de mise à jour, image de l'épingle) ; description dans Person.
- Pas de FAQPage : aucune page n'a de FAQ visible.

### Socle vérifié le 24 octobre 2026

- IndexNow : clé publique créée (`public/<clé>.txt`) et script `scripts/indexnow.mjs`, sur le modèle de Keur Cook ; à lancer après une publication (`node scripts/indexnow.mjs`).
- Google Discover : `max-image-preview:large` déjà sur toutes les pages ; image de partage par défaut de 1200 × 630, épingles pour les Top 10.
- Vitesse sur téléphone : PageSpeed Insights a refusé (quota du jour épuisé). À refaire au prochain passage : accueil, /joueur/didier-drogba, /top-10/meilleurs-joueurs-marocains.
- Constaté : http://keurfoot.com répond sans renvoyer vers https (réglage Cloudflare « Always Use HTTPS » à activer par Jean) ; l'adresse canonique en https limite le problème.

### Page nouvelle

Aucune : aucune recherche n'atteint 15 vues sur 28 jours (la plus vue, « yaya touré », 14 vues, a déjà sa page).
