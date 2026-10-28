/**
 * Versions réduites des illustrations : 480 et 800 px de large, dans public/reduites/ (dossier non suivi par git).
 * Le site les propose au navigateur (srcset, src/lib/images.ts) pour que les téléphones ne chargent pas l'original.
 * Lancement : npx tsx scripts/images.mts (lancé tout seul avant chaque build, voir « prebuild »).
 * Une version déjà faite et plus récente que l'original n'est pas refaite.
 */
import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { cheminReduit, LARGEURS_REDUITES } from "../src/lib/images";

const racine = join(import.meta.dirname, "..");
const source = join(racine, "public", "illustrations");
mkdirSync(join(racine, "public", "reduites"), { recursive: true });

let faites = 0;
for (const nom of readdirSync(source).filter((n) => n.endsWith(".webp"))) {
  const original = join(source, nom);
  const { width } = await sharp(original).metadata();
  for (const largeur of LARGEURS_REDUITES) {
    if (!width || largeur >= width) continue;
    const cible = join(racine, "public", cheminReduit(`/illustrations/${nom}`, largeur));
    if (existsSync(cible) && statSync(cible).mtimeMs >= statSync(original).mtimeMs) continue;
    await sharp(original).resize({ width: largeur }).webp({ quality: 72 }).toFile(cible);
    faites++;
  }
}
console.log(`Images réduites : ${faites} version(s) fabriquée(s).`);
