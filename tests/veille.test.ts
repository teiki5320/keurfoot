/**
 * Tests de la veille actus (src/lib/veille.ts) : lecture du fichier, filtres, images, dates, et repli sans casse.
 * Lancement : npm test
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import {
  actuValide,
  ageActu,
  chargerActus,
  chargerArticle,
  cheminPartageActu,
  cheminReduitActu,
  dateArticle,
  dateMiseAJour,
  fichesLiees,
  filtrerActus,
  idDemande,
  imageCarree,
  lienActu,
  liensFiches,
  lireArticle,
  lireFlux,
  lireIndex,
  nomDeSource,
  titreActusSelection,
  URL_ARTICLES,
  type Actu,
} from "../src/lib/veille";

const actu = (id: string, pays: string[], image: Partial<Actu["image"]> = {}): Actu => ({
  id,
  titre: "Le Sénégal qualifié pour la CAN",
  resume: "Les Lions de la Teranga valident leur billet après une victoire nette.",
  pays,
  source_nom: "RFI",
  source_url: "https://www.rfi.fr/article",
  publie_le: "2026-10-27T09:00:00.000Z",
  image: {
    url: `https://teiki5320.github.io/veille/images/keurfoot/${id}.webp`,
    source: "wikimedia",
    credit: "Auteur",
    licence: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:X.jpg",
    alt: "Un stade",
    largeur: 1600,
    hauteur: 900,
    ...image,
  },
});

describe("Veille actus : lecture du fichier", () => {
  it("garde les actus complètes, écarte les liens dangereux et les images hébergées ailleurs", () => {
    assert.ok(actuValide(actu("a", ["SN"])));
    assert.ok(!actuValide({ ...actu("b", []), source_url: "javascript:alert(1)" }));
    assert.ok(!actuValide(actu("c", [], { url: "https://exemple.com/x.webp" })));
    assert.ok(!actuValide(null));
  });

  it("refuse un fichier d'une autre version ou abîmé", () => {
    assert.equal(lireFlux({ version: 2, actus: [] }), null);
    assert.equal(lireFlux("pas du json"), null);
    assert.equal(lireFlux({ version: 3, site: "keurfoot", genere_le: "x", actus: [actu("a", []), { id: 1 }] })?.actus.length, 1);
  });

  it("hors navigateur ou en cas d'erreur, renvoie une liste vide sans lever d'erreur", async () => {
    assert.deepEqual(await chargerActus("https://adresse-fausse.invalid/x.json"), []);
  });

  it("dans le navigateur, une adresse fausse ou une réponse abîmée donne une liste vide", async () => {
    const g = globalThis as Record<string, unknown>;
    const fetchAvant = g.fetch;
    g.window = {};
    try {
      g.fetch = async () => {
        throw new TypeError("réseau coupé");
      };
      assert.deepEqual(await chargerActus("https://adresse-fausse.invalid/x.json"), []);
      g.fetch = async () => new Response("pas du json", { status: 200 });
      assert.deepEqual(await chargerActus("https://adresse-fausse.invalid/x.json"), []);
      g.fetch = async () => new Response("introuvable", { status: 404 });
      assert.deepEqual(await chargerActus("https://adresse-fausse.invalid/x.json"), []);
    } finally {
      delete g.window;
      g.fetch = fetchAvant;
    }
  });
});

describe("Veille actus : affichage", () => {
  it("filtre par pays et respecte la limite", () => {
    const liste = [actu("a", ["SN"]), actu("b", ["CI"]), actu("c", ["SN", "CI"]), actu("d", [])];
    assert.deepEqual(filtrerActus(liste, { pays: "SN", limite: 3 }).map((a) => a.id), ["a", "c"]);
    assert.deepEqual(filtrerActus(liste, { limite: 2 }).map((a) => a.id), ["a", "b"]);
  });

  it("image carrée : « -carre.webp » pour une photo, la même image pour une carte", () => {
    assert.match(imageCarree(actu("a", []).image), /\/a-carre\.webp$/);
    const carte = actu("b", [], { url: "https://teiki5320.github.io/veille/cartes/keurfoot/b.svg", source: "carte", licence: null, page: null }).image;
    assert.equal(imageCarree(carte), carte.url);
  });

  it("âge de l'actu en minutes, heures, jours puis date", () => {
    const maintenant = new Date("2026-10-27T12:00:00.000Z");
    assert.equal(ageActu("2026-10-27T11:59:40.000Z", maintenant), "à l'instant");
    assert.equal(ageActu("2026-10-27T11:48:00.000Z", maintenant), "il y a 12 min");
    assert.equal(ageActu("2026-10-27T09:00:00.000Z", maintenant), "il y a 3 h");
    assert.equal(ageActu("2026-10-25T09:00:00.000Z", maintenant), "il y a 2 j");
    assert.equal(ageActu("2026-10-01T09:00:00.000Z", maintenant), "le 1er octobre");
  });

  it("date de mise à jour à l'heure de Paris", () => {
    assert.equal(dateMiseAJour("2026-10-27T11:05:00.000Z"), "27 octobre 2026 à 12 h 05");
  });

  it("titre du bloc d'une sélection : surnom au pluriel, sinon le pays", () => {
    assert.equal(titreActusSelection("Lions de la Teranga", "du Sénégal"), "L'actu des Lions de la Teranga");
    assert.equal(titreActusSelection("Super Eagles", "du Nigeria"), "L'actu des Super Eagles");
    assert.equal(titreActusSelection("Bafana Bafana", "d'Afrique du Sud"), "L'actu d'Afrique du Sud");
    assert.equal(titreActusSelection(null, "du Soudan du Sud"), "L'actu du Soudan du Sud");
  });
});

describe("Veille actus : sécurité", () => {
  it("la CSP autorise la veille en connect-src et img-src, et nulle part ailleurs", () => {
    const csp = readFileSync(join(import.meta.dirname, "..", "public", "_headers"), "utf8").match(/Content-Security-Policy: (.+)/)![1];
    const directives = Object.fromEntries(csp.split(";").map((d) => d.trim().split(/\s+/)).map(([nom, ...v]) => [nom, v]));
    for (const [nom, valeurs] of Object.entries(directives)) {
      assert.equal(valeurs.includes("https://teiki5320.github.io"), nom === "connect-src" || nom === "img-src", nom);
    }
  });
});

/* ---------- Articles complets : choix du lien des cartes et page de secours ---------- */

