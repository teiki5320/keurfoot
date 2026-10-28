/**
 * Articles complets des actus (veille) : téléchargés juste avant chaque construction du site (« prebuild »).
 * Lit actus/keurfoot.json puis, pour chaque actu qui a un `slug`, son article articles/keurfoot/<id>.json,
 * et range le tout dans .veille/articles.json (fichier de travail, non suivi par git).
 * Les pages /actus/<slug> sont construites à partir de ce fichier (src/lib/articles.ts).
 *
 * Si la veille ne répond pas, ou si un fichier est abîmé, le build ne casse jamais : 0 page article (ou moins).
 * Lancement : npx tsx scripts/articles.mts (lancé tout seul avant chaque build).
 * Essai hors ligne : NEXT_PUBLIC_VEILLE_BASE=http://localhost:8765 npm run build (même arborescence que la veille).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { BASE_VEILLE, lireArticle, lireFlux, type ArticleActu } from "../src/lib/veille";

const racine = join(import.meta.dirname, "..");
const DELAI_MS = 15000;
const dossier = join(racine, ".veille");
const fichier = join(dossier, "articles.json");

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

function ecrire(articles: ArticleActu[], genereLe: string) {
  mkdirSync(dossier, { recursive: true });
  writeFileSync(fichier, `${JSON.stringify({ genere_le: genereLe, telecharge_le: new Date().toISOString(), articles })}\n`);
}

try {
  const flux = lireFlux(await lireJson(`${BASE_VEILLE}/actus/keurfoot.json`));
  if (!flux) {
    console.warn("Articles des actus : la veille ne répond pas, aucune page article construite.");
    ecrire([], "");
  } else {
    const avecArticle = flux.actus.filter((a) => a.slug);
    const articles: ArticleActu[] = [];
    // Par paquets de 8 pour ne pas surcharger GitHub Pages.
    for (let i = 0; i < avecArticle.length; i += 8) {
      const lot = await Promise.all(
        avecArticle.slice(i, i + 8).map(async (a) => {
          const article = lireArticle(await lireJson(`${BASE_VEILLE}/articles/keurfoot/${a.id}.json`));
          // L'article doit correspondre à l'actu (même id, même adresse) et garder son image.
          return article && article.id === a.id && article.slug === a.slug ? { ...article, image: a.image } : null;
        }),
      );
      articles.push(...lot.filter((x): x is ArticleActu => x !== null));
    }
    // Une adresse ne sert qu'une fois (la plus récente gagne).
    const vus = new Set<string>();
    const uniques = articles.filter((a) => (vus.has(a.slug) ? false : (vus.add(a.slug), true)));
    ecrire(uniques, flux.genere_le);
    console.log(`Articles des actus : ${uniques.length} page(s) à construire sur ${flux.actus.length} actus (${avecArticle.length} avec article).`);
  }
} catch (e) {
  console.warn("Articles des actus : erreur inattendue, aucune page article construite.", e);
  ecrire([], "");
}
