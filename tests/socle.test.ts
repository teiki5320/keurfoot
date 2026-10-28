/**
 * Tests du socle : liens Amazon Partenaires (tag keurfootfr-21) et chemins du site.
 * Lancement : npm test
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { AMAZON_DISCLOSURE, amazonProductUrl, amazonSearchUrl, amazonUrl } from "../src/lib/amazon";
import { withBase } from "../src/lib/config";

describe("Liens Amazon", () => {
  it("une recherche Amazon.fr porte le tag keurfootfr-21 et la requête encodée", () => {
    const url = amazonSearchUrl("maillot Sénégal");
    assert.ok(url.startsWith("https://www.amazon.fr/s?k="), url);
    assert.ok(url.includes("maillot%20S%C3%A9n%C3%A9gal"), url);
    assert.ok(url.includes("tag=keurfootfr-21"), url);
  });

  it("une fiche produit Amazon.fr porte le tag keurfootfr-21", () => {
    assert.equal(amazonProductUrl("B0ABCDEFGH"), "https://www.amazon.fr/dp/B0ABCDEFGH?tag=keurfootfr-21");
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

describe("Titres des pages", () => {
  it("un titre trop long est coupé en fin de mot, sous 60 caractères", async () => {
    const { couperTexte, pageMetadata } = await import("../src/lib/metadata");
    const long = "Les dix meilleurs joueurs de l'histoire du football camerounais, des Lions indomptables";
    const coupe = couperTexte(long, 60);
    assert.ok(coupe.length <= 60, coupe);
    assert.ok(coupe.endsWith("…"));
    assert.ok(long.startsWith(coupe.slice(0, -1)), "coupé en fin de mot");
    assert.equal(couperTexte("Court", 60), "Court");
    const meta = pageMetadata({ title: long, description: "x", path: "/x" });
    assert.deepEqual(meta.title, { absolute: coupe });
  });
});
