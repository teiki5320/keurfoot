import { getCountry } from "@/lib/countries";
import type { TopItem, TopList } from "@/lib/types";
import { CAN_EDITIONS, CAN_SOURCES, canRanking } from "./can";
import { TOPS_JOUEURS } from "./tops-joueurs";
import { TOPS_LOT2 } from "./tops-lot2";

/** Années en liste lisible : « 1990 et 2019 », « 2000, 2002 et 2017 ». */
const years = (list: number[]) => (list.length > 1 ? `${list.slice(0, -1).join(", ")} et ${list.at(-1)}` : `${list[0]}`);

/** Précisions ajoutées au palmarès de certains pays (faits tirés de CAN_EDITIONS). */
const TITLE_NOTES: Record<string, string> = {
  egypte: "Seule sélection à avoir gagné trois éditions de suite : 2006, 2008 et 2010.",
  ghana: "Titré deux fois de suite, en 1963 et 1965.",
  cameroun: "Titré deux fois de suite, en 2000 et 2002.",
  maroc: "Le titre 2025, attribué par la CAF sur tapis vert, est contesté devant le Tribunal arbitral du sport par le Sénégal.",
  senegal: "Vainqueur sur le terrain de la finale 2025 (1-0 a.p.), dont le titre a été attribué au Maroc par la CAF : l'appel du Sénégal est en cours devant le TAS.",
  "rd-congo": "Son titre de 1974 a été remporté sous le nom de Zaïre.",
};

function titledCountries(): TopItem[] {
  return canRanking()
    .slice(0, 10)
    .map((r) => {
      const name = getCountry(r.country)!.name;
      const finals = r.finals.length ? ` ${r.finals.length > 1 ? "Finales perdues" : "Finale perdue"} : ${years(r.finals)}.` : "";
      const note = TITLE_NOTES[r.country] ? ` ${TITLE_NOTES[r.country]}` : "";
      return {
        rank: r.rank,
        name,
        playerSlug: null,
        country: r.country,
        stat: `${r.years.length} ${r.years.length > 1 ? "titres" : "titre"}`,
        text: `${r.years.length > 1 ? "Titres" : "Titre"} : ${years(r.years)}.${finals}${note}`,
      };
    });
}

const last = CAN_EDITIONS.at(-1)!.year;

