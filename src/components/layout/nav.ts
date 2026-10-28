/** Menu principal (en-tête et pied de page). */
export const NAV = [
  { href: "/selections", label: "Sélections" },
  // 2e : visible sans faire défiler le menu sur téléphone.
  { href: "/boutique", label: "Boutique" },
  { href: "/joueurs", label: "Joueurs" },
  { href: "/can", label: "CAN" },
  { href: "/top-10", label: "Top 10" },
  { href: "/conseils", label: "Conseils" },
  { href: "/actus", label: "Actus" },
] as const;
