/** Compte à rebours en jours entiers entre deux dates AAAA-MM-JJ (calcul en UTC : pas de décalage d'heure d'été). */
export function daysUntil(target: string, today: string): number {
  const d = (s: string) => Date.UTC(Number(s.slice(0, 4)), Number(s.slice(5, 7)) - 1, Number(s.slice(8, 10)));
  return Math.round((d(target) - d(today)) / 86_400_000);
}

/** « J-242 », puis « Coup d'envoi » le jour même et après. */
export function countdownLabel(days: number): string {
  return days > 0 ? `J-${days}` : "Coup d'envoi";
}
