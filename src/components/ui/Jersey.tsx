import { jerseyParts } from "./jersey-colors";

/**
 * Maillot générique dessiné par le site (design « Vestiaire »), aux couleurs d'un drapeau : jamais la reproduction d'un
 * maillot officiel (ni écusson de fédération, ni marque, ni motif d'équipementier). Sert de visuel aux sélections et aux
 * joueurs, à la place des photos. Les formes communes sont déclarées une fois par page dans <JerseyDefs />.
 */

/** Formes du maillot (face, dos), ombres et maille : à placer une seule fois par page (SiteShell). */
export function JerseyDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute", width: 0, height: 0 }}>
      <defs>
        <linearGradient id="kfShade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity=".22" />
          <stop offset=".32" stopColor="#fff" stopOpacity="0" />
          <stop offset=".62" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".34" />
        </linearGradient>
        <linearGradient id="kfSheen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".16" />
          <stop offset=".25" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".16" />
        </linearGradient>
        <pattern id="kfMesh" width="4" height="4" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r=".7" fill="#fff" fillOpacity=".13" />
        </pattern>
        <symbol id="kf-base" viewBox="0 0 240 260">
          <path d="M50 50 L14 106 L48 128 L68 100 Z" fill="var(--sleeve)" />
          <path d="M190 50 L226 106 L192 128 L172 100 Z" fill="var(--sleeve)" />
          <path d="M50 50 L14 106 L48 128 L68 100 Z M190 50 L226 106 L192 128 L172 100 Z" fill="url(#kfShade)" />
          <path d="M50 50 L14 106 L48 128 L68 100 Z M190 50 L226 106 L192 128 L172 100 Z" fill="url(#kfMesh)" />
          <path d="M17 104 L46 124 M223 104 L194 124" stroke="var(--trim)" strokeWidth="7" />
          <path d="M17 104 L46 124 M223 104 L194 124" stroke="#000" strokeOpacity=".3" strokeWidth="1.5" />
          <path d="M50 50 L88 36 Q120 48 152 36 L190 50 L172 100 L174 244 Q120 254 66 244 L68 100 Z" fill="var(--body)" />
          <path d="M50 50 L88 36 Q120 48 152 36 L190 50 L172 100 L174 244 Q120 254 66 244 L68 100 Z" fill="url(#kfMesh)" />
          <path d="M68 100 L82 104 L84 246 Q75 246 66 244 Z" fill="var(--trim)" fillOpacity=".92" />
          <path d="M172 100 L158 104 L156 246 Q165 246 174 244 Z" fill="var(--trim)" fillOpacity=".92" />
          <path d="M50 50 L88 36 Q120 48 152 36 L190 50 L172 100 L174 244 Q120 254 66 244 L68 100 Z" fill="url(#kfShade)" />
          <path d="M50 50 L88 36 Q120 48 152 36 L190 50 L172 100 L174 244 Q120 254 66 244 L68 100 Z" fill="url(#kfSheen)" />
          <path d="M68 100 Q86 116 82 146 L68 140 Z M172 100 Q154 116 158 146 L172 140 Z" fill="#000" fillOpacity=".16" />
          <path d="M100 120 q4 40 -2 70 M140 120 q-4 40 2 70" stroke="#000" strokeOpacity=".07" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M66 244 Q120 254 174 244" stroke="#000" strokeOpacity=".3" strokeWidth="3" fill="none" />
          <path d="M68 238 Q120 248 172 238" stroke="#fff" strokeOpacity=".28" strokeWidth="1" strokeDasharray="3 3" fill="none" />
          <path d="M50 50 L68 100 M190 50 L172 100 M88 36 L50 50 M152 36 L190 50" stroke="#000" strokeOpacity=".32" strokeWidth="1.5" fill="none" />
          <path d="M54 54 L70 97 M186 54 L170 97" stroke="#fff" strokeOpacity=".3" strokeWidth="1" strokeDasharray="3 3" fill="none" />
        </symbol>
        {/* Face : col en V et un rond générique (pas d'écusson réel, pas de marque d'équipementier). */}
        <symbol id="kf-front" viewBox="0 0 240 260">
          <use href="#kf-base" width="240" height="260" />
          <path d="M92 38 Q120 50 148 38 L120 80 Z" fill="#101214" fillOpacity=".92" />
          <path d="M88 36 L120 84 L152 36" stroke="var(--sleeve)" strokeWidth="9" strokeLinejoin="round" fill="none" />
          <path d="M90 42 L120 88 L150 42" stroke="#000" strokeOpacity=".22" strokeWidth="1.5" fill="none" />
          <path d="M86 32 L120 80 L154 32" stroke="#fff" strokeOpacity=".22" strokeWidth="1" fill="none" />
          <circle cx="94" cy="108" r="9.5" fill="#f5f1e6" />
          <circle cx="94" cy="108" r="5.5" fill="var(--sleeve)" />
          <circle cx="94" cy="108" r="2" fill="#f2b705" />
        </symbol>
        <symbol id="kf-back" viewBox="0 0 240 260">
          <use href="#kf-base" width="240" height="260" />
          <path d="M90 38 Q120 56 150 38 Q120 48 90 38 Z" fill="#101214" fillOpacity=".92" />
          <path d="M88 36 Q120 58 152 36" stroke="var(--sleeve)" strokeWidth="8" fill="none" />
          <path d="M90 42 Q120 62 150 42" stroke="#000" strokeOpacity=".22" strokeWidth="1.5" fill="none" />
        </symbol>
      </defs>
    </svg>
  );
}

const TEXT = {
  fontFamily: "var(--font-barlow-condensed), 'Arial Narrow', sans-serif",
  fontWeight: 800,
  fill: "#fff",
  fillOpacity: 0.92,
  textAnchor: "middle" as const,
  style: { filter: "drop-shadow(0 1px 2px rgba(0,0,0,.4))" },
};

/**
 * Maillot dessiné. side : face ou dos ; hanger : sur son cintre (penderie) ;
 * big : grand chiffre (titres en face, numéro au dos) ; name : texte au-dessus du numéro, au dos (surnom, nom du joueur).
 */
export function Jersey({
  colors,
  label,
  side = "face",
  hanger = false,
  big = null,
  name = null,
  className = "",
}: {
  colors: string[];
  label: string;
  side?: "face" | "dos";
  hanger?: boolean;
  big?: string | number | null;
  name?: string | null;
  className?: string;
}) {
  const { body, sleeve, trim } = jerseyParts(colors);
  const style = { "--body": body, "--sleeve": sleeve, "--trim": trim } as React.CSSProperties;
  const top = hanger ? -46 : 0;
  return (
    <svg viewBox={`0 ${top} 240 ${260 - top}`} role="img" aria-label={label} className={className} style={style}>
      {hanger && (
        <>
          <path d="M120 -46 q-11 0 -11 10 q0 7 7 9 l4 2 v12" stroke="#c9ced4" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M120 -13 L40 52 L200 52 Z" fill="none" stroke="#b8bfc7" strokeWidth="4" strokeLinejoin="round" />
        </>
      )}
      <use href={side === "face" ? "#kf-front" : "#kf-back"} width="240" height="260" />
      {side === "dos" && name && (
        <text x="120" y="98" fontSize="19" letterSpacing="2.3" {...TEXT} fontWeight={700}>
          {name.toUpperCase()}
        </text>
      )}
      {big !== null && (
        <text x="120" y={side === "face" ? 196 : 208} fontSize={side === "face" ? 80 : 104} {...TEXT}>
          {big}
        </text>
      )}
    </svg>
  );
}
