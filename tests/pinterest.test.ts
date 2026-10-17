/**
 * Tests des épingles Pinterest : adresse de l'image et lien « Épingler ».
 * Lancement : npm test
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { PIN_HEIGHT, PIN_WIDTH, pinPath, pinterestShareUrl } from "../src/lib/pinterest";

describe("Épingles Pinterest", () => {
  it("format vertical 1000 × 1500", () => {
    assert.equal(PIN_WIDTH, 1000);
    assert.equal(PIN_HEIGHT, 1500);
  });
  it("une épingle par Top 10, dans /epingles", () => {
    assert.equal(pinPath("meilleurs-buteurs-can"), "/epingles/meilleurs-buteurs-can.png");
  });
  it("le lien « Épingler » encode la page, l'image et la description", () => {
    const url = pinterestShareUrl("https://keurfoot.com/top-10/x", "https://keurfoot.com/epingles/x.png", "Top 10 : les buteurs & la CAN");
    const u = new URL(url);
    assert.equal(u.origin + u.pathname, "https://www.pinterest.com/pin/create/button/");
    assert.equal(u.searchParams.get("url"), "https://keurfoot.com/top-10/x");
    assert.equal(u.searchParams.get("media"), "https://keurfoot.com/epingles/x.png");
    assert.equal(u.searchParams.get("description"), "Top 10 : les buteurs & la CAN");
  });
});
