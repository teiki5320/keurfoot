import type { TopList } from "@/lib/types";

/**
 * Top 10 « meilleurs joueurs » d'un pays : choix de la rédaction selon des critères écrits (docs/REDACTION.md, règle 5).
 * Chiffres en sélection : RSSSF (pages mises à jour en octobre 2026), vérifiés le 17 octobre 2026.
 */
export const TOPS_JOUEURS: TopList[] = [
  {
    slug: "meilleurs-joueurs-senegalais",
    title: "Les 10 meilleurs joueurs sénégalais de l'histoire",
    pinTitle: "Les 10 meilleurs joueurs sénégalais de l'histoire",
    description: "Sadio Mané, El Hadji Diouf, Kalidou Koulibaly, Idrissa Gana Gueye… notre classement des plus grands joueurs de l'histoire des Lions de la Teranga.",
    intro: [
      "Qui sont les plus grands joueurs de l'histoire du Sénégal ? De l'épopée de 2002 au premier titre continental de 2022, voici notre classement des Lions de la Teranga qui ont le plus marqué la sélection.",
      "Tout classement de ce type reste un choix : le nôtre s'appuie sur des faits vérifiés, que vous retrouverez sous chaque nom, et recoupe les classements publiés par la presse sénégalaise.",
    ],
    kind: "selection",
    criteria:
      "Titres et moments marquants avec les Lions, distinctions individuelles (joueur africain de l'année CAF, équipes types), records de sélections et de buts, carrière en club. Classement de la rédaction, recoupé avec celui d'Afrique Sports (janvier 2026).",
    country: "senegal",
    items: [
      { rank: 1, name: "Sadio Mané", playerSlug: "sadio-mane", country: "senegal", stat: "56 buts, record", text: "Meilleur buteur de l'histoire du Sénégal, il marque le tir au but du premier titre continental en 2022. Joueur africain de l'année pour la CAF en 2019 et 2022, deuxième du Ballon d'Or 2022, élu meilleur joueur des CAN 2021 et 2025." },
      { rank: 2, name: "El Hadji Diouf", playerSlug: "el-hadji-diouf", country: "senegal", stat: "70 sélections, 24 buts", text: "Élu joueur africain de l'année par la CAF en 2001 et 2002, il est la star de l'épopée de 2002 : finale de la CAN et quart de finale de la Coupe du monde, où il figure dans l'équipe type du tournoi." },
      { rank: 3, name: "Kalidou Koulibaly", playerSlug: null, country: "senegal", stat: "Plus de 100 sélections", text: "Capitaine du titre de 2021, élu meilleur défenseur de Serie A en 2019 avec Naples, il figure dans l'équipe type de la CAF en 2018, 2019, 2023 et 2024." },
      { rank: 4, name: "Idrissa Gana Gueye", playerSlug: null, country: "senegal", stat: "141 sélections, record", text: "Joueur le plus capé de l'histoire du Sénégal, champion d'Afrique 2021 et triple champion de France (Lille en 2011, Paris Saint-Germain en 2020 et 2022)." },
      { rank: 5, name: "Jules Bocandé", playerSlug: null, country: "senegal", stat: null, text: "Meilleur buteur de la première division française en 1986 avec Metz (23 buts), l'attaquant des années 1980 a été honoré par la CAF comme légende du football africain en 2009. Il est décédé en 2012." },
      { rank: 6, name: "Édouard Mendy", playerSlug: null, country: "senegal", stat: null, text: "Champion d'Afrique et vainqueur de la Ligue des champions avec Chelsea en 2021, élu meilleur gardien du monde par la FIFA (The Best) la même année et meilleur gardien de la CAN 2021." },
      { rank: 7, name: "Henri Camara", playerSlug: null, country: "senegal", stat: "98 sélections, 29 buts", text: "Deuxième meilleur buteur de l'histoire du Sénégal, il signe les deux buts de la victoire contre la Suède en huitièmes de finale du Mondial 2002, dont le but en or." },
      { rank: 8, name: "Papa Bouba Diop", playerSlug: null, country: "senegal", stat: "63 sélections, 11 buts", text: "Auteur du but de la victoire 1-0 contre la France, tenante du titre, en ouverture de la Coupe du monde 2002. Le milieu de terrain est décédé en 2020." },
      { rank: 9, name: "Khalilou Fadiga", playerSlug: null, country: "senegal", stat: "41 sélections", text: "Milieu de terrain de la génération 2002, finaliste de la CAN et quart de finaliste de la Coupe du monde, il figure dans l'équipe type de la CAN 2000." },
      { rank: 10, name: "Tony Sylva", playerSlug: null, country: "senegal", stat: "84 sélections", text: "Gardien de l'épopée de 2002, dans l'équipe type de la CAN cette année-là, il atteint aussi la finale de la Ligue des champions 2004 avec Monaco." },
    ],
    statsAsOf: "2026-10-04",
    sources: [
      { label: "RSSSF — Records des internationaux sénégalais (mis à jour le 4 octobre 2026)", url: "https://rsssf.org/miscellaneous/sene-recintlp.html" },
      { label: "RSSSF — El Hadji Diouf en sélection", url: "https://rsssf.org/miscellaneous/hadjidiouf-intlg.html" },
      { label: "Afrique Sports — Le classement des meilleurs joueurs sénégalais de tous les temps (janvier 2026)", url: "https://www.afriquesports.net/classement/gana-5e-fadiga-8e-mane-le-classement-des-meilleurs-joueurs-senegalais-de-tous-les-temps" },
      { label: "ESPN — Quand le Sénégal s'envolait (2002)", url: "https://africa.espn.com/football/story/_/id/37394963/when-senegal-soared-2002" },
      { label: "AllAfrica (APS) — Sadio Mané élu meilleur joueur de la CAN 2025", url: "https://fr.allafrica.com/stories/202601220481.html" },
      { label: "Wikipédia (anglais) — Senegal national football team", url: "https://en.wikipedia.org/wiki/Senegal_national_football_team" },
    ],
    updatedAt: "2026-10-17",
  },
  {
    slug: "meilleurs-joueurs-ivoiriens",
    title: "Les 10 meilleurs joueurs ivoiriens de l'histoire",
    pinTitle: "Les 10 meilleurs joueurs ivoiriens de l'histoire",
    description: "Didier Drogba, Yaya Touré, Laurent Pokou, Kolo Touré… notre classement des plus grands joueurs de l'histoire des Éléphants de Côte d'Ivoire.",
    intro: [
      "Qui sont les plus grands Éléphants de l'histoire ? Des buts de Laurent Pokou dans les années 1970 au troisième titre continental de 2024, voici notre classement des joueurs qui ont fait la Côte d'Ivoire.",
      "Ce classement est un choix de la rédaction, fondé sur des faits vérifiés et recoupé avec les classements publiés par la presse ivoirienne et internationale.",
    ],
    kind: "selection",
    criteria:
      "Titres et moments marquants avec les Éléphants, distinctions individuelles (joueur africain de l'année CAF, meilleur buteur de CAN), records de sélections et de buts, carrière en club. Classement de la rédaction, recoupé avec ceux de Connectionivoirienne (2025) et de Sports Illustrated.",
    country: "cote-d-ivoire",
    items: [
      { rank: 1, name: "Didier Drogba", playerSlug: "didier-drogba", country: "cote-d-ivoire", stat: "65 buts, record", text: "Meilleur buteur de l'histoire des Éléphants, joueur africain de l'année pour la CAF en 2006 et 2009, vainqueur de la Ligue des champions 2012 avec Chelsea. Il a qualifié la Côte d'Ivoire pour sa première Coupe du monde." },
      { rank: 2, name: "Yaya Touré", playerSlug: "yaya-toure", country: "cote-d-ivoire", stat: "101 sélections, 19 buts", text: "Élu joueur africain de l'année par la CAF quatre années de suite, de 2011 à 2014, champion d'Afrique 2015 et triple champion d'Angleterre avec Manchester City." },
      { rank: 3, name: "Laurent Pokou", playerSlug: null, country: "cote-d-ivoire", stat: "14 buts en CAN", text: "Meilleur buteur des CAN 1968 et 1970, il détient le record de buts dans un même match de la compétition (cinq contre l'Éthiopie en 1970). Ses 14 buts en CAN sont restés un record jusqu'en 2008." },
      { rank: 4, name: "Kolo Touré", playerSlug: null, country: "cote-d-ivoire", stat: "120 sélections", text: "Champion d'Afrique 2015, deux fois champion d'Angleterre (avec les « Invincibles » d'Arsenal en 2004, puis avec Manchester City en 2012), il est le deuxième joueur le plus capé du pays." },
      { rank: 5, name: "Abdoulaye Traoré", playerSlug: null, country: "cote-d-ivoire", stat: "90 sélections, 50 buts", text: "Surnommé « Ben Badi », deuxième meilleur buteur de l'histoire des Éléphants, champion d'Afrique 1992 et co-meilleur buteur de la CAN 1988." },
      { rank: 6, name: "Didier Zokora", playerSlug: null, country: "cote-d-ivoire", stat: "123 sélections, record", text: "Joueur le plus capé de l'histoire de la Côte d'Ivoire, de 2000 à 2014, finaliste des CAN 2006 et 2012 et vainqueur de la Coupe du Roi 2010 avec Séville." },
      { rank: 7, name: "Alain Gouaméné", playerSlug: null, country: "cote-d-ivoire", stat: null, text: "Gardien du premier titre continental en 1992, dans l'équipe type de cette CAN, il a disputé sept phases finales de la compétition." },
      { rank: 8, name: "Salomon Kalou", playerSlug: null, country: "cote-d-ivoire", stat: "96 sélections, 27 buts", text: "Champion d'Afrique 2015, vainqueur de la Ligue des champions 2012 et champion d'Angleterre 2010 avec Chelsea." },
      { rank: 9, name: "Franck Kessié", playerSlug: null, country: "cote-d-ivoire", stat: "108 sélections", text: "Capitaine des Éléphants, buteur en finale de la CAN 2023 gagnée à domicile contre le Nigeria, champion d'Italie avec Milan en 2022 et d'Espagne avec Barcelone en 2023." },
      { rank: 10, name: "Joël Tiéhi", playerSlug: null, country: "cote-d-ivoire", stat: "50 sélections, 28 buts", text: "Troisième meilleur buteur de l'histoire des Éléphants, titulaire lors de la finale victorieuse de la CAN 1992." },
    ],
    statsAsOf: "2026-10-01",
    sources: [
      { label: "RSSSF — Records des internationaux ivoiriens (mis à jour le 1er octobre 2026)", url: "https://rsssf.org/miscellaneous/ivo-recintlp.html" },
      { label: "Connectionivoirienne — Notre top 13 des légendes du football ivoirien (2025)", url: "https://connectionivoirienne.net/2025/05/13/qui-est-le-meilleur-joueur-de-la-cote-divoire-notre-top-13-des-legendes-du-football/" },
      { label: "Sports Illustrated — Les 50 plus grands joueurs africains", url: "https://www.si.com/soccer/2019/07/22/50-greatest-african-players-all-time" },
      { label: "CAF — La Côte d'Ivoire remporte la CAN 2023", url: "https://www.cafonline.com/fr/coupe-dafrique-des-nations/infos/la-cote-d-ivoire-domine-le-nigeria-et-remporte-la-coupe-d-afrique-des-nations-caf-totalenergies-2023" },
      { label: "Wikipédia (anglais) — Records et statistiques de la CAN", url: "https://en.wikipedia.org/wiki/Africa_Cup_of_Nations_records_and_statistics" },
    ],
    updatedAt: "2026-10-17",
  },
];
