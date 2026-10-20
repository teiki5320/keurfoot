import type { ShopCategory } from "@/lib/types";

/**
 * Boutique supporter : sélection d'articles vers Amazon.fr (programme Partenaires, tag keurfootfr-21).
 * Chaque article est une recherche Amazon précise : aucun prix, aucune marque ni aucun ASIN inventés.
 * Un ASIN ne s'ajoute qu'après vérification à la main de la fiche Amazon (docs/REDACTION.md, règle 7).
 */
export const SHOP: ShopCategory[] = [
  {
    slug: "maillots",
    name: "Maillots des sélections",
    intro:
      "Le maillot, c'est la première chose qu'on enfile un soir de match. Domicile ou extérieur, adulte ou enfant : choisissez votre sélection, et vérifiez le guide des tailles avant de commander.",
    products: [
      { name: "Maillot du Sénégal", amazonQuery: "maillot football Sénégal domicile", asin: null, note: "Le maillot des Lions de la Teranga, en version adulte et enfant." },
      { name: "Maillot de la Côte d'Ivoire", amazonQuery: "maillot football Côte d'Ivoire domicile", asin: null, note: "Le maillot des Éléphants, pour les soirs de CAN comme pour le city stade." },
      { name: "Maillot du Cameroun", amazonQuery: "maillot football Cameroun domicile", asin: null, note: "Le maillot des Lions indomptables, en coupe ajustée ou plus ample." },
      { name: "Maillot du Maroc", amazonQuery: "maillot football Maroc domicile", asin: null, note: "Le maillot des Lions de l'Atlas, en version adulte et enfant." },
      { name: "Maillot de l'Algérie", amazonQuery: "maillot football Algérie domicile", asin: null, note: "Le maillot des Fennecs, en version adulte et enfant." },
      { name: "Maillot du Mali", amazonQuery: "maillot football Mali domicile", asin: null, note: "Le maillot des Aigles, pour les petits comme pour les grands." },
    ],
  },
  {
    slug: "echarpes",
    name: "Écharpes de supporter",
    intro:
      "Au stade comme devant l'écran, l'écharpe se brandit au coup d'envoi. Préférez une écharpe tricotée, plus chaude et plus durable qu'un simple foulard imprimé.",
    products: [
      { name: "Écharpe Sénégal", amazonQuery: "écharpe supporter Sénégal football", asin: null, note: "À brandir quand les Lions entrent sur la pelouse." },
      { name: "Écharpe Côte d'Ivoire", amazonQuery: "écharpe supporter Côte d'Ivoire football", asin: null, note: "Orange, blanc, vert : impossible de passer inaperçu." },
      { name: "Écharpe Maroc", amazonQuery: "écharpe supporter Maroc football", asin: null, note: "Le rouge et vert du Maroc, pour les grandes soirées." },
      { name: "Écharpe Algérie", amazonQuery: "écharpe supporter Algérie football", asin: null, note: "Pour chanter avec les Fennecs, au stade ou au café." },
      { name: "Écharpe Cameroun", amazonQuery: "écharpe supporter Cameroun football", asin: null, note: "Aux couleurs des Lions indomptables." },
    ],
  },
  {
    slug: "drapeaux",
    name: "Drapeaux et fanions",
    intro:
      "Un drapeau au balcon, sur les épaules ou à la fenêtre de la voiture : le format 90 × 150 cm est le plus courant. Vérifiez la présence d'œillets pour l'accrocher facilement.",
    products: [
      { name: "Drapeau du Sénégal", amazonQuery: "drapeau Sénégal 90 x 150 cm", asin: null, note: "Le grand format classique, avec œillets selon les modèles." },
      { name: "Drapeau de la Côte d'Ivoire", amazonQuery: "drapeau Côte d'Ivoire 90 x 150 cm", asin: null, note: "Orange, blanc, vert, en grand format." },
      { name: "Drapeau du Maroc", amazonQuery: "drapeau Maroc 90 x 150 cm", asin: null, note: "L'étoile verte sur fond rouge, en grand format." },
      { name: "Drapeau de l'Algérie", amazonQuery: "drapeau Algérie 90 x 150 cm", asin: null, note: "Vert et blanc, croissant et étoile rouges." },
      { name: "Drapeaux de voiture", amazonQuery: "drapeau voiture fenêtre pays africain", asin: null, note: "Petits drapeaux à pincer sur la vitre, pour les jours de match." },
      { name: "Lot de fanions des pays d'Afrique", amazonQuery: "guirlande fanions drapeaux pays Afrique", asin: null, note: "Une guirlande de drapeaux pour décorer la soirée CAN." },
    ],
  },
  {
    slug: "ballons",
    name: "Ballons",
    intro:
      "La taille du ballon dépend de l'âge : taille 3 pour les plus petits, taille 4 jusqu'à 12 ans environ, taille 5 pour les ados et les adultes. Pour le béton, choisissez un ballon résistant à l'abrasion.",
    products: [
      { name: "Ballon taille 5 adulte", amazonQuery: "ballon de football taille 5", asin: null, note: "La taille officielle des matchs adultes, à partir de 13 ans environ." },
      { name: "Ballon taille 4 enfant", amazonQuery: "ballon de football taille 4 enfant", asin: null, note: "Plus léger, pour les 8 à 12 ans environ." },
      { name: "Ballon taille 3", amazonQuery: "ballon de football taille 3", asin: null, note: "Pour les premiers dribbles des plus petits." },
      { name: "Ballon de futsal", amazonQuery: "ballon futsal taille 4", asin: null, note: "Rebond limité, pensé pour le jeu en salle." },
      { name: "Ballon pour le béton", amazonQuery: "ballon de football street résistant béton", asin: null, note: "Revêtement plus épais pour le city stade et la rue." },
    ],
  },
  {
    slug: "crampons",
    name: "Crampons et chaussures",
    intro:
      "La bonne chaussure dépend du terrain : crampons moulés pour l'herbe sèche et le synthétique, vissés pour les terrains gras, semelle plate pour la salle. Pour les enfants, le scratch facilite la vie.",
    products: [
      { name: "Crampons moulés", amazonQuery: "chaussures de foot crampons moulés terrain sec", asin: null, note: "Le choix polyvalent pour l'herbe sèche." },
      { name: "Chaussures pour terrain synthétique", amazonQuery: "chaussures de foot terrain synthétique AG", asin: null, note: "Plots courts et nombreux, adaptés au gazon artificiel." },
      { name: "Crampons vissés", amazonQuery: "chaussures de foot crampons vissés SG", asin: null, note: "Pour l'herbe grasse et les terrains détrempés." },
      { name: "Chaussures de futsal", amazonQuery: "chaussures futsal salle", asin: null, note: "Semelle plate en gomme pour la salle." },
      { name: "Crampons enfant à scratch", amazonQuery: "chaussures de foot enfant scratch", asin: null, note: "Faciles à mettre seul, pour les plus jeunes." },
    ],
  },
  {
    slug: "buts-pliables",
    name: "Buts pliables pour enfants",
    intro:
      "Un but pliable se monte en quelques secondes dans le jardin, au parc ou à la plage, puis se range dans sa housse. Regardez la taille déployée et la présence de piquets pour le fixer au sol.",
    products: [
      { name: "But pliable pop-up", amazonQuery: "but de foot pliable pop up enfant", asin: null, note: "Se déplie tout seul, idéal pour les petits jardins." },
      { name: "Lot de 2 buts pliables", amazonQuery: "lot 2 buts de foot pliables enfant", asin: null, note: "Pour de vrais matchs à deux équipes." },
      { name: "But de jardin grand format", amazonQuery: "but de foot jardin enfant 180 cm", asin: null, note: "Plus grand et plus stable, pour les enfants qui tirent fort." },
      { name: "But avec cible d'entraînement", amazonQuery: "but de foot enfant avec cible", asin: null, note: "Des zones à viser pour travailler la précision." },
    ],
  },
  {
    slug: "livres",
    name: "Livres de foot africain",
    intro:
      "Pour prolonger le match : biographies de légendes, histoire de la CAN, récits de supporters. De quoi faire découvrir le foot africain aux plus jeunes comme aux passionnés.",
    products: [
      { name: "Livres sur l'histoire de la CAN", amazonQuery: "livre histoire Coupe d'Afrique des nations football", asin: null, note: "Les grandes heures du tournoi racontées en livres." },
      { name: "Livres sur le football africain", amazonQuery: "livre football africain", asin: null, note: "Essais et récits sur le foot du continent." },
      { name: "Livres sur Didier Drogba", amazonQuery: "livre Didier Drogba", asin: null, note: "Les ouvrages consacrés à l'attaquant ivoirien." },
      { name: "Livres sur Samuel Eto'o", amazonQuery: "livre Samuel Eto'o", asin: null, note: "Les ouvrages consacrés au buteur camerounais." },
      { name: "Livres de foot pour enfants", amazonQuery: "livre football enfant", asin: null, note: "Romans et documentaires pour les jeunes fans de ballon rond." },
    ],
  },
];

const BY_SLUG = new Map(SHOP.map((c) => [c.slug, c]));

export function getCategory(slug: string): ShopCategory | undefined {
  return BY_SLUG.get(slug);
}
