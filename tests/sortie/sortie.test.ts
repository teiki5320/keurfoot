/**
 * Contrôle du site construit (dossier out/), version GitHub Pages sous /keurfoot.
 * Lancement : npm run test:sortie (construit d'abord le site avec les réglages de pages.yml).
 */
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";

const out = join(import.meta.dirname, "..", "..", "out");
const BASE = "/keurfoot";

/** Les 20 premières pages du cahier des charges, plus les pages d'entrée. */
const PAGES = [
  "selection/senegal",
  "selection/cote-d-ivoire",
  "selection/cameroun",
  "selection/maroc",
  "selection/algerie",
  "selection/mali",
  "joueur/didier-drogba",
  "joueur/samuel-eto-o",
  "joueur/sadio-mane",
  "joueur/achraf-hakimi",
  "can",
  "can/prochaine-edition",
  "boutique",
  "boutique/maillots",
  "top-10/meilleurs-joueurs-senegalais",
  "top-10/meilleurs-joueurs-ivoiriens",
  "top-10/meilleurs-buteurs-can",
  "top-10/pays-les-plus-titres-can",
  "conseils/comment-choisir-sa-taille-de-maillot-de-foot",
  "conseils/quel-but-de-foot-pliable-choisir-pour-un-enfant",
  // Lot du 20 octobre 2026
  "selection/egypte",
  "selection/nigeria",
  "selection/ghana",
  "selection/tunisie",
  "selection/rd-congo",
  "selection/afrique-du-sud",
  "joueur/mohamed-salah",
  "joueur/yaya-toure",
  "joueur/roger-milla",
  "joueur/george-weah",
  "joueur/riyad-mahrez",
  "joueur/el-hadji-diouf",
  "top-10/meilleurs-joueurs-camerounais",
  "top-10/meilleurs-joueurs-marocains",
  "top-10/meilleurs-joueurs-algeriens",
  "top-10/joueurs-africains-de-l-annee",
  "top-10/exploits-africains-coupe-du-monde",
  "conseils/quel-ballon-de-foot-choisir-selon-l-age",
  "conseils/comment-choisir-ses-crampons-selon-le-terrain",
  "conseils/quel-cadeau-offrir-a-un-fan-de-football-africain",
];
const ENTRIES = ["index", "selections", "joueurs", "top-10", "conseils", "mentions-legales", "confidentialite", "conditions"];

function htmlFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) return f === "_next" ? [] : htmlFiles(p);
    return f.endsWith(".html") ? [p] : [];
  });
}

describe("Site construit", () => {
  it("le dossier out/ existe", () => assert.ok(existsSync(join(out, "index.html")), "lancer npm run test:sortie"));
  for (const page of [...PAGES, ...ENTRIES]) {
    it(`${page} : une page, un seul h1, une description, non indexée`, () => {
      const file = join(out, `${page}.html`);
      assert.ok(existsSync(file), `${page}.html manquant`);
      const html = readFileSync(file, "utf8");
      assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1, "un seul titre h1");
      assert.match(html, /<meta name="description" content="[^"]{50,}"/);
      assert.match(html, /<meta name="robots" content="noindex/);
      assert.doesNotMatch(html, /googlesyndication/, "aucun script Google dans la version provisoire");
    });
  }
  it("tous les liens et images internes passent par /keurfoot", () => {
    const bad: string[] = [];
    for (const file of htmlFiles(out)) {
      const html = readFileSync(file, "utf8");
      for (const m of html.matchAll(/(?:src|href)="(\/[^"]*)"/g)) {
        if (!m[1].startsWith(`${BASE}/`) && m[1] !== BASE) bad.push(`${file.replace(out, "")} → ${m[1]}`);
      }
    }
    assert.deepEqual(bad.slice(0, 10), []);
  });
  it("sans AdSense, les pages légales ne décrivent ni bandeau ni annonces", () => {
    for (const page of ["confidentialite", "mentions-legales"]) {
      const html = readFileSync(join(out, `${page}.html`), "utf8");
      assert.doesNotMatch(html, /Gérer mes cookies|bandeau de Google|annonces fournies par Google/, page);
      assert.match(html, /aucune publicité/, page);
    }
  });
  it("une épingle Pinterest par Top 10", () => {
    for (const p of PAGES.filter((x) => x.startsWith("top-10/"))) {
      assert.ok(existsSync(join(out, "epingles", `${p.split("/")[1]}.png`)), p);
    }
  });
});
