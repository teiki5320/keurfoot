/**
 * Tests de la rubrique Conseils : en-têtes complets, produits de la boutique et liens internes valides
 * à la date de publication de chaque article, liens Amazon tagués, publication programmée.
 * Lancement : npm test
 */
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { DESCRIPTION_MAX, DESCRIPTION_MIN, internalLinks, isPublished, parseConseil, splitAtMiddleSection, todayInParis, type Conseil } from "../src/lib/conseils/article";
import { CONSEIL_IMAGES } from "../src/lib/data/conseils-images";
import { getCategory } from "../src/lib/data/shop";
import { validInternalPath } from "./routes";
import { assertAmazon } from "./helpers";

const root = join(import.meta.dirname, "..");
const dir = join(root, "content", "conseils");
const conseils: Conseil[] = readdirSync(dir)
  .filter((f) => f.endsWith(".md"))
  .map((f) => parseConseil(f.replace(/\.md$/, ""), readFileSync(join(dir, f), "utf8")));
const bySlug = new Map(conseils.map((c) => [c.slug, c]));

/** Vrai si le lien interne mène à une page existante le jour où l'article paraît. */
function validAt(path: string, date: string): boolean {
  const [, section, slug] = path.split("/");
  if (section === "conseils" && slug) {
    const target = bySlug.get(slug);
    return Boolean(target && target.date <= date);
  }
  return validInternalPath(path);
}

describe("Conseils : en-têtes", () => {
  it("contient au moins un article", () => assert.ok(conseils.length > 0));
  for (const c of conseils) {
    it(`« ${c.slug} » a un en-tête complet`, () => {
      assert.match(c.title, /\?$/, "le titre doit être la question (terminée par « ? »)");
      assert.ok(c.description.length >= DESCRIPTION_MIN && c.description.length <= DESCRIPTION_MAX, `description de ${c.description.length} caractères (attendu ${DESCRIPTION_MIN} à ${DESCRIPTION_MAX})`);
      assert.match(c.date, /^\d{4}-\d{2}-\d{2}$/, "date au format AAAA-MM-JJ");
      assert.ok(c.resume.length > 0, "réponse courte (resume) obligatoire");
      assert.ok(c.body.length > 0, "corps de l'article vide");
    });
  }
});

describe("Conseils : produits, liens internes et liens Amazon", () => {
  for (const c of conseils) {
    it(`« ${c.slug} » ne pointe que vers des pages existantes au ${c.date}`, () => {
      for (const path of internalLinks(c.body)) assert.ok(validAt(path, c.date), `lien invalide : ${path}`);
      for (const s of c.produits) assert.ok(getCategory(s), `catégorie de la boutique inconnue : ${s}`);
      for (const m of c.body.matchAll(/\]\((https?:\/\/[^)\s]*amazon\.[^)\s]*)\)/g)) assertAmazon(m[1], c.slug);
    });
  }
});

describe("Conseils : publication programmée", () => {
  const future = parseConseil("article-futur", "---\ntitle: Question future ?\ndescription: x\ndate: 2099-01-05\ntheme: acheter\nresume: x\n---\nTexte.");
  it("un article daté du futur n'est pas publié", () => assert.equal(isPublished(future, todayInParis()), false));
  it("un article est publié le jour même (heure de Paris)", () => assert.equal(isPublished(future, "2099-01-05"), true));
  it("la date du jour à Paris passe minuit à l'heure française", () => assert.equal(todayInParis(new Date("2026-01-04T23:30:00Z")), "2026-01-05"));
  it("une catégorie inconnue est refusée", () => {
    assert.throws(() => parseConseil("x", "---\ntitle: Q ?\ndate: 2026-10-17\ntheme: inconnue\n---\nTexte."));
  });
});

describe("Emplacement d'annonce au milieu d'un article", () => {
  it("coupe avant la partie du milieu, sans rien perdre", () => {
    const html = "<p>a</p><h2 id=\"1\">1</h2><p>b</p><h2 id=\"2\">2</h2><p>c</p><h2 id=\"3\">3</h2><p>d</p><h2 id=\"4\">4</h2>";
    const [before, after] = splitAtMiddleSection(html);
    assert.equal(before + after, html);
    assert.ok(after.startsWith('<h2 id="3">'));
  });
  it("ne coupe pas un article de moins de 3 parties", () => {
    const html = "<p>a</p><h2>1</h2><p>b</p><h2>2</h2>";
    assert.deepEqual(splitAtMiddleSection(html), [html, ""]);
  });
});

describe("Conseils : images et crédits", () => {
  const imageDe = (slug: string) => join(root, "public", "illustrations", `conseil-${slug}.webp`);
  for (const c of conseils) {
    it(`« ${c.slug} » a une image`, () => assert.ok(existsSync(imageDe(c.slug)), `public/illustrations/conseil-${c.slug}.webp manquant`));
  }
  for (const [slug, credit] of Object.entries(CONSEIL_IMAGES)) {
    it(`crédit de « ${slug} » complet`, () => {
      assert.ok(bySlug.has(slug), "aucun article de ce nom");
      assert.ok(existsSync(imageDe(slug)), "image absente");
      assert.ok(credit.alt.trim().length >= 15, "texte alt trop court");
      if (credit.type === "photo") {
        assert.ok(credit.auteur.trim(), "auteur manquant");
        assert.match(credit.licence, /^(CC0|CC BY|CC BY-SA|Domaine public|Public domain)/, "licence non libre");
        assert.doesNotMatch(credit.licence, /NC|ND/, "licence non commerciale");
        assert.match(credit.page, /^https:\/\//, "page d'origine manquante");
      }
    });
  }
  it("jamais deux fois la même photo", () => {
    const pages = Object.values(CONSEIL_IMAGES).flatMap((c) => (c.type === "photo" ? [c.page] : []));
    assert.equal(new Set(pages).size, pages.length);
    const fichiers = conseils.map((c) => imageDe(c.slug)).filter((f) => existsSync(f));
    const empreintes = fichiers.map((f) => createHash("sha1").update(readFileSync(f)).digest("hex"));
    assert.equal(new Set(empreintes).size, empreintes.length, "deux articles ont le même fichier image");
  });
});
