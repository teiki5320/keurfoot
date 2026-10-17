/**
 * Tests des composants d'interface : lisibilité du numéro sur les maillots dessinés.
 * Lancement : npm test
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { jerseyTextColor } from "../src/components/ui/jersey-colors";

describe("Numéro du maillot", () => {
  it("numéro foncé sur un maillot or ou blanc", () => {
    assert.equal(jerseyTextColor("#f2b705"), "#0e1410");
    assert.equal(jerseyTextColor("#ffffff"), "#0e1410");
  });

  it("numéro blanc sur un maillot vert ou rouge foncé", () => {
    assert.equal(jerseyTextColor("#0f8a43"), "#ffffff");
    assert.equal(jerseyTextColor("#c1272d"), "#ffffff");
  });

  it("accepte la notation courte #rgb", () => {
    assert.equal(jerseyTextColor("#fff"), "#0e1410");
  });
});

describe("Dates et pluriels", () => {
  it("date en toutes lettres, « 1er » pour le premier du mois", async () => {
    const { formatDate } = await import("../src/lib/format");
    assert.equal(formatDate("2026-10-17"), "17 octobre 2026");
    assert.equal(formatDate("2026-10-01"), "1er octobre 2026");
  });

  it("pluriel simple et cas zéro", async () => {
    const { plural } = await import("../src/lib/format");
    assert.equal(plural(1, "titre", "titres"), "1 titre");
    assert.equal(plural(7, "titre", "titres"), "7 titres");
    assert.equal(plural(0, "titre", "titres", "aucun titre"), "aucun titre");
  });
});
