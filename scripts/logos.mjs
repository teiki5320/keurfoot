/**
 * Prépare les images du logo à partir de docs/brand/keurfoot-logo-transparent.png (fourni par le propriétaire).
 * Lancement : node scripts/logos.mjs (à relancer seulement si le logo change).
 */
import sharp from "sharp";

const SRC = "docs/brand/keurfoot-logo-transparent.png";
const NUIT = { r: 11, g: 13, b: 12, alpha: 1 };

// Logo complet pour l'en-tête et le pied de page.
await sharp(SRC).resize({ width: 480 }).webp({ quality: 90 }).toFile("public/brand/keurfoot-logo.webp");

// Emblème (ballon seul, sans le texte) : haut de l'image, recadré en carré.
const { width, height } = await sharp(SRC).metadata();
const side = Math.round(height * 0.7);
const ball = await sharp(SRC)
  .extract({ left: Math.round((width - side) / 2), top: 0, width: side, height: side })
  .png()
  .toBuffer();
await sharp(ball).resize(96, 96).webp({ quality: 90 }).toFile("public/brand/keurfoot-embleme.webp");
for (const [file, size] of [["src/app/icon.png", 512], ["src/app/apple-icon.png", 180]]) {
  const inner = Math.round(size * 0.86);
  await sharp({ create: { width: size, height: size, channels: 4, background: NUIT } })
    .composite([{ input: await sharp(ball).resize(inner, inner).toBuffer(), gravity: "center" }])
    .png({ palette: true, quality: 90 })
    .toFile(file);
}

// Image de partage (1200 × 630) : logo centré sur fond nuit.
await sharp({ create: { width: 1200, height: 630, channels: 4, background: NUIT } })
  .composite([{ input: await sharp(SRC).resize({ height: 560 }).toBuffer(), gravity: "center" }])
  .jpeg({ quality: 88 })
  .toFile("public/brand/keurfoot-partage.jpg");

console.log("Logos prêts.");
