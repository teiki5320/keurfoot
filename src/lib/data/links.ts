import { getSelection } from "./selections";

/** Page d'un pays sur le site : sa fiche sélection si elle existe, sinon null (nom affiché sans lien). */
export function countryLink(slug: string): string | null {
  return getSelection(slug) ? `/selection/${slug}` : null;
}
