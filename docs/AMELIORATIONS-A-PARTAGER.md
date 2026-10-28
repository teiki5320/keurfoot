# Améliorations techniques de Keur Foot

keurfoot.com · Next.js 16.3.6 en export statique (React 19, Tailwind 4) · hébergé sur Cloudflare (Worker de fichiers statiques) · mis en ligne par GitHub Actions avec `wrangler deploy` · 28 octobre 2026

## Par où commencer

1. **La publication automatique qui vérifie avant de publier (points 2 et 3).** Un site cassé n'est jamais mis en ligne. Les publications programmées ne s'arrêtent pas en silence au bout de 60 jours.
2. **Les images réduites proposées au navigateur (point 18).** C'est le plus gros gain de vitesse sur téléphone, et ça demande peu de code : un script avant le build et un `srcset`.
3. **http vers https, www vers l'adresse principale, et les en-têtes de sécurité (points 8 et 31).** Dix minutes de réglage. On évite les pages en double pour Google et on gagne les en-têtes que vérifient les outils d'audit.

## A. Mise en ligne

**1. Site 100 % statique**
- Ce qui est fait : Next.js produit un dossier `out/` de fichiers HTML, servi tel quel par un Worker Cloudflare de fichiers statiques, sans code serveur.
- À quoi ça sert : pas de serveur à maintenir ni à faire tomber, des pages rapides, un hébergement gratuit ou presque.
- Comment savoir si un autre site en a besoin : regarder si `next.config.ts` contient `output: "export"`. Si le site n'a ni compte utilisateur ni formulaire côté serveur, il peut passer en statique.
- Où regarder : `next.config.ts`, `wrangler.jsonc`, `package.json` (scripts `build`, `prebuild`, `postbuild`).
- État : fait et vérifié.

**2. Publication automatique avec contrôles**
- Ce qui est fait : à chaque envoi sur `main`, GitHub Actions lance lint, vérification des types, tests, construction, puis publication. Les secrets Cloudflare ne sont donnés qu'à l'étape de publication. Les actions GitHub sont figées par leur empreinte. Une seule publication tourne à la fois.
- À quoi ça sert : un code qui ne passe pas les tests n'est jamais mis en ligne, et un outil compromis pendant l'installation ne voit pas les secrets.
- Comment savoir si un autre site en a besoin : ouvrir son fichier de workflow et chercher `npm test` avant l'étape de publication, et `secrets.` en dehors de cette étape.
- Où regarder : `.github/workflows/deploy.yml`.
- État : fait et vérifié (publications au vert le 28 octobre 2026).

**3. Publications programmées qui ne s'éteignent pas**
- Ce qui est fait : le site se republie seul, le lundi, le mercredi et le vendredi pour les articles « Conseils » datés du jour (date de Paris), et deux fois par jour pour les actus. Chaque publication programmée réactive la tâche, car GitHub coupe les tâches programmées d'un dépôt public après 60 jours sans activité (règle GitHub : à vérifier dans leur documentation).
- À quoi ça sert : des articles écrits d'avance paraissent à leur date, sans intervention.
- Comment savoir si un autre site en a besoin : le site a-t-il des contenus datés dans le futur ? Le workflow contient-il `schedule:` sans l'étape « Garder la publication programmée active » ?
- Où regarder : `.github/workflows/deploy.yml` (blocs `schedule` et dernière étape), `src/lib/data/conseils.ts` (`getConseils`), `src/lib/conseils/article.ts` (`todayInParis`).
- État : fait et vérifié (publications programmées réussies les 21, 23, 26 et 28 octobre 2026).

