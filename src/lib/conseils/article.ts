import { isConseilCategory, type ConseilCategory } from "./categories";

/** Article de la rubrique Conseils : un fichier Markdown de content/conseils/, une question. */
export interface Conseil {
  slug: string;
  /** La question posée, qui sert de titre. */
  title: string;
  /** Description pour Google (70 à 170 caractères). */
  description: string;
  /** Date de publication (AAAA-MM-JJ) : l'article n'apparaît qu'à partir de ce jour. */
  date: string;
  theme: ConseilCategory;
  /** Réponse courte affichée en haut de l'article. */
  resume: string;
  /** Catégories de la boutique liées (slugs de SHOP), affichées en fin d'article avec leurs liens Amazon. */
  produits: string[];
  /** Corps de l'article en Markdown (parties en « ## »). */
  body: string;
  /** Illustration Keur Foot : public/illustrations/conseil-<slug>.webp, si elle existe. */
  image?: string | null;
}

export const DESCRIPTION_MIN = 70;
export const DESCRIPTION_MAX = 160;

/** En-tête simple « clé: valeur » entre deux lignes « --- » ; les listes sont séparées par des virgules. */
export function parseConseil(slug: string, raw: string): Conseil {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error(`Conseil « ${slug} » : en-tête manquant.`);
  const meta: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  const list = (v?: string) => (v ? v.split(",").map((s) => s.trim()).filter(Boolean) : []);
  const theme = meta.theme ?? "";
  if (!isConseilCategory(theme)) throw new Error(`Conseil « ${slug} » : catégorie inconnue « ${theme} ».`);
  return {
    slug,
    title: meta.title ?? "",
    description: meta.description ?? "",
    date: meta.date ?? "",
    theme,
    resume: meta.resume ?? "",
    produits: list(meta.produits),
    body: match[2].trim(),
  };
}

/** Date du jour à Paris (AAAA-MM-JJ) : un article paraît le jour de sa date à 0 h, heure française. */
export function todayInParis(now = new Date()): string {
  return new Intl.DateTimeFormat("fr-CA", { timeZone: "Europe/Paris", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

export const isPublished = (c: Pick<Conseil, "date">, today: string) => /^\d{4}-\d{2}-\d{2}$/.test(c.date) && c.date <= today;

/** Parties de l'article (titres « ## ») pour le sommaire, avec leur ancre. */
export function conseilSections(body: string): Array<{ id: string; title: string }> {
  return [...body.matchAll(/^##\s+(.+)$/gm)].map((m) => ({ id: anchorId(m[1]), title: m[1].trim() }));
}

export function anchorId(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Liens internes du corps de l'article (« /selection/… », « /boutique », « /conseils/… »). */
export function internalLinks(body: string): string[] {
  return [...body.matchAll(/\]\((\/[^)\s#?]*)[^)]*\)/g)].map((m) => m[1]);
}

/** « À lire aussi » : articles de la même catégorie d'abord, puis les plus récents. */
export function relatedConseils(current: Conseil, all: Conseil[], count = 3): Conseil[] {
  const others = all.filter((c) => c.slug !== current.slug);
  const same = others.filter((c) => c.theme === current.theme);
  const rest = others.filter((c) => c.theme !== current.theme);
  return [...same, ...rest].slice(0, count);
}

/**
 * Coupe le HTML d'un article en deux, juste avant la partie (h2) du milieu, pour y glisser une annonce.
 * Moins de 3 parties : pas de coupure (l'article est trop court pour une annonce au milieu).
 */
export function splitAtMiddleSection(html: string): [string, string] {
  const starts = [...html.matchAll(/<h2[\s>]/g)].map((m) => m.index);
  if (starts.length < 3) return [html, ""];
  const cut = starts[Math.floor(starts.length / 2)];
  return [html.slice(0, cut), html.slice(cut)];
}
