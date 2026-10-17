import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/ads/AdSlot";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { FlagBand } from "@/components/ui/FlagBand";
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
      <header className="relative isolate overflow-hidden border-b border-line">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--color-pitch-soft),transparent_65%)]" />
        <div className="container-page grid items-center gap-6 pt-8 pb-10 sm:grid-cols-[1fr_260px] sm:pt-14">
          <div>
            <p className="eyebrow">
              {selection ? <Link href={`/selection/${selection.slug}`} className="hover:text-chalk">{country.name}</Link> : country.name} · {POSITIONS[p.position]}
              {p.active ? " · En activité" : " · Retraité"}
            </p>
            <h1 className="mt-2 font-display text-[48px] leading-[0.95] tracking-wide uppercase sm:text-7xl">{p.name}</h1>
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-chalk/85 sm:text-lg">{p.intro}</p>
            <FlagBand colors={colors} className="mt-6 h-2 max-w-xs" />
          </div>
          <Jersey colors={colors} number={p.shirtNumber} label={`Maillot dessiné de ${p.name}`} className="mx-auto h-48 w-auto sm:h-60" />
        </div>
      </header>

      <div className="container-page mt-8">
        <dl className="grid grid-cols-3 gap-3">
          {[
            { label: "Sélections", value: p.caps ?? "—" },
            { label: "Buts en sélection", value: p.goals ?? "—" },
            { label: "Né le", value: formatDate(p.birthDate), small: true },
          ].map((st) => (
            <div key={st.label} className="rounded-2xl border border-line bg-surface p-4">
              <dt className="eyebrow">{st.label}</dt>
              <dd className={`mt-1 font-display leading-none ${st.small ? "text-xl sm:text-2xl" : "text-4xl sm:text-5xl"}`}>{st.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-2 text-xs text-muted">
          {p.statsAsOf
            ? `Statistiques en équipe nationale A au ${formatDate(p.statsAsOf)} : elles ont pu évoluer depuis.`
            : "Statistiques définitives en équipe nationale A."}
        </p>

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
