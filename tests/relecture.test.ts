/**
 * Corrections issues de la relecture finale du 17 octobre 2026.
 * Lancement : npm test
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { canYearsLabel } from "../src/lib/data/can";
import { getPlayer } from "../src/lib/data/players";
import { SELECTIONS, getSelection } from "../src/lib/data/selections";
import { TOPS, getTop } from "../src/lib/data/tops";
import { DATE } from "./helpers";

/** Joueurs encore en activité cités avec des chiffres dans les fiches sélections. */
const ACTIFS = ["Idrissa Gana Gueye", "Kalidou Koulibaly", "Aïssa Mandi", "Islam Slimani", "Riyad Mahrez", "Yassine Bounou", "Youssef En-Nesyri", "Achraf Hakimi", "Sadio Mané", "Chancel Mbemba", "Cédric Bakambu", "Yoane Wissa", "Ronwen Williams", "Mohamed Salah", "Victor Osimhen", "Ahmed Musa", "Jordan Ayew"];

describe("Relecture : statistiques datées", () => {
  it("chaque Top 10 « meilleurs joueurs » date ses chiffres en sélection", () => {
    // Classements de joueurs d'un pays (le Top 10 des exploits ne cite pas de statistiques de joueurs).
    for (const t of TOPS.filter((x) => x.kind === "selection" && x.country)) assert.match(t.statsAsOf ?? "", DATE, t.slug);
  });
  it("les chiffres des joueurs en activité dans les fiches sélections sont datés", () => {
    for (const s of SELECTIONS)
      for (const l of s.legends)
        if (ACTIFS.includes(l.name) && /\d+\s(sélections|buts|matchs)/.test(l.why)) assert.match(l.why, /au \d{1,2}(er)? \w+ 2026/, `${s.slug} / ${l.name}`);
  });
});

describe("Relecture : faits", () => {
  it("Mali : troisième de son groupe éliminatoire pour 2026", () => {
    const text = getSelection("mali")!.history.join(" ");
    assert.match(text, /troisièmes de leur groupe/i);
    assert.doesNotMatch(text, /deux premiers/);
  });
  it("10e place des buteurs : joueurs dans l'ordre alphabétique des noms", () => {
    const item = getTop("meilleurs-buteurs-can")!.items[9];
    assert.equal(item.name, "André Ayew, Kalusha Bwalya, Pierre Ndaye Mulamba, Francileudo Santos, Joël Tiéhi et Mengistu Worku");
  });
  it("Hakimi : le quart de finale 2026 est sourcé hors Wikipédia", () => {
    assert.ok(getPlayer("achraf-hakimi")!.sources.some((s) => s.url.includes("nbcboston.com")));
  });
  it("Mané : pas d'affirmation sans source citée sur les passes décisives", () => {
    assert.doesNotMatch(getPlayer("sadio-mane")!.bio.join(" "), /passeur/);
  });
});

describe("Relecture : titre 2025 contesté dans les chiffres clés", () => {
  it("les années contestées sont signalées", () => {
    assert.equal(canYearsLabel([1976, 2025]), "1976 et 2025 (titre contesté)");
    assert.equal(canYearsLabel([2002, 2019, 2025]), "2002, 2019 et 2025 (titre contesté)");
    assert.equal(canYearsLabel([1990, 2019]), "1990 et 2019");
    assert.equal(canYearsLabel([2021]), "2021");
  });
});

describe("Relecture : éditions sans finale", () => {
  it("1959 et 1976 (poule finale) ne comptent pas comme finales perdues", async () => {
    const { canFinalsByCountry } = await import("../src/lib/data/can");
    assert.equal(canFinalsByCountry().get("guinee"), undefined);
    assert.deepEqual(canFinalsByCountry().get("soudan"), [1963]);
  });
});
