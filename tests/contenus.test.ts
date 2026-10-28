/**
 * Tests des contenus : pays, CAN, sélections, joueurs, Top 10 et boutique cohérents entre eux,
 * règles de docs/REDACTION.md (sources, dates, liens Amazon).
 * Lancement : npm test
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { COUNTRIES, REGIONS, getCountry } from "../src/lib/countries";
import { amazonUrl } from "../src/lib/amazon";
import { CAN_EDITIONS, CAN_INTRO, CAN_SOURCES, CAN_UPDATED, NEXT_CAN, canFinalsByCountry, canRanking, canTitlesByCountry } from "../src/lib/data/can";
import { PLAYERS } from "../src/lib/data/players";
import { SELECTIONS } from "../src/lib/data/selections";
import { DATE, HEX, SLUG, assertAmazon, assertSources, dupes } from "./helpers";

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
  it("chaque pays appartient à l'une des cinq régions du site", () => {
    const count = (r: string) => COUNTRIES.filter((c) => c.region === r).length;
    assert.deepEqual(Object.keys(REGIONS), ["ouest", "nord", "centre", "est", "australe"]);
    assert.equal(count("ouest"), 16);
    assert.equal(count("nord"), 6);
    assert.equal(count("centre"), 8);
    assert.equal(count("est"), 10);
    assert.equal(count("australe"), 14);
    assert.equal(getCountry("mauritanie")?.region, "ouest");
    assert.equal(getCountry("cameroun")?.region, "centre");
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

const PLAYERS_TO_COME = new Set<string>();
const playerSlugs = new Set(PLAYERS.map((p) => p.slug));

describe("Sélections", () => {
  it("une fiche pour chacun des 54 pays africains", () => {
    assert.deepEqual(SELECTIONS.map((s) => s.slug).sort(), COUNTRIES.map((c) => c.slug).sort());
  });
  it("slugs uniques, identiques au pays", () => {
    assert.deepEqual(dupes(SELECTIONS.map((s) => s.slug)), []);
    for (const s of SELECTIONS) assert.equal(s.slug, s.country);
  });
  for (const s of SELECTIONS) {
    it(`${s.slug} : palmarès identique à la page CAN`, () => {
      assert.ok(getCountry(s.country), s.country);
      assert.deepEqual(s.canTitles, canTitlesByCountry().get(s.country) ?? []);
      assert.deepEqual(s.canFinals, canFinalsByCountry().get(s.country) ?? []);
    });
    it(`${s.slug} : fiche complète et sourcée`, () => {
      for (let i = 1; i < s.worldCups.length; i++) assert.ok(s.worldCups[i] > s.worldCups[i - 1], "Coupes du monde en ordre croissant");
      assert.equal(s.worldCups.length === 0, s.bestWorldCup === null, "meilleur résultat seulement avec une participation");
      assert.ok(s.colors.length >= 2 && s.colors.length <= 3);
      for (const c of s.colors) assert.match(c, HEX);
      assert.ok(s.intro.length >= 60 && s.intro.length <= 260, `intro de ${s.intro.length} caractères`);
      // Fiche courte permise pour les sélections peu documentées (décision du 20 octobre 2026).
      assert.ok(s.history.length >= 2 && s.history.length <= 5, "2 à 5 paragraphes");
      for (const p of s.history) assert.ok(p.length >= 200 && p.length <= 900, `paragraphe de ${p.length} caractères`);
      assert.ok(s.legends.length >= 2 && s.legends.length <= 8, "2 à 8 joueurs emblématiques");
      for (const l of s.legends) {
        if (l.playerSlug) assert.ok(playerSlugs.has(l.playerSlug) || PLAYERS_TO_COME.has(l.playerSlug), `fiche joueur inconnue : ${l.playerSlug}`);
        assert.ok(l.why.length >= 20 && l.why.length <= 220, `${l.name} : ${l.why.length} caractères`);
      }
      assertAmazon(amazonUrl(s.jersey, "fiche"), s.slug);
      if (s.jersey.asin) assert.match(s.jersey.asin, /^[0-9A-Z]{10}$/);
      assertSources(s.sources, s.slug);
      assert.match(s.updatedAt, DATE);
    });
  }
});

describe("Joueurs", () => {
  it("les quinze fiches prévues (lots du 17 et du 20 octobre 2026)", () => {
    assert.deepEqual(PLAYERS.map((p) => p.slug).sort(), [
      "achraf-hakimi", "akwa", "didier-drogba", "el-hadji-diouf", "emmanuel-adebayor", "george-weah", "godfrey-chitalu", "kalusha-bwalya",
      "mohamed-salah", "pierre-emerick-aubameyang", "riyad-mahrez", "roger-milla", "sadio-mane", "samuel-eto-o", "yaya-toure",
    ]);
  });
  for (const p of PLAYERS) {
    it(`${p.slug} : fiche complète, statistiques datées si en activité`, () => {
      assert.match(p.slug, SLUG);
      assert.ok(getCountry(p.selection), p.selection);
      assert.match(p.birthDate, DATE);
      if (p.active) assert.match(p.statsAsOf ?? "", DATE, "date des statistiques obligatoire pour un joueur en activité");
      if (p.caps !== null && p.goals !== null) assert.ok(p.caps >= p.goals);
      if (p.shirtNumber !== null) assert.ok(p.shirtNumber >= 1 && p.shirtNumber <= 99);
      assert.ok(p.intro.length >= 60 && p.intro.length <= 260, `intro de ${p.intro.length} caractères`);
      assert.ok(p.bio.length >= 3 && p.bio.length <= 6, "3 à 6 paragraphes");
      for (const b of p.bio) assert.ok(b.length >= 200 && b.length <= 900, `paragraphe de ${b.length} caractères`);
      assert.ok(p.clubs.length >= 2 && p.honours.length >= 3);
      assertSources(p.sources, p.slug);
      assert.match(p.updatedAt, DATE);
    });
  }
});
