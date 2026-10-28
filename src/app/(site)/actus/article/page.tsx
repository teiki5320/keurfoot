import type { Metadata } from "next";
import { ArticleSecours } from "@/components/actus/ArticleSecours";
import { fichesParTag, slugsConstruits } from "@/lib/articles";
import { pageMetadata } from "@/lib/metadata";

/** Page de secours : jamais indexée, absente du sitemap. */
export const metadata: Metadata = pageMetadata({
  title: "Article",
  description: "Article complet d'une actu du foot africain.",
  path: "/actus/article",
  noindex: true,
});

/**
 * Page de secours (/actus/article?id=<id>) : affiche dans le navigateur l'article d'une actu publiée
 * après la dernière construction du site (il n'a pas encore sa page /actus/<slug>).
 */
export default function ArticleSecoursPage() {
  return <ArticleSecours construits={slugsConstruits()} fiches={fichesParTag()} />;
}
