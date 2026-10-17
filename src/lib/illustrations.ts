import "server-only";
import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Illustrations originales Keur Foot (public/illustrations/<clé>.webp, consignes dans docs/ILLUSTRATIONS.md).
 * Clés : accueil, can, boutique, selection-<slug>, top-<slug>, conseil-<slug>.
 * Renvoie le chemin public si l'image existe, sinon null (la page s'affiche alors sans illustration).
 */
export function illustration(key: string): string | null {
  return existsSync(join(process.cwd(), "public", "illustrations", `${key}.webp`)) ? `/illustrations/${key}.webp` : null;
}