const ID = "7bb83389f2cb9bade1df1270fc7e201d595b469f";
const ID2 = "e1ae240089eb21db47b2e148fab3ed50c4338d0a";

const article = (sur: Record<string, unknown> = {}) => ({
  version: 1,
  site: "keurfoot",
  id: ID,
  slug: "vozinha-invite-au-ballon-d-or-7bb833",
  titre: "Vozinha invité à la soirée du Ballon d'Or",
  chapo: "Le gardien cap-verdien a assisté lundi soir à Londres à la cérémonie du Ballon d'Or.",
  blocs: [
    { intertitre: null, paragraphes: ["Premier paragraphe de l'article, assez long pour être valable."] },
    { intertitre: "Le contexte", paragraphes: ["Deuxième paragraphe de l'article, assez long lui aussi."] },
  ],
  mots: 320,
  lecture_min: 2,
  tags: ["joueur:sadio-mane", "selection:senegal", "auteur:inconnu"],
  source_nom: "ESPN FC",
  source_url: "https://www.espn.com/soccer/story",
  autres_sources: ["https://www.rfi.fr/fr/sports/x", "javascript:alert(1)"],
  publie_le: "2026-10-27T18:23:49.000Z",
  redige_le: "2026-10-28T01:00:00.000Z",
  image: actu(ID, []).image,
  ...sur,
});

describe("Articles des actus : lien d'une carte", () => {
  const avecArticle = { ...actu(ID, ["CV"]), slug: "vozinha-invite-au-ballon-d-or-7bb833", article_url: `${URL_ARTICLES}${ID}.json`, lecture_min: 2 };

  it("page construite : la carte ouvre /actus/<slug>", () => {
    assert.deepEqual(lienActu(avecArticle, ["vozinha-invite-au-ballon-d-or-7bb833"]), { href: "/actus/vozinha-invite-au-ballon-d-or-7bb833", type: "page" });
    assert.equal(lienActu(avecArticle, new Set(["vozinha-invite-au-ballon-d-or-7bb833"])).type, "page");
  });

  it("article arrivé après la construction : la carte ouvre la page de secours", () => {
    assert.deepEqual(lienActu(avecArticle, []), { href: `/actus/article?id=${ID}`, type: "secours" });
  });

  it("pas encore d'article : la carte ouvre la source, comme avant", () => {
    assert.deepEqual(lienActu(actu(ID, []), ["autre"]), { href: "https://www.rfi.fr/article", type: "source" });
  });

  it("un article hébergé ailleurs que sur la veille ou un slug douteux sont ignorés", () => {
    const flux = lireFlux({
      version: 3,
      site: "keurfoot",
      genere_le: "x",
      actus: [
        { ...avecArticle, article_url: "https://exemple.com/a.json" },
        { ...avecArticle, id: ID2, slug: "../../x", article_url: `${URL_ARTICLES}${ID2}.json` },
        avecArticle,
      ],
    })!;
    assert.equal(flux.actus[0].slug, undefined);
    assert.equal(flux.actus[1].slug, undefined);
    assert.equal(flux.actus[2].slug, "vozinha-invite-au-ballon-d-or-7bb833");
    assert.equal(lienActu(flux.actus[0], ["vozinha-invite-au-ballon-d-or-7bb833"]).type, "source");
  });
});

