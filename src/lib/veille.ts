/**
 * Veille actus : actus du football africain préparées 2 fois par jour (12 h et 19 h) dans le dépôt public
 * teiki5320/veille et publiées sur GitHub Pages. Le site lit ce fichier au build (actus écrites dans les pages,
 * scripts/articles.mts) puis dans le navigateur du visiteur, pour afficher les plus récentes. Schéma : veille/schema/actus-schema-v3.json.
 * Règle légale : le titre original n'est jamais dans le fichier ; on affiche toujours la source et le crédit de l'image.
 */

/** Adresse de la veille (réglable pour un essai hors ligne : NEXT_PUBLIC_VEILLE_BASE=http://localhost:8765). */
export const BASE_VEILLE = (process.env.NEXT_PUBLIC_VEILLE_BASE || "https://teiki5320.github.io/veille").replace(/\/$/, "");

export const URL_VEILLE = `${BASE_VEILLE}/actus/keurfoot.json`;

/** Toutes les images des actus viennent de là (voir la CSP de public/_headers). */
const ORIGINE_IMAGES = "https://teiki5320.github.io/veille/";

/** Dossier des articles complets (un fichier par actu : <id>.json). Schéma : veille/schema/article-schema-v1.json. */
export const URL_ARTICLES = `${BASE_VEILLE}/articles/keurfoot/`;

export interface ImageActu {
  url: string;
  source: "wikimedia" | "openverse" | "banque" | "carte";
  credit: string;
  licence: string | null;
  page?: string | null;
  alt: string;
  mots_cles?: string[];
  largeur: number;
  hauteur: number;
}

export interface Actu {
  id: string;
  /** Titre reformulé (jamais le titre original). */
  titre: string;
  /** Résumé réécrit, en français. */
  resume: string;
  theme?: string;
  /** Codes ISO des pays concernés (SN, CI, CM…). */
  pays?: string[];
  competition?: string | null;
  tags?: string[];
  source_nom: string;
  source_url: string;
  autres_sources?: string[];
  publie_le: string;
  collecte_le?: string;
  langue?: string;
  image: ImageActu;
  /** Adresse de l'article complet sur le site (« /actus/<slug> ») ; absente tant que l'article n'est pas écrit. */
  slug?: string;
  /** Fichier de l'article complet sur la veille (articles/keurfoot/<id>.json). */
  article_url?: string;
  lecture_min?: number;
}

export interface FluxActus {
  version: 3;
  site: string;
  genere_le: string;
  actus: Actu[];
}

const DELAI_MS = 8000;
const CACHE_CLE = "keurfoot-veille-v3";
const CACHE_DUREE_MS = 15 * 60 * 1000;

const estTexte = (v: unknown): v is string => typeof v === "string" && v.trim().length > 0;
const estLienWeb = (v: unknown): v is string => estTexte(v) && /^https?:\/\//.test(v);

/** Garde seulement les actus complètes et sûres (lien http(s), image hébergée sur la veille). */
export function actuValide(a: unknown): a is Actu {
  if (!a || typeof a !== "object") return false;
  const x = a as Partial<Actu>;
  const img = x.image as Partial<ImageActu> | undefined;
  return (
    estTexte(x.id) &&
    estTexte(x.titre) &&
    estTexte(x.resume) &&
    estTexte(x.source_nom) &&
    estLienWeb(x.source_url) &&
    estTexte(x.publie_le) &&
    !!img &&
    estTexte(img.url) &&
    img.url.startsWith(ORIGINE_IMAGES) &&
    estTexte(img.credit) &&
    typeof img.alt === "string" &&
    (img.page == null || estLienWeb(img.page))
  );
}

/** Adresse d'article sûre : minuscules, chiffres et tirets (jamais « article », réservé à la page de secours). */
export const slugValide = (v: unknown): v is string => typeof v === "string" && /^[a-z0-9]+(-[a-z0-9]+)*$/.test(v) && v.length <= 80 && v !== "article";

