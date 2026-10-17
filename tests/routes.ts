/**
 * Adresses internes valides du site, pour contrôler les liens écrits dans les contenus
 * (les ancres « #… » sont retirées avant le contrôle).
 * Les rubriques à fiches (sélections, joueurs, Top 10) s'ajoutent ici au fil de leur création.
 */
const STATIC = new Set([
  "/",
  "/selections",
  "/joueurs",
  "/can",
  "/can/prochaine-edition",
  "/top-10",
  "/boutique",
  "/boutique/maillots",
  "/conseils",
  "/mentions-legales",
  "/confidentialite",
  "/conditions",
]);

export function validInternalPath(path: string): boolean {
  const clean = path.replace(/\/$/, "") || "/";
  return STATIC.has(clean);
}