describe("Articles des actus : lecture d'un article", () => {
  it("garde un article conforme et retire les sources douteuses", () => {
    const a = lireArticle(article())!;
    assert.equal(a.blocs.length, 2);
    assert.equal(a.blocs[0].intertitre, null);
    assert.deepEqual(a.autres_sources, ["https://www.rfi.fr/fr/sports/x"]);
    assert.equal(a.lecture_min, 2);
  });

  it("refuse un article abîmé, d'une autre version, ou avec une image hébergée ailleurs", () => {
    assert.equal(lireArticle(article({ version: 2 })), null);
    assert.equal(lireArticle(article({ blocs: [] })), null);
    assert.equal(lireArticle(article({ source_url: "javascript:alert(1)" })), null);
    assert.equal(lireArticle(article({ image: actu(ID, [], { url: "https://exemple.com/x.webp" }).image })), null);
    assert.equal(lireArticle(article({ slug: "article" })), null);
    assert.equal(lireArticle(null), null);
  });

  it("les tags deviennent des liens seulement vers des fiches qui existent", () => {
    const fiches = { "joueur:sadio-mane": { tag: "joueur:sadio-mane", href: "/joueur/sadio-mane", texte: "Lire la fiche de Sadio Mané" } };
    assert.deepEqual(liensFiches(lireArticle(article())!.tags, fiches).map((f) => f.href), ["/joueur/sadio-mane"]);
    assert.deepEqual(liensFiches(["constructor"], fiches), []);
    assert.deepEqual(liensFiches(undefined, fiches), []);
  });

  describe("fiches liées à un article", () => {
    const fiches = {
      "pays:SN": { tag: "selection:senegal", href: "/selection/senegal", texte: "Voir la fiche de la sélection du Sénégal" },
      "pays:MA": { tag: "selection:maroc", href: "/selection/maroc", texte: "Voir la fiche de la sélection du Maroc" },
      "selection:senegal": { tag: "selection:senegal", href: "/selection/senegal", texte: "Voir la fiche de la sélection du Sénégal" },
      "joueur:sadio-mane": { tag: "joueur:sadio-mane", href: "/joueur/sadio-mane", texte: "Lire la fiche de Sadio Mané", nom: "Sadio Mané" },
      "joueur:samuel-eto-o": { tag: "joueur:samuel-eto-o", href: "/joueur/samuel-eto-o", texte: "Lire la fiche de Samuel Eto'o", nom: "Samuel Eto'o" },
      "joueur:akwa": { tag: "joueur:akwa", href: "/joueur/akwa", texte: "Lire la fiche d'Akwá", nom: "Akwá" },
    };
    const texte = (paragraphe: string) => ({ blocs: [{ intertitre: null, paragraphes: [paragraphe] }] });
    const hrefs = (a: Parameters<typeof fichesLiees>[0]) => fichesLiees(a, fiches).map((f) => f.href);

    it("sans tags, renvoie vers la sélection de chaque pays de l'actu qui a sa fiche", () => {
      const a = article({ tags: [], pays: ["MA", "DE", "SN"] });
      assert.deepEqual(hrefs(lireArticle(a)!), ["/selection/maroc", "/selection/senegal"]);
    });

    it("renvoie vers les joueurs cités par leur nom complet, apostrophe droite ou courbe", () => {
      assert.deepEqual(hrefs({ titre: "Sadio Mané buteur", ...texte("Samuel Eto’o était présent.") }), ["/joueur/sadio-mane", "/joueur/samuel-eto-o"]);
    });

    it("ajoute après les fiches le Top 10 du pays (ou les maillots) de chaque sélection citée, sans doublon", () => {
      const avecSuites = {
        ...fiches,
        "suite:selection:senegal": { tag: "suite:selection:senegal", href: "/top-10/meilleurs-joueurs-senegalais", texte: "Top 10 Sénégal" },
        "suite:selection:maroc": { tag: "suite:selection:maroc", href: "/boutique/maillots", texte: "Les maillots des sélections" },
      };
      const a = article({ tags: [], pays: ["MA", "SN"] });
      assert.deepEqual(
        fichesLiees(lireArticle(a)!, avecSuites).map((f) => f.href),
        ["/selection/maroc", "/selection/senegal", "/boutique/maillots", "/top-10/meilleurs-joueurs-senegalais"],
      );
    });

    it("ignore un nom incomplet ou collé à un autre mot", () => {
      assert.deepEqual(hrefs({ titre: "Mané buteur", ...texte("Le stade Akwáville et Sadio Manéx.") }), []);
    });

    it("sélections d'abord, puis joueurs, puis tags restants, sans doublon", () => {
      const a = { tags: ["selection:senegal", "joueur:sadio-mane"], pays: ["SN"], titre: "Sadio Mané", ...texte("Akwá aussi.") };
      assert.deepEqual(hrefs(a), ["/selection/senegal", "/joueur/sadio-mane", "/joueur/akwa"]);
    });
  });

  it("nom d'une autre source et date de l'article", () => {
    assert.equal(nomDeSource("https://www.rfi.fr/fr/sports/x"), "rfi.fr");
    assert.equal(dateArticle("2026-10-27T23:30:00.000Z"), "28 octobre 2026");
  });
});

