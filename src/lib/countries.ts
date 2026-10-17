/**
 * Les 54 États africains membres de l'ONU (Maghreb compris), avec leur nom français courant.
 * Sert de référence à toutes les données : vainqueurs de la CAN, sélections, joueurs, classements.
 */
export interface Country {
  slug: string;
  name: string;
  /** Complément « du Sénégal », « de la Côte d'Ivoire », « d'Algérie ». */
  of: string;
  /** Gentilé au masculin, en minuscules : « sénégalais ». */
  demonym: string;
  iso2: string;
}

const c = (slug: string, name: string, of: string, demonym: string, iso2: string): Country => ({ slug, name, of, demonym, iso2 });

export const COUNTRIES: Country[] = [
  c("afrique-du-sud", "Afrique du Sud", "d'Afrique du Sud", "sud-africain", "ZA"),
  c("algerie", "Algérie", "d'Algérie", "algérien", "DZ"),
  c("angola", "Angola", "de l'Angola", "angolais", "AO"),
  c("benin", "Bénin", "du Bénin", "béninois", "BJ"),
  c("botswana", "Botswana", "du Botswana", "botswanais", "BW"),
  c("burkina-faso", "Burkina Faso", "du Burkina Faso", "burkinabè", "BF"),
  c("burundi", "Burundi", "du Burundi", "burundais", "BI"),
  c("cameroun", "Cameroun", "du Cameroun", "camerounais", "CM"),
  c("cap-vert", "Cap-Vert", "du Cap-Vert", "cap-verdien", "CV"),
  c("centrafrique", "Centrafrique", "de la Centrafrique", "centrafricain", "CF"),
  c("comores", "Comores", "des Comores", "comorien", "KM"),
  c("congo", "Congo", "du Congo", "congolais", "CG"),
  c("rd-congo", "RD Congo", "de la RD Congo", "congolais (RDC)", "CD"),
  c("cote-d-ivoire", "Côte d'Ivoire", "de la Côte d'Ivoire", "ivoirien", "CI"),
  c("djibouti", "Djibouti", "de Djibouti", "djiboutien", "DJ"),
  c("egypte", "Égypte", "d'Égypte", "égyptien", "EG"),
  c("erythree", "Érythrée", "d'Érythrée", "érythréen", "ER"),
  c("eswatini", "Eswatini", "d'Eswatini", "swazi", "SZ"),
  c("ethiopie", "Éthiopie", "d'Éthiopie", "éthiopien", "ET"),
  c("gabon", "Gabon", "du Gabon", "gabonais", "GA"),
  c("gambie", "Gambie", "de la Gambie", "gambien", "GM"),
  c("ghana", "Ghana", "du Ghana", "ghanéen", "GH"),
  c("guinee", "Guinée", "de la Guinée", "guinéen", "GN"),
  c("guinee-bissau", "Guinée-Bissau", "de la Guinée-Bissau", "bissau-guinéen", "GW"),
  c("guinee-equatoriale", "Guinée équatoriale", "de la Guinée équatoriale", "équatoguinéen", "GQ"),
  c("kenya", "Kenya", "du Kenya", "kényan", "KE"),
  c("lesotho", "Lesotho", "du Lesotho", "lésothien", "LS"),
  c("liberia", "Liberia", "du Liberia", "libérien", "LR"),
  c("libye", "Libye", "de la Libye", "libyen", "LY"),
  c("madagascar", "Madagascar", "de Madagascar", "malgache", "MG"),
  c("malawi", "Malawi", "du Malawi", "malawite", "MW"),
  c("mali", "Mali", "du Mali", "malien", "ML"),
  c("maroc", "Maroc", "du Maroc", "marocain", "MA"),
  c("maurice", "Maurice", "de Maurice", "mauricien", "MU"),
  c("mauritanie", "Mauritanie", "de la Mauritanie", "mauritanien", "MR"),
  c("mozambique", "Mozambique", "du Mozambique", "mozambicain", "MZ"),
  c("namibie", "Namibie", "de la Namibie", "namibien", "NA"),
  c("niger", "Niger", "du Niger", "nigérien", "NE"),
  c("nigeria", "Nigeria", "du Nigeria", "nigérian", "NG"),
  c("ouganda", "Ouganda", "de l'Ouganda", "ougandais", "UG"),
  c("rwanda", "Rwanda", "du Rwanda", "rwandais", "RW"),
  c("sao-tome-et-principe", "Sao Tomé-et-Principe", "de Sao Tomé-et-Principe", "santoméen", "ST"),
  c("senegal", "Sénégal", "du Sénégal", "sénégalais", "SN"),
  c("seychelles", "Seychelles", "des Seychelles", "seychellois", "SC"),
  c("sierra-leone", "Sierra Leone", "de la Sierra Leone", "sierra-léonais", "SL"),
  c("somalie", "Somalie", "de la Somalie", "somalien", "SO"),
  c("soudan", "Soudan", "du Soudan", "soudanais", "SD"),
  c("soudan-du-sud", "Soudan du Sud", "du Soudan du Sud", "sud-soudanais", "SS"),
  c("tanzanie", "Tanzanie", "de la Tanzanie", "tanzanien", "TZ"),
  c("tchad", "Tchad", "du Tchad", "tchadien", "TD"),
  c("togo", "Togo", "du Togo", "togolais", "TG"),
  c("tunisie", "Tunisie", "de la Tunisie", "tunisien", "TN"),
  c("zambie", "Zambie", "de la Zambie", "zambien", "ZM"),
  c("zimbabwe", "Zimbabwe", "du Zimbabwe", "zimbabwéen", "ZW"),
];

const BY_SLUG = new Map(COUNTRIES.map((x) => [x.slug, x]));

export function getCountry(slug: string): Country | undefined {
  return BY_SLUG.get(slug);
}
