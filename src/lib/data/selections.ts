import { REGIONS, getCountry, type Region } from "@/lib/countries";
import type { Selection } from "@/lib/types";
import { SELECTIONS_MAROC_ALGERIE_MALI } from "./selections-nord-ouest";
import { SELECTIONS_LOT2 } from "./selections-lot2";
import { SELECTIONS_LOT3 } from "./selections-lot3";
import { SELECTIONS_SENEGAL_CIV_CAMEROUN } from "./selections-ouest-centre";

/** Fiches des sélections nationales (règles : docs/REDACTION.md). */
export const SELECTIONS: Selection[] = [...SELECTIONS_SENEGAL_CIV_CAMEROUN, ...SELECTIONS_MAROC_ALGERIE_MALI, ...SELECTIONS_LOT2, ...SELECTIONS_LOT3];

const BY_SLUG = new Map(SELECTIONS.map((s) => [s.slug, s]));

export function getSelection(slug: string): Selection | undefined {
  return BY_SLUG.get(slug);
}

/** Sélections les plus titrées en CAN (penderie de l'accueil et de la boutique) : titres, puis finales perdues. */
export function mostTitled(n: number): Selection[] {
  return [...SELECTIONS]
    .sort((a, b) => b.canTitles.length - a.canTitles.length || b.canFinals.length - a.canFinals.length)
    .slice(0, n);
}

/** Sélections rangées par région (ordre des régions du site), puis par ordre alphabétique. */
export function selectionsByRegion(): Array<{ region: Region; label: string; selections: Selection[] }> {
  return (Object.keys(REGIONS) as Region[])
    .map((region) => ({
      region,
      label: REGIONS[region],
      selections: SELECTIONS.filter((s) => getCountry(s.country)?.region === region).sort((a, b) =>
        getCountry(a.country)!.name.localeCompare(getCountry(b.country)!.name, "fr"),
      ),
    }))
    .filter((g) => g.selections.length > 0);
}
