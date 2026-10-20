import type { CanEdition, NextCan, Source } from "@/lib/types";

/**
 * Coupe d'Afrique des nations : toutes les éditions disputées (palmarès officiel de la CAF).
 * Vérifié le 17 octobre 2026 (Wikipédia FR et EN, RSSSF, CAF, TAS, presse) ; slugs de src/lib/countries.ts.
 * Le score est donné du point de vue du vainqueur.
 */
const e = (
  year: number,
  hosts: string[],
  winner: string,
  runnerUp: string,
  final: string,
  teams: number,
  extra: Partial<Pick<CanEdition, "winnerAs" | "runnerUpAs" | "note" | "disputed">> = {},
): CanEdition => ({ year, hosts, winner, runnerUp, final, teams, winnerAs: null, runnerUpAs: null, note: null, disputed: false, ...extra });

export const CAN_EDITIONS: CanEdition[] = [
  e(1957, ["soudan"], "egypte", "ethiopie", "4-0", 3, {
    note: "Première édition à trois équipes : l'Afrique du Sud, qui refusait d'aligner une équipe multiraciale, en a été écartée.",
  }),
  e(1959, ["egypte"], "egypte", "soudan", "Pas de finale : poule unique, le match décisif contre le Soudan est gagné 2-1", 3, {
    winnerAs: "République arabe unie",
  }),
  e(1962, ["ethiopie"], "ethiopie", "egypte", "4-2 (a.p.)", 4, { runnerUpAs: "République arabe unie" }),
  e(1963, ["ghana"], "ghana", "soudan", "3-0", 6),
  e(1965, ["tunisie"], "ghana", "tunisie", "3-2 (a.p.)", 6),
  e(1968, ["ethiopie"], "rd-congo", "ghana", "1-0", 8),
  e(1970, ["soudan"], "soudan", "ghana", "1-0", 8),
  e(1972, ["cameroun"], "congo", "mali", "3-2", 8),
  e(1974, ["egypte"], "rd-congo", "zambie", "2-2 (a.p.), puis 2-0 en finale rejouée", 8, { winnerAs: "Zaïre" }),
  e(1976, ["ethiopie"], "maroc", "guinee", "Pas de finale : poule finale, le nul 1-1 contre la Guinée lors de la dernière journée donne le titre", 8),
  e(1978, ["ghana"], "ghana", "ouganda", "2-0", 8),
  e(1980, ["nigeria"], "nigeria", "algerie", "3-0", 8),
  e(1982, ["libye"], "ghana", "libye", "1-1 (7-6 t.a.b.)", 8),
  e(1984, ["cote-d-ivoire"], "cameroun", "nigeria", "3-1", 8),
  e(1986, ["egypte"], "egypte", "cameroun", "0-0 (5-4 t.a.b.)", 8),
  e(1988, ["maroc"], "cameroun", "nigeria", "1-0", 8),
  e(1990, ["algerie"], "algerie", "nigeria", "1-0", 8),
  e(1992, ["senegal"], "cote-d-ivoire", "ghana", "0-0 (11-10 t.a.b.)", 12),
  e(1994, ["tunisie"], "nigeria", "zambie", "2-1", 12),
  e(1996, ["afrique-du-sud"], "afrique-du-sud", "tunisie", "2-0", 15, {
    note: "Prévue à 16 équipes, l'édition se joue à 15 après le forfait du Nigeria, qui n'est pas remplacé.",
  }),
  e(1998, ["burkina-faso"], "egypte", "afrique-du-sud", "2-0", 16),
  e(2000, ["ghana", "nigeria"], "cameroun", "nigeria", "2-2 (4-3 t.a.b.)", 16),
  e(2002, ["mali"], "cameroun", "senegal", "0-0 (3-2 t.a.b.)", 16),
  e(2004, ["tunisie"], "tunisie", "maroc", "2-1", 16),
  e(2006, ["egypte"], "egypte", "cote-d-ivoire", "0-0 (4-2 t.a.b.)", 16),
  e(2008, ["ghana"], "egypte", "cameroun", "1-0", 16),
  e(2010, ["angola"], "egypte", "ghana", "1-0", 15, {
    note: "Le Togo se retire du tournoi après l'attaque de son bus dans l'enclave de Cabinda : l'édition se joue à 15 équipes.",
  }),
  e(2012, ["gabon", "guinee-equatoriale"], "zambie", "cote-d-ivoire", "0-0 (8-7 t.a.b.)", 16),
  e(2013, ["afrique-du-sud"], "nigeria", "burkina-faso", "1-0", 16),
  e(2015, ["guinee-equatoriale"], "cote-d-ivoire", "ghana", "0-0 (9-8 t.a.b.)", 16),
  e(2017, ["gabon"], "cameroun", "egypte", "2-1", 16),
  e(2019, ["egypte"], "algerie", "senegal", "1-0", 24),
  e(2021, ["cameroun"], "senegal", "egypte", "0-0 (4-2 t.a.b.)", 24, {
    note: "Reportée à cause du Covid-19, l'édition 2021 s'est jouée en janvier et février 2022.",
  }),
  e(2023, ["cote-d-ivoire"], "cote-d-ivoire", "nigeria", "2-1", 24, {
    note: "L'édition 2023 s'est jouée en janvier et février 2024.",
  }),
  e(2025, ["maroc"], "maroc", "senegal", "3-0 sur tapis vert (1-0 a.p. pour le Sénégal sur le terrain)", 24, {
    disputed: true,
    note:
      "Titre contesté. Sur le terrain, le Sénégal a battu le Maroc 1-0 après prolongation, le 18 janvier 2026 à Rabat. Le 17 mars 2026, le jury d'appel de la CAF a déclaré le Sénégal forfait et attribué le titre au Maroc (3-0). Le Sénégal a fait appel devant le Tribunal arbitral du sport (TAS) : après l'audience du 8 octobre 2026, le TAS a annoncé sa décision pour fin novembre 2026.",
  }),
];

