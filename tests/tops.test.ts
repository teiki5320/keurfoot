/**
 * Tests des Top 10 : dix places, rangs cohérents, critères, liens vers les fiches, sources.
 * Lancement : npm test
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getCountry } from "../src/lib/countries";
import { canRanking } from "../src/lib/data/can";
import { TOPS, getTop } from "../src/lib/data/tops";
import { DATE, SLUG, assertSources, dupes } from "./helpers";

describe("Top 10", () => {
  it("slugs uniques", () => assert.deepEqual(dupes(TOPS.map((t) => t.slug)), []));
  for (const t of TOPS) {
    it(`« ${t.slug} » : dix places et rangs cohérents`, () => {
      assert.match(t.slug, SLUG);
      assert.equal(t.items.length, 10);
      assert.equal(t.items[0].rank, 1);
      for (let i = 1; i < 10; i++) {
        const [a, b] = [t.items[i - 1].rank, t.items[i].rank];
        assert.ok(b === a || b === i + 1, `rang ${b} après ${a} (place ${i + 1})`);
      }
    });
    it(`« ${t.slug} » : textes, critères et sources`, () => {
      assert.ok(t.pinTitle.length <= 60, `titre d'épingle de ${t.pinTitle.length} caractères`);
      assert.ok(t.description.length >= 70 && t.description.length <= 160, `description de ${t.description.length} caractères`);
      assert.ok(t.intro.length >= 1 && t.intro.length <= 3);
      assert.ok(t.criteria.trim().length > 20, "critères à écrire");
      if (t.country) assert.ok(getCountry(t.country), t.country);
      for (const it of t.items) {
        if (it.country) assert.ok(getCountry(it.country), `${it.name} : pays inconnu ${it.country}`);
        else assert.match(it.name, /,| et /, `${it.name} : pays obligatoire pour une place non partagée`);
        assert.ok(it.text.length >= 40 && it.text.length <= 420, `${it.name} : texte de ${it.text.length} caractères`);
      }
      assertSources(t.sources, t.slug);
      assert.match(t.updatedAt, DATE);
    });
  }
  it("pays les plus titrés : identique au palmarès de la page CAN", () => {
    const top = getTop("pays-les-plus-titres-can")!;
    const r = canRanking().slice(0, 10);
    assert.deepEqual(top.items.map((i) => i.country), r.map((x) => x.country));
    assert.equal(top.items[0].stat, `${r[0].years.length} titres`);
  });
  it("meilleurs buteurs de la CAN : Samuel Eto'o en tête avec 18 buts", () => {
    const top = getTop("meilleurs-buteurs-can")!;
    assert.equal(top.items[0].name, "Samuel Eto'o");
    assert.equal(top.items[0].stat, "18 buts");
    assert.equal(top.kind, "classement");
  });
});
