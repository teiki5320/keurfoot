/**
 * Tests du socle : liens Amazon Partenaires (tag keurfoot-21) et chemins du site.
 * Lancement : npm test
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { AMAZON_DISCLOSURE, amazonProductUrl, amazonSearchUrl, amazonUrl } from "../src/lib/amazon";
import { withBase } from "../src/lib/config";

describe("Liens Amazon", () => {
  it("une recherche Amazon.fr porte le tag keurfoot-21 et la requête encodée", () => {
    const url = amazonSearchUrl("maillot Sénégal");
    assert.ok(url.startsWith("https://www.amazon.fr/s?k="), url);
    assert.ok(url.includes("maillot%20S%C3%A9n%C3%A9gal"), url);
    assert.ok(url.includes("tag=keurfoot-21"), url);
  });

  it("une fiche produit Amazon.fr porte le tag keurfoot-21", () => {
    assert.equal(amazonProductUrl("B0ABCDEFGH"), "https://www.amazon.fr/dp/B0ABCDEFGH?tag=keurfoot-21");
  });

  it("sans ASIN vérifié, le lien mène à la recherche", () => {
    assert.equal(amazonUrl({ asin: null, amazonQuery: "écharpe Maroc" }), amazonSearchUrl("écharpe Maroc"));
  });

  it("avec un ASIN vérifié, le lien mène à la fiche produit", () => {
    assert.equal(amazonUrl({ asin: "B0ABCDEFGH", amazonQuery: "x" }), amazonProductUrl("B0ABCDEFGH"));
  });

  it("la mention obligatoire nomme Keur Foot", () => {
    assert.ok(AMAZON_DISCLOSURE.includes("Keur Foot"));
  });
});

describe("Chemins du site", () => {
  it("sans sous-dossier, un chemin interne reste inchangé", () => {
    assert.equal(withBase("/a.png"), "/a.png");
    assert.equal(withBase("https://exemple.fr/a.png"), "https://exemple.fr/a.png");
  });
});
