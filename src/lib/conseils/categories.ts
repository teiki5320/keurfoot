/** Catégories de la rubrique Conseils. */
export const CONSEIL_CATEGORIES = {
  acheter: "Bien acheter",
  supporter: "Supporter",
  enfants: "Enfants",
} as const;

export type ConseilCategory = keyof typeof CONSEIL_CATEGORIES;

export const isConseilCategory = (v: string): v is ConseilCategory => v in CONSEIL_CATEGORIES;
