/**
 * Tests de la veille actus (src/lib/veille.ts) : lecture du fichier, filtres, images, dates, et repli sans casse.
 * Lancement : npm test
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import {
  actuValide,
  ageActu,
  chargerActus,
  dateMiseAJour,
  filtrerActus,
  imageCarree,
  lireFlux,
  titreActusSelection,
  type Actu,
} from "../src/lib/veille";

const actu = (id: string, pays: string[], image: Partial<Actu["image"]> = {}): Actu => ({
  id,
  titre: "Le Sénégal qualifié pour la CAN",
  resume: "Les Lions de la Teranga valident leur billet après une victoire nette.",
  pays,
  source_nom: "RFI",
  source_url: "https://www.rfi.fr/article",
  publie_le: "2026-10-27T09:00:00.000Z",
  image: {
    url: `https://teiki5320.github.io/veille/images/keurfoot/${id}.webp`,
    source: "wikimedia",
    credit: "Auteur",
    licence: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:X.jpg",
    alt: "Un stade",
    largeur: 1600,
    hauteur: 900,
    ...image,
  },
});

describe("Veille actus : lecture du fichier", () => {
  it("garde les actus complètes, écarte les liens dangereux et les images hébergées ailleurs", () => {
    assert.ok(actuValide(actu("a", ["SN"])));
    assert.ok(!actuValide({ ...actu("b", []), source_url: "javascript:alert(1)" }));
    assert.ok(!actuValide(actu("c", [], { url: "https://exemple.com/x.webp" })));
    assert.ok(!actuValide(null));
  });

  it("refuse un fichier d'une autre version ou abîmé", () => {
    assert.equal(lireFlux({ version: 2, actus: [] }), null);
    assert.equal(lireFlux("pas du json"), null);
    assert.equal(lireFlux({ version: 3, site: "keurfoot", genere_le: "x", actus: [actu("a", []), { id: 1 }] })?.actus.length, 1);
  });

  it("hors navigateur ou en cas d'erreur, renvoie une liste vide sans lever d'erreur", async () => {
    assert.deepEqual(await chargerActus("https://adresse-fausse.invalid/x.json"), []);
  });

  it("dans le navigateur, une adresse fausse ou une réponse abîmée donne une liste vide", async () => {
    const g = globalThis as Record<string, unknown>;
    const fetchAvant = g.fetch;
    g.window = {};
    try {
      g.fetch = async () => {
        throw new TypeError("réseau coupé");
      };
      assert.deepEqual(await chargerActus("https://adresse-fausse.invalid/x.json"), []);
      g.fetch = async () => new Response("pas du json", { status: 200 });
      assert.deepEqual(await chargerActus("https://adresse-fausse.invalid/x.json"), []);
      g.fetch = async () => new Response("introuvable", { status: 404 });
      assert.deepEqual(await chargerActus("https://adresse-fausse.invalid/x.json"), []);
    } finally {
      delete g.window;
      g.fetch = fetchAvant;
    }
  });
});

describe("Veille actus : affichage", () => {
  it("filtre par pays et respecte la limite", () => {
    const liste = [actu("a", ["SN"]), actu("b", ["CI"]), actu("c", ["SN", "CI"]), actu("d", [])];
    assert.deepEqual(filtrerActus(liste, { pays: "SN", limite: 3 }).map((a) => a.id), ["a", "c"]);
    assert.deepEqual(filtrerActus(liste, { limite: 2 }).map((a) => a.id), ["a", "b"]);
  });

  it("image carrée : « -carre.webp » pour une photo, la même image pour une carte", () => {
    assert.match(imageCarree(actu("a", []).image), /\/a-carre\.webp$/);
    const carte = actu("b", [], { url: "https://teiki5320.github.io/veille/cartes/keurfoot/b.svg", source: "carte", licence: null, page: null }).image;
    assert.equal(imageCarree(carte), carte.url);
  });

  it("âge de l'actu en minutes, heures, jours puis date", () => {
    const maintenant = new Date("2026-10-27T12:00:00.000Z");
    assert.equal(ageActu("2026-10-27T11:59:40.000Z", maintenant), "à l'instant");
    assert.equal(ageActu("2026-10-27T11:48:00.000Z", maintenant), "il y a 12 min");
    assert.equal(ageActu("2026-10-27T09:00:00.000Z", maintenant), "il y a 3 h");
    assert.equal(ageActu("2026-10-25T09:00:00.000Z", maintenant), "il y a 2 j");
    assert.equal(ageActu("2026-10-01T09:00:00.000Z", maintenant), "le 1er octobre");
  });

  it("date de mise à jour à l'heure de Paris", () => {
    assert.equal(dateMiseAJour("2026-10-27T11:05:00.000Z"), "27 octobre 2026 à 12 h 05");
  });

  it("titre du bloc d'une sélection : surnom au pluriel, sinon le pays", () => {
    assert.equal(titreActusSelection("Lions de la Teranga", "du Sénégal"), "L'actu des Lions de la Teranga");
    assert.equal(titreActusSelection("Super Eagles", "du Nigeria"), "L'actu des Super Eagles");
    assert.equal(titreActusSelection("Bafana Bafana", "d'Afrique du Sud"), "L'actu d'Afrique du Sud");
    assert.equal(titreActusSelection(null, "du Soudan du Sud"), "L'actu du Soudan du Sud");
  });
});

describe("Veille actus : sécurité", () => {
  it("la CSP autorise la veille en connect-src et img-src, et nulle part ailleurs", () => {
    const csp = readFileSync(join(import.meta.dirname, "..", "public", "_headers"), "utf8").match(/Content-Security-Policy: (.+)/)![1];
    const directives = Object.fromEntries(csp.split(";").map((d) => d.trim().split(/\s+/)).map(([nom, ...v]) => [nom, v]));
    for (const [nom, valeurs] of Object.entries(directives)) {
      assert.equal(valeurs.includes("https://teiki5320.github.io"), nom === "connect-src" || nom === "img-src", nom);
    }
  });
});
