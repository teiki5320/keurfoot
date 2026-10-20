import { withBase } from "@/lib/config";

/**
 * En-tête de page : sur-titre, grand titre en capitales, chapeau, et illustration originale en fond si elle existe.
 * Le dégradé garde le texte lisible sur l'illustration.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  image = null,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  image?: string | null;
  children?: React.ReactNode;
}) {
  return (
    <header className="relative isolate overflow-hidden border-b border-line">
      {image && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={withBase(image)} alt="" className="absolute inset-0 -z-20 size-full object-cover opacity-60" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/80 to-night/20" />
        </>
      )}
      {!image && <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--color-pitch-soft),transparent_60%)]" />}
      <div className="container-page pt-10 pb-10 sm:pt-16 sm:pb-14">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-2 max-w-4xl font-display text-[48px] leading-[0.9] uppercase sm:text-7xl">{title}</h1>
        {intro && <div className="mt-4 max-w-2xl text-[16px] leading-relaxed text-chalk/85 sm:text-lg">{intro}</div>}
        {children}
      </div>
    </header>
  );
}
