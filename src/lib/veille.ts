/**
 * Veille actus : actus du football africain préparées 2 fois par jour (12 h et 19 h) dans le dépôt public
 * teiki5320/veille et publiées sur GitHub Pages. Le site ne fait que lire ce fichier, dans le navigateur
 * du visiteur (il n'est pas reconstruit à chaque passage). Schéma : veille/schema/actus-schema-v3.json.
 * Règle légale : le titre original n'est jamais dans le fichier ; on affiche toujours la source et le crédit de l'image.
 */

export const URL_VEILLE = "https://teiki5320.github.io/veille/actus/keurfoot.json";

/** Toutes les images des actus viennent de là (voir la CSP de public/_headers). */
const ORIGINE_IMAGES = "https://teiki5320.github.io/veille/";

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

/** Lit le fichier reçu : null s'il n'a pas la forme attendue. */
export function lireFlux(donnees: unknown): FluxActus | null {
  if (!donnees || typeof donnees !== "object") return null;
  const d = donnees as Partial<FluxActus>;
  if (d.version !== 3 || !Array.isArray(d.actus)) return null;
  return { version: 3, site: String(d.site ?? ""), genere_le: String(d.genere_le ?? ""), actus: d.actus.filter(actuValide) };
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
