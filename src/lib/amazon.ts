import VERIFIES from "./data/produits-amazon.json";

/** Programme Partenaires Amazon : identifiant du site, ajouté à tous les liens vers Amazon.fr. */
export const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || "keurfootfr-21";

/**
 * Emplacement d'un lien Amazon sur le site : il choisit le code de suivi (table ci-dessous),
 * pour savoir dans la console Amazon quel type de page rapporte des clics.
 */
export type EmplacementAmazon = "fiche" | "joueur" | "top" | "conseil" | "boutique";

/**
 * Table unique des codes de suivi, un par emplacement.
 * Pour l'instant, tous les emplacements utilisent le code du site : rien ne change en ligne.
 * Quand Jean aura créé les codes dans la console Amazon, il suffira de les écrire ici.
 */
export const AMAZON_TAGS: Record<EmplacementAmazon, string> = {
  fiche: AMAZON_TAG,
  joueur: AMAZON_TAG,
  top: AMAZON_TAG,
  conseil: AMAZON_TAG,
  boutique: AMAZON_TAG,
};

/** Recherche Amazon.fr (utilisée tant que la fiche exacte du produit n'a pas été vérifiée à la main). */
export function amazonSearchUrl(query: string, emplacement: EmplacementAmazon): string {
  return `https://www.amazon.fr/s?k=${encodeURIComponent(query)}&tag=${AMAZON_TAGS[emplacement]}`;
}

/** Fiche produit Amazon.fr, à partir d'un ASIN vérifié à la main (jamais deviné). */
export function amazonProductUrl(asin: string, emplacement: EmplacementAmazon): string {
  return `https://www.amazon.fr/dp/${encodeURIComponent(asin)}?tag=${AMAZON_TAGS[emplacement]}`;
}

/** Fiche Amazon vérifiée (src/lib/data/produits-amazon.json, tenu à jour par `npm run verifier-produits`). */
export interface ProduitVerifie {
  asin: string;
  produit: string;
  /** Date de la dernière vérification de la fiche sur amazon.fr (AAAA-MM-JJ). */
  verifie_le: string;
  /** « indisponible » : plus de bouton d'achat sur la fiche ; le lien revient alors à la recherche. */
  statut: "actif" | "indisponible";
}

export const PRODUITS_VERIFIES = VERIFIES as ProduitVerifie[];
const ACTIFS = new Set(PRODUITS_VERIFIES.filter((p) => p.statut === "actif").map((p) => p.asin));

/** L'ASIN a-t-il une fiche vérifiée, encore achetable ? */
export const asinActif = (asin: string | null) => !!asin && ACTIFS.has(asin);

/**
 * Lien d'achat : la fiche Amazon.fr si l'ASIN est vérifié et encore achetable, sinon une recherche précise
 * (jamais de produit affiché sans page Amazon où l'acheter).
 */
export function amazonUrl(p: { asin: string | null; amazonQuery: string }, emplacement: EmplacementAmazon): string {
  return p.asin && asinActif(p.asin) ? amazonProductUrl(p.asin, emplacement) : amazonSearchUrl(p.amazonQuery, emplacement);
}

/** Mention obligatoire du programme Partenaires Amazon. */
export const AMAZON_DISCLOSURE =
  "En tant que Partenaire Amazon, Keur Foot réalise un bénéfice sur les achats remplissant les conditions requises.";

/** Libellé unique de tous les boutons vers Amazon (modèle validé par Jean, identique à keurcook.com). */
export const AMAZON_LABEL = "Voir sur Amazon";

/** Petite ligne affichée sous chaque bouton Amazon (ou une fois sous une grille dense). */
export const AMAZON_NOTE = "Lien partenaire Amazon. Prix, disponibilité et vendeur sont indiqués sur Amazon.";

/** Ligne affichée à côté des images de produits qui sont des illustrations. */
export const ILLUSTRATION_NOTE = "Illustration IA : l'article vendu peut différer.";
