/**
 * Tests du design « Vestiaire » : couleurs du maillot dessiné, compte à rebours de la CAN.
 * Lancement : npm test
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { jerseyParts } from "../src/components/ui/jersey-colors";
import { NEXT_CAN, titlesBadge } from "../src/lib/data/can";
import { countdownLabel, daysUntil } from "../src/lib/countdown";

describe("Maillot dessiné", () => {
  it("corps, manches et liseré tirés des couleurs du drapeau", () => {
    assert.deepEqual(jerseyParts(["#00853f", "#fdef42", "#e31b23"]), { body: "#00853f", sleeve: "#fdef42", trim: "#e31b23" });
  });
  it("deux couleurs : le liseré reprend la couleur des manches", () => {
    assert.deepEqual(jerseyParts(["#b7312c", "#006341"]), { body: "#b7312c", sleeve: "#006341", trim: "#006341" });
  });
});

describe("Compte à rebours", () => {
  it("nombre de jours entre deux dates (heure de Paris)", () => {
    assert.equal(daysUntil("2027-06-19", "2026-10-20"), 242);
    assert.equal(daysUntil("2027-06-19", "2027-06-19"), 0);
  });
  it("libellé J-…, puis coup d'envoi", () => {
    assert.equal(countdownLabel(242), "J-242");
    assert.equal(countdownLabel(0), "Coup d'envoi");
    assert.equal(countdownLabel(-3), "Coup d'envoi");
  });
  it("la prochaine CAN a des dates de début et de fin", () => {
    assert.equal(NEXT_CAN.start, "2027-06-19");
    assert.equal(NEXT_CAN.end, "2027-07-17");
  });
});

describe("Chiffre sur le devant des maillots", () => {
  it("nombre de CAN gagnées, avec un astérisque si un titre est contesté", () => {
    assert.equal(titlesBadge([1976, 2025]), "2*");
    assert.equal(titlesBadge([1990, 2019]), "2");
    assert.equal(titlesBadge([]), "0");
  });
});

describe("Couleurs du maillot d'un joueur", () => {
  it("celles de sa sélection si elle a une fiche, sinon les siennes, sinon les couleurs du site", async () => {
    const { playerColors } = await import("../src/lib/data/players");
    const base = { colors: undefined } as const;
    assert.deepEqual(playerColors({ ...base, selection: "senegal" }), ["#00853f", "#fdef42", "#e31b23"]);
    // Toutes les sélections ont désormais une fiche : les cas de repli se testent avec un pays sans fiche.
    assert.deepEqual(playerColors({ selection: "pays-sans-fiche", colors: ["#bf0a30", "#ffffff", "#002868"] }), ["#bf0a30", "#ffffff", "#002868"]);
    assert.deepEqual(playerColors({ ...base, selection: "pays-sans-fiche" }), ["#1d2320", "#f2b705"]);
  });
});

describe("Sélections par région et penderie", () => {
  it("la penderie montre les sélections les plus titrées, la plus titrée d'abord", async () => {
    const { mostTitled } = await import("../src/lib/data/selections");
    const top = mostTitled(6);
    assert.equal(top.length, 6);
    assert.equal(top[0].slug, "egypte");
    for (let i = 1; i < top.length; i++) assert.ok(top[i].canTitles.length <= top[i - 1].canTitles.length);
  });
  it("chaque sélection est rangée dans sa région, par ordre alphabétique", async () => {
    const { SELECTIONS, selectionsByRegion } = await import("../src/lib/data/selections");
    const groups = selectionsByRegion();
    assert.equal(groups.reduce((n, g) => n + g.selections.length, 0), SELECTIONS.length);
    const ouest = groups.find((g) => g.region === "ouest")!;
    assert.ok(ouest.selections.some((s) => s.slug === "senegal"));
    for (const g of groups) assert.ok(g.selections.length > 0, `région vide : ${g.region}`);
  });
});
