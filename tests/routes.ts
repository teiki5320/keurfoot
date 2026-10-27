/**
 * Adresses internes valides du site, pour contrôler les liens écrits dans les contenus
 * (les ancres « #… » sont retirées avant le contrôle). Les conseils sont contrôlés à part (date de parution).
 */
import { PLAYERS } from "../src/lib/data/players";
import { SELECTIONS } from "../src/lib/data/selections";
import { TOPS } from "../src/lib/data/tops";

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
  "/actus",
  "/mentions-legales",
  "/confidentialite",
  "/conditions",
]);

export function validInternalPath(path: string): boolean {
  const clean = path.replace(/\/$/, "") || "/";
  if (STATIC.has(clean)) return true;
  const [, section, slug] = clean.split("/");
  if (section === "selection") return SELECTIONS.some((s) => s.slug === slug);
  if (section === "joueur") return PLAYERS.some((p) => p.slug === slug);
  if (section === "top-10") return TOPS.some((t) => t.slug === slug);
  return false;
}
