/**
 * Tests du socle : liens Amazon Partenaires (tag keurfootfr-21) et chemins du site.
 * Lancement : npm test
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { AMAZON_DISCLOSURE, AMAZON_TAGS, PRODUITS_VERIFIES, amazonProductUrl, amazonSearchUrl, amazonUrl, type EmplacementAmazon } from "../src/lib/amazon";
import { SELECTIONS } from "../src/lib/data/selections";
import { SHOP } from "../src/lib/data/shop";
import { withBase } from "../src/lib/config";

describe("Liens Amazon", () => {
  it("une recherche Amazon.fr porte le tag keurfootfr-21 et la requête encodée", () => {
    const url = amazonSearchUrl("maillot Sénégal", "fiche");
    assert.ok(url.startsWith("https://www.amazon.fr/s?k="), url);
    assert.ok(url.includes("maillot%20S%C3%A9n%C3%A9gal"), url);
    assert.ok(url.includes("tag=keurfootfr-21"), url);
  });

  it("une fiche produit Amazon.fr porte le tag keurfootfr-21", () => {
    assert.equal(amazonProductUrl("B0ABCDEFGH", "fiche"), "https://www.amazon.fr/dp/B0ABCDEFGH?tag=keurfootfr-21");
  });

  it("sans ASIN vérifié, le lien mène à la recherche", () => {
    assert.equal(amazonUrl({ asin: null, amazonQuery: "écharpe Maroc" }, "boutique"), amazonSearchUrl("écharpe Maroc", "boutique"));
  });

  it("avec un ASIN vérifié et achetable, le lien mène à la fiche produit", () => {
    const asin = PRODUITS_VERIFIES.find((p) => p.statut === "actif")!.asin;
    assert.equal(amazonUrl({ asin, amazonQuery: "x" }, "fiche"), amazonProductUrl(asin, "fiche"));
  });

  it("un ASIN absent du registre des fiches vérifiées n'est jamais utilisé : le lien reste une recherche", () => {
    assert.equal(amazonUrl({ asin: "B0ABCDEFGH", amazonQuery: "x" }, "fiche"), amazonSearchUrl("x", "fiche"));
  });

  it("chaque emplacement a un code de suivi de la forme <nom>-21 (aujourd'hui, celui du site)", () => {
    for (const tag of Object.values(AMAZON_TAGS)) assert.match(tag, /^[a-z0-9]{1,20}-21$/);
    assert.deepEqual(new Set(Object.values(AMAZON_TAGS)), new Set(["keurfootfr-21"]));
  });

  it("chaque lien Amazon du site porte un code de suivi de la table", () => {
    const codes = new Set(Object.values(AMAZON_TAGS));
    const liens: string[] = [];
    const emplacements = Object.keys(AMAZON_TAGS) as EmplacementAmazon[];
    for (const e of emplacements) {
      for (const s of SELECTIONS) liens.push(amazonUrl(s.jersey, e));
      for (const c of SHOP) for (const p of c.products) liens.push(amazonUrl(p, e));
    }
    for (const l of liens) {
      const tag = new URL(l).searchParams.get("tag");
      assert.ok(tag && codes.has(tag), `code de suivi absent ou inconnu : ${l}`);
    }
  });

  it("registre des fiches vérifiées : ASIN valides, sans doublon, datés", () => {
    const asins = PRODUITS_VERIFIES.map((p) => p.asin);
    assert.equal(new Set(asins).size, asins.length);
    for (const p of PRODUITS_VERIFIES) {
      assert.match(p.asin, /^[0-9A-Z]{10}$/);
      assert.match(p.verifie_le, /^\d{4}-\d{2}-\d{2}$/);
      assert.ok(p.statut === "actif" || p.statut === "indisponible");
    }
  });

  it("tout ASIN écrit dans les données figure au registre des fiches vérifiées (jamais d'ASIN deviné)", () => {
    const registre = new Set(PRODUITS_VERIFIES.map((p) => p.asin));
    const asins = [...SELECTIONS.map((s) => s.jersey.asin), ...SHOP.flatMap((c) => c.products.map((p) => p.asin))].filter(Boolean);
    for (const a of asins) assert.ok(registre.has(a!), `ASIN ${a} non vérifié`);
  });

  it("une sélection dont le maillot n'est pas vendu sur Amazon mène à son drapeau", () => {
    for (const s of SELECTIONS.filter((x) => x.jersey.objet === "drapeau")) {
      assert.match(s.jersey.amazonQuery, /^drapeau /, s.slug);
      assert.match(s.jersey.label, /^Drapeau /, s.slug);
      assert.equal(s.jersey.asin, null);
    }
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
