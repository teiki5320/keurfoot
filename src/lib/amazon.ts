/** Programme Partenaires Amazon : identifiant ajouté à tous les liens vers Amazon.fr. */
export const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || "keurfootfr-21";

/** Recherche Amazon.fr (utilisée tant que la fiche exacte du produit n'a pas été vérifiée à la main). */
export function amazonSearchUrl(query: string): string {
  return `https://www.amazon.fr/s?k=${encodeURIComponent(query)}&tag=${AMAZON_TAG}`;
}

/** Fiche produit Amazon.fr, à partir d'un ASIN vérifié à la main (jamais deviné). */
export function amazonProductUrl(asin: string): string {
  return `https://www.amazon.fr/dp/${encodeURIComponent(asin)}?tag=${AMAZON_TAG}`;
}

/** Lien d'achat : la fiche Amazon.fr si l'ASIN est connu, sinon une recherche précise. */
export function amazonUrl(p: { asin: string | null; amazonQuery: string }): string {
  return p.asin ? amazonProductUrl(p.asin) : amazonSearchUrl(p.amazonQuery);
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