export const CAN_UPDATED = "2026-10-20";

export const CAN_INTRO: string[] = [
  "Née en 1957 avec seulement trois équipes, la Coupe d'Afrique des nations est devenue le grand rendez-vous du football africain : 24 sélections, des stades pleins et des millions de supporters devant l'écran.",
  "L'Égypte détient le record avec sept titres, devant le Cameroun (cinq) et le Ghana (quatre). Le tournoi est passé à 16 équipes en 1998, puis à 24 en 2019.",
  "Le meilleur buteur de l'histoire de la compétition est le Camerounais Samuel Eto'o, avec 18 buts. Voici toutes les éditions, de la première à la CAN 2025, dont le titre attribué au Maroc est contesté devant le Tribunal arbitral du sport.",
];

export const CAN_SOURCES: Source[] = [
  { label: "RSSSF — African Nations Cup, toutes les éditions", url: "https://www.rsssf.org/tablesa/afrchamp.html" },
  { label: "Wikipédia — Coupe d'Afrique des nations de football", url: "https://fr.wikipedia.org/wiki/Coupe_d%27Afrique_des_nations_de_football" },
  { label: "Wikipédia (anglais) — Africa Cup of Nations", url: "https://en.wikipedia.org/wiki/Africa_Cup_of_Nations" },
  { label: "Wikipédia (anglais) — Records et statistiques de la CAN", url: "https://en.wikipedia.org/wiki/Africa_Cup_of_Nations_records_and_statistics" },
  { label: "AllAfrica — Le jury d'appel de la CAF déclare le Sénégal forfait (18 mars 2026)", url: "https://fr.allafrica.com/stories/202603180472.html" },
  { label: "TAS — Communiqué sur l'appel de la Fédération sénégalaise (25 mars 2026)", url: "https://www.tas-cas.org/generated/assets/lists/dceab111-07bc-435f-b5f9-de88eff9db72/CAS%20Media%20Release_12295_appel_FR.pdf" },
  { label: "ESPN — Sénégal-Maroc : le verdict du TAS attendu (8 octobre 2026)", url: "https://www.espn.com/soccer/story/_/id/50131828/senegal-vs-morocco-afcon-verdict-days-cas" },
  { label: "France 24 — Le TAS ne rendra sa décision que fin novembre (19 octobre 2026)", url: "https://www.france24.com/fr/sports/20261019-finale-maroc-s%C3%A9n%C3%A9gal-de-la-can-2025-le-tas-ne-rendra-sa-d%C3%A9cision-que-fin-novembre" },
  { label: "Africanews — Verdict du TAS attendu fin novembre (19 octobre 2026)", url: "https://www.africanews.com/2026/10/19/cas-verdict-on-senegal-afcon-title-appeal-expected-end-november/" },
];

/** Années en liste lisible, avec la mention « titre contesté » si l'une d'elles l'est (« 1976 et 2025 (titre contesté) »). */
export function canYearsLabel(years: number[]): string {
  const text = years.length > 1 ? `${years.slice(0, -1).join(", ")} et ${years.at(-1)}` : `${years[0] ?? ""}`;
  const disputed = years.some((y) => CAN_EDITIONS.some((ed) => ed.year === y && ed.disputed));
  return disputed ? `${text} (titre contesté)` : text;
}

