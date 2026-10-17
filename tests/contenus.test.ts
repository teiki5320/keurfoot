/**
 * Tests des contenus : pays, CAN, sélections, joueurs, Top 10 et boutique cohérents entre eux,
 * règles de docs/REDACTION.md (sources, dates, liens Amazon).
 * Lancement : npm test
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { COUNTRIES, getCountry } from "../src/lib/countries";
import { SLUG, dupes } from "./helpers";

describe("Pays africains", () => {
  it("les 54 États africains membres de l'ONU", () => assert.equal(COUNTRIES.length, 54));
  it("slugs uniques, en minuscules sans accents", () => {
    assert.deepEqual(dupes(COUNTRIES.map((c) => c.slug)), []);
    for (const c of COUNTRIES) assert.match(c.slug, SLUG, c.slug);
  });
  it("codes ISO uniques, deux lettres majuscules", () => {
    assert.deepEqual(dupes(COUNTRIES.map((c) => c.iso2)), []);
    for (const c of COUNTRIES) assert.match(c.iso2, /^[A-Z]{2}$/, c.slug);
  });
  it("chaque pays a son article (« du », « de la », « des »…) et son gentilé", () => {
    for (const c of COUNTRIES) {
      assert.match(c.of, /^(du |de la |de l'|des |d'|de )/, c.slug);
      assert.ok(c.demonym.length > 2, c.slug);
    }
  });
  it("getCountry retrouve un pays par son slug", () => {
    assert.equal(getCountry("senegal")?.demonym, "sénégalais");
    assert.equal(getCountry("cote-d-ivoire")?.name, "Côte d'Ivoire");
    assert.equal(getCountry("inconnu"), undefined);
  });
});
