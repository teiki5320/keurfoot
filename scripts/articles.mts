/**
 * Articles complets des actus (veille) : téléchargés juste avant chaque construction du site (« prebuild »).
 * Lit l'index articles/keurfoot/index.json (TOUS les articles écrits, jamais supprimés, même quand l'actu
 * sort des 60 plus récentes) puis chaque article articles/keurfoot/<id>.json, et range le tout dans
 * .veille/articles.json (fichier de travail, non suivi par git). Ainsi une page /actus/<slug> indexée
 * par Google ne disparaît jamais. Si l'index manque, repli sur les actus de actus/keurfoot.json qui ont un `slug`.
 * Les pages /actus/<slug> sont construites à partir de ce fichier (src/lib/articles.ts).
 *
 * Pour chaque article, une image de partage JPG 1200 × 630 est rangée dans public/og/actus/<id>.jpg
 * (dossier non suivi par git) : les cartes SVG de la veille ne s'affichent ni sur WhatsApp, ni sur Facebook, ni dans Google.
 *
 * Le fichier des actus récentes est aussi gardé dans .veille/actus.json : les blocs d'actus sont écrits dans
 * le HTML des pages (Google les voit), puis rafraîchis dans le navigateur.
 *
 * Si la veille ne répond pas, ou si un fichier est abîmé, le build ne casse jamais : 0 page article (ou moins).
 * Lancement : npx tsx scripts/articles.mts (lancé tout seul avant chaque build).
 * Essai hors ligne : NEXT_PUBLIC_VEILLE_BASE=http://localhost:8765 npm run build (même arborescence que la veille).
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";
import { BASE_VEILLE, cheminPartageActu, lireArticle, lireFlux, lireIndex, type ArticleActu, type ImageActu } from "../src/lib/veille";

const racine = join(import.meta.dirname, "..");
const DELAI_MS = 15000;
const dossier = join(racine, ".veille");
const fichier = join(dossier, "articles.json");
const fichierActus = join(dossier, "actus.json");

async function lireJson(url: string): Promise<unknown> {
  const controle = new AbortController();
  const minuteur = setTimeout(() => controle.abort(), DELAI_MS);
  try {
    const rep = await fetch(url, { signal: controle.signal, headers: { "User-Agent": "KeurFoot-build/1.0 (+https://keurfoot.com)" } });
    if (!rep.ok) return null;
    return await rep.json();
  } catch {
    return null;
  } finally {
    clearTimeout(minuteur);
  }
}

async function lireOctets(url: string): Promise<Buffer | null> {
  const controle = new AbortController();
  const minuteur = setTimeout(() => controle.abort(), DELAI_MS);
  try {
    const rep = await fetch(url, { signal: controle.signal, headers: { "User-Agent": "KeurFoot-build/1.0 (+https://keurfoot.com)" } });
    return rep.ok ? Buffer.from(await rep.arrayBuffer()) : null;
  } catch {
    return null;
  } finally {
    clearTimeout(minuteur);
  }
}

/** Image de partage JPG 1200 × 630 (recadrée au centre) ; false si l'image de l'actu est absente ou illisible. */
async function imagePartage(article: ArticleActu): Promise<boolean> {
  const chemin = cheminPartageActu(article.id);
  if (!chemin) return false;
  const cible = join(racine, "public", chemin);
  if (existsSync(cible)) return true;
  // Une seconde chance : GitHub Pages répond parfois lentement.
  const octets = (await lireOctets(article.image.url)) ?? (await lireOctets(article.image.url));
  if (!octets) return false;
  try {
    const source = article.image.url.endsWith(".svg") ? new Resvg(octets, { fitTo: { mode: "width", value: 1200 } }).render().asPng() : octets;
    await sharp(source).resize(1200, 630, { fit: "cover" }).jpeg({ quality: 80, mozjpeg: true }).toFile(cible);
    return true;
  } catch {
    return false;
  }
}

function ecrire(articles: ArticleActu[], genereLe: string) {
  mkdirSync(dossier, { recursive: true });
  writeFileSync(fichier, `${JSON.stringify({ genere_le: genereLe, telecharge_le: new Date().toISOString(), articles })}\n`);
}

try {
  const [index, flux] = await Promise.all([
    lireJson(`${BASE_VEILLE}/articles/keurfoot/index.json`).then(lireIndex),
    lireJson(`${BASE_VEILLE}/actus/keurfoot.json`).then(lireFlux),
  ]);
  mkdirSync(dossier, { recursive: true });
  writeFileSync(fichierActus, `${JSON.stringify(flux ?? { version: 3, site: "keurfoot", genere_le: "", actus: [] })}\n`);
  // Liste à construire : l'index complet ; sinon (index absent) les actus récentes qui ont un article.
  const aConstruire = index ?? (flux?.actus ?? []).filter((a) => a.slug).map((a) => ({ id: a.id, slug: a.slug as string }));
  if (!index && !flux) {
    console.warn("Articles des actus : la veille ne répond pas, aucune page article construite.");
    ecrire([], "");
  } else {
    // Image de l'actu quand elle est encore dans le fichier des actus (c'est la même ; sinon celle de l'article).
    const images = new Map<string, ImageActu>((flux?.actus ?? []).map((a) => [a.id, a.image]));
    const articles: ArticleActu[] = [];
    // Par paquets de 8 pour ne pas surcharger GitHub Pages.
    for (let i = 0; i < aConstruire.length; i += 8) {
      const lot = await Promise.all(
        aConstruire.slice(i, i + 8).map(async (e) => {
          const article = lireArticle(await lireJson(`${BASE_VEILLE}/articles/keurfoot/${e.id}.json`));
          // L'article doit correspondre à l'entrée (même id, même adresse).
          return article && article.id === e.id && article.slug === e.slug ? { ...article, image: images.get(e.id) ?? article.image } : null;
        }),
      );
      articles.push(...lot.filter((x): x is ArticleActu => x !== null));
    }
    // Une adresse ne sert qu'une fois (la plus récente gagne).
    articles.sort((a, b) => b.publie_le.localeCompare(a.publie_le));
    const vus = new Set<string>();
    const uniques = articles.filter((a) => (vus.has(a.slug) ? false : (vus.add(a.slug), true)));
    ecrire(uniques, flux?.genere_le ?? "");
    mkdirSync(join(racine, "public", "og", "actus"), { recursive: true });
    let partages = 0;
    for (let i = 0; i < uniques.length; i += 8) {
      partages += (await Promise.all(uniques.slice(i, i + 8).map(imagePartage))).filter(Boolean).length;
    }
    console.log(`Images de partage des actus : ${partages} sur ${uniques.length}.`);
    console.log(
      `Articles des actus : ${uniques.length} page(s) à construire sur ${aConstruire.length} article(s) ${index ? "de l'index" : "des actus récentes (index absent)"}.`,
    );
  }
} catch (e) {
  console.warn("Articles des actus : erreur inattendue, aucune page article construite.", e);
  ecrire([], "");
}
