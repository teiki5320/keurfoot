/**
 * Tests des contenus : pays, CAN, sélections, joueurs, Top 10 et boutique cohérents entre eux,
 * règles de docs/REDACTION.md (sources, dates, liens Amazon).
 * Lancement : npm test
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { COUNTRIES, getCountry } from "../src/lib/countries";
import { CAN_EDITIONS, CAN_INTRO, CAN_SOURCES, CAN_UPDATED, NEXT_CAN, canRanking, canTitlesByCountry } from "../src/lib/data/can";
import { DATE, SLUG, assertSources, dupes } from "./helpers";

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

describe("CAN", () => {
  it("années strictement croissantes, à partir de 1957", () => {
    assert.equal(CAN_EDITIONS[0].year, 1957);
    for (let i = 1; i < CAN_EDITIONS.length; i++) assert.ok(CAN_EDITIONS[i].year > CAN_EDITIONS[i - 1].year, `${CAN_EDITIONS[i].year}`);
  });
  for (const e of CAN_EDITIONS) {
    it(`CAN ${e.year} cohérente`, () => {
      for (const s of [e.winner, e.runnerUp, ...e.hosts]) assert.ok(getCountry(s), `${e.year} : pays inconnu ${s}`);
      assert.notEqual(e.winner, e.runnerUp);
      assert.ok(e.hosts.length >= 1);
      assert.ok(e.final.trim().length > 0);
      assert.ok(e.teams >= 3 && e.teams <= 24, `${e.year} : ${e.teams} équipes`);
      if (e.note !== null) assert.ok(e.note.length >= 40, `${e.year} : note trop courte`);
    });
  }
  it("palmarès officiel CAF au 17 octobre 2026", () => {
    const t = canTitlesByCountry();
    assert.equal(t.get("egypte")?.length, 7);
    assert.equal(t.get("cameroun")?.length, 5);
    assert.equal(t.get("ghana")?.length, 4);
    assert.deepEqual(t.get("maroc"), [1976, 2025]);
    assert.deepEqual(t.get("senegal"), [2021]);
  });
  it("le titre 2025 est signalé comme contesté", () => {
    const e = CAN_EDITIONS.find((x) => x.year === 2025);
    assert.match(e?.note ?? "", /TAS/);
  });
  it("titres par pays calculés depuis les éditions", () => {
    const titles = canTitlesByCountry();
    const total = [...titles.values()].reduce((n, years) => n + years.length, 0);
    assert.equal(total, CAN_EDITIONS.length);
    assert.deepEqual(titles.get(CAN_EDITIONS[0].winner)?.[0], CAN_EDITIONS[0].year);
  });
  it("classement des pays titrés : titres, puis finales perdues", () => {
    const r = canRanking();
    assert.equal(r.length, canTitlesByCountry().size);
    assert.deepEqual(r.map((x) => x.rank), r.map((_, i) => i + 1));
    for (let i = 1; i < r.length; i++) assert.ok(r[i].years.length <= r[i - 1].years.length);
    assert.equal(r[0].country, "egypte");
    // Côte d'Ivoire et Nigeria ont 3 titres chacun : le Nigeria a perdu plus de finales.
    assert.ok(r.findIndex((x) => x.country === "nigeria") < r.findIndex((x) => x.country === "cote-d-ivoire"));
  });
  it("introduction de 2 à 4 paragraphes", () => assert.ok(CAN_INTRO.length >= 2 && CAN_INTRO.length <= 4));
  it("sources et dates", () => {
    assertSources(CAN_SOURCES, "CAN");
    assert.match(CAN_UPDATED, DATE);
  });
  it("prochaine édition après la dernière disputée", () => {
    assert.ok(NEXT_CAN.year > CAN_EDITIONS.at(-1)!.year);
    for (const h of NEXT_CAN.hosts) assert.ok(getCountry(h), h);
    assertSources(NEXT_CAN.sources, "Prochaine CAN");
    assert.match(NEXT_CAN.checkedOn, DATE);
    assert.ok(NEXT_CAN.text.length >= 2);
  });
});