/** Identifiant d'une actu : SHA-1 en hexadécimal (40 caractères). */
export const idValide = (v: unknown): v is string => typeof v === "string" && /^[0-9a-f]{40}$/.test(v);

/**
 * Image de partage d'un article (balise og:image) : JPG 1200 × 630 fabriqué avant le build par scripts/articles.mts
 * à partir de l'image de l'actu. Les cartes de la veille sont en SVG, que WhatsApp, Facebook, X et Google refusent.
 */
export function cheminPartageActu(id: string): string | null {
  return idValide(id) ? `/og/actus/${id}.jpg` : null;
}

/** Photo d'un article en largeur réduite (480 ou 800 px), servie par keurfoot.com : fabriquée avant le build. */
export function cheminReduitActu(id: string, largeur: number): string | null {
  return idValide(id) ? `/reduites/actus/${id}-${largeur}.webp` : null;
}

/** Identifiant demandé dans l'adresse de la page de secours (« ?id=… ») ; chaîne vide s'il est absent ou mal formé. */
export function idDemande(recherche: string): string {
  const id = new URLSearchParams(recherche).get("id") ?? "";
  return idValide(id) ? id : "";
}

/** Retire d'une actu les champs d'article abîmés (slug douteux, fichier hors de la veille). */
function nettoyerActu(a: Actu): Actu {
  const ok = slugValide(a.slug) && typeof a.article_url === "string" && a.article_url === `${URL_ARTICLES}${a.id}.json`;
  if (ok) return a;
  const { slug: _s, article_url: _u, lecture_min: _l, ...reste } = a;
  void _s;
  void _u;
  void _l;
  return reste;
}

/** Lit le fichier reçu : null s'il n'a pas la forme attendue. */
export function lireFlux(donnees: unknown): FluxActus | null {
  if (!donnees || typeof donnees !== "object") return null;
  const d = donnees as Partial<FluxActus>;
  if (d.version !== 3 || !Array.isArray(d.actus)) return null;
  return { version: 3, site: String(d.site ?? ""), genere_le: String(d.genere_le ?? ""), actus: d.actus.filter(actuValide).map(nettoyerActu) };
}

/* ---------- Article complet d'une actu ---------- */

export interface BlocArticle {
  intertitre: string | null;
  paragraphes: string[];
}

export interface ArticleActu {
  version: 1;
  id: string;
  slug: string;
  /** Titre reformulé (jamais le titre original). */
  titre: string;
  /** Phrase d'attaque, mise en avant sous le titre. */
  chapo: string;
  blocs: BlocArticle[];
  mots: number;
  lecture_min: number;
  theme?: string;
  pays?: string[];
  competition?: string | null;
  tags?: string[];
  source_nom: string;
  source_url: string;
  autres_sources?: string[];
  publie_le: string;
  redige_le: string;
  /** Même image que l'actu (jamais celle de l'article d'origine). */
  image: ImageActu;
}

