/** Date AAAA-MM-JJ en toutes lettres (« 17 octobre 2026 »), sans décalage de fuseau. */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const s = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(y, m - 1, d)),
  );
  return s.replace(/^1 /, "1er ");
}

/** « 1 titre », « 3 titres » ; « aucun titre » pour zéro. */
export function plural(n: number, one: string, many: string, none?: string): string {
  if (n === 0 && none) return none;
  return `${n} ${n > 1 ? many : one}`;
}
