/**
 * Configuration générale du site.
 * Les valeurs propres à l'entreprise se règlent via les variables d'environnement (voir .env.example).
 */
/** Hébergeur du site : GitHub Pages pendant la version provisoire, Cloudflare Pages avec keurfoot.com. */
const defaultHost = { name: "Cloudflare", full: "Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, États-Unis — cloudflare.com" };

/**
 * Sous-dossier éventuel du site (« /keurfoot » sur GitHub Pages, vide sur keurfoot.com).
 * next/link l'ajoute tout seul ; pour les images et le HTML des articles, passer par withBase().
 */
export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

/** Chemin interne (« /brand/x.webp ») préfixé du sous-dossier du site. */
export const withBase = (path: string) => (path.startsWith("/") && !path.startsWith("//") ? `${BASE_PATH}${path}` : path);

/** Version provisoire (GitHub Pages) : aucune page indexée par les moteurs de recherche. */
export const NOINDEX = process.env.NEXT_PUBLIC_NOINDEX === "1";

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Keur Foot",
  tagline: "Le football africain, de la CAN à la diaspora",
  description:
    "Le football africain pour la diaspora en France : sélections nationales, histoire de la CAN, grands joueurs africains, classements et équipement de supporter.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://keurfoot.com").replace(/\/$/, ""),
  locale: "fr_FR",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "keurfoot@toakeur.com",
};

/**
 * Google AdSense : identifiant d'éditeur (public par conception : il figure dans le code de chaque page et dans ads.txt).
 * Vide = aucune publicité ni script Google sur le site (cas de la version provisoire GitHub Pages).
 */
export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-2680784147246798";

/**
 * Identifiants des blocs d'annonces AdSense (à créer pour keurfoot.com), publics eux aussi.
 * Un emplacement sans identifiant n'affiche rien. Pages sans annonce : accueil, listes, boutique, pages légales, 404.
 * - selection : 1 annonce après l'histoire de la sélection ;
 * - joueur : 1 annonce après la biographie ;
 * - can : 1 annonce après le tableau des éditions ;
 * - top : 2 annonces dans un Top 10 (après la 5e place, puis en fin de page) ;
 * - article : 2 annonces dans un conseil (au milieu du texte, puis en fin de page).
 */
export const ADSENSE_SLOTS = {
  selection: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SELECTION ?? "",
  joueur: process.env.NEXT_PUBLIC_ADSENSE_SLOT_JOUEUR ?? "",
  can: process.env.NEXT_PUBLIC_ADSENSE_SLOT_CAN ?? "",
  top: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP ?? "",
  article: process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE ?? "",
};
export type AdPlacement = keyof typeof ADSENSE_SLOTS;

/** Informations légales de l'éditeur, affichées dans les mentions légales et les conditions d'utilisation. */
export const legalConfig = {
  companyName: process.env.NEXT_PUBLIC_LEGAL_COMPANY_NAME || "ALOHASH",
  tradeName: process.env.NEXT_PUBLIC_LEGAL_TRADE_NAME || "TOA CORP",
  legalForm: process.env.NEXT_PUBLIC_LEGAL_FORM || "SAS (société par actions simplifiée) au capital de 200 €",
  address: process.env.NEXT_PUBLIC_LEGAL_ADDRESS || "587 La Petite Sigonnière, 85190 Maché, France",
  siret: process.env.NEXT_PUBLIC_LEGAL_SIRET || "938 522 596 00015",
  rcs: process.env.NEXT_PUBLIC_LEGAL_RCS || "RCS La Roche-sur-Yon 938 522 596",
  vat: process.env.NEXT_PUBLIC_LEGAL_VAT || "FR16 938 522 596",
  director: process.env.NEXT_PUBLIC_LEGAL_DIRECTOR || "le président de la société ALOHASH",
  phone: process.env.NEXT_PUBLIC_LEGAL_PHONE || "",
  host: process.env.NEXT_PUBLIC_LEGAL_HOST || defaultHost.full,
  hostName: process.env.NEXT_PUBLIC_LEGAL_HOST_NAME || defaultHost.name,
};