**4. Bouton « Maintenance »**
- Ce qui est fait : un bouton dans l'onglet Actions de GitHub met le site en pause avec un message, ou le rouvre, puis republie. En pause, les pages passent en `noindex`, le sitemap est vide, et les pages légales restent accessibles.
- À quoi ça sert : couper le site proprement en cas de problème, sans toucher au code.
- Comment savoir si un autre site en a besoin : y a-t-il un moyen de mettre le site en pause sans écrire de code ?
- Où regarder : `.github/workflows/maintenance.yml`, `content/maintenance.json`, `src/lib/data/settings.ts`, `src/app/(site)/layout.tsx`, `src/app/sitemap.ts`, `src/components/layout/MaintenanceScreen.tsx`.
- État : fait, non vérifié (le bouton n'a jamais été lancé).

**5. Ancienne adresse redirigée page par page**
- Ce qui est fait : l'ancienne adresse GitHub Pages ne publie plus qu'une page qui renvoie chaque visiteur vers la même page sur le nouveau domaine. Cette page est en `noindex` et pointe vers la bonne adresse canonique.
- À quoi ça sert : ne perdre ni visiteurs ni liens après un changement de domaine.
- Comment savoir si un autre site en a besoin : ouvrir l'ancienne adresse d'une page intérieure, et voir si l'on arrive sur la même page du nouveau domaine.
- Où regarder : `.github/workflows/pages.yml`.
- État : fait et vérifié.

**6. Version de test non indexée, sous un sous-dossier**
- Ce qui est fait : deux réglages permettent de construire le site sous un sous-dossier (`/keurfoot`) et en mode « non indexé » : robots.txt bloque tout, sitemap vide, aucun script Google. Les chemins d'images passent par `withBase()`.
- À quoi ça sert : montrer ou tester une version sans que Google l'indexe, et sans liens cassés dans un sous-dossier.
- Comment savoir si un autre site en a besoin : le site a-t-il une adresse de préproduction ? Ouvrir son `/robots.txt` : il doit bloquer tout.
- Où regarder : `src/lib/config.ts` (`BASE_PATH`, `withBase`, `NOINDEX`), `src/app/robots.ts`, `src/app/sitemap.ts`, `package.json` (`test:sortie`).
- État : fait et vérifié (contrôles `npm run test:sortie`).

**7. Redirections courtes et vraie page 404**
- Ce qui est fait : quelques redirections définitives dans un fichier, par exemple `/selection` vers `/selections` et `/favicon.ico` vers l'icône. Une adresse inconnue renvoie une vraie erreur 404 avec la page 404 du site, en `noindex`.
- À quoi ça sert : pas d'erreur sur les adresses tapées à la main, et Google ne prend pas une page vide pour une vraie page.
- Comment savoir si un autre site en a besoin : `curl -s -o /dev/null -w '%{http_code}' https://site/page-qui-n-existe-pas` doit répondre 404, pas 200.
- Où regarder : `public/_redirects`, `wrangler.jsonc` (`not_found_handling`), `src/app/not-found.tsx`.
- État : fait et vérifié.

**8. http vers https, www vers l'adresse principale**
- Ce qui est fait : ce sont deux réglages du tableau de bord Cloudflare, pas du code. « Toujours utiliser HTTPS » est activé, et une règle de redirection envoie `www` vers l'adresse sans www (301, chemin et paramètres gardés).
- À quoi ça sert : une seule adresse par page pour Google, et aucune page servie sans chiffrement.
- Comment savoir si un autre site en a besoin : `curl -sI http://site/` et `curl -sI https://www.site/` doivent répondre 301 vers `https://site/`, pas 200.
- Où regarder : tableau de bord Cloudflare (SSL/TLS → Certificats de périphérie ; Règles → Règles de redirection) ; décrit dans `docs/INFRA.md` (Nom de domaine).
- État : fait et vérifié (le 28 octobre 2026).

## B. Google et référencement

**9. Métadonnées de chaque page au même endroit**
- Ce qui est fait : une seule fonction fabrique le titre, la description, l'adresse canonique, l'aperçu de partage et la règle robots de chaque page. Si le titre complet dépasse 60 caractères, le suffixe « | Keur Foot » est retiré. Les descriptions sont coupées proprement à 155 caractères. La grande image est autorisée dans Discover (`max-image-preview:large`).
- À quoi ça sert : aucune page oubliée (sans description ni canonique), et un réglage changé une fois pour tout le site.
- Comment savoir si un autre site en a besoin : ouvrir 3 pages au hasard et chercher `rel="canonical"` et `name="description"` dans le code source.
- Où regarder : `src/lib/metadata.ts` (`pageMetadata`, `clip`), `src/app/layout.tsx`.
- État : fait et vérifié (audit du 28 octobre 2026 : chaque page a un titre unique, une description et une adresse canonique).

**10. Sitemap fabriqué à partir des données**
- Ce qui est fait : le sitemap liste chaque fiche, chaque classement, chaque article publié à sa date et chaque article d'actu, avec sa date de mise à jour. robots.txt indique où il se trouve. Les deux sont vides en maintenance ou en version de test.
- À quoi ça sert : une nouvelle page arrive dans le sitemap toute seule, sans liste à tenir à la main.
- Comment savoir si un autre site en a besoin : ouvrir `/sitemap.xml` et vérifier qu'une page ajoutée récemment y figure.
- Où regarder : `src/app/sitemap.ts`, `src/app/robots.ts`.
- État : fait et vérifié.

**11. Données structurées pour Google**
- Ce qui est fait :
  - accueil : WebSite et Organization ;
  - pages intérieures : fil d'Ariane (BreadcrumbList) ;
  - pages d'entrée : ItemList ;
  - fiches de sélection : SportsTeam ;
  - fiches de joueur : Person ;
  - classements et conseils : Article ;
  - actus : NewsArticle.

  Le JSON est protégé contre l'injection : le caractère « < » est échappé.
- À quoi ça sert : Google comprend mieux chaque page, et un fil d'Ariane peut s'afficher dans les résultats.
- Comment savoir si un autre site en a besoin : passer une page dans le Test des résultats enrichis de Google, ou chercher `application/ld+json` dans son code source.
- Où regarder : `src/lib/json-ld.ts`, `src/components/ui/Breadcrumb.tsx`, `src/app/(site)/page.tsx`, `src/app/(site)/selection/[slug]/page.tsx`, `src/app/(site)/joueur/[slug]/page.tsx`, `src/app/(site)/top-10/[slug]/page.tsx`, `src/app/(site)/conseils/[slug]/page.tsx`, `src/app/(site)/actus/[slug]/page.tsx`.
- État : fait et vérifié (présence vérifiée en ligne ; validation par l'outil de Google : à refaire de temps en temps).

**12. Bing Webmaster Tools**
- Ce qui est fait : la balise de validation `msvalidate.01` est dans le `<head>` de toutes les pages, et le sitemap a été envoyé à Bing.
- À quoi ça sert : Bing (et les moteurs qui s'appuient sur lui) indexe et signale ses problèmes, comme la Search Console pour Google.
- Comment savoir si un autre site en a besoin : le site est-il dans la liste « Select website » de Bing Webmaster Tools ?
- Où regarder : `src/app/layout.tsx` (`verification`), `tests/sortie/sortie.test.ts`.
- État : fait et vérifié (validé le 28 octobre 2026 ; lecture du sitemap par Bing en cours).

**13. IndexNow**
- Ce qui est fait : un script envoie toutes les adresses du sitemap à IndexNow (Bing, Yandex…). La clé publique est servie à la racine du site.
- À quoi ça sert : les nouvelles pages sont signalées tout de suite au lieu d'attendre le passage du robot.
- Comment savoir si un autre site en a besoin : y a-t-il un fichier `<clé>.txt` à la racine du site et un script qui l'utilise ?
- Où regarder : `scripts/indexnow.mjs`, `public/` (fichier texte de la clé).
- État : fait, non vérifié (le script se lance à la main, il n'est pas dans la publication automatique).

**14. Contenu d'un flux externe écrit dans le HTML**
- Ce qui est fait : les actus viennent d'un fichier JSON externe. Elles sont téléchargées avant chaque build et écrites dans le HTML, puis rafraîchies dans le navigateur. Si le flux ne répond pas, les actus du build restent affichées et rien ne casse.
- À quoi ça sert : Google voit le contenu, ce qu'il ne fait pas toujours quand le contenu n'est chargé que par JavaScript.
- Comment savoir si un autre site en a besoin : `curl -s https://site/page | grep "texte attendu"`. Si le texte n'apparaît qu'après le JavaScript, Google peut ne pas le voir.
- Où regarder : `scripts/articles.mts`, `src/lib/articles.ts` (`fluxConstruit`), `src/components/actus/BlocActus.tsx`, `src/components/actus/BlocActusClient.tsx`.
- État : fait et vérifié.

**15. Pages permanentes pour un flux qui change**
- Ce qui est fait : chaque article du flux a sa propre page construite. Le site lit l'index de tous les articles jamais écrits, pas seulement des plus récents : une page indexée ne disparaît donc pas. Un article arrivé après le dernier build passe par une page de secours en `noindex`, hors sitemap.
- À quoi ça sert : pas d'erreurs 404 en série dans la Search Console quand un article sort du flux.
- Comment savoir si un autre site en a besoin : ouvrir une page d'article ancien. Elle répond-elle encore 200 ?
- Où regarder : `scripts/articles.mts`, `src/app/(site)/actus/[slug]/page.tsx` (`generateStaticParams`, `dynamicParams = false`), `src/app/(site)/actus/article/page.tsx`.
- État : fait et vérifié.

**16. Liens internes automatiques vers les fiches**
- Ce qui est fait : chaque article d'actu affiche « Pour aller plus loin », qui renvoie vers la fiche de chaque pays concerné et vers les joueurs cités par leur nom complet. Ça marche avec les apostrophes droites et courbes, et sans fausse détection sur un nom partiel.
- À quoi ça sert : le visiteur va vers les pages de fond, et Google voit des liens entre les pages. On est passé de 0 à 62 liens sur 39 articles.
- Comment savoir si un autre site en a besoin : ouvrir un article. Renvoie-t-il vers les pages de fond du site qui en parlent ?
- Où regarder : `src/lib/veille.ts` (`fichesLiees`), `src/lib/articles.ts` (`fichesParTag`), `src/components/actus/ArticleVue.tsx`.
- État : fait et vérifié (en ligne le 28 octobre 2026).

## C. Vitesse

**17. Une image prioritaire, les autres en différé**
- Ce qui est fait : la grande image du haut de page est chargée en priorité (`fetchPriority="high"`). Les vignettes plus bas se chargent quand on y arrive (`loading="lazy"`). Les dimensions sont toujours indiquées.
- À quoi ça sert : l'image principale s'affiche plus vite (LCP), et la page ne saute pas pendant le chargement.
- Comment savoir si un autre site en a besoin : rapport Lighthouse, lignes « Largest Contentful Paint » et « Cumulative Layout Shift ».
- Où regarder : `src/components/actus/ArticleVue.tsx`, `src/components/actus/ActuBandeau.tsx`, `src/app/(site)/conseils/[slug]/page.tsx` (image prioritaire) ; `src/components/conseils/ConseilCard.tsx`, `src/components/actus/ActuVignette.tsx` (chargement différé).
- État : fait et vérifié.

**18. Images réduites proposées au navigateur**
- Ce qui est fait : avant chaque build, un script fabrique des versions de 480 et 800 px de chaque illustration. Il ne refait pas celles qui sont à jour, et elles ne sont pas suivies par git. Les pages les proposent avec `srcset` et `sizes`, et le téléphone prend la plus petite qui suffit.
- À quoi ça sert : un téléphone ne télécharge plus l'image de 1 600 px. Le LCP mesuré est passé à 2,2 s (bon en dessous de 2,5 s).
- Comment savoir si un autre site en a besoin : chercher `srcset` dans le code source d'une page qui a des images. S'il n'y en a pas, il y a sûrement un gain.
- Où regarder : `scripts/images.mts`, `src/lib/images.ts`, `src/lib/illustrations.ts` (`imageAllegee`), `tests/images.test.ts`.
- État : fait et vérifié.

**19. Photos externes réduites elles aussi**
- Ce qui est fait : les photos des articles d'actus, hébergées ailleurs, sont aussi réduites (480 et 800 px) avant le build et servies par le site.
- À quoi ça sert : même gain que le point 18 pour des images que l'on ne contrôle pas.
- Comment savoir si un autre site en a besoin : le site affiche-t-il de grandes images venues d'un autre domaine ?
- Où regarder : `scripts/articles.mts`, `src/lib/veille.ts` (`cheminReduitActu`), `src/app/(site)/actus/[slug]/page.tsx` (`srcsetPhoto`).
- État : fait et vérifié.

**20. Polices hébergées par le site, une seule graisse pour les titres**
- Ce qui est fait : les polices sont chargées par `next/font` (servies par le site, avec `display: swap`). Le texte courant a 3 graisses (400, 500, 600), et les titres une seule (800).
- À quoi ça sert : pas d'appel à Google Fonts, moins de fichiers à télécharger, et le texte s'affiche tout de suite.
- Comment savoir si un autre site en a besoin : onglet Réseau, filtre « font ». Compter les fichiers et vérifier qu'aucun ne vient de fonts.googleapis.com.
- Où regarder : `src/app/layout.tsx`.
- État : fait et vérifié.

**21. Connexions préparées vers les domaines externes**
- Ce qui est fait : le navigateur ouvre d'avance la connexion vers le domaine des images d'actus, et vers celui d'AdSense quand il est actif (`preconnect`).
- À quoi ça sert : les premières images et le script externe arrivent un peu plus vite.
- Comment savoir si un autre site en a besoin : chercher `rel="preconnect"` dans le `<head>`, et regarder quels domaines externes la page charge en premier.
- Où regarder : `src/app/layout.tsx`.
- État : fait et vérifié.

**22. Mise en cache par le navigateur**
- Ce qui est fait : les fichiers de build, dont le nom change à chaque version, sont gardés un an (`immutable`). Les images à nom stable sont gardées une semaine, avec rafraîchissement en arrière-plan.
- À quoi ça sert : une deuxième visite ne retélécharge presque rien.
- Comment savoir si un autre site en a besoin : `curl -sI https://site/une-image.webp | grep -i cache-control`.
- Où regarder : `public/_headers`.
- État : fait et vérifié.

## D. Accessibilité

**23. Navigation au clavier et mouvements réduits**
- Ce qui est fait :
  - un lien « Aller au contenu » en tout début de page ;
  - un contour visible sur les boutons sélectionnés au clavier ;
  - les animations coupées pour qui a réglé « réduire les animations ».
- À quoi ça sert : le site se parcourt au clavier, et les personnes sensibles au mouvement ne sont pas gênées.
- Comment savoir si un autre site en a besoin : appuyer sur Tab à l'ouverture d'une page. Un lien « Aller au contenu » doit apparaître, et l'élément sélectionné doit toujours se voir.
- Où regarder : `src/app/layout.tsx`, `src/app/globals.css` (`focus-visible`, `prefers-reduced-motion`).
- État : fait et vérifié (Lighthouse accessibilité 100 sur 3 pages, le 28 octobre 2026).

**24. Noms clairs pour les lecteurs d'écran**
- Ce qui est fait :
  - les boutons Amazon disent le nom du produit ;
  - les maillots dessinés en SVG ont un rôle d'image et une description ;
  - le fil d'Ariane marque la page courante ;
  - les liens qui ouvrent un nouvel onglet le disent en texte caché.
- À quoi ça sert : une personne aveugle sait où mène chaque lien, même quand dix boutons portent le même libellé.
- Comment savoir si un autre site en a besoin : rapport Lighthouse, partie Accessibilité, ou un lecteur d'écran (VoiceOver) sur une page qui a plusieurs boutons identiques.
- Où regarder : `src/components/ui/AmazonButton.tsx`, `src/components/ui/Jersey.tsx`, `src/components/ui/Breadcrumb.tsx`, `src/components/actus/ArticleVue.tsx`.
- État : fait et vérifié.

## E. Monétisation et liens partenaires (Amazon, AdSense…)

**25. Liens Amazon fabriqués au même endroit**
- Ce qui est fait :
  - l'identifiant partenaire est réglé une seule fois ;
  - un lien mène à la fiche produit seulement si l'ASIN a été vérifié à la main, sinon à une recherche précise ;
  - chaque bouton a le même libellé « Voir sur Amazon » et `rel="sponsored nofollow"` ;
  - la mention « Partenaire Amazon » est prévue ;
  - des tests refusent un lien sans identifiant et un ASIN deviné.
- À quoi ça sert : pas de lien qui ne rapporte rien, pas de lien mort vers un produit inventé, et des liens payants signalés à Google (règles Amazon et Google : à vérifier pour chaque pays).
- Comment savoir si un autre site en a besoin : chercher `amazon.` dans le code. Si l'identifiant apparaît à plusieurs endroits, ou si des liens n'ont pas `rel="sponsored"`, ce point sert.
- Où regarder : `src/lib/amazon.ts`, `src/components/ui/AmazonButton.tsx`, `tests/socle.test.ts`, `tests/boutique.test.ts`.
- État : fait et vérifié.

**26. AdSense prêt et activable par réglage**
- Ce qui est fait :
  - l'identifiant d'éditeur se règle par une variable (vide = aucun script Google) ;
  - le fichier `ads.txt` et la balise de validation AdSense sont en place ;
  - un emplacement d'annonce n'affiche rien tant que son identifiant n'est pas réglé, et se replie si Google n'a pas d'annonce ;
  - chaque emplacement est signalé « Publicité ».
- À quoi ça sert : brancher les annonces sans toucher aux pages, et ne jamais laisser de trou vide.
- Comment savoir si un autre site en a besoin : ouvrir `/ads.txt`. Chercher aussi si les emplacements d'annonces sont écrits en dur dans chaque page.
- Où regarder : `src/lib/config.ts` (`ADSENSE_CLIENT`, `ADSENSE_SLOTS`), `src/components/ads/AdSlot.tsx`, `src/app/layout.tsx`, `public/ads.txt`, `src/app/globals.css` (`.ad-slot`).
- État : commencé, pas fini (examen AdSense en cours, aucun identifiant de bloc d'annonces réglé).

## F. Réseaux sociaux et partage (images de partage, Pinterest…)

**27. Image de partage sur chaque page**
- Ce qui est fait : chaque page donne un titre, une description et une image aux réseaux (Open Graph et Twitter). Les pages qui n'ont pas d'image propre utilisent une image par défaut de 1200 × 630.
- À quoi ça sert : un lien partagé sur WhatsApp ou Facebook montre un vrai aperçu, et pas un lien nu.
- Comment savoir si un autre site en a besoin : coller une adresse du site dans un outil d'aperçu de partage, ou chercher `og:image` dans le code source.
- Où regarder : `src/lib/metadata.ts` (`DEFAULT_SHARE_IMAGES`), `public/brand/`.
- État : fait et vérifié.

**28. Images de partage JPG fabriquées pour les articles**
- Ce qui est fait : pour chaque article d'actu, une image JPG de 1200 × 630 est fabriquée avant le build. Quand l'image d'origine est une carte SVG, elle est convertie, car WhatsApp, Facebook et Google n'affichent pas les SVG.
- À quoi ça sert : un aperçu correct même quand l'image d'origine est dans un format que les réseaux refusent.
- Comment savoir si un autre site en a besoin : chercher `og:image` sur une page. Si l'adresse finit par `.svg` ou `.webp`, il faut vérifier (WebP : à vérifier selon le réseau).
- Où regarder : `scripts/articles.mts` (`imagePartage`), `src/lib/veille.ts` (`cheminPartageActu`), `src/app/(site)/actus/[slug]/page.tsx`.
- État : fait et vérifié.

**29. Épingles Pinterest fabriquées au build**
- Ce qui est fait :
  - une image verticale de 1000 × 1500 est dessinée pour chaque classement au moment du build (satori, resvg et sharp) ;
  - un bouton « Épingler » est un simple lien vers Pinterest, sans script ni cookie.
- À quoi ça sert : des épingles toujours à jour, sans travail graphique à la main, et sans code Pinterest sur le site.
- Comment savoir si un autre site en a besoin : le site a-t-il des pages en liste ou en guide qui marcheraient sur Pinterest ?
- Où regarder : `scripts/epingles.mts`, `src/lib/pinterest.ts`, `src/components/ui/PinButton.tsx`, `tests/pinterest.test.ts`.
- État : fait et vérifié (images et liens en ligne ; aucun compte Pinterest branché pour l'instant).

## G. Sécurité et vie privée (en-têtes, cookies, consentement)

**30. En-têtes de sécurité**
- Ce qui est fait :
  - une politique de contenu (CSP) qui n'autorise que le site, les domaines Google utiles à AdSense et le domaine du flux d'actus ;
  - HSTS pendant 2 ans ;
  - `nosniff`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy` (caméra, micro et position bloqués).
- À quoi ça sert : un script injecté ne peut pas charger n'importe quoi, le site ne peut pas être affiché dans un cadre étranger, et le navigateur reste toujours en https.
- Comment savoir si un autre site en a besoin : `curl -sI https://site/ | grep -iE "content-security|strict-transport|x-frame"`.
- Où regarder : `public/_headers`.
- État : fait et vérifié.

**31. Aucun script tiers inutile, et les cookies réglables**
- Ce qui est fait :
  - sans AdSense, le site ne charge aucun script externe, et Pinterest n'est qu'un lien ;
  - le lien « Gérer mes cookies » rouvre le bandeau de consentement de Google, ou mène à la politique de confidentialité si le bandeau n'est pas chargé.
- À quoi ça sert : moins de cookies et de pistage, et un consentement que le visiteur peut changer à tout moment (règles RGPD et AdSense : à vérifier).
- Comment savoir si un autre site en a besoin : onglet Réseau sur la page d'accueil, compter les domaines externes chargés. Y a-t-il un lien pour changer son choix de cookies ?
- Où regarder : `src/components/ads/CookieSettingsLink.tsx`, `src/lib/pinterest.ts`, `src/app/(legal)/confidentialite/`.
- État : fait, non vérifié (le bandeau lui-même se règle dans AdSense, hors du dépôt).

**32. Secrets tenus à l'écart**
- Ce qui est fait :
  - les secrets de publication ne vivent que dans GitHub, et seule l'étape de publication les reçoit ;
  - `.env.example` ne contient que des réglages publics ;
  - l'en-tête « Powered by Next.js » est retiré ;
  - les adresses techniques de Cloudflare (`workers.dev`, aperçus) sont coupées.
- À quoi ça sert : une fuite de logs ou une dépendance piégée n'expose pas l'accès à l'hébergement, et le site n'existe qu'à une seule adresse.
- Comment savoir si un autre site en a besoin : chercher `secrets.` dans les workflows, et vérifier `workers_dev` dans `wrangler.jsonc`.
- Où regarder : `.github/workflows/deploy.yml`, `.env.example`, `next.config.ts` (`poweredByHeader`), `wrangler.jsonc` (`workers_dev`, `preview_urls`).
- État : fait, non vérifié (lu dans le code ; l'adresse `workers.dev` n'a pas été testée).

## H. Applications (si le site a une app iOS ou Android)

Rien de particulier : Keur Foot n'a pas d'application.

## I. Méthode : outils de contrôle, tests, tâches automatiques

**33. Tests lancés avant chaque publication**
- Ce qui est fait : lint, vérification des types (avec `next typegen`) et plus de 400 tests unitaires (`tsx --test`). Les tests couvrent les liens Amazon, la publication programmée, les liens internes valides à la date de chaque article, le flux d'actus et les images.
- À quoi ça sert : une erreur de donnée ou de code bloque la publication au lieu d'arriver en ligne.
- Comment savoir si un autre site en a besoin : `npm test` existe-t-il, et le workflow de publication le lance-t-il ?
- Où regarder : `tests/*.test.ts`, `package.json`, `.github/workflows/deploy.yml`.
- État : fait et vérifié (413 tests au vert le 28 octobre 2026).

**34. Contrôle du site construit**
- Ce qui est fait : une commande construit le site, puis vérifie les fichiers HTML produits :
  - un seul titre h1 et une description par page ;
  - `noindex` en version de test ;
  - liens corrects sous le sous-dossier ;
  - données structurées, `srcset` et balise Bing présents ;
  - actus présentes dans le HTML, image de partage par article.
- À quoi ça sert : on attrape les erreurs qui n'apparaissent qu'une fois le site construit.
- Comment savoir si un autre site en a besoin : le projet a-t-il un test qui lit le dossier de sortie (`out/`, `dist/`) ?
- Où regarder : `tests/sortie/sortie.test.ts`, `package.json` (`test:sortie`).
- État : fait et vérifié (71 contrôles au vert le 28 octobre 2026).

**35. Règles de rédaction testées**
- Ce qui est fait : les règles du site sont écrites (sources citées, statistiques datées, aucun ASIN inventé) et des tests les vérifient sur les données.
- À quoi ça sert : une règle écrite mais jamais contrôlée finit par être oubliée ; ici, la publication échoue.
- Comment savoir si un autre site en a besoin : le dépôt a-t-il un fichier de règles de rédaction, et un test qui le fait respecter ?
- Où regarder : `docs/REDACTION.md`, `tests/contenus.test.ts`, `tests/conseils.test.ts`, `tests/tops.test.ts`.
- État : fait et vérifié.

**36. Fiches de suivi tenues à jour**
- Ce qui est fait : quatre fiches (infrastructure, marketing, publication, README) décrivent l'état réel du site. La règle de les mettre à jour dans le même envoi que chaque changement est écrite dans `CLAUDE.md`, et une tâche du Studio les vérifie chaque matin.
- À quoi ça sert : savoir à tout moment ce qui est en ligne, sans fouiller le code.
- Comment savoir si un autre site en a besoin : le dépôt dit-il quelque part, et avec une date, ce qui est en ligne ?
- Où regarder : `CLAUDE.md`, `docs/INFRA.md`, `docs/MARKETING.md`, `docs/PUBLICATION.md`, `README.md`.
- État : fait, non vérifié (la tâche du matin tourne hors du dépôt).

## Points faibles connus

1. **AdSense ralentit le téléphone.** Le script AdSense est chargé dans le `<head>` de toutes les pages, et avec le bandeau de consentement, cela fait environ 290 Ko sur un réseau lent. Piste : le charger après l'affichage, une fois l'examen AdSense passé (règles AdSense : à vérifier).
2. **Aucune annonce encore.** Aucun bloc d'annonces n'est réglé : les emplacements existent mais n'affichent rien.
3. **CSP encore permissive.** Elle autorise les scripts en ligne (`'unsafe-inline'`), dont Next.js a besoin en export statique. C'est moins strict qu'une CSP par empreintes.
4. **Aucune mesure d'audience.** La CSP autorise Cloudflare Web Analytics, mais aucune balise n'est installée.
5. **Le contrôle du site construit (point 34) ne tourne qu'à la main.** La publication automatique ne le lance pas.
6. **IndexNow se lance à la main** : il n'est pas branché sur la publication automatique.
7. **Des réglages hors du dépôt.** http vers https et www vers l'adresse principale sont réglés dans le tableau de bord Cloudflare, pas dans le code : rien ne les garde en mémoire, et il faut les refaire à la main pour chaque site. Le jeton Cloudflare de publication n'a pas les droits pour les régler.
8. **Barre finale.** Une adresse qui finit par « / », comme `/selections/`, répond par une redirection temporaire (307) au lieu d'une 301. C'est le comportement par défaut des fichiers statiques Cloudflare (`auto-trailing-slash`).
9. **Titres trop longs.** Environ 30 titres dépassent 60 caractères, surtout des titres d'actus : la règle du point 9 retire le suffixe mais ne coupe pas le titre.
10. **Scores de vitesse instables.** Les scores Lighthouse simulés varient beaucoup d'une mesure à l'autre (55 à 88). La mesure réelle donne 96 à 97. Aucun contrôle de vitesse automatique.
11. **Un avertissement d'accessibilité.** Le nom donné aux maillots dessinés ne reprend pas tout le texte visible (« label-content-name-mismatch »). Le score reste à 100.
12. **Dépendance au flux d'actus.** Les actus dépendent d'un flux hébergé sur github.io. S'il tombe, les actus du dernier build restent affichées, mais rien de nouveau n'arrive. Ce flux ne remplit pas ses étiquettes (tags) : les liens du point 16 sont donc calculés par le site.