/** Chiffre du devant des maillots : nombre de CAN gagnées, avec « * » si l'un des titres est contesté. */
export function titlesBadge(years: number[]): string {
  return `${years.length}${years.some((y) => CAN_EDITIONS.some((ed) => ed.year === y && ed.disputed)) ? "*" : ""}`;
}

/** Années des titres de chaque pays (slug → années croissantes). */
export function canTitlesByCountry(): Map<string, number[]> {
  const m = new Map<string, number[]>();
  for (const ed of CAN_EDITIONS) m.set(ed.winner, [...(m.get(ed.winner) ?? []), ed.year]);
  return m;
}

/** Édition jouée avec une vraie finale (1959 et 1976 se sont jouées en poule finale). */
export const hasFinal = (ed: CanEdition) => !ed.final.startsWith("Pas de finale");

/** Années des finales perdues de chaque pays (les deuxièmes d'une poule finale ne comptent pas). */
export function canFinalsByCountry(): Map<string, number[]> {
  const m = new Map<string, number[]>();
  for (const ed of CAN_EDITIONS.filter(hasFinal)) m.set(ed.runnerUp, [...(m.get(ed.runnerUp) ?? []), ed.year]);
  return m;
}

/**
 * Classement des pays titrés : nombre de titres, puis nombre de finales perdues, puis titre le plus récent
 * (deux titres ne tombant jamais la même année, il n'y a pas d'égalité parfaite).
 */
export function canRanking(): Array<{ rank: number; country: string; years: number[]; finals: number[] }> {
  const finals = canFinalsByCountry();
  const rows = [...canTitlesByCountry()].map(([country, years]) => ({ country, years, finals: finals.get(country) ?? [] }));
  const key = (r: (typeof rows)[number]) => [r.years.length, r.finals.length, r.years.at(-1)!];
  rows.sort((a, b) => {
    const [ka, kb] = [key(a), key(b)];
    return kb[0] - ka[0] || kb[1] - ka[1] || kb[2] - ka[2];
  });
  return rows.map((r, i) => ({ ...r, rank: i + 1 }));
}

export const NEXT_CAN: NextCan = {
  year: 2027,
  hosts: ["kenya", "tanzanie", "ouganda"],
  dates: "Du 19 juin au 17 juillet 2027",
  start: "2027-06-19",
  end: "2027-07-17",
  text: [
    "La CAN 2027, baptisée « Pamoja » (« ensemble » en swahili), sera la première organisée par trois pays à la fois : le Kenya, la Tanzanie et l'Ouganda. Elle réunira 24 sélections.",
    "Les éliminatoires rassemblent 48 équipes réparties en 12 groupes de quatre : les deux premiers de chaque groupe se qualifient. Les journées sont programmées en septembre-octobre 2026, en novembre 2026 et en mars 2027.",
    "Les stades et les villes du match d'ouverture et de la finale n'étaient pas encore officiellement confirmés par la CAF à la date de notre vérification.",
    "En décembre 2025, la CAF a annoncé que l'édition 2027 serait la dernière disputée tous les deux ans : une CAN est prévue en 2028, puis le tournoi aura lieu tous les quatre ans.",
  ],
  sources: [
    { label: "CAF — Tout savoir sur la CAN Pamoja 2027 (17 juin 2026)", url: "https://www.cafonline.com/afcon2025/news/everything-you-need-to-know-about-totalenergies-caf-africa-cup-of-nations-pamoja-2027/" },
    { label: "Ghana FA — La CAF annonce les dates de la CAN 2027 et des éliminatoires", url: "https://ghanafa.org/caf-announces-kick-off-final-and-qualifiers-dates-for-the-totalenergies-caf-africa-cup-of-nations-pamoja-2027" },
    { label: "EWN — La CAF inspecte les pays hôtes de la CAN 2027 (4 septembre 2026)", url: "https://www.ewn.co.za/2026/09/04/caf-inspects-pamoja-2027-hosts-as-preparations-gather-pace" },
    { label: "Citizen Digital — Motsepe confirme la CAN 2027 en Afrique de l'Est (13 février 2026)", url: "https://citizen.digital/sports/caf-confirms-afcon-2027-to-remain-in-east-africa-n377434" },
    { label: "Wikipédia (anglais) — 2027 Africa Cup of Nations", url: "https://en.wikipedia.org/wiki/2027_Africa_Cup_of_Nations" },
  ],
  checkedOn: "2026-10-17",
};
