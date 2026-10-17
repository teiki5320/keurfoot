/**
 * Épingles Pinterest des Top 10 : une image 1000 × 1500 par classement, dans public/epingles/<slug>.png.
 * Fond : l'illustration public/illustrations/top-<slug>.webp (sinon un dégradé aux couleurs du site),
 * bandeau « TOP 10 », titre court (pinTitle) en Anton, signature Keur Foot.
 * Lancement : npx tsx scripts/epingles.mts (lancé tout seul avant chaque build, voir « prebuild »).
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import sharp from "sharp";
import { TOPS } from "../src/lib/data/tops";
import { PIN_HEIGHT, PIN_WIDTH } from "../src/lib/pinterest";

const root = join(import.meta.dirname, "..");
const out = join(root, "public", "epingles");
const anton = readFileSync(join(root, "node_modules/@fontsource/anton/files/anton-latin-400-normal.woff"));
const antonExt = readFileSync(join(root, "node_modules/@fontsource/anton/files/anton-latin-ext-400-normal.woff"));

const dataUrl = (buf: Buffer, type: string) => `data:${type};base64,${buf.toString("base64")}`;

async function background(slug: string): Promise<string | null> {
  const file = join(root, "public", "illustrations", `top-${slug}.webp`);
  if (!existsSync(file)) return null;
  const png = await sharp(file).resize(PIN_WIDTH, PIN_HEIGHT, { fit: "cover" }).png().toBuffer();
  return dataUrl(png, "image/png");
}

const logo = dataUrl(await sharp(join(root, "public", "brand", "keurfoot-embleme.webp")).png().toBuffer(), "image/png");

mkdirSync(out, { recursive: true });
for (const top of TOPS) {
  const bg = await background(top.slug);
  const tree = {
    type: "div",
    props: {
      style: {
        width: PIN_WIDTH,
        height: PIN_HEIGHT,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        position: "relative",
        backgroundColor: "#0b0d0c",
        backgroundImage: bg ? undefined : "linear-gradient(160deg, #10261a 0%, #0b0d0c 60%)",
        fontFamily: "Anton",
        color: "#f7f5ee",
      },
      children: [
        bg && { type: "img", props: { src: bg, width: PIN_WIDTH, height: PIN_HEIGHT, style: { position: "absolute", top: 0, left: 0 } } },
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 900,
              backgroundImage: "linear-gradient(to bottom, rgba(11,13,12,0) 0%, rgba(11,13,12,0.85) 45%, #0b0d0c 100%)",
            },
          },
        },
        {
          type: "div",
          props: {
            style: { display: "flex", flexDirection: "column", padding: "0 70px 80px", position: "relative" },
            children: [
              {
                type: "div",
                props: {
                  style: { display: "flex", alignSelf: "flex-start", backgroundColor: "#f2b705", color: "#0b0d0c", fontSize: 64, padding: "6px 28px", borderRadius: 14 },
                  children: "TOP 10",
                },
              },
              {
                type: "div",
                props: { style: { marginTop: 30, fontSize: 96, lineHeight: 1.02, textTransform: "uppercase" }, children: top.pinTitle },
              },
              {
                type: "div",
                props: {
                  style: { display: "flex", alignItems: "center", marginTop: 50, fontSize: 40, color: "#f2b705" },
                  children: [
                    { type: "img", props: { src: logo, width: 72, height: 72, style: { marginRight: 18 } } },
                    "KEURFOOT.COM",
                  ],
                },
              },
            ],
          },
        },
      ].filter(Boolean),
    },
  };
  const svg = await satori(tree as Parameters<typeof satori>[0], {
    width: PIN_WIDTH,
    height: PIN_HEIGHT,
    fonts: [
      { name: "Anton", data: anton, weight: 400, style: "normal" },
      { name: "Anton", data: antonExt, weight: 400, style: "normal" },
    ],
  });
  const png = new Resvg(svg, { fitTo: { mode: "width", value: PIN_WIDTH } }).render().asPng();
  writeFileSync(join(out, `${top.slug}.png`), await sharp(png).png({ palette: true, quality: 90 }).toBuffer());
  console.log(`Épingle : ${top.slug}`);
}
