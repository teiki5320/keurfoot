/**
 * Worker de keurfoot.com : une seule adresse par page, en une seule redirection 301, puis les fichiers statiques de out/.
 * Forme canonique du site : sans barre finale (« https://keurfoot.com/selection/senegal »), comme les balises canonical.
 * - « /selection/senegal/ », « /selection/senegal.html » et « /index.html » → l'adresse canonique, en 301
 *   (Cloudflare seul répond en 307, redirection temporaire) ;
 * - anciennes adresses (« /selection », « /joueur », « /favicon.ico ») → leur page finale, en un seul saut ;
 * - http:// et www.keurfoot.com → https://keurfoot.com (réglé aussi dans Cloudflare, qui passe avant ce script) ;
 * - tout le reste est servi tel quel par les fichiers statiques (en-têtes de public/_headers).
 */

const HOTE = "keurfoot.com";

/** Anciennes adresses déplacées (sans barre finale) : une seule redirection vers la page finale. */
const DEPLACEES: Record<string, string> = {
  "/selection": "/selections",
  "/joueur": "/joueurs",
  "/favicon.ico": "/icon.png",
};

/** Adresse vers laquelle rediriger en 301, ou null si la requête est déjà la bonne. */
export function redirection(adresse: string): string | null {
  const url = new URL(adresse);
  let changee = false;
  if (url.protocol === "http:" || url.hostname === `www.${HOTE}`) {
    url.protocol = "https:";
    url.hostname = HOTE;
    url.port = "";
    changee = true;
  }
  let chemin = url.pathname;
  // « /index.html » → « / », « /x/index.html » → « /x », « /x.html » → « /x » (le fichier de la page, servi sous son adresse propre).
  if (chemin.endsWith("/index.html")) chemin = chemin.slice(0, -"/index.html".length) || "/";
  else if (chemin.endsWith(".html")) chemin = chemin.slice(0, -".html".length) || "/";
  // Une page avec barre finale (sauf l'accueil) : on l'enlève.
  if (chemin.length > 1 && chemin.endsWith("/")) chemin = chemin.replace(/\/+$/, "") || "/";
  chemin = DEPLACEES[chemin] ?? chemin;
  if (chemin !== url.pathname) {
    url.pathname = chemin;
    changee = true;
  }
  return changee ? url.toString() : null;
}

interface Env {
  ASSETS: { fetch(requete: Request): Promise<Response> };
}

const worker = {
  async fetch(requete: Request, env: Env): Promise<Response> {
    const cible = redirection(requete.url);
    if (cible) return new Response(null, { status: 301, headers: { Location: cible, "Cache-Control": "public, max-age=86400" } });
    return env.ASSETS.fetch(requete);
  },
};

export default worker;
