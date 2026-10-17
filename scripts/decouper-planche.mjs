/**
 * Découpe une planche OpenArt (4 illustrations séparées par des marges claires) en illustrations Keur Foot (webp).
 * Usage : node scripts/decouper-planche.mjs planche.png <colonnes> <lignes> cle1 cle2 …
 * (ordre de lecture : de gauche à droite, puis de haut en bas). Sortie : public/illustrations/<clé>.webp
 * Format par défaut : paysage 1600 × 1067 (3:2) ; avec KEURFOOT_FORMAT=portrait : 1000 × 1500 (2:3, épingles Top 10).
 */
import sharp from "sharp";

const [file, cols, rows, ...slugs] = process.argv.slice(2);
const C = Number(cols), R = Number(rows);
const portrait = process.env.KEURFOOT_FORMAT === "portrait";
const RATIO = portrait ? 2 / 3 : 3 / 2;
const [OW, OH, DIR] = portrait ? [1000, 1500, "public/illustrations"] : [1600, 1067, "public/illustrations"];
const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: ch } = info;
const px = (x, y) => { const i = (y * W + x) * ch; return [data[i], data[i + 1], data[i + 2]]; };
// Pixel « de marge » : clair et peu coloré (marge crème entre les dessins).
const pale = ([r, g, b]) => Math.min(r, g, b) > 205 && Math.max(r, g, b) - Math.min(r, g, b) < 40;
const colPale = (x, y0, y1) => { let n = 0; for (let y = y0; y < y1; y += 2) n += pale(px(x, y)); return n / ((y1 - y0) / 2); };
const rowPale = (y, x0, x1) => { let n = 0; for (let x = x0; x < x1; x += 2) n += pale(px(x, y)); return n / ((x1 - x0) / 2); };

/** Coupe la plus « claire » autour de chaque séparation attendue (k/n de la taille). */
function cuts(n, size, score) {
  const out = [0];
  for (let k = 1; k < n; k++) {
    const mid = Math.round((k * size) / n), span = Math.round(size * 0.08);
    let best = mid, bestS = -1;
    for (let p = mid - span; p <= mid + span; p++) { const s = score(p); if (s > bestS) { bestS = s; best = p; } }
    out.push(best);
  }
  out.push(size);
  return out;
}
const xs = cuts(C, W, (x) => colPale(x, 0, H));
const ys = cuts(R, H, (y) => rowPale(y, 0, W));

let i = 0;
for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) {
  let x0 = xs[c], x1 = xs[c + 1], y0 = ys[r], y1 = ys[r + 1];
  // On retire les marges claires autour du dessin (au plus 6 % par côté : un fond clair n'est pas une marge).
  const mx = Math.round((x1 - x0) * 0.06), my = Math.round((y1 - y0) * 0.06);
  const [ax, bx, ay, by] = [x0 + mx, x1 - mx, y0 + my, y1 - my];
  while (x0 < ax && colPale(x0, y0, y1) > 0.97) x0++;
  while (x1 > bx && colPale(x1 - 1, y0, y1) > 0.97) x1--;
  while (y0 < ay && rowPale(y0, x0, x1) > 0.97) y0++;
  while (y1 > by && rowPale(y1 - 1, x0, x1) > 0.97) y1--;
  // Petite marge de sécurité, puis recadrage centré au format voulu (3:2 ou 2:3).
  x0 += 4; x1 -= 4; y0 += 4; y1 -= 4;
  let w = x1 - x0, h = y1 - y0;
  if (w / h > RATIO) { const nw = Math.round(h * RATIO); x0 += Math.round((w - nw) / 2); w = nw; }
  else { const nh = Math.round(w / RATIO); y0 += Math.round((h - nh) / 2); h = nh; }
  const slug = slugs[i++];
  if (!slug) break;
  await sharp(file).extract({ left: x0, top: y0, width: w, height: h }).resize(OW, OH).webp({ quality: 80 }).toFile(`${DIR}/${slug}.webp`);
  console.log(slug, `${w}×${h}`);
}
