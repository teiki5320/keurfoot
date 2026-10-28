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
  "selection/cap-vert",
  "joueur/kalusha-bwalya",
  "joueur/akwa",
  "selection/zambie",
  "selection/seychelles",
  "selection/congo",
  "selection/soudan",
  "selection/ethiopie",
  "selection/erythree",
  "selection/togo",
  "selection/guinee-bissau",
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
const ENTRIES = ["index", "selections", "joueurs", "top-10", "conseils", "actus", "mentions-legales", "confidentialite", "conditions"];

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
  it("chaque fiche sélection décrit l'équipe pour Google (SportsTeam)", () => {
    const html = readFileSync(join(out, "selection", "senegal.html"), "utf8");
    assert.match(html, /"@type":"SportsTeam","name":"Équipe du Sénégal de football","alternateName":"Lions de la Teranga","sport":"Football"/);
  });
  it("les illustrations proposent des versions réduites (srcset)", () => {
    const html = readFileSync(join(out, "can.html"), "utf8");
    assert.match(html, /srcSet="\/keurfoot\/reduites\/can-480\.webp 480w, \/keurfoot\/reduites\/can-800\.webp 800w, \/keurfoot\/illustrations\/can\.webp \d+w"/);
    assert.ok(existsSync(join(out, "reduites", "can-480.webp")));
  });
  // Actus : seulement si la veille a répondu pendant le build (sinon le site est construit sans actus).
  const veille = join(import.meta.dirname, "..", "..", ".veille", "articles.json");
  const articles = existsSync(veille) ? (JSON.parse(readFileSync(veille, "utf8")).articles as Array<{ id: string; slug: string }>) : [];
  it("la page Actus contient ses actus dans le HTML (vues par Google)", { skip: articles.length === 0 }, () => {
    const html = readFileSync(join(out, "actus.html"), "utf8");
    assert.match(html, /href="\/keurfoot\/actus\/[a-z0-9-]+"/);
  });
  it("chaque article d'actu a une image de partage JPG", { skip: articles.length === 0 }, () => {
    for (const a of articles.slice(0, 5)) {
      const html = readFileSync(join(out, "actus", `${a.slug}.html`), "utf8");
      assert.match(html, new RegExp(`<meta property="og:image" content="[^"]*/og/actus/${a.id}\\.jpg"`), a.slug);
      assert.ok(existsSync(join(out, "og", "actus", `${a.id}.jpg`)), a.id);
    }
  });
  it("une épingle Pinterest par Top 10", () => {
    for (const p of PAGES.filter((x) => x.startsWith("top-10/"))) {
      assert.ok(existsSync(join(out, "epingles", `${p.split("/")[1]}.png`)), p);
    }
  });
});
