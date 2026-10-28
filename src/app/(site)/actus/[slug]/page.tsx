import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleVue, type AutreActu } from "@/components/actus/ArticleVue";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { articlesConstruits, fichesParTag, getArticle, slugsConstruits } from "@/lib/articles";
import { siteConfig } from "@/lib/config";
import { getMaintenance } from "@/lib/data/settings";
import { jsonLd } from "@/lib/json-ld";
import { clip, pageMetadata } from "@/lib/metadata";
import { lienActu, liensFiches } from "@/lib/veille";

/** Seules les pages construites existent ; une adresse inconnue donne la page 404. */
export const dynamicParams = false;

/** Un article par actu de la veille qui en a un (téléchargés par scripts/articles.mts juste avant le build). */
export function generateStaticParams() {
  const slugs = slugsConstruits();
  // Veille muette : une adresse témoin (page 404) pour que l'export statique accepte la route sans article.
  return slugs.length > 0 ? slugs.map((slug) => ({ slug })) : [{ slug: "aucun-article" }];
}

export async function generateMetadata({ params }: PageProps<"/actus/[slug]">): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return { robots: { index: false } };
  return pageMetadata({
    title: article.titre,
    description: clip(article.chapo),
    path: `/actus/${article.slug}`,
    type: "article",
    publishedTime: article.publie_le,
    image: article.image.url,
    imageAlt: article.image.alt,
  });
}

export default async function ArticleActuPage({ params }: PageProps<"/actus/[slug]">) {
  if (getMaintenance().enabled) return null;
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const construits = slugsConstruits();
  const autres: AutreActu[] = articlesConstruits()
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3)
    .map((a) => ({ id: a.id, titre: a.titre, source_nom: a.source_nom, publie_le: a.publie_le, image: a.image, lien: lienActu(a, construits) }));
  const url = `${siteConfig.url}/actus/${article.slug}`;

  const donnees = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.titre,
    description: article.chapo,
    datePublished: article.publie_le,
    dateModified: article.redige_le,
    inLanguage: "fr",
    image: [article.image.url],
    url,
    mainEntityOfPage: url,
    wordCount: article.mots,
    author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url, logo: { "@type": "ImageObject", url: `${siteConfig.url}/brand/keurfoot-logo.webp` } },
    isBasedOn: article.source_url,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(donnees) }} />
      <Breadcrumb
        items={[
          { name: "Actus", href: "/actus" },
          { name: article.titre, href: `/actus/${article.slug}` },
        ]}
      />
      <ArticleVue article={article} fiches={liensFiches(article.tags, fichesParTag())} autres={autres} />
    </>
  );
}
