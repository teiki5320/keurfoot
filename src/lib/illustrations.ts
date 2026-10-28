import "server-only";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { withBase } from "./config";
import { largeurWebp, srcsetIllustration } from "./images";

/**
 * Illustrations originales Keur Foot (public/illustrations/<clé>.webp, consignes dans docs/ILLUSTRATIONS.md).
 * Clés : accueil, can, boutique, selection-<slug>, top-<slug>, conseil-<slug>.
 * Renvoie le chemin public si l'image existe, sinon null (la page s'affiche alors sans illustration).
 */
export function illustration(key: string): string | null {
  return existsSync(join(process.cwd(), "public", "illustrations", `${key}.webp`)) ? `/illustrations/${key}.webp` : null;
}

const publicDe = (chemin: string) => join(process.cwd(), "public", chemin);

/**
 * Attributs d'une balise <img> pour une illustration : src, plus srcset et sizes quand les versions réduites
 * existent (le navigateur prend la plus petite qui suffit). `sizes` : largeur affichée, ex. « 100vw ».
 */
export function imageAllegee(src: string, sizes: string): { src: string; srcSet?: string; sizes?: string } {
  const fichier = publicDe(src);
  const largeur = existsSync(fichier) ? largeurWebp(readFileSync(fichier).subarray(0, 32)) : null;
  const srcSet = srcsetIllustration(src, largeur, (p) => existsSync(publicDe(p)));
  if (!srcSet) return { src: withBase(src) };
  return { src: withBase(src), srcSet: srcSet.split(", ").map(withBase).join(", "), sizes };
}
