import type { Player, Position } from "@/lib/types";
import { PLAYERS_LOT2 } from "./players-lot2";
import { PLAYERS_LOT3 } from "./players-lot3";
import { getSelection } from "./selections";

/** Libellés des postes. */
export const POSITIONS: Record<Position, string> = {
  gardien: "Gardien",
  defenseur: "Défenseur",
  milieu: "Milieu",
  attaquant: "Attaquant",
};

/**
 * Fiches des joueurs (règles : docs/REDACTION.md), vérifiées le 17 octobre 2026.
 * Aucune photo : chaque joueur est représenté par un maillot dessiné aux couleurs de son pays.
 * Sélections et buts : RSSSF en priorité ; pour un joueur en activité, chiffres datés par statsAsOf.
 */
const PLAYERS_LOT1: Player[] = [
  {
    slug: "didier-drogba",
    name: "Didier Drogba",
    selection: "cote-d-ivoire",
    position: "attaquant",
    birthDate: "1978-03-11",
    active: false,
    shirtNumber: 11,
    intro:
      "Meilleur buteur de l'histoire de la Côte d'Ivoire (65 buts), deux fois joueur africain de l'année pour la CAF, Didier Drogba a porté les Éléphants jusqu'à leur première Coupe du monde, en 2006.",
    seoDescription:
      "Didier Drogba, meilleur buteur de la Côte d'Ivoire (65 buts) : Marseille, Chelsea, Ligue des champions 2012, palmarès, clubs et statistiques en sélection.",
    bio: [
      "Né le 11 mars 1978 à Abidjan, Didier Drogba se révèle en France : au Mans de 1998 à 2002, puis à Guingamp et à l'Olympique de Marseille, où il est élu meilleur joueur de Ligue 1 en 2004 et atteint la finale de la Coupe UEFA. Il rejoint Chelsea à l'été 2004.",
      "À Chelsea, il remporte quatre championnats d'Angleterre, quatre FA Cup et deux Souliers d'or de Premier League. Le 19 mai 2012, en finale de la Ligue des champions contre le Bayern Munich, il égalise en fin de match puis transforme le tir au but de la victoire. Il est le premier Africain à marquer 100 buts en Premier League.",
      "Avec les Éléphants, de 2002 à 2014, il marque 65 buts en 105 sélections et dispute trois Coupes du monde (2006, 2010, 2014). En octobre 2005, après la qualification pour le Mondial, son appel à genoux à la paix, diffusé à la télévision ivoirienne, marque un pays alors divisé par la guerre civile.",
      "Il perd deux finales de CAN aux tirs au but, en 2006 contre l'Égypte et en 2012 contre la Zambie, et ne remporte jamais le titre continental. Élu joueur africain de l'année par la CAF en 2006 et 2009, il prend sa retraite internationale en août 2014 et termine sa carrière en 2018 à Phoenix, aux États-Unis, à 40 ans. Il entre au Hall of Fame de la Premier League en 2022.",
    ],
    clubs: [
      "Le Mans (1998-2002)",
      "Guingamp (2002-2003)",
      "Olympique de Marseille (2003-2004)",
      "Chelsea (2004-2012, 2014-2015)",
      "Shanghai Shenhua (2012-2013)",
      "Galatasaray (2013-2014)",
      "Impact de Montréal (2015-2016)",
      "Phoenix Rising (2017-2018)",
    ],
    honours: [
      "Ligue des champions 2012 (Chelsea)",
      "4 championnats d'Angleterre (2005, 2006, 2010, 2015)",
      "4 FA Cup (2007, 2009, 2010, 2012)",
      "Championnat de Turquie 2013 (Galatasaray)",
      "Joueur africain de l'année CAF : 2006 et 2009",
      "Soulier d'or de Premier League : 2007 et 2010",
      "Finaliste de la CAN : 2006 et 2012",
    ],
    caps: 105,
    goals: 65,
    statsAsOf: null,
    sources: [
      { label: "RSSSF — Records des internationaux ivoiriens", url: "https://rsssf.org/miscellaneous/ivo-recintlp.html" },
      { label: "RSSSF — Didier Drogba, buts en sélection", url: "https://rsssf.org/miscellaneous/drogba-intlg.html" },
      { label: "RSSSF — Joueur africain de l'année", url: "https://rsssf.org/miscellaneous/afr-poy.html" },
      { label: "Premier League — Hall of Fame 2022", url: "https://www.premierleague.com/news/2581908" },
      { label: "MyJoyOnline (BBC) — Comment Didier Drogba a aidé à arrêter une guerre civile", url: "https://www.myjoyonline.com/how-didier-drogba-helped-halt-a-civil-war/" },
      { label: "Wikipédia (anglais) — Didier Drogba", url: "https://en.wikipedia.org/wiki/Didier_Drogba" },
    ],
    updatedAt: "2026-10-17",
  },
  {
    slug: "samuel-eto-o",
    name: "Samuel Eto'o",
    selection: "cameroun",
    position: "attaquant",
    birthDate: "1981-03-10",
    active: false,
    shirtNumber: 9,
    intro:
      "Recordman des buts du Cameroun (56) et de la CAN (18), quatre fois joueur africain de l'année pour la CAF, Samuel Eto'o est l'un des plus grands attaquants de l'histoire du football africain.",
    bio: [
      "Né le 10 mars 1981 à Douala, Samuel Eto'o honore sa première sélection à 15 ans, le 9 mars 1997 contre le Costa Rica. Recruté par le Real Madrid, il explose à Majorque (2000-2004), dont il devient le meilleur buteur de l'histoire, avant de rejoindre le FC Barcelone en 2004.",
      "En 2000, il est champion d'Afrique puis champion olympique à Sydney avec le Cameroun ; il conserve le titre continental en 2002. À la CAN, il marque lors de six éditions et bat en 2008 le record de Laurent Pokou, pour finir à 18 buts, un record qui tient toujours.",
      "À Barcelone, il gagne trois championnats d'Espagne et deux Ligues des champions (2006 et 2009), en marquant lors des deux finales, et termine meilleur buteur de la Liga en 2006. Parti à l'Inter Milan en 2009, il y réalise un nouveau triplé championnat, coupe et Ligue des champions, un an après celui gagné avec le Barça.",
      "Élu joueur africain de l'année par la CAF en 2003, 2004, 2005 et 2010, un record qu'il partage avec Yaya Touré, il quitte la sélection en 2014 après 118 matchs et 56 buts. Retraité des terrains en 2019, il est élu président de la Fédération camerounaise de football en décembre 2021, puis réélu en novembre 2025.",
    ],
    clubs: [
      "Real Madrid (1997-2000)",
      "RCD Majorque (2000-2004)",
      "FC Barcelone (2004-2009)",
      "Inter Milan (2009-2011)",
      "Anji Makhatchkala (2011-2013)",
      "Chelsea (2013-2014)",
      "Everton (2014-2015)",
      "Antalyaspor (2015-2018)",
    ],
    honours: [
      "CAN 2000 et 2002",
      "Médaille d'or olympique 2000",
      "Ligue des champions : 2006 et 2009 (Barcelone), 2010 (Inter)",
      "3 championnats d'Espagne (2005, 2006, 2009)",
      "Championnat d'Italie 2010",
      "Joueur africain de l'année CAF : 2003, 2004, 2005 et 2010",
      "Meilleur buteur de l'histoire de la CAN (18 buts)",
    ],
    caps: 118,
    goals: 56,
    statsAsOf: null,
    sources: [
      { label: "RSSSF — Samuel Eto'o, sélections et buts", url: "https://rsssf.org/miscellaneous/etoo-intlg.html" },
      { label: "CAF — Records de la CAN : personne ne marque comme Eto'o", url: "https://www.cafonline.com/afcon2025/news/afcon-records-no-one-scores-like-eto-o/" },
      { label: "WakatSéra — Samuel Eto'o réélu président de la Fécafoot", url: "https://www.wakatsera.com/fecafoot-samuel-etoo-reelu-president-avec-85-voix-sur-87/" },
      { label: "Wikipédia (anglais) — Samuel Eto'o", url: "https://en.wikipedia.org/wiki/Samuel_Eto%27o" },
    ],
    updatedAt: "2026-10-17",
  },
  {
    slug: "sadio-mane",
    name: "Sadio Mané",
    selection: "senegal",
    position: "attaquant",
    birthDate: "1992-04-10",
    active: true,
    shirtNumber: 10,
    intro:
      "Meilleur buteur de l'histoire du Sénégal, deux fois joueur africain de l'année pour la CAF, Sadio Mané a offert aux Lions de la Teranga leur premier titre continental, en 2022.",
    bio: [
      "Né le 10 avril 1992 à Bambali, en Casamance, Sadio Mané rejoint le FC Metz en 2011, puis brille au Red Bull Salzbourg, champion d'Autriche en 2014. À Southampton, il signe en 2015 le triplé le plus rapide de l'histoire de la Premier League, en 2 minutes 56 secondes contre Aston Villa.",
      "À Liverpool, de 2016 à 2022, il remporte la Ligue des champions 2019 et le championnat d'Angleterre 2020, et partage le titre de meilleur buteur de Premier League en 2019. Il passe ensuite une saison au Bayern Munich, champion d'Allemagne en 2023, avant de rejoindre Al-Nassr, en Arabie saoudite.",
      "Le 6 février 2022, à Yaoundé, il manque un penalty en début de finale de la CAN 2021 contre l'Égypte, puis transforme le tir au but décisif : le Sénégal est champion d'Afrique pour la première fois. Élu joueur africain de l'année par la CAF en 2019 et 2022, il termine deuxième du Ballon d'Or 2022, mais une blessure le prive de la Coupe du monde au Qatar.",
      "En janvier 2026, il est élu meilleur joueur de la CAN 2025, dont le Sénégal gagne la finale sur le terrain avant que la CAF n'attribue le titre au Maroc, une décision contestée devant le Tribunal arbitral du sport. Il compte 11 buts en phase finale de CAN, à égalité au 5e rang des meilleurs buteurs de l'histoire de la compétition.",
    ],
    clubs: [
      "FC Metz (2011-2012)",
      "Red Bull Salzbourg (2012-2014)",
      "Southampton (2014-2016)",
      "Liverpool (2016-2022)",
      "Bayern Munich (2022-2023)",
      "Al-Nassr (depuis 2023)",
    ],
    honours: [
      "CAN 2021",
      "Ligue des champions 2019 (Liverpool)",
      "Championnat d'Angleterre 2020",
      "Championnat d'Allemagne 2023",
      "Joueur africain de l'année CAF : 2019 et 2022",
      "Meilleur joueur de la CAN 2021 et de la CAN 2025",
      "2e du Ballon d'Or 2022",
    ],
    caps: 134,
    goals: 56,
    statsAsOf: "2026-10-04",
    sources: [
      { label: "RSSSF — Records des internationaux sénégalais (mis à jour le 4 octobre 2026)", url: "https://rsssf.org/miscellaneous/sene-recintlp.html" },
      { label: "AllAfrica (APS) — Sadio Mané élu meilleur joueur de la CAN 2025 (22 janvier 2026)", url: "https://fr.allafrica.com/stories/202601220481.html" },
      { label: "beIN Sports — Sadio Mané prend-il sa retraite internationale ? (10 juillet 2026)", url: "https://prod.beinsports.com/en-us/soccer/fifa-world-cup-2026/articles/is-sadio-mane-retiring-from-the-senegal-national-team-2026-07-10" },
      { label: "Wikipédia (anglais) — Finale de la CAN 2021", url: "https://en.wikipedia.org/wiki/2021_Africa_Cup_of_Nations_final" },
      { label: "Wikipédia (anglais) — Sadio Mané", url: "https://en.wikipedia.org/wiki/Sadio_Man%C3%A9" },
    ],
    updatedAt: "2026-10-17",
  },
  {
    slug: "achraf-hakimi",
    name: "Achraf Hakimi",
    selection: "maroc",
    position: "defenseur",
    birthDate: "1998-11-04",
    active: true,
    shirtNumber: 2,
    intro:
      "Né à Madrid de parents marocains, Achraf Hakimi est devenu le capitaine des Lions de l'Atlas et, en 2025, le premier Marocain élu joueur africain de l'année par la CAF depuis Mustapha Hadji en 1998.",
    bio: [
      "Né le 4 novembre 1998 à Madrid, Achraf Hakimi est formé au Real Madrid, avec lequel il remporte la Ligue des champions en 2018. Il choisit de jouer pour le Maroc, le pays de ses parents, et dispute la Coupe du monde 2018. Prêté deux saisons au Borussia Dortmund, il signe ensuite à l'Inter Milan, champion d'Italie en 2021.",
      "Arrivé au Paris Saint-Germain en juillet 2021, il remporte cinq championnats de France de suite, de 2022 à 2026, et deux Ligues des champions, en 2025 et en 2026. Lors de la finale 2025 contre l'Inter Milan (5-0), c'est lui qui ouvre le score.",
      "Avec le Maroc, il marque l'histoire au Qatar en 2022 : en huitièmes de finale contre l'Espagne, sa panenka lors de la séance de tirs au but qualifie les Lions de l'Atlas, qui iront jusqu'en demi-finale et termineront quatrièmes. Il remporte aussi la médaille de bronze aux Jeux olympiques de 2024.",
      "Élu joueur africain de l'année par la CAF en novembre 2025, il est le capitaine du Maroc lors de la finale de la CAN 2025, perdue 1-0 après prolongation à Rabat contre le Sénégal, puis attribuée au Maroc par la CAF, une décision contestée devant le Tribunal arbitral du sport. À la Coupe du monde 2026, il emmène les Lions de l'Atlas jusqu'en quart de finale.",
    ],
    clubs: ["Real Madrid (2016-2018)", "Borussia Dortmund (2018-2020, prêt)", "Inter Milan (2020-2021)", "Paris Saint-Germain (depuis 2021)"],
    honours: [
      "Ligue des champions : 2018 (Real Madrid), 2025 et 2026 (PSG)",
      "Championnat d'Italie 2021",
      "5 championnats de France (2022 à 2026)",
      "Médaille de bronze olympique 2024",
      "Joueur africain de l'année CAF 2025",
      "4e de la Coupe du monde 2022",
    ],
    caps: 102,
    goals: 12,
    statsAsOf: "2026-07-09",
    sources: [
      { label: "RSSSF — Records des internationaux marocains (mis à jour le 6 octobre 2026)", url: "https://rsssf.org/miscellaneous/maro-recintlp.html" },
      { label: "Morocco World News — Hakimi élu joueur africain de l'année (novembre 2025)", url: "https://www.moroccoworldnews.com/2025/11/268615/achraf-hakimi-wins-african-player-of-the-year/" },
      { label: "AP — La panenka d'Hakimi qualifie le Maroc contre l'Espagne (2022)", url: "https://ksat.com/sports/2022/12/06/hakimis-panenka-penalty-advances-morocco-at-world-cup" },
      { label: "NBC Boston (AP) — France 2-0 Maroc, quart de finale de la Coupe du monde 2026", url: "https://www.nbcboston.com/world-cup/france-morocco-score-mbappe-dembele/" },
      { label: "DH — Le PSG remporte la Ligue des champions 2026", url: "https://www.dhnet.be/dernieres-depeches/2026/05/30/ligue-des-champions-le-psg-decroche-une-deuxieme-etoile-au-bout-du-suspense-U3HKVNAKXRGZBFFT5MUD7WZEME/" },
      { label: "Wikipédia (anglais) — Achraf Hakimi", url: "https://en.wikipedia.org/wiki/Achraf_Hakimi" },
    ],
    updatedAt: "2026-10-17",
  },
];

export const PLAYERS: Player[] = [...PLAYERS_LOT1, ...PLAYERS_LOT2, ...PLAYERS_LOT3];

const BY_SLUG = new Map(PLAYERS.map((p) => [p.slug, p]));

/** Couleurs du maillot dessiné d'un joueur : celles de sa sélection, sinon les siennes, sinon celles du site. */
export function playerColors(p: Pick<Player, "selection" | "colors">): string[] {
  return getSelection(p.selection)?.colors ?? p.colors ?? ["#1d2320", "#f2b705"];
}

export function getPlayer(slug: string): Player | undefined {
  return BY_SLUG.get(slug);
}

/** Joueurs d'une sélection (slug de pays). */
export function playersOf(country: string): Player[] {
  return PLAYERS.filter((p) => p.selection === country);
}
