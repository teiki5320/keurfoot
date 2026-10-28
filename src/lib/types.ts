/** Types des contenus du site (règles d'écriture : docs/REDACTION.md, contenu des pages : docs/CONTENU.md). */

/** Source d'une information publiée, citée en bas de page. */
export interface Source {
  label: string;
  url: string;
}

export type Position = "gardien" | "defenseur" | "milieu" | "attaquant";

/** Fiche d'une sélection nationale. Toutes les années et tous les chiffres sont sourcés. */
export interface Selection {
  /** Slug de la page, identique au slug du pays dans COUNTRIES. */
  slug: string;
  country: string;
  /** Surnom vérifié (« Lions de la Teranga »), sinon null. */
  nickname: string | null;
  /** 2 ou 3 couleurs du drapeau (#rrggbb) : maillot dessiné et bandeau. */
  colors: string[];
  /** 1 ou 2 phrases : chapeau de la fiche et description pour Google. */
  intro: string;
  /** 3 à 5 paragraphes écrits par nous. */
  history: string[];
  /** Années des CAN gagnées (doit correspondre à CAN_EDITIONS). */
  canTitles: number[];
  /** Années des finales de CAN perdues (doit correspondre à CAN_EDITIONS). */
  canFinals: number[];
  /** Années des phases finales de Coupe du monde disputées. */
  worldCups: number[];
  /** Meilleur résultat en Coupe du monde (« Quart de finale (2002) »), sinon null. */
  bestWorldCup: string | null;
  /** 4 à 8 joueurs emblématiques. */
  legends: Array<{ name: string; playerSlug: string | null; why: string }>;
  /**
   * Maillot actuel : recherche Amazon précise, ASIN seulement s'il est vérifié à la main (src/lib/data/produits-amazon.json).
   * `objet: "drapeau"` : le maillot de la sélection n'est pas vendu sur amazon.fr (vérifié le 28 octobre 2026),
   * le lien mène alors au drapeau du pays.
   */
  jersey: { label: string; amazonQuery: string; asin: string | null; objet?: "drapeau" };
  sources: Source[];
  updatedAt: string;
}

/** Fiche d'un joueur. Aucune photo : le joueur est représenté par un maillot dessiné. */
export interface Player {
  slug: string;
  name: string;
  /** Slug du pays de sa sélection (COUNTRIES). */
  selection: string;
  position: Position;
  /** Date de naissance AAAA-MM-JJ. */
  birthDate: string;
  active: boolean;
  /** Numéro porté en sélection, s'il est vérifié. */
  shirtNumber: number | null;
  /** Couleurs du drapeau, seulement si sa sélection n'a pas (encore) de fiche sur le site. */
  colors?: string[];
  intro: string;
  /** Description pour Google (155 caractères au plus), sinon l'introduction coupée. */
  seoDescription?: string;
  /** 3 à 6 paragraphes écrits par nous. */
  bio: string[];
  clubs: string[];
  honours: string[];
  /** Sélections et buts en équipe nationale A. */
  caps: number | null;
  goals: number | null;
  /** Date du relevé des statistiques : obligatoire pour un joueur en activité. */
  statsAsOf: string | null;
  sources: Source[];
  updatedAt: string;
}

/** Une édition de la Coupe d'Afrique des nations (slugs de COUNTRIES). */
export interface CanEdition {
  year: number;
  hosts: string[];
  winner: string;
  /** Nom porté à l'époque s'il diffère (« Zaïre », « République arabe unie »). */
  winnerAs: string | null;
  runnerUp: string;
  runnerUpAs: string | null;
  /** Score de la finale (« 2-1 », « 0-0 (4-2 t.a.b.) »), du point de vue du vainqueur, ou mode de désignation s'il n'y en a pas eu. */
  final: string;
  teams: number;
  /** Précision importante (titre contesté, forfait…), affichée avec l'édition. */
  note: string | null;
  /** Titre contesté (recours en cours) : signalé partout où l'année apparaît. */
  disputed: boolean;
}

export interface NextCan {
  year: number;
  hosts: string[];
  /** Dates officielles, sinon null (« à confirmer »). */
  dates: string | null;
  /** Coup d'envoi et finale (AAAA-MM-JJ), s'ils sont officiels : compte à rebours. */
  start: string | null;
  end: string | null;
  text: string[];
  sources: Source[];
  checkedOn: string;
}

export interface TopItem {
  rank: number;
  name: string;
  playerSlug: string | null;
  /** Slug du pays (COUNTRIES) ; null seulement pour une place partagée par des joueurs de plusieurs pays. */
  country: string | null;
  /** Chiffre clé sourcé (« 18 buts »), sinon null. */
  stat: string | null;
  text: string;
}

export interface TopList {
  slug: string;
  title: string;
  /** Titre court de l'épingle Pinterest (60 caractères au plus). */
  pinTitle: string;
  description: string;
  intro: string[];
  /** « classement » : faits chiffrés ; « selection » : choix de la rédaction selon des critères écrits. */
  kind: "classement" | "selection";
  criteria: string;
  /** Pays concerné (Top 10 d'une sélection), sinon null. */
  country: string | null;
  items: TopItem[];
  /** Date du relevé des sélections et buts cités (obligatoire pour un classement de joueurs), sinon null. */
  statsAsOf: string | null;
  sources: Source[];
  updatedAt: string;
}

export interface ShopProduct {
  name: string;
  amazonQuery: string;
  asin: string | null;
  note: string;
}

export interface ShopCategory {
  slug: string;
  name: string;
  intro: string;
  products: ShopProduct[];
}
