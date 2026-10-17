import type { Selection } from "@/lib/types";
import { SELECTIONS_MAROC_ALGERIE_MALI } from "./selections-nord-ouest";
import { SELECTIONS_SENEGAL_CIV_CAMEROUN } from "./selections-ouest-centre";

/** Fiches des sélections nationales (règles : docs/REDACTION.md). */
export const SELECTIONS: Selection[] = [...SELECTIONS_SENEGAL_CIV_CAMEROUN, ...SELECTIONS_MAROC_ALGERIE_MALI];

const BY_SLUG = new Map(SELECTIONS.map((s) => [s.slug, s]));

export function getSelection(slug: string): Selection | undefined {
  return BY_SLUG.get(slug);
}
