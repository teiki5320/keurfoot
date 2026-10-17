/** Épingles Pinterest des pages Top 10 : images 1000 × 1500 générées au build par scripts/epingles.mjs. */
export const PIN_WIDTH = 1000;
export const PIN_HEIGHT = 1500;

/** Chemin public de l'épingle d'un Top 10 (à préfixer par withBase() ou l'adresse du site). */
export function pinPath(slug: string): string {
  return `/epingles/${slug}.png`;
}

/** Lien « Épingler » : simple lien vers Pinterest, sans script ni cookie chargé sur le site. */
export function pinterestShareUrl(pageUrl: string, imageUrl: string, description: string): string {
  const q = new URLSearchParams({ url: pageUrl, media: imageUrl, description });
  return `https://www.pinterest.com/pin/create/button/?${q.toString()}`;
}
