/** Contrôles partagés par les tests de contenus (règles de docs/REDACTION.md). */
import assert from "node:assert/strict";
import type { Source } from "../src/lib/types";

export const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
export const DATE = /^\d{4}-\d{2}-\d{2}$/;
export const HEX = /^#[0-9a-f]{6}$/;

export const dupes = (list: Array<string | number>) => list.filter((s, i) => list.indexOf(s) !== i);

/** Au moins 2 sources en https, dont une hors Wikipédia. */
export function assertSources(sources: Source[], where: string) {
  assert.ok(sources.length >= 2, `${where} : au moins 2 sources`);
  for (const s of sources) {
    assert.ok(s.label.trim().length > 0, `${where} : source sans libellé`);
    assert.match(s.url, /^https:\/\/[^\s]+$/, `${where} : adresse de source invalide (${s.url})`);
  }
  assert.ok(sources.some((s) => !/wikipedia\.org/.test(s.url)), `${where} : au moins une source hors Wikipédia`);
}

/** Lien Amazon avec notre identifiant de partenaire. */
export function assertAmazon(url: string, where: string) {
  assert.match(url, /^https:\/\/www\.amazon\.fr\//, `${where} : lien Amazon.fr attendu`);
  assert.ok(url.includes("tag=keurfootfr-21"), `${where} : tag keurfootfr-21 manquant`);
}
