import type { Metadata } from "next";
import Link from "next/link";
import { AmazonButton } from "@/components/ui/AmazonButton";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PageHero } from "@/components/ui/PageHero";
import { AMAZON_DISCLOSURE, amazonUrl } from "@/lib/amazon";
import { mostTitled } from "@/lib/data/selections";
import { SHOP } from "@/lib/data/shop";
import { Rail, RailSelection } from "@/components/ui/Vestiaire";
import { illustration } from "@/lib/illustrations";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Boutique supporter : maillots, écharpes, drapeaux, ballons",
  description:
    "L'équipement du supporter du foot africain : maillots des sélections, écharpes, drapeaux, ballons, crampons, buts pliables pour enfants et livres de foot.",
  path: "/boutique",
});

/** Liens vers les guides d'achat utiles à chaque catégorie. */
const GUIDES: Record<string, { href: string; label: string }> = {
  maillots: { href: "/conseils/comment-choisir-sa-taille-de-maillot-de-foot", label: "Comment choisir sa taille de maillot ?" },
  "buts-pliables": { href: "/conseils/quel-but-de-foot-pliable-choisir-pour-un-enfant", label: "Quel but pliable choisir pour un enfant ?" },
  ballons: { href: "/conseils/quel-ballon-de-foot-choisir-selon-l-age", label: "Quel ballon choisir selon l'âge ?" },
  crampons: { href: "/conseils/comment-choisir-ses-crampons-selon-le-terrain", label: "Comment choisir ses crampons ?" },
};

export default function ShopPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Boutique", href: "/boutique" }]} />
      <PageHero
        eyebrow="Boutique supporter"
        title="Équipé pour le match"
        intro="Maillots, écharpes, drapeaux, ballons, crampons, buts pliables et livres : notre sélection pour vivre le foot africain, au stade comme à la maison."
        image={illustration("boutique")}
      >
        <nav aria-label="Catégories" className="no-scrollbar -mx-4 mt-6 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          {SHOP.map((c) => (
            <a key={c.slug} href={`#${c.slug}`} className="tag shrink-0 bg-night/60">
              {c.name}
            </a>
          ))}
        </nav>
      </PageHero>

      <div className="container-page mt-4">
        <p className="rounded border border-line bg-surface px-4 py-3 text-xs text-muted">
          {AMAZON_DISCLOSURE} Les liens ouvrent Amazon.fr : prix, disponibilité et tailles sont ceux affichés par le vendeur.
        </p>

        <div className="mt-10">
          <Rail label="Penderie des maillots">
            {mostTitled(12).map((sel, i) => (
              <div key={sel.slug} className="flex flex-col items-center">
                <RailSelection s={sel} i={i} caption={sel.jersey.label} />
                <AmazonButton href={amazonUrl(sel.jersey)} label="Amazon" className="-mt-1 mb-3 px-4 text-sm" />
              </div>
            ))}
          </Rail>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/boutique/maillots" className="tag">Tous les maillots des sélections →</Link>
            <Link href={GUIDES.maillots.href} className="tag">{GUIDES.maillots.label}</Link>
          </div>
        </div>

        {SHOP.filter((c) => c.slug !== "maillots").map((c) => (
          <section key={c.slug} id={c.slug} aria-labelledby={`titre-${c.slug}`} className="mt-14 scroll-mt-28">
            <h2 id={`titre-${c.slug}`} className="section-title">{c.name}</h2>
            <p className="mt-3 max-w-2xl text-chalk/85">{c.intro}</p>
            {GUIDES[c.slug] && (
              <div className="mt-3 flex flex-wrap gap-2">
                {GUIDES[c.slug] && (
                  <Link href={GUIDES[c.slug].href} className="tag">{GUIDES[c.slug].label}</Link>
                )}
              </div>
            )}
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {c.products.map((p) => (
                <li key={p.name} className="flex flex-col rounded border border-line bg-surface p-4">
                  <h3 className="font-display text-xl tracking-wide uppercase">{p.name}</h3>
                  <p className="mt-1.5 flex-1 text-sm text-muted">{p.note}</p>
                  <AmazonButton href={amazonUrl(p)} label="Voir sur Amazon" className="mt-4 self-start" />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
