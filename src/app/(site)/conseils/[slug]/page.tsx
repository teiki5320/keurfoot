import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/ads/AdSlot";
import { ConseilGrid } from "@/components/conseils/ConseilCard";
import { AmazonButton } from "@/components/ui/AmazonButton";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { amazonUrl } from "@/lib/amazon";
import { conseilSections, splitAtMiddleSection } from "@/lib/conseils/article";
import { CONSEIL_CATEGORIES } from "@/lib/conseils/categories";
import { siteConfig, withBase } from "@/lib/config";
import { getConseilBySlug, getConseils, getRelatedConseils, renderConseil } from "@/lib/data/conseils";
import { getMaintenance } from "@/lib/data/settings";
import { getCategory } from "@/lib/data/shop";
import { formatDate } from "@/lib/format";
import { jsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return getConseils().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/conseils/[slug]">): Promise<Metadata> {
  const conseil = getConseilBySlug((await params).slug);
  if (!conseil) return {};
  return pageMetadata({
    title: conseil.title,
    description: conseil.description,
    path: `/conseils/${conseil.slug}`,
    type: "article",
    publishedTime: conseil.date,
    image: conseil.image,
    imageAlt: `Illustration : ${conseil.title}`,
  });
}

export default async function ConseilPage({ params }: PageProps<"/conseils/[slug]">) {
  if (getMaintenance().enabled) return null;
  const conseil = getConseilBySlug((await params).slug);
  if (!conseil) notFound();
  const categories = conseil.produits.flatMap((s) => getCategory(s) ?? []);
  const related = getRelatedConseils(conseil);
  const sections = conseilSections(conseil.body);
  const [firstHalf, secondHalf] = splitAtMiddleSection(renderConseil(conseil.body));
  const url = `${siteConfig.url}/conseils/${conseil.slug}`;

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: conseil.title,
    description: conseil.description,
    datePublished: conseil.date,
    dateModified: conseil.date,
    inLanguage: "fr",
    image: `${siteConfig.url}${conseil.image ?? "/brand/keurfoot-partage.jpg"}`,
    author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    url,
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url, logo: `${siteConfig.url}/brand/keurfoot-logo.webp` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(article) }} />
      <Breadcrumb
        items={[
          { name: "Conseils", href: "/conseils" },
          { name: conseil.title, href: `/conseils/${conseil.slug}` },
        ]}
      />
      <article className="container-page max-w-3xl">
        <p className="eyebrow mt-8">
          {CONSEIL_CATEGORIES[conseil.theme]} <span className="text-faint">· <time dateTime={conseil.date}>{formatDate(conseil.date)}</time></span>
        </p>
        <h1 className="mt-3 font-display text-[40px] leading-[0.98] tracking-wide text-balance uppercase sm:text-6xl">{conseil.title}</h1>
        {conseil.image && (
          <figure className="mt-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={withBase(conseil.image)}
              alt={`Illustration de l'article « ${conseil.title} »`}
              width={1200}
              height={800}
              fetchPriority="high"
              className="aspect-[3/2] w-full rounded object-cover"
            />
            <figcaption className="mt-2 text-[11px] text-faint">Illustration originale Keur Foot.</figcaption>
          </figure>
        )}
        <p className="mt-8 rounded border-l-4 border-gold bg-surface p-5 text-[17px] leading-relaxed">
          <span className="sr-only">En bref : </span>
          {conseil.resume}
        </p>
        {sections.length > 2 && (
          <nav aria-label="Sommaire" className="mt-8 text-sm">
            <p className="eyebrow">Sommaire</p>
            <ol className="mt-2 border-b border-line">
              {sections.map((s, i) => (
                <li key={s.id} className="border-t border-line">
                  <a href={`#${s.id}`} className="flex gap-3 py-2.5 hover:text-gold">
                    <span className="text-faint">{i + 1}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className="prose-text mt-8" dangerouslySetInnerHTML={{ __html: firstHalf }} />
        {secondHalf && (
          <>
            {/* Publicité : au milieu du texte, entre deux parties. */}
            <AdSlot placement="article" />
            <div className="prose-text" dangerouslySetInnerHTML={{ __html: secondHalf }} />
          </>
        )}

        {categories.map((c) => (
          <section key={c.slug} className="mt-12" aria-labelledby={`produits-${c.slug}`}>
            <h2 id={`produits-${c.slug}`} className="eyebrow">
              Notre sélection : {c.name.toLowerCase()}
            </h2>
            <ul className="mt-3 space-y-2.5">
              {c.products.map((p) => (
                <li key={p.name} className="flex items-center gap-4 rounded border border-line bg-surface p-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{p.name}</p>
                    <p className="mt-0.5 text-xs text-muted">{p.note}</p>
                  </div>
                  <AmazonButton href={amazonUrl(p)} label="Amazon" className="px-3 py-2 text-xs" />
                </li>
              ))}
            </ul>
            <Link href={c.slug === "maillots" ? "/boutique/maillots" : `/boutique#${c.slug}`} className="tag mt-3">
              Voir dans la boutique →
            </Link>
          </section>
        ))}
      </article>

      {related.length > 0 && (
        <section className="container-page mt-16" aria-labelledby="a-lire-aussi">
          <h2 id="a-lire-aussi" className="section-title">À lire aussi</h2>
          <div className="mt-6">
            <ConseilGrid conseils={related} />
          </div>
        </section>
      )}

      {/* Publicité : en fin de page, loin des boutons Amazon. */}
      <div className="container-page">
        <AdSlot placement="article" />
      </div>
    </>
  );
}
