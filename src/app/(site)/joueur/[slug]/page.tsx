import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/ads/AdSlot";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Jersey } from "@/components/ui/Jersey";
import { SourcesList } from "@/components/ui/SourcesList";
import { siteConfig } from "@/lib/config";
import { getCountry } from "@/lib/countries";
import { PLAYERS, POSITIONS, getPlayer } from "@/lib/data/players";
import { getSelection } from "@/lib/data/selections";
import { TOPS } from "@/lib/data/tops";
import { formatDate } from "@/lib/format";
import { jsonLd } from "@/lib/json-ld";
import { clip, pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return PLAYERS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/joueur/[slug]">): Promise<Metadata> {
  const p = getPlayer((await params).slug);
  if (!p) return {};
  return pageMetadata({
    title: `${p.name} : carrière, palmarès et statistiques`,
    description: clip(p.intro),
    path: `/joueur/${p.slug}`,
    type: "profile",
  });
}

export default async function PlayerPage({ params }: PageProps<"/joueur/[slug]">) {
  const p = getPlayer((await params).slug);
  if (!p) notFound();
  const country = getCountry(p.selection)!;
  const selection = getSelection(p.selection);
  const colors = selection?.colors ?? ["#1d2320", "#f2b705"];
  const tops = TOPS.filter((t) => t.items.some((i) => i.playerSlug === p.slug));
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: p.name,
    birthDate: p.birthDate,
    nationality: country.name,
    jobTitle: "Footballeur",
    url: `${siteConfig.url}/joueur/${p.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(person) }} />
      <Breadcrumb
        items={[
          { name: "Joueurs", href: "/joueurs" },
          { name: p.name, href: `/joueur/${p.slug}` },
        ]}
      />
      <div className="container-page kf-rise mt-5 grid items-start gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-10">
        <div>
          <p className="eyebrow">
            {selection ? <Link href={`/selection/${selection.slug}`} className="hover:text-chalk">{country.name}</Link> : country.name} · {POSITIONS[p.position]} ·{" "}
            {p.active ? "En activité" : "Légende"}
          </p>
          <h1 className="mt-1.5 font-display text-[56px] leading-[0.88] text-balance uppercase sm:text-8xl lg:text-[112px]">{p.name}</h1>
          <p className="mt-4 max-w-[560px] text-[17px] leading-relaxed text-soft">{p.intro}</p>
          <dl className="mt-6 border-t border-line">
            {[
              { k: "Sélections", v: p.caps ?? "—" },
              { k: "Buts en sélection", v: p.goals ?? "—" },
              { k: "Né le", v: formatDate(p.birthDate) },
              ...(p.shirtNumber ? [{ k: "Numéro en sélection", v: p.shirtNumber }] : []),
            ].map((f) => (
              <div key={f.k} className="flex items-center justify-between border-b border-line py-3.5">
                <dt className="text-muted">{f.k}</dt>
                <dd className="font-display text-[22px]">{f.v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-2 text-xs text-muted">
            {p.statsAsOf
              ? `Statistiques en équipe nationale A au ${formatDate(p.statsAsOf)} : elles ont pu évoluer depuis.`
              : "Statistiques définitives en équipe nationale A."}
          </p>
        </div>
        <div className="flex flex-col items-center gap-3.5 rounded border border-line bg-gradient-to-b from-surface-2 to-[#15181c] p-7">
          <span className="kf-hang block w-full max-w-[280px]">
            <Jersey
              colors={colors}
              hanger
              side="dos"
              name={p.name.split(" ").pop() ?? p.name}
              big={p.shirtNumber}
              label={`Maillot dessiné de ${p.name}, de dos`}
              className="w-full drop-shadow-[0_22px_20px_rgba(0,0,0,.6)]"
            />
          </span>
          <span className="text-xs font-bold tracking-[0.14em] text-muted uppercase">Maillot dessiné · aucune photo</span>
        </div>
      </div>

      <div className="container-page mt-4">
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <h2 className="section-title">Sa carrière</h2>
            <div className="prose-text mt-5">
              {p.bio.map((b) => (
                <p key={b.slice(0, 24)}>{b}</p>
              ))}
            </div>
            <AdSlot placement="joueur" />
          </div>
          <aside className="space-y-8">
            <section>
              <h2 className="eyebrow">Palmarès</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {p.honours.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span aria-hidden className="text-gold">★</span>
                    {h}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="eyebrow">Clubs</h2>
              <ul className="mt-3 space-y-1.5 text-sm text-chalk/85">
                {p.clubs.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </section>
            {(tops.length > 0 || selection) && (
              <section className="space-y-2">
                {selection && (
                  <Link href={`/selection/${selection.slug}`} className="tag w-full justify-between">
                    La sélection {country.of} <span aria-hidden>→</span>
                  </Link>
                )}
                {tops.map((t) => (
                  <Link key={t.slug} href={`/top-10/${t.slug}`} className="tag w-full justify-between">
                    {t.pinTitle} <span aria-hidden>→</span>
                  </Link>
                ))}
              </section>
            )}
          </aside>
        </div>

        <SourcesList sources={p.sources} updatedAt={p.updatedAt} />
      </div>
    </>
  );
}
