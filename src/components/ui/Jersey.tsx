import { jerseyTextColor } from "./jersey-colors";

/**
 * Maillot générique dessiné par le site, aux couleurs d'un drapeau : jamais la reproduction d'un maillot officiel
 * (ni écusson, ni marque, ni motif d'équipementier). Sert de visuel aux sélections et aux joueurs, à la place des photos.
 * colors[0] : corps ; colors[1] : manches et col ; colors[2] : liseré central.
 */
export function Jersey({
  colors,
  number = null,
  label,
  className = "",
}: {
  colors: string[];
  number?: number | null;
  label: string;
  className?: string;
}) {
  const [body, sleeves = body, stripe] = colors;
  const ink = jerseyTextColor(body);
  return (
    <svg viewBox="0 0 200 200" role="img" aria-label={label} className={className}>
      {/* Manches */}
      <path d="M58 30 L18 58 L34 96 L58 84 Z" fill={sleeves} />
      <path d="M142 30 L182 58 L166 96 L142 84 Z" fill={sleeves} />
      {/* Corps */}
      <path d="M58 30 Q78 40 100 40 Q122 40 142 30 L142 182 Q100 190 58 182 Z" fill={body} />
      {stripe && <rect x="94" y="40" width="12" height="146" fill={stripe} opacity="0.9" />}
      {/* Col */}
      <path d="M78 28 Q100 50 122 28" fill="none" stroke={sleeves} strokeWidth="9" strokeLinecap="round" />
      {/* Ombre légère pour le volume */}
      <path d="M58 30 L58 182 Q100 190 142 182 L142 150 Q100 160 58 150 Z" fill="#000" opacity="0.08" />
      <path d="M58 30 L18 58 L34 96 L58 84 Q78 40 100 40 Q122 40 142 84 L166 96 L182 58 L142 30" fill="none" stroke="#000" strokeOpacity="0.25" strokeWidth="2" />
      {number !== null && (
        <text
          x="100"
          y="128"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="var(--font-anton), Impact, sans-serif"
          fontSize="64"
          fill={ink}
          stroke={ink === "#ffffff" ? "#00000055" : "#ffffff55"}
          strokeWidth="1.5"
        >
          {number}
        </text>
      )}
    </svg>
  );
}
