import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/ads/AdSlot";
import { AmazonButton, AmazonNote } from "@/components/ui/AmazonButton";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { EncadreProduit, produitSelection, titreProduitSelection } from "@/components/ui/EncadreProduit";
import { PageHero } from "@/components/ui/PageHero";
import { PinButton, PinPreview } from "@/components/ui/PinButton";
import { Rail, RailSelection } from "@/components/ui/Vestiaire";
import { SourcesList } from "@/components/ui/SourcesList";
import { amazonUrl } from "@/lib/amazon";
import { siteConfig } from "@/lib/config";
import { getCountry } from "@/lib/countries";
import { countryLink } from "@/lib/data/links";
import { getPlayer } from "@/lib/data/players";
import { getSelection, mostTitled } from "@/lib/data/selections";
import { getCategory } from "@/lib/data/shop";
import { TOPS, getTop, relatedTops } from "@/lib/data/tops";
import { illustration, imageAllegee } from "@/lib/illustrations";
import { jsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";
import { pinPath } from "@/lib/pinterest";
import { formatDate } from "@/lib/format";

export function generateStaticParams() {
  return TOPS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/top-10/[slug]">): Promise<Metadata> {
  const top = getTop((await params).slug);
  if (!top) return {};
  return pageMetadata({
    title: top.title,
    description: top.description,
    path: `/top-10/${top.slug}`,
    type: "article",
    image: pinPath(top.slug),
    imageAlt: top.pinTitle,
  });
}

/** Livre proposé par les Top 10 qui ne parlent pas d'un seul pays (nom exact d'un produit de la catégorie « livres »). */
const LIVRE_DU_TOP: Record<string, string> = {
  "meilleurs-buteurs-can": "Livres sur l'histoire de la CAN",
  "joueurs-africains-de-l-annee": "Livres sur le football africain",
  "exploits-africains-coupe-du-monde": "Livres sur le football africain",
};

/** Top 10 des pays les plus titrés : penderie des 3 maillots les plus titrés (3 produits au plus par page). */
const TOP_PENDERIE = "pays-les-plus-titres-can";

export default async function TopPage({ params }: PageProps<"/top-10/[slug]">) {
  const top = getTop((await params).slug);
  if (!top) notFound();
  const path = `/top-10/${top.slug}`;
  // Un seul encadré produit par Top 10, en colonne de droite (après la liste sur téléphone), loin des annonces.
  const selection = top.country ? getSelection(top.country) : undefined;
  const livre = getCategory("livres")?.products.find((p) => p.name === LIVRE_DU_TOP[top.slug]);
  const list = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: top.title,
    numberOfItems: top.items.length,
    itemListElement: top.items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name })),
  };

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: top.title,
    description: top.description,
    dateModified: top.updatedAt,
    inLanguage: "fr",
    image: `${siteConfig.url}${pinPath(top.slug)}`,
    author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    url: `${siteConfig.url}${path}`,
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url, logo: `${siteConfig.url}/brand/keurfoot-logo.webp` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd([article, list]) }} />
      <Breadcrumb
        items={[
          { name: "Top 10", href: "/top-10" },
          { name: top.pinTitle, href: path },
        ]}
      />
      <PageHero
        eyebrow={top.kind === "classement" ? "Classement chiffré" : "Notre sélection"}
        title={top.title}
        intro={top.intro[0]}
        image={illustration(`top-${top.slug}`)}
      />

      <div className="container-page mt-10 grid gap-12 lg:grid-cols-[1fr_300px]">
        <div>
          <div className="prose-text">
            {top.intro.slice(1).map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <p className="mt-2 rounded border border-line bg-surface p-4 text-sm text-chalk/80">
            <strong className="text-gold">{top.kind === "classement" ? "Méthode : " : "Nos critères : "}</strong>
            {top.criteria}
            {top.statsAsOf && ` Sélections et buts en équipe nationale au ${formatDate(top.statsAsOf)}.`}
          </p>

          <ol className="mt-8 space-y-3">
            {top.items.map((it, i) => {
              const player = it.playerSlug ? getPlayer(it.playerSlug) : undefined;
              const country = it.country ? getCountry(it.country) : undefined;
              const countryHref = it.country ? countryLink(it.country) : null;
              return (
                <li key={it.name}>
                  {i === 5 && <AdSlot placement="top" />}
                  <article className="flex gap-4 rounded border border-line bg-surface p-4 sm:p-5">
                    <p className="w-12 shrink-0 font-display text-5xl leading-none text-gold sm:w-16 sm:text-6xl">
                      <span className="sr-only">Place </span>
                      {it.rank}
                    </p>
                    <div className="min-w-0">
                      <h2 className="font-display text-2xl leading-tight tracking-wide uppercase sm:text-3xl">
                        {player ? <Link href={`/joueur/${player.slug}`} className="hover:text-gold">{it.name}</Link> : it.name}
                      </h2>
                      <p className="mt-1 text-sm text-muted">
                        {country && (countryHref ? <Link href={countryHref} className="hover:text-gold">{country.name}</Link> : country.name)}
                        {country && it.stat && " · "}
                        {it.stat && <span className="font-semibold text-chalk">{it.stat}</span>}
                      </p>
                      <p className="mt-2 text-[15px] leading-relaxed text-chalk/85">{it.text}</p>
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>

          {top.slug === TOP_PENDERIE && (
            <section aria-labelledby="penderie-titres" className="mt-12">
              <h2 id="penderie-titres" className="section-title text-[28px] sm:text-4xl">Les maillots des plus titrés</h2>
              <div className="mt-5">
                <Rail label="Maillots des sélections les plus titrées">
                  {mostTitled(3).map((sel, i) => (
                    <div key={sel.slug} className="flex flex-col items-center">
                      <RailSelection s={sel} i={i} caption={sel.jersey.label} />
                      <AmazonButton href={amazonUrl(sel.jersey, "top")} produit={sel.jersey.label} icone={false} className="-mt-1 mb-3 px-3 text-[13px]" />
                    </div>
                  ))}
                </Rail>
              </div>
              <AmazonNote className="mt-3 text-xs" />
              <p className="mt-1 text-xs text-muted">Maillots dessinés par Keur Foot aux couleurs des drapeaux, pas les maillots officiels.</p>
              <Link href="/boutique/maillots" className="tag mt-4">Tous les maillots des sélections →</Link>
            </section>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="eyebrow">À épingler</p>
          <div className="mt-3 max-w-[280px]">
            <PinPreview slug={top.slug} alt={`Épingle Pinterest : ${top.pinTitle}`} />
          </div>
          <div className="mt-4">
            <PinButton slug={top.slug} path={path} description={`${top.title} — ${siteConfig.name}`} />
          </div>
          <Link href="/top-10" className="tag mt-6">Tous les Top 10 →</Link>
          {selection && (
            <EncadreProduit surtitre={titreProduitSelection(selection)} produits={[produitSelection(selection)]} emplacement="top" className="mt-8">
              <Link href={`/selection/${selection.slug}`} className="mt-3 inline-flex min-h-11 items-center text-xs text-gold underline underline-offset-2">
                La fiche de la sélection
              </Link>
            </EncadreProduit>
          )}
          {livre && <EncadreProduit surtitre="À lire" produits={[livre]} emplacement="top" className="mt-8" />}
        </aside>
      </div>

      <section aria-labelledby="voir-aussi" className="container-page mt-14">
        <h2 id="voir-aussi" className="section-title text-[28px] sm:text-4xl">Voir aussi</h2>
        <div className="mt-5 grid gap-3.5 sm:grid-cols-3">
          {relatedTops(top.slug).map((t) => {
            const img = illustration(`top-${t.slug}`);
            return (
              <Link key={t.slug} href={`/top-10/${t.slug}`} className="panel overflow-hidden transition-colors hover:border-gold">
                {img && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img {...imageAllegee(img, "(min-width: 640px) 30vw, 100vw")} alt="" loading="lazy" className="block aspect-[4/3] w-full object-cover" />
                )}
                <span className="block px-4 py-4">
                  <span className="eyebrow block text-[11px]">{t.kind === "classement" ? "Classement chiffré" : "Notre sélection"}</span>
                  <span className="mt-1.5 block font-display text-2xl leading-[1.05] uppercase">{t.title}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="container-page">
        <AdSlot placement="top" />
        <SourcesList sources={top.sources} updatedAt={top.updatedAt} />
      </div>
    </>
  );
}
