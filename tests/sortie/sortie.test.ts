/**
 * Contrôle du site construit (dossier out/), tel qu'il est publié sur keurfoot.com.
 * Lancement : npm run test:sortie (construit d'abord le site avec les réglages de deploy.yml),
 * ou npm run test:sortie:controle sur un out/ déjà construit (c'est ce que fait deploy.yml avant chaque publication).
 */
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { COUNTRIES } from "../../src/lib/countries";

const out = join(import.meta.dirname, "..", "..", "out");

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
    it(`${page} : une page, un seul h1, une description, indexable`, () => {
      const file = join(out, `${page}.html`);
      assert.ok(existsSync(file), `${page}.html manquant`);
      const html = readFileSync(file, "utf8");
      assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1, "un seul titre h1");
      assert.match(html, /<meta name="description" content="[^"]{50,}"/);
      assert.doesNotMatch(html, /<meta name="robots" content="noindex/, "page publiée : jamais noindex");
    });
  }
  it("construit pour keurfoot.com (pas pour l'ancienne adresse /keurfoot)", () => {
    const html = readFileSync(join(out, "selection", "senegal.html"), "utf8");
    assert.match(html, /<link rel="canonical" href="https:\/\/keurfoot\.com\/selection\/senegal"\/>/);
    const bad: string[] = [];
    for (const file of htmlFiles(out)) {
      const html = readFileSync(file, "utf8");
      for (const m of html.matchAll(/(?:src|href)="(\/keurfoot(?:\/[^"]*)?)"/g)) bad.push(`${file.replace(out, "")} → ${m[1]}`);
    }
    assert.deepEqual(bad.slice(0, 10), []);
  });
  it("chaque page a un titre de 60 caractères au plus", () => {
    const longs: string[] = [];
    for (const file of htmlFiles(out)) {
      const brut = readFileSync(file, "utf8").match(/<title>([^<]*)<\/title>/)?.[1];
      if (brut === undefined) continue;
      const titre = brut
        .replace(/&#x([0-9a-f]+);/gi, (_, h: string) => String.fromCodePoint(parseInt(h, 16)))
        .replace(/&#(\d+);/g, (_, d: string) => String.fromCodePoint(Number(d)))
        .replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
      if ([...titre].length > 60) longs.push(`${file.replace(out, "")} (${[...titre].length}) : ${titre}`);
    }
    assert.deepEqual(longs, []);
  });
  it("les liens Amazon s'ouvrent dans un nouvel onglet, signalés « sponsored nofollow noopener »", () => {
    let vus = 0;
    for (const file of htmlFiles(out)) {
      for (const m of readFileSync(file, "utf8").matchAll(/<a\b[^>]*href="https:\/\/www\.amazon\.fr[^"]*"[^>]*>/g)) {
        vus++;
        assert.match(m[0], /target="_blank"/, file.replace(out, ""));
        assert.match(m[0], /rel="[^"]*\bsponsored nofollow noopener\b[^"]*"/, file.replace(out, ""));
      }
    }
    assert.ok(vus > 0, "aucun lien Amazon trouvé");
  });
  it("l'accueil porte la balise de validation Bing Webmaster Tools", () => {
    const html = readFileSync(join(out, "index.html"), "utf8");
    assert.match(html, /<meta name="msvalidate.01" content="8BA824DE3FC8A5F0EC901A67D71AB314"/);
  });
  it("chaque fiche sélection décrit l'équipe pour Google (SportsTeam)", () => {
    const html = readFileSync(join(out, "selection", "senegal.html"), "utf8");
    assert.match(html, /"@type":"SportsTeam","name":"Équipe du Sénégal de football","alternateName":"Lions de la Teranga","sport":"Football"/);
  });
  it("les illustrations proposent des versions réduites (srcset)", () => {
    const html = readFileSync(join(out, "can.html"), "utf8");
    assert.match(html, /srcSet="\/reduites\/can-480\.webp 480w, \/reduites\/can-800\.webp 800w, \/illustrations\/can\.webp \d+w"/);
    assert.ok(existsSync(join(out, "reduites", "can-480.webp")));
  });
  // Actus : seulement si la veille a répondu pendant le build (sinon le site est construit sans actus).
  const veille = join(import.meta.dirname, "..", "..", ".veille", "articles.json");
  const articles = existsSync(veille) ? (JSON.parse(readFileSync(veille, "utf8")).articles as Array<{ id: string; slug: string; pays?: string[] }>) : [];
  it("la page Actus contient ses actus dans le HTML (vues par Google)", { skip: articles.length === 0 }, () => {
    const html = readFileSync(join(out, "actus.html"), "utf8");
    assert.match(html, /href="\/actus\/[a-z0-9-]+"/);
  });
  it("chaque article d'actu renvoie vers la fiche sélection de ses pays africains", { skip: articles.length === 0 }, () => {
    const isoVersSlug = new Map(COUNTRIES.map((c) => [c.iso2, c.slug]));
    for (const a of articles) {
      const slugs = (a.pays ?? []).map((p) => isoVersSlug.get(p)).filter((s): s is string => Boolean(s));
      if (slugs.length === 0) continue;
      const html = readFileSync(join(out, "actus", `${a.slug}.html`), "utf8");
      assert.match(html, /Pour aller plus loin/, a.slug);
      for (const s of slugs) assert.match(html, new RegExp(`href="/selection/${s}"`), `${a.slug} → ${s}`);
    }
  });
  it("chaque article d'actu a une image de partage JPG", { skip: articles.length === 0 }, () => {
    for (const a of articles.slice(0, 5)) {
      const html = readFileSync(join(out, "actus", `${a.slug}.html`), "utf8");
      assert.match(html, new RegExp(`<meta property="og:image" content="[^"]*/og/actus/${a.id}\\.jpg"`), a.slug);
      assert.ok(existsSync(join(out, "og", "actus", `${a.id}.jpg`)), a.id);
    }
  });
  it("les photos des articles d'actus ont des versions réduites servies par le site", { skip: articles.length === 0 }, () => {
    const avecPhoto = articles.filter((a) => existsSync(join(out, "reduites", "actus", `${a.id}-480.webp`)));
    assert.ok(avecPhoto.length > 0, "aucune photo réduite");
    const html = readFileSync(join(out, "actus", `${avecPhoto[0].slug}.html`), "utf8");
    assert.match(html, new RegExp(`srcSet="/reduites/actus/${avecPhoto[0].id}-480\\.webp 480w`));
  });
  it("une épingle Pinterest par Top 10", () => {
    for (const p of PAGES.filter((x) => x.startsWith("top-10/"))) {
      assert.ok(existsSync(join(out, "epingles", `${p.split("/")[1]}.png`)), p);
    }
  });
});
