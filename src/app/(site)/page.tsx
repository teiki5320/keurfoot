import type { Metadata } from "next";
import Link from "next/link";
import { ConseilGrid } from "@/components/conseils/ConseilCard";
import { Card } from "@/components/ui/Card";
import { Carousel } from "@/components/ui/Carousel";
import { FlagBand } from "@/components/ui/FlagBand";
import { Jersey } from "@/components/ui/Jersey";
import { siteConfig, withBase } from "@/lib/config";
import { getCountry } from "@/lib/countries";
import { CAN_EDITIONS, NEXT_CAN, canRanking } from "@/lib/data/can";
import { getConseils } from "@/lib/data/conseils";
import { PLAYERS } from "@/lib/data/players";
import { SELECTIONS, getSelection } from "@/lib/data/selections";
import { SHOP } from "@/lib/data/shop";
import { TOPS } from "@/lib/data/tops";
import { plural } from "@/lib/format";
import { illustration } from "@/lib/illustrations";
import { jsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
});

function SectionHead({ title, href, link }: { title: string; href: string; link: string }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <h2 className="section-title">{title}</h2>
      <Link href={href} className="shrink-0 text-sm font-semibold text-gold hover:text-chalk">
        {link} →
      </Link>
    </div>
  );
}

export default function HomePage() {
  const hero = illustration("accueil");
  const last = CAN_EDITIONS.at(-1)!;
  const ranking = canRanking().slice(0, 5);
  const hosts = NEXT_CAN.hosts.map((h) => getCountry(h)?.name).join(", ");
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "fr",
    description: siteConfig.description,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(website) }} />

      {/* Héros */}
      <section className="relative isolate overflow-hidden border-b border-line">
        {hero && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={withBase(hero)} alt="" fetchPriority="high" className="absolute inset-0 -z-20 size-full object-cover opacity-55" />
            <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/70 to-night/10" />
          </>
        )}
        <div className="container-page flex min-h-[78svh] flex-col justify-end pt-24 pb-10 sm:min-h-[70vh] sm:pb-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={withBase("/brand/keurfoot-logo.webp")} alt="" width={480} height={384} className="w-40 sm:w-56" />
          <h1 className="mt-4 max-w-3xl font-display text-[46px] leading-[0.92] tracking-wide uppercase sm:text-7xl">
            Le football africain, <span className="text-gold">de la CAN à la diaspora</span>
          </h1>
          <p className="mt-4 max-w-xl text-[16px] text-chalk/85 sm:text-lg">
            Sélections, légendes, palmarès de la CAN, classements et équipement de supporter : tout le foot du continent, vérifié et
            sourcé.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link href="/selections" className="btn-primary">Les sélections</Link>
            <Link href="/top-10" className="btn-secondary bg-night/50">Les Top 10</Link>
          </div>
        </div>
      </section>

      {/* Sélections */}
      <section className="container-page mt-12">
        <SectionHead title="Les sélections" href="/selections" link="Toutes" />
        <div className="mt-5">
          <Carousel label="Sélections">
            {SELECTIONS.map((s) => {
              const country = getCountry(s.country)!;
              return (
                <Card
                  key={s.slug}
                  href={`/selection/${s.slug}`}
                  className="w-[62vw] max-w-[260px]"
                  eyebrow={s.nickname ?? undefined}
                  title={country.name}
                  visual={
                    <>
                      <Jersey colors={s.colors} label={`Maillot dessiné aux couleurs ${country.of}`} className="h-3/4 w-auto" />
                      <FlagBand colors={s.colors} className="absolute right-0 bottom-0 left-0 h-1.5 rounded-none" />
                    </>
                  }
                  text={plural(s.canTitles.length, "CAN gagnée", "CAN gagnées", "En quête d'une première CAN")}
                />
              );
            })}
          </Carousel>
        </div>
      </section>

      {/* Top 10 */}
      <section className="container-page mt-14">
        <SectionHead title="Les Top 10" href="/top-10" link="Tous" />
        <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {TOPS.map((t) => {
            const img = illustration(`top-${t.slug}`);
            return (
              <Card
                key={t.slug}
                href={`/top-10/${t.slug}`}
                eyebrow={t.kind === "classement" ? "Classement chiffré" : "Notre sélection"}
                title={t.pinTitle}
                visual={
                  img ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={withBase(img)} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />
                  ) : undefined
                }
              />
            );
          })}
        </div>
      </section>

      {/* CAN */}
      <section className="container-page mt-14 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-surface p-5">
          <p className="eyebrow">La CAN en chiffres</p>
          <h2 className="mt-1 font-display text-3xl tracking-wide uppercase">Les pays les plus titrés</h2>
          <ol className="mt-4 divide-y divide-line">
            {ranking.map((r) => (
              <li key={r.country} className="flex items-center gap-3 py-2.5">
                <span className="w-6 font-display text-xl text-gold">{r.rank}</span>
                <span className="flex-1">{getCountry(r.country)?.name}</span>
                <span className="font-display text-2xl">{r.years.length}</span>
              </li>
            ))}
          </ol>
          <p className="mt-3 text-xs text-muted">
            {CAN_EDITIONS.length} éditions de 1957 à {last.year}.
            {last.note?.startsWith("Titre contesté") && ` Le titre ${last.year}, attribué par la CAF, est contesté devant le Tribunal arbitral du sport.`}
          </p>
          <Link href="/can" className="tag mt-4">Toutes les éditions →</Link>
        </div>
        <Link href="/can/prochaine-edition" className="group relative isolate flex flex-col justify-end overflow-hidden rounded-2xl border border-line p-5 hover:border-gold">
          {illustration("can") && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={withBase(illustration("can")!)} alt="" loading="lazy" className="absolute inset-0 -z-20 size-full object-cover opacity-60" />
              <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/70 to-transparent" />
            </>
          )}
          <p className="eyebrow mt-24">Prochaine édition</p>
          <h2 className="mt-1 font-display text-5xl tracking-wide uppercase group-hover:text-gold">CAN {NEXT_CAN.year}</h2>
          <p className="mt-2 text-chalk/85">{hosts}</p>
          {NEXT_CAN.dates && <p className="text-sm text-muted">{NEXT_CAN.dates}</p>}
        </Link>
      </section>

      {/* Joueurs */}
      <section className="container-page mt-14">
        <SectionHead title="Les joueurs" href="/joueurs" link="Tous" />
        <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {PLAYERS.map((p) => (
            <Card
              key={p.slug}
              href={`/joueur/${p.slug}`}
              eyebrow={getCountry(p.selection)?.name}
              title={p.name}
              visual={<Jersey colors={getSelection(p.selection)?.colors ?? ["#1d2320", "#f2b705"]} number={p.shirtNumber} label={`Maillot dessiné de ${p.name}`} className="h-3/4 w-auto" />}
            />
          ))}
        </div>
      </section>

      {/* Boutique */}
      <section className="container-page mt-14">
        <SectionHead title="La boutique supporter" href="/boutique" link="Voir" />
        <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap">
          {SHOP.map((c) => (
            <Link key={c.slug} href={c.slug === "maillots" ? "/boutique/maillots" : `/boutique#${c.slug}`} className="tag shrink-0">
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Conseils */}
      <section className="container-page mt-14">
        <SectionHead title="Conseils" href="/conseils" link="Tous" />
        <div className="mt-5">
          <ConseilGrid conseils={getConseils().slice(0, 3)} />
        </div>
      </section>
    </>
  );
}
