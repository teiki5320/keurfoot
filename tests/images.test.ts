/**
 * Tests des images allégées (src/lib/images.ts) : chemins des versions réduites, largeur lue dans un fichier WebP
 * et liste srcset donnée au navigateur.
 * Lancement : npm test
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import sharp from "sharp";
import { cheminReduit, largeurWebp, LARGEURS_REDUITES, srcsetIllustration } from "../src/lib/images";

describe("versions réduites des illustrations", () => {
  it("rangées dans /reduites/ avec la largeur dans le nom", () => {
    assert.equal(cheminReduit("/illustrations/can.webp", 480), "/reduites/can-480.webp");
    assert.equal(cheminReduit("/illustrations/selection-cap-vert.webp", 800), "/reduites/selection-cap-vert-800.webp");
  });

  it("deux largeurs : 480 et 800 pixels", () => {
    assert.deepEqual([...LARGEURS_REDUITES], [480, 800]);
  });

  it("lit la largeur d'un WebP avec ou sans perte", async () => {
    const perte = await sharp({ create: { width: 1600, height: 900, channels: 3, background: "#0b0d0c" } }).webp().toBuffer();
    const sansPerte = await sharp({ create: { width: 1200, height: 800, channels: 3, background: "#0b0d0c" } }).webp({ lossless: true }).toBuffer();
    const alpha = await sharp({ create: { width: 1000, height: 500, channels: 4, background: "#0b0d0c80" } }).webp().toBuffer();
    assert.equal(largeurWebp(perte), 1600);
    assert.equal(largeurWebp(sansPerte), 1200);
    assert.equal(largeurWebp(alpha), 1000);
    assert.equal(largeurWebp(Buffer.from("pas une image")), null);
  });
});

describe("srcset d'une illustration", () => {
  const tout = () => true;

  it("versions réduites puis l'original avec sa largeur", () => {
    assert.equal(
      srcsetIllustration("/illustrations/can.webp", 1600, tout),
      "/reduites/can-480.webp 480w, /reduites/can-800.webp 800w, /illustrations/can.webp 1600w",
    );
  });

  it("n'annonce que les versions réduites qui existent", () => {
    const existe = (p: string) => !p.endsWith("-800.webp");
    assert.equal(srcsetIllustration("/illustrations/can.webp", 1600, existe), "/reduites/can-480.webp 480w, /illustrations/can.webp 1600w");
  });

  it("rien quand aucune version réduite n'existe (site lancé sans build) ou largeur inconnue", () => {
    assert.equal(srcsetIllustration("/illustrations/can.webp", 1600, () => false), undefined);
    assert.equal(srcsetIllustration("/illustrations/can.webp", null, tout), undefined);
  });

  it("ignore les images hors des illustrations", () => {
    assert.equal(srcsetIllustration("/brand/keurfoot-logo.webp", 480, tout), undefined);
  });
});
