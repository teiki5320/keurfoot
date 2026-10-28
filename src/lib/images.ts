/**
 * Images allégées : chaque illustration (public/illustrations/<clé>.webp, 1 000 à 1 600 px de large) a des
 * versions réduites en 480 et 800 px dans public/reduites/, fabriquées avant chaque build (scripts/images.mts).
 * Le navigateur choisit la plus petite qui suffit (srcset) : un téléphone ne télécharge plus l'image de 1 600 px.
 */

export const LARGEURS_REDUITES = [480, 800] as const;

/** « /illustrations/can.webp » → « /reduites/can-480.webp ». */
export function cheminReduit(src: string, largeur: number): string {
  const nom = src.replace(/^.*\//, "").replace(/\.webp$/, "");
  return `/reduites/${nom}-${largeur}.webp`;
}

/** Largeur en pixels lue dans l'en-tête d'un fichier WebP ; null si ce n'en est pas un. */
export function largeurWebp(octets: Buffer): number | null {
  if (octets.length < 30 || octets.toString("ascii", 0, 4) !== "RIFF" || octets.toString("ascii", 8, 12) !== "WEBP") return null;
  const bloc = octets.toString("ascii", 12, 16);
  if (bloc === "VP8 ") return octets.readUInt16LE(26) & 0x3fff;
  if (bloc === "VP8L") return (octets.readUInt32LE(21) & 0x3fff) + 1;
  if (bloc === "VP8X") return octets.readUIntLE(24, 3) + 1;
  return null;
}

/**
 * Liste srcset d'une illustration : versions réduites qui existent, puis l'original.
 * undefined (simple src) hors de /illustrations/, si la largeur est inconnue ou si aucune version réduite n'existe.
 */
export function srcsetIllustration(src: string, largeur: number | null, existe: (cheminPublic: string) => boolean): string | undefined {
  if (!src.startsWith("/illustrations/") || !largeur) return undefined;
  const reduites = LARGEURS_REDUITES.filter((l) => l < largeur && existe(cheminReduit(src, l)));
  if (reduites.length === 0) return undefined;
  return [...reduites.map((l) => `${cheminReduit(src, l)} ${l}w`), `${src} ${largeur}w`].join(", ");
}