/** Vérifie un fichier article (schéma article-schema-v1) ; null s'il est incomplet ou douteux. */
export function lireArticle(donnees: unknown): ArticleActu | null {
  if (!donnees || typeof donnees !== "object") return null;
  const x = donnees as Partial<ArticleActu>;
  if (x.version !== 1 || !idValide(x.id) || !slugValide(x.slug) || !estTexte(x.chapo) || !estTexte(x.redige_le)) return null;
  // Mêmes contrôles que pour une actu : titre, source en http(s), image hébergée sur la veille avec son crédit.
  if (!actuValide({ ...x, resume: x.chapo })) return null;
  if (!Array.isArray(x.blocs) || x.blocs.length === 0) return null;
  const blocs: BlocArticle[] = [];
  for (const b of x.blocs as unknown[]) {
    const bloc = b as Partial<BlocArticle> | null;
    if (!bloc || !Array.isArray(bloc.paragraphes)) return null;
    const paragraphes = bloc.paragraphes.filter(estTexte);
    if (paragraphes.length === 0) return null;
    blocs.push({ intertitre: estTexte(bloc.intertitre) ? bloc.intertitre : null, paragraphes });
  }
  const autres = Array.isArray(x.autres_sources) ? x.autres_sources.filter(estLienWeb) : [];
  const tags = Array.isArray(x.tags) ? x.tags.filter((t): t is string => typeof t === "string" && /^[a-z]+:[a-z0-9-]+$/.test(t)) : [];
  const mots = typeof x.mots === "number" ? x.mots : blocs.flatMap((b) => b.paragraphes).join(" ").split(/\s+/).length;
  const lecture = typeof x.lecture_min === "number" && x.lecture_min >= 1 ? Math.round(x.lecture_min) : Math.max(1, Math.round(mots / 200));
  return {
    version: 1,
    id: x.id,
    slug: x.slug,
    titre: x.titre as string,
    chapo: x.chapo,
    blocs,
    mots,
    lecture_min: lecture,
    ...(x.theme ? { theme: String(x.theme) } : {}),
    ...(Array.isArray(x.pays) ? { pays: x.pays.filter((p) => typeof p === "string") } : {}),
    competition: typeof x.competition === "string" ? x.competition : null,
    tags,
    source_nom: x.source_nom as string,
    source_url: x.source_url as string,
    autres_sources: autres,
    publie_le: x.publie_le as string,
    redige_le: x.redige_le,
    image: x.image as ImageActu,
  };
}

/** Entrée de l'index des articles (articles/keurfoot/index.json) : tous les articles écrits, jamais supprimés. */
export interface EntreeIndex {
  id: string;
  slug: string;
  titre: string;
  publie_le: string;
  redige_le: string;
  url: string;
}

/** Lit l'index des articles : null s'il n'a pas la forme attendue ; les entrées douteuses sont écartées. */
export function lireIndex(donnees: unknown): EntreeIndex[] | null {
  if (!donnees || typeof donnees !== "object") return null;
  const d = donnees as { version?: unknown; articles?: unknown };
  if (d.version !== 1 || !Array.isArray(d.articles)) return null;
  return d.articles.filter((e): e is EntreeIndex => {
    const x = e as Partial<EntreeIndex> | null;
    return !!x && idValide(x.id) && slugValide(x.slug) && estTexte(x.publie_le) && x.url === `${URL_ARTICLES}${x.id}.json`;
  });
}

