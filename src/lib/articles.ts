/**
 * Articles complets des actus construits avec le site (pages /actus/<slug>).
 * Lus dans .veille/articles.json, écrit par scripts/articles.mts juste avant le build.
 * Fichier absent ou abîmé (veille muette, `next dev`) : aucun article, rien ne casse.
 */
import "server-only";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { getCountry } from "./countries";
import { PLAYERS } from "./data/players";
import { SELECTIONS } from "./data/selections";
import { lireArticle, type ArticleActu, type LienFiche } from "./veille";

let cache: ArticleActu[] | null = null;

/** Tous les articles construits, du plus récent au plus ancien. */
export function articlesConstruits(): ArticleActu[] {
  if (cache) return cache;
  const fichier = join(process.cwd(), ".veille", "articles.json");
  try {
    if (!existsSync(fichier)) return (cache = []);
    const brut = JSON.parse(readFileSync(fichier, "utf8")) as { articles?: unknown[] };
    const liste = Array.isArray(brut.articles) ? brut.articles.map(lireArticle).filter((a): a is ArticleActu => a !== null) : [];
    cache = liste.sort((a, b) => b.publie_le.localeCompare(a.publie_le));
  } catch {
    cache = [];
  }
  return cache;
}

/** Adresses (slugs) des pages construites : les cartes d'actus pointent vers elles. */
export function slugsConstruits(): string[] {
  return articlesConstruits().map((a) => a.slug);
}

export function getArticle(slug: string): ArticleActu | undefined {
  return articlesConstruits().find((a) => a.slug === slug);
}

/** Toutes les fiches qu'un tag peut désigner (joueurs et sélections existants). */
export function fichesParTag(): Record<string, LienFiche> {
  const fiches: Record<string, LienFiche> = {};
  for (const p of PLAYERS) fiches[`joueur:${p.slug}`] = { tag: `joueur:${p.slug}`, href: `/joueur/${p.slug}`, texte: `Lire la fiche de ${p.name}` };
  for (const s of SELECTIONS) {
    const pays = getCountry(s.country);
    if (pays) fiches[`selection:${s.slug}`] = { tag: `selection:${s.slug}`, href: `/selection/${s.slug}`, texte: `Voir la fiche de la sélection ${pays.of}` };
  }
  return fiches;
}
