/**
 * Redirections du Worker de keurfoot.com : une seule adresse par page (sans barre finale), en un seul saut.
 * Lancer : npm test
 */
import assert from "node:assert/strict";
import { test } from "node:test";
import { redirection } from "../worker/index";

test("http et www vont vers https://keurfoot.com en gardant le chemin et les paramètres", () => {
  assert.equal(redirection("http://keurfoot.com/"), "https://keurfoot.com/");
  assert.equal(redirection("https://www.keurfoot.com/selection/senegal"), "https://keurfoot.com/selection/senegal");
  assert.equal(redirection("http://www.keurfoot.com/joueurs?page=2"), "https://keurfoot.com/joueurs?page=2");
});

test("barre finale, .html et index.html : l'adresse canonique en une seule redirection", () => {
  assert.equal(redirection("https://keurfoot.com/selection/senegal/"), "https://keurfoot.com/selection/senegal");
  assert.equal(redirection("https://keurfoot.com/selections/?tri=titres"), "https://keurfoot.com/selections?tri=titres");
  assert.equal(redirection("https://keurfoot.com/selection/senegal.html"), "https://keurfoot.com/selection/senegal");
  assert.equal(redirection("https://keurfoot.com/index.html"), "https://keurfoot.com/");
  assert.equal(redirection("https://keurfoot.com/actus/index.html"), "https://keurfoot.com/actus");
  assert.equal(redirection("http://www.keurfoot.com/top-10/meilleurs-buteurs-can/"), "https://keurfoot.com/top-10/meilleurs-buteurs-can");
});

test("anciennes adresses : la page finale directement", () => {
  assert.equal(redirection("https://keurfoot.com/selection"), "https://keurfoot.com/selections");
  assert.equal(redirection("https://keurfoot.com/selection/"), "https://keurfoot.com/selections");
  assert.equal(redirection("https://keurfoot.com/joueur/"), "https://keurfoot.com/joueurs");
  assert.equal(redirection("https://keurfoot.com/favicon.ico"), "https://keurfoot.com/icon.png");
});

test("la bonne adresse et les fichiers ne sont pas redirigés", () => {
  assert.equal(redirection("https://keurfoot.com/"), null);
  assert.equal(redirection("https://keurfoot.com/selection/senegal"), null);
  assert.equal(redirection("https://keurfoot.com/ads.txt"), null);
  assert.equal(redirection("https://keurfoot.com/sitemap.xml"), null);
  assert.equal(redirection("https://keurfoot.com/_next/static/chunks/a.js"), null);
  assert.equal(redirection("https://keurfoot.com/selection/senegal.txt?_rsc=abc"), null);
  assert.equal(redirection("https://keurfoot.com/illustrations/can.webp"), null);
});
