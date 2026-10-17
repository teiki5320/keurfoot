import type { Player } from "@/lib/types";

/** Fiches des joueurs (règles : docs/REDACTION.md). Aucune photo : chaque joueur est représenté par un maillot dessiné. */
export const PLAYERS: Player[] = [];

const BY_SLUG = new Map(PLAYERS.map((p) => [p.slug, p]));

export function getPlayer(slug: string): Player | undefined {
  return BY_SLUG.get(slug);
}

/** Joueurs d'une sélection (slug de pays). */
export function playersOf(country: string): Player[] {
  return PLAYERS.filter((p) => p.selection === country);
}
