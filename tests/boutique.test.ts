/**
 * Tests de la boutique supporter : catégories imposées, liens Amazon avec le tag, aucun ASIN deviné.
 * Lancement : npm test
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { amazonUrl } from "../src/lib/amazon";
import { SHOP, getCategory } from "../src/lib/data/shop";
import { assertAmazon, dupes } from "./helpers";

describe("Boutique", () => {
  it("les 7 catégories du cahier des charges, puis les 4 ajoutées le 28 octobre 2026, dans l'ordre", () => {
    assert.deepEqual(
      SHOP.map((c) => c.slug),
      ["maillots", "echarpes", "drapeaux", "ballons", "crampons", "buts-pliables", "livres", "gants", "protege-tibias", "pompes", "cadres"],
    );
  });
  it("getCategory retrouve une catégorie", () => {
    assert.equal(getCategory("buts-pliables")?.name, "Buts pliables pour enfants");
    assert.equal(getCategory("inconnue"), undefined);
  });
  for (const c of SHOP) {
    it(`« ${c.slug} » : 3 à 8 produits avec lien Amazon tagué`, () => {
      assert.ok(c.products.length >= 3 && c.products.length <= 8, `${c.products.length} produits`);
      assert.ok(c.intro.length >= 60, "introduction trop courte");
      assert.deepEqual(dupes(c.products.map((p) => p.name)), []);
      for (const p of c.products) {
        assertAmazon(amazonUrl(p, "boutique"), `${c.slug} / ${p.name}`);
        if (p.asin) assert.match(p.asin, /^[0-9A-Z]{10}$/, "ASIN de 10 caractères");
        assert.ok(p.note.length >= 20 && p.note.length <= 220, `${p.name} : note de ${p.note.length} caractères`);
        assert.doesNotMatch(p.note, /\d+([,.]\d+)?\s?€/, `${p.name} : pas de prix sur le site`);
      }
    });
  }
});