describe("Articles des actus : page de secours", () => {
  it("ne lit qu'un identifiant bien formé dans l'adresse", () => {
    assert.equal(idDemande(`?id=${ID}`), ID);
    assert.equal(idDemande("?id=../../secret"), "");
    assert.equal(idDemande(""), "");
  });

  it("charge l'article demandé, et rien en cas d'id inconnu, d'erreur réseau ou de fichier abîmé", async () => {
    const g = globalThis as Record<string, unknown>;
    const fetchAvant = g.fetch;
    const demandes: string[] = [];
    try {
      g.fetch = async (url: string) => {
        demandes.push(url);
        return url.endsWith(`${ID}.json`) ? new Response(JSON.stringify(article())) : new Response("introuvable", { status: 404 });
      };
      assert.equal((await chargerArticle(ID))?.titre, "Vozinha invité à la soirée du Ballon d'Or");
      assert.equal(demandes[0], `${URL_ARTICLES}${ID}.json`);
      assert.equal(await chargerArticle(ID2), null);
      assert.equal(await chargerArticle("pas-un-id"), null);
      assert.equal(demandes.length, 2, "un id mal formé ne déclenche aucune requête");
      g.fetch = async () => new Response(JSON.stringify(article({ id: ID2 })));
      assert.equal(await chargerArticle(ID), null, "le fichier doit correspondre à l'id demandé");
      g.fetch = async () => {
        throw new TypeError("réseau coupé");
      };
      assert.equal(await chargerArticle(ID), null);
    } finally {
      g.fetch = fetchAvant;
    }
  });
});

describe("Articles des actus : index de tous les articles", () => {
  const entree = (sur: Record<string, unknown> = {}) => ({
    id: ID,
    slug: "vozinha-invite-au-ballon-d-or-7bb833",
    titre: "Vozinha invité",
    publie_le: "2026-10-27T18:23:49.000Z",
    redige_le: "2026-10-28T00:38:05.073Z",
    url: `${URL_ARTICLES}${ID}.json`,
    ...sur,
  });

  it("garde les entrées valables, même pour des actus sorties du fichier des actus", () => {
    const index = lireIndex({ version: 1, site: "keurfoot", genere_le: "x", articles: [entree(), entree({ id: ID2, slug: "autre-e1ae24", url: `${URL_ARTICLES}${ID2}.json` })] });
    assert.deepEqual(index?.map((e) => e.slug), ["vozinha-invite-au-ballon-d-or-7bb833", "autre-e1ae24"]);
  });

  it("écarte les entrées douteuses et refuse un index abîmé", () => {
    const index = lireIndex({
      version: 1,
      articles: [entree({ url: "https://exemple.com/a.json" }), entree({ slug: "../x" }), entree({ id: "1" }), null, entree()],
    });
    assert.equal(index?.length, 1);
    assert.equal(lireIndex({ version: 2, articles: [] }), null);
    assert.equal(lireIndex("pas du json"), null);
    assert.equal(lireIndex(null), null);
  });
});

describe("Articles des actus : image de partage", () => {
  const id = "9190255f85fea072930d4cfa7a71a10e61b46ab3";

  it("JPG 1200 × 630 rangé sous /og/actus/ (réseaux sociaux : jamais de SVG)", () => {
    assert.equal(cheminPartageActu(id), `/og/actus/${id}.jpg`);
  });

  it("refuse un identifiant mal formé", () => {
    assert.equal(cheminPartageActu("../../etc"), null);
  });
});

describe("Articles des actus : photo en tailles réduites", () => {
  const id = "9190255f85fea072930d4cfa7a71a10e61b46ab3";

  it("rangée sous /reduites/actus/ avec la largeur dans le nom", () => {
    assert.equal(cheminReduitActu(id, 800), `/reduites/actus/${id}-800.webp`);
  });

  it("refuse un identifiant mal formé", () => {
    assert.equal(cheminReduitActu("../x", 480), null);
  });
});
