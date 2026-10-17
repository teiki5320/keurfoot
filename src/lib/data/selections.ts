import type { Selection } from "@/lib/types";

/** Fiches des sélections nationales (règles : docs/REDACTION.md). */
export const SELECTIONS: Selection[] = [];

const BY_SLUG = new Map(SELECTIONS.map((s) => [s.slug, s]));

export function getSelection(slug: string): Selection | undefined {
  return BY_SLUG.get(slug);
}
