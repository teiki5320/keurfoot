/** Bandeau des couleurs d'un drapeau (bandes égales), en tête des fiches. Les couleurs d'un drapeau sont libres d'usage. */
export function FlagBand({ colors, className = "h-1.5" }: { colors: string[]; className?: string }) {
  return (
    <div aria-hidden className={`flex w-full overflow-hidden rounded-full ${className}`}>
      {colors.map((c, i) => (
        <span key={i} className="flex-1" style={{ background: c }} />
      ))}
    </div>
  );
}