export const TOPS: TopList[] = [
  ...TOPS_JOUEURS,
  ...TOPS_LOT2,
  {
    slug: "meilleurs-buteurs-can",
    title: "Les 10 meilleurs buteurs de l'histoire de la CAN",
    pinTitle: "Les meilleurs buteurs de l'histoire de la CAN",
    description: "Samuel Eto'o, Laurent Pokou, Rashidi Yekini, Didier Drogba, Sadio Mané… le classement des meilleurs buteurs de la Coupe d'Afrique des nations.",
    intro: [
      `Qui a marqué le plus de buts en Coupe d'Afrique des nations ? Voici le classement des meilleurs buteurs de l'histoire du tournoi, toutes éditions confondues, de 1957 à la CAN ${last} incluse.`,
      "Samuel Eto'o reste loin devant. Derrière lui, cinq joueurs sont à égalité à 11 buts, dont Mohamed Salah et Sadio Mané, tous deux présents à la CAN 2025.",
    ],
    kind: "classement",
    criteria: `Nombre de buts marqués en phase finale de la CAN, de 1957 à ${last} inclus (les éliminatoires ne comptent pas). À égalité, même rang, joueurs cités par ordre alphabétique.`,
    country: null,
    items: [
      { rank: 1, name: "Samuel Eto'o", playerSlug: "samuel-eto-o", country: "cameroun", stat: "18 buts", text: "Le record absolu de la compétition. L'attaquant camerounais a remporté deux CAN avec les Lions indomptables, en 2000 et 2002." },
      { rank: 2, name: "Laurent Pokou", playerSlug: null, country: "cote-d-ivoire", stat: "14 buts", text: "Meilleur buteur des CAN 1968 et 1970, il détient le record de buts dans un même match de la compétition : cinq, contre l'Éthiopie en 1970." },
      { rank: 3, name: "Rashidi Yekini", playerSlug: null, country: "nigeria", stat: "13 buts", text: "Le grand buteur nigérian a été champion d'Afrique en 1994 avec les Super Eagles." },
      { rank: 4, name: "Hassan El-Shazly", playerSlug: null, country: "egypte", stat: "12 buts", text: "Attaquant égyptien des années 1960, il occupe toujours le 4e rang des buteurs de l'histoire du tournoi." },
      { rank: 5, name: "Didier Drogba", playerSlug: "didier-drogba", country: "cote-d-ivoire", stat: "11 buts", text: "Le capitaine des Éléphants a disputé et perdu deux finales, en 2006 et en 2012." },
      { rank: 5, name: "Hossam Hassan", playerSlug: null, country: "egypte", stat: "11 buts", text: "L'attaquant égyptien a été champion d'Afrique à trois reprises : en 1986, 1998 et 2006." },
      { rank: 5, name: "Sadio Mané", playerSlug: "sadio-mane", country: "senegal", stat: "11 buts", text: "Champion d'Afrique 2021, il a transformé le tir au but décisif de la finale contre l'Égypte. Il a atteint 11 buts lors de la CAN 2025." },
      { rank: 5, name: "Patrick Mboma", playerSlug: null, country: "cameroun", stat: "11 buts", text: "L'attaquant camerounais a remporté les CAN 2000 et 2002 aux côtés de Samuel Eto'o." },
      { rank: 5, name: "Mohamed Salah", playerSlug: "mohamed-salah", country: "egypte", stat: "11 buts", text: "La star égyptienne a disputé deux finales de CAN, en 2017 et en 2021, toutes deux perdues." },
      {
        rank: 10,
        name: "André Ayew, Kalusha Bwalya, Pierre Ndaye Mulamba, Francileudo Santos, Joël Tiéhi et Mengistu Worku",
        playerSlug: null,
        country: null,
        stat: "10 buts",
        text: "Six joueurs se partagent la 10e place. Parmi eux, Pierre Ndaye Mulamba a marqué 9 buts lors de la seule CAN 1974, remportée par le Zaïre (aujourd'hui RD Congo).",
      },
    ],
    statsAsOf: null,
    sources: [
      { label: "Wikipédia (anglais) — Records et statistiques de la CAN", url: "https://en.wikipedia.org/wiki/Africa_Cup_of_Nations_records_and_statistics" },
      { label: "Wikipédia — Coupe d'Afrique des nations de football", url: "https://fr.wikipedia.org/wiki/Coupe_d%27Afrique_des_nations_de_football" },
      { label: "AllAfrica (APS) — Sadio Mané rejoint le cercle des 11 buts (14 janvier 2026)", url: "https://fr.allafrica.com/stories/202601150073.html" },
      { label: "AllAfrica — Les meilleurs buteurs de l'histoire de la CAN (15 janvier 2026)", url: "https://fr.allafrica.com/stories/202601150369.html" },
    ],
    updatedAt: "2026-10-17",
  },
  {
    slug: "pays-les-plus-titres-can",
    title: "Les 10 pays les plus titrés de la CAN",
    pinTitle: "Les pays les plus titrés de la CAN",
    description: "Égypte, Cameroun, Ghana, Nigeria, Côte d'Ivoire… le classement des pays qui ont gagné le plus de Coupes d'Afrique des nations, avec toutes les années.",
    intro: [
      `De 1957 à ${last}, quinze pays ont gagné au moins une Coupe d'Afrique des nations. Voici les dix plus titrés, avec les années de leurs victoires et de leurs finales perdues.`,
      "Le classement suit le palmarès officiel de la CAF. Il pourrait évoluer selon la décision du Tribunal arbitral du sport sur la finale de la CAN 2025 entre le Sénégal et le Maroc.",
    ],
    kind: "classement",
    criteria: "Nombre de titres (palmarès officiel de la CAF), puis nombre de finales perdues, puis titre le plus récent pour départager les égalités.",
    country: null,
    items: titledCountries(),
    statsAsOf: null,
    sources: CAN_SOURCES,
    updatedAt: "2026-10-17",
  },
];

const BY_SLUG = new Map(TOPS.map((t) => [t.slug, t]));

export function getTop(slug: string): TopList | undefined {
  return BY_SLUG.get(slug);
}

/**
 * Liens « Voir aussi » en bas d'un Top 10 : les classements les plus proches d'abord
 * (même famille : Top 10 d'un pays ou Top 10 africain, puis même type), dans l'ordre du site.
 */
export function relatedTops(slug: string, n = 3): TopList[] {
  const top = BY_SLUG.get(slug);
  if (!top) return [];
  const score = (t: TopList) => (Boolean(t.country) === Boolean(top.country) ? 2 : 0) + (t.kind === top.kind ? 1 : 0);
  return TOPS.filter((t) => t.slug !== slug)
    .map((t, i) => ({ t, s: score(t), i }))
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .slice(0, n)
    .map((x) => x.t);
}