/** Nom lisible d'une source à partir de son adresse : « www.rfi.fr » → « rfi.fr ». */
export function nomDeSource(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/** Lien d'une carte d'actu : page construite, sinon page de secours, sinon la source (nouvel onglet). */
export interface LienActu {
  href: string;
  type: "page" | "secours" | "source";
}

/**
 * Choisit où mène une carte d'actu.
 * - « page » : /actus/<slug>, si cette page a été construite avec le site ;
 * - « secours » : /actus/article?id=<id>, si l'article existe sur la veille mais est arrivé après la construction ;
 * - « source » : l'article d'origine, tant que l'article complet n'est pas écrit.
 */
export function lienActu(actu: Pick<Actu, "id" | "slug" | "article_url" | "source_url">, construits: ReadonlySet<string> | readonly string[]): LienActu {
  const liste = construits instanceof Set ? construits : new Set(construits as readonly string[]);
  if (slugValide(actu.slug) && liste.has(actu.slug)) return { href: `/actus/${actu.slug}`, type: "page" };
  if (idValide(actu.id) && actu.article_url === `${URL_ARTICLES}${actu.id}.json`) return { href: `/actus/article?id=${actu.id}`, type: "secours" };
  return { href: actu.source_url, type: "source" };
}

/** Lien vers une fiche du site, donné par un tag de l'article (« joueur:sadio-mane », « selection:senegal »). */
export interface LienFiche {
  tag: string;
  href: string;
  texte: string;
  /** Nom complet du joueur, cherché dans le texte de l'article (fiches joueurs seulement). */
  nom?: string;
}

/** Garde seulement les tags qui correspondent à une fiche existante du site (les autres sont ignorés), sans doublon. */
export function liensFiches(tags: readonly string[] | undefined, fiches: Readonly<Record<string, LienFiche>>): LienFiche[] {
  const vus = new Set<string>();
  return (tags ?? []).flatMap((t) => {
    const f = Object.hasOwn(fiches, t) ? fiches[t] : undefined;
    if (!f || vus.has(f.href)) return [];
    vus.add(f.href);
    return [f];
  });
}

/** Apostrophe courbe ramenée à l'apostrophe droite, pour comparer les noms (« Eto’o » = « Eto'o »). */
const apostrophesDroites = (texte: string) => texte.replace(/[’‘]/g, "'");

/** Le nom figure-t-il en entier dans le texte, sans lettre ni chiffre collé avant ou après ? */
function citeLeNom(texte: string, nom: string): boolean {
  const motif = apostrophesDroites(nom).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?<![\\p{L}\\p{N}])${motif}(?![\\p{L}\\p{N}])`, "u").test(texte);
}

/**
 * Fiches du site liées à un article, sans doublon : la sélection de chaque pays de l'actu (clés « pays:<ISO> »),
 * puis les joueurs cités par leur nom complet, puis les tags de la veille qui désignent une fiche.
 */
export function fichesLiees(
  article: Pick<ArticleActu, "tags" | "pays"> & Partial<Pick<ArticleActu, "titre" | "chapo" | "blocs">>,
  fiches: Readonly<Record<string, LienFiche>>,
): LienFiche[] {
  const texte = apostrophesDroites([article.titre, article.chapo, ...(article.blocs ?? []).flatMap((b) => [b.intertitre, ...b.paragraphes])].filter(Boolean).join("\n"));
  const joueurs = Object.keys(fiches).filter((cle) => fiches[cle].nom && citeLeNom(texte, fiches[cle].nom!));
  const liens = liensFiches([...(article.pays ?? []).map((p) => `pays:${p}`), ...joueurs, ...(article.tags ?? [])], fiches);
  // Pour chaque sélection citée : son Top 10 s'il existe, sinon la page des maillots (clés « suite:selection:<slug> »).
  // Liens internes seulement : jamais de lien Amazon dans une actu.
  const suites = liens.flatMap((f) => (f.tag.startsWith("selection:") ? [`suite:${f.tag}`] : []));
  return liensFiches([...liens.map((f) => f.tag), ...suites], { ...fiches, ...Object.fromEntries(liens.map((f) => [f.tag, f])) });
}

/** Date de parution en toutes lettres : « 27 octobre 2026 » (heure de Paris). */
export function dateArticle(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Paris" }).format(date).replace(/^1 /, "1er ");
}

/**
 * Charge un article complet dans le navigateur (page de secours) : délai de 8 s.
 * Ne lève jamais d'erreur : null si l'identifiant est faux, le fichier absent ou abîmé.
 */
export async function chargerArticle(id: string, base: string = URL_ARTICLES): Promise<ArticleActu | null> {
  if (!idValide(id)) return null;
  const controle = new AbortController();
  const minuteur = setTimeout(() => controle.abort(), DELAI_MS);
  try {
    const rep = await fetch(`${base}${id}.json`, { signal: controle.signal, cache: "no-cache" });
    if (!rep.ok) return null;
    const article = lireArticle(await rep.json());
    return article && article.id === id ? article : null;
  } catch {
    return null;
  } finally {
    clearTimeout(minuteur);
  }
}

function lireCache(): FluxActus | null {
  try {
    const brut = sessionStorage.getItem(CACHE_CLE);
    if (!brut) return null;
    const { t, flux } = JSON.parse(brut) as { t: number; flux: unknown };
    if (typeof t !== "number" || Date.now() - t > CACHE_DUREE_MS) return null;
    return lireFlux(flux);
  } catch {
    return null;
  }
}

function ecrireCache(flux: FluxActus) {
  try {
    sessionStorage.setItem(CACHE_CLE, JSON.stringify({ t: Date.now(), flux }));
  } catch {
    // Navigation privée ou stockage plein : tant pis, on rechargera.
  }
}

let enCours: Promise<FluxActus | null> | null = null;

/**
 * Charge le fichier des actus (navigateur seulement) : délai de 8 s, cache de 15 min dans sessionStorage.
 * Ne lève jamais d'erreur : renvoie null si le fichier est absent, trop lent ou abîmé.
 */
export function chargerFlux(url: string = URL_VEILLE): Promise<FluxActus | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  const cache = lireCache();
  if (cache) return Promise.resolve(cache);
  if (enCours) return enCours;
  enCours = (async () => {
    const controle = new AbortController();
    const minuteur = setTimeout(() => controle.abort(), DELAI_MS);
    try {
      const rep = await fetch(url, { signal: controle.signal, cache: "no-cache" });
      if (!rep.ok) return null;
      const flux = lireFlux(await rep.json());
      if (flux) ecrireCache(flux);
      return flux;
    } catch {
      return null;
    } finally {
      clearTimeout(minuteur);
      enCours = null;
    }
  })();
  return enCours;
}

/** Les actus seules ; [] en cas de problème (la page ne casse jamais). */
export async function chargerActus(url: string = URL_VEILLE): Promise<Actu[]> {
  return (await chargerFlux(url))?.actus ?? [];
}

/** Actus d'un pays (code ISO), dans la limite demandée. */
export function filtrerActus(actus: Actu[], { pays, limite }: { pays?: string; limite: number }): Actu[] {
  return (pays ? actus.filter((a) => a.pays?.includes(pays)) : actus).slice(0, limite);
}

/** Image carrée : la version « -carre.webp » pour une photo ; la carte SVG est recadrée à l'affichage. */
export function imageCarree(image: ImageActu): string {
  return image.source !== "carte" && image.url.endsWith(".webp") ? image.url.replace(/\.webp$/, "-carre.webp") : image.url;
}

/** Âge d'une actu : « à l'instant », « il y a 12 min », « il y a 3 h », « il y a 2 j », puis la date. */
export function ageActu(iso: string, maintenant: Date = new Date()): string {
  const date = new Date(iso);
  const minutes = Math.floor((maintenant.getTime() - date.getTime()) / 60000);
  if (Number.isNaN(minutes)) return "";
  if (minutes < 1) return "à l'instant";
  if (minutes < 60) return `il y a ${minutes} min`;
  const heures = Math.floor(minutes / 60);
  if (heures < 24) return `il y a ${heures} h`;
  const jours = Math.floor(heures / 24);
  if (jours < 7) return `il y a ${jours} j`;
  return `le ${new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", timeZone: "Europe/Paris" }).format(date)}`.replace(/^le 1 /, "le 1er ");
}

/** Date de mise à jour du fichier : « 27 octobre 2026 à 12 h 05 » (heure de Paris). */
export function dateMiseAJour(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: "Europe/Paris" })
      .formatToParts(date)
      .map((x) => [x.type, x.value]),
  );
  return `${p.day === "1" ? "1er" : p.day} ${p.month} ${p.year} à ${Number(p.hour)} h ${p.minute}`;
}

/**
 * Titre du bloc d'une fiche sélection : « L'actu des Lions de la Teranga » quand le surnom est au pluriel,
 * sinon « L'actu du Sénégal » (surnoms comme « Bafana Bafana », « Syli national » ou absents).
 */
export function titreActusSelection(surnom: string | null, de: string): string {
  if (surnom && surnom.split(/\s+/).some((mot) => /s$/i.test(mot))) return `L'actu des ${surnom}`;
  return `L'actu ${de}`;
}
