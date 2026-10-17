import Link from "next/link";

/** Carte cliquable : visuel en haut, sur-titre, titre en capitales, texte court. Bordure or au survol. */
export function Card({
  href,
  visual,
  eyebrow,
  title,
  text,
  className = "",
}: {
  href: string;
  visual?: React.ReactNode;
  eyebrow?: string;
  title: string;
  text?: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition hover:-translate-y-0.5 hover:border-gold ${className}`}
    >
      {visual && <div className="relative flex aspect-[4/3] items-center justify-center bg-surface-2">{visual}</div>}
      <div className="flex flex-1 flex-col p-4">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h3 className="mt-1 font-display text-2xl leading-tight tracking-wide uppercase group-hover:text-gold">{title}</h3>
        {text && <div className="mt-1.5 text-sm text-muted">{text}</div>}
      </div>
    </Link>
  );
}
