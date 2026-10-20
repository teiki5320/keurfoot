/**
 * Les 54 États africains membres de l'ONU (Maghreb compris), avec leur nom français courant.
 * Sert de référence à toutes les données : vainqueurs de la CAN, sélections, joueurs, classements.
 */
/** Régions du site (regroupement éditorial, du lot 3 au lot 6). */
export const REGIONS = {
  ouest: "Afrique de l'Ouest",
  nord: "Afrique du Nord",
  centre: "Afrique centrale",
  est: "Afrique de l'Est",
  australe: "Afrique australe et océan Indien",
} as const;
export type Region = keyof typeof REGIONS;

export interface Country {
  slug: string;
  name: string;
  /** Complément « du Sénégal », « de la Côte d'Ivoire », « d'Algérie ». */
  of: string;
  /** Gentilé au masculin, en minuscules : « sénégalais ». */
  demonym: string;
  iso2: string;
  region: Region;
}

const c = (slug: string, name: string, of: string, demonym: string, iso2: string, region: Region): Country => ({ slug, name, of, demonym, iso2, region });

export const COUNTRIES: Country[] = [
  c("afrique-du-sud", "Afrique du Sud", "d'Afrique du Sud", "sud-africain", "ZA", "australe"),
  c("algerie", "Algérie", "d'Algérie", "algérien", "DZ", "nord"),
  c("angola", "Angola", "de l'Angola", "angolais", "AO", "australe"),
  c("benin", "Bénin", "du Bénin", "béninois", "BJ", "ouest"),
  c("botswana", "Botswana", "du Botswana", "botswanais", "BW", "australe"),
  c("burkina-faso", "Burkina Faso", "du Burkina Faso", "burkinabè", "BF", "ouest"),
  c("burundi", "Burundi", "du Burundi", "burundais", "BI", "est"),
  c("cameroun", "Cameroun", "du Cameroun", "camerounais", "CM", "centre"),
  c("cap-vert", "Cap-Vert", "du Cap-Vert", "cap-verdien", "CV", "ouest"),
  c("centrafrique", "Centrafrique", "de la Centrafrique", "centrafricain", "CF", "centre"),
  c("comores", "Comores", "des Comores", "comorien", "KM", "australe"),
  c("congo", "Congo", "du Congo", "congolais", "CG", "centre"),
  c("rd-congo", "RD Congo", "de la RD Congo", "congolais (RDC)", "CD", "centre"),
  c("cote-d-ivoire", "Côte d'Ivoire", "de la Côte d'Ivoire", "ivoirien", "CI", "ouest"),
  c("djibouti", "Djibouti", "de Djibouti", "djiboutien", "DJ", "est"),
  c("egypte", "Égypte", "d'Égypte", "égyptien", "EG", "nord"),
  c("erythree", "Érythrée", "d'Érythrée", "érythréen", "ER", "est"),
  c("eswatini", "Eswatini", "d'Eswatini", "swazi", "SZ", "australe"),
  c("ethiopie", "Éthiopie", "d'Éthiopie", "éthiopien", "ET", "est"),
  c("gabon", "Gabon", "du Gabon", "gabonais", "GA", "centre"),
  c("gambie", "Gambie", "de la Gambie", "gambien", "GM", "ouest"),
  c("ghana", "Ghana", "du Ghana", "ghanéen", "GH", "ouest"),
  c("guinee", "Guinée", "de la Guinée", "guinéen", "GN", "ouest"),
  c("guinee-bissau", "Guinée-Bissau", "de la Guinée-Bissau", "bissau-guinéen", "GW", "ouest"),
  c("guinee-equatoriale", "Guinée équatoriale", "de la Guinée équatoriale", "équatoguinéen", "GQ", "centre"),
  c("kenya", "Kenya", "du Kenya", "kényan", "KE", "est"),
  c("lesotho", "Lesotho", "du Lesotho", "lésothien", "LS", "australe"),
  c("liberia", "Liberia", "du Liberia", "libérien", "LR", "ouest"),
  c("libye", "Libye", "de la Libye", "libyen", "LY", "nord"),
  c("madagascar", "Madagascar", "de Madagascar", "malgache", "MG", "australe"),
  c("malawi", "Malawi", "du Malawi", "malawite", "MW", "australe"),
  c("mali", "Mali", "du Mali", "malien", "ML", "ouest"),
  c("maroc", "Maroc", "du Maroc", "marocain", "MA", "nord"),
  c("maurice", "Maurice", "de Maurice", "mauricien", "MU", "australe"),
  c("mauritanie", "Mauritanie", "de la Mauritanie", "mauritanien", "MR", "ouest"),
  c("mozambique", "Mozambique", "du Mozambique", "mozambicain", "MZ", "australe"),
  c("namibie", "Namibie", "de la Namibie", "namibien", "NA", "australe"),
  c("niger", "Niger", "du Niger", "nigérien", "NE", "ouest"),
  c("nigeria", "Nigeria", "du Nigeria", "nigérian", "NG", "ouest"),
  c("ouganda", "Ouganda", "de l'Ouganda", "ougandais", "UG", "est"),
  c("rwanda", "Rwanda", "du Rwanda", "rwandais", "RW", "est"),
  c("sao-tome-et-principe", "Sao Tomé-et-Principe", "de Sao Tomé-et-Principe", "santoméen", "ST", "centre"),
  c("senegal", "Sénégal", "du Sénégal", "sénégalais", "SN", "ouest"),
  c("seychelles", "Seychelles", "des Seychelles", "seychellois", "SC", "australe"),
  c("sierra-leone", "Sierra Leone", "de la Sierra Leone", "sierra-léonais", "SL", "ouest"),
  c("somalie", "Somalie", "de la Somalie", "somalien", "SO", "est"),
  c("soudan", "Soudan", "du Soudan", "soudanais", "SD", "nord"),
  c("soudan-du-sud", "Soudan du Sud", "du Soudan du Sud", "sud-soudanais", "SS", "est"),
  c("tanzanie", "Tanzanie", "de la Tanzanie", "tanzanien", "TZ", "est"),
  c("tchad", "Tchad", "du Tchad", "tchadien", "TD", "centre"),
  c("togo", "Togo", "du Togo", "togolais", "TG", "ouest"),
  c("tunisie", "Tunisie", "de la Tunisie", "tunisien", "TN", "nord"),
  c("zambie", "Zambie", "de la Zambie", "zambien", "ZM", "australe"),
  c("zimbabwe", "Zimbabwe", "du Zimbabwe", "zimbabwéen", "ZW", "australe"),
];

const BY_SLUG = new Map(COUNTRIES.map((x) => [x.slug, x]));

export function getCountry(slug: string): Country | undefined {
  return BY_SLUG.get(slug);
}
