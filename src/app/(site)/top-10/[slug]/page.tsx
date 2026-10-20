import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/ads/AdSlot";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PageHero } from "@/components/ui/PageHero";
import { PinButton, PinPreview } from "@/components/ui/PinButton";
import { SourcesList } from "@/components/ui/SourcesList";
import { siteConfig } from "@/lib/config";
import { getCountry } from "@/lib/countries";
import { countryLink } from "@/lib/data/links";
import { getPlayer } from "@/lib/data/players";
import { TOPS, getTop } from "@/lib/data/tops";
import { illustration } from "@/lib/illustrations";
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

export default async function TopPage({ params }: PageProps<"/top-10/[slug]">) {
  const top = getTop((await params).slug);
  if (!top) notFound();
  const path = `/top-10/${top.slug}`;
  const list = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: top.title,
    numberOfItems: top.items.length,
    itemListElement: top.items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(list) }} />
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
        </aside>
      </div>

      <div className="container-page">
        <AdSlot placement="top" />
        <SourcesList sources={top.sources} updatedAt={top.updatedAt} />
      </div>
    </>
  );
}
