import type { Metadata } from "next";
import Link from "next/link";
import { ConseilGrid } from "@/components/conseils/ConseilCard";
import { CanCountdown } from "@/components/ui/CanCountdown";
import { Rail, RailSelection, ScoreBoard } from "@/components/ui/Vestiaire";
import { todayInParis } from "@/lib/conseils/article";
import { siteConfig, withBase } from "@/lib/config";
import { getCountry } from "@/lib/countries";
import { CAN_EDITIONS, NEXT_CAN } from "@/lib/data/can";
import { getConseils } from "@/lib/data/conseils";
import { SELECTIONS, mostTitled } from "@/lib/data/selections";
import { SHOP } from "@/lib/data/shop";
import { illustration } from "@/lib/illustrations";
import { jsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
});

/** Grand lien de rubrique, plaque d'acier qui s'allume en or au survol. */
function Plate({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="flex items-center justify-between rounded border border-line px-5 py-4 font-display text-xl font-bold tracking-[0.06em] uppercase transition-colors hover:border-gold hover:text-gold">
      {children} <span aria-hidden>→</span>
    </Link>
  );
}

export default function HomePage() {
  const last = CAN_EDITIONS.at(-1)!;
  const hosts = NEXT_CAN.hosts.map((h) => getCountry(h)?.name).join(", ");
  const can = illustration("can");
  const website = { "@context": "https://schema.org", "@type": "WebSite", name: siteConfig.name, url: siteConfig.url, inLanguage: "fr", description: siteConfig.description };

  return (
    <div className="container-page kf-rise pt-8 lg:pt-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(website) }} />

      <div className="flex flex-wrap items-end justify-between gap-6">
        <h1 className="max-w-[760px] font-display text-[46px] leading-[0.9] tracking-[-0.01em] text-pretty uppercase sm:text-7xl lg:text-8xl">
          Le football africain, <br className="hidden sm:block" />
          <span className="text-gold">de la CAN aux légendes</span>
        </h1>
        <p className="max-w-[320px] text-base leading-relaxed text-[#b4bac1]">
          Sélections, légendes, palmarès et équipement de supporter. Vérifié et sourcé. Décroche un maillot pour commencer.
        </p>
      </div>

      {/* Penderie : un maillot par sélection, nombre de CAN gagnées sur la poitrine. */}
      <div className="mt-11">
        <Rail label="Penderie des sélections">
          {mostTitled(12).map((s, i) => (
            <RailSelection key={s.slug} s={s} i={i} />
          ))}
        </Rail>
        <Link href="/selections" className="tag mt-4">Les {SELECTIONS.length} sélections →</Link>
        {last.disputed && <p className="mt-3 text-xs text-muted">* Le titre de la CAN {last.year}, attribué au Maroc par la CAF, est contesté devant le Tribunal arbitral du sport.</p>}
      </div>

      {/* Tableau d'ardoise et CAN 2027 */}
      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <ScoreBoard title="Tableau · pays les plus titrés">
          {CAN_EDITIONS.length} éditions, 1957–{last.year}.{last.disputed && ` Titre ${last.year} contesté devant le TAS.`}{" "}
          <Link href="/can" className="underline underline-offset-2 hover:text-gold">Toutes les éditions</Link>
        </ScoreBoard>
        <div className="flex flex-col gap-3.5">
          <Link href="/can/prochaine-edition" className="group relative flex min-h-[220px] flex-1 flex-col justify-end overflow-hidden rounded border border-line p-6 hover:border-gold">
            {can && (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={withBase(can)} alt="" loading="lazy" className="absolute inset-0 size-full object-cover opacity-55" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night from-10% to-transparent to-70%" />
              </>
            )}
            <div className="relative">
              <p className="eyebrow">Prochaine édition</p>
              <p className="font-display text-[64px] leading-[0.9] group-hover:text-gold">CAN {NEXT_CAN.year}</p>
              <p className="text-sm text-soft">
                {hosts}
                {NEXT_CAN.start && (
                  <>
                    {" · "}
                    <CanCountdown start={NEXT_CAN.start} built={todayInParis()} />
                  </>
                )}
              </p>
            </div>
          </Link>
          <Plate href="/top-10">Les Top 10</Plate>
          <Plate href="/joueurs">Les légendes</Plate>
        </div>
      </div>

      {/* Boutique et conseils */}
      <section className="mt-14">
        <div className="flex items-end justify-between gap-4">
          <h2 className="section-title">La boutique</h2>
          <Link href="/boutique" className="shrink-0 font-display text-lg font-bold tracking-[0.06em] text-gold uppercase hover:text-chalk">Voir →</Link>
        </div>
        <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap">
          {SHOP.map((c) => (
            <Link key={c.slug} href={c.slug === "maillots" ? "/boutique/maillots" : `/boutique#${c.slug}`} className="tag shrink-0">
              {c.name}
            </Link>
          ))}
        </div>
      </section>
      <section className="mt-14">
        <div className="flex items-end justify-between gap-4">
          <h2 className="section-title">Conseils</h2>
          <Link href="/conseils" className="shrink-0 font-display text-lg font-bold tracking-[0.06em] text-gold uppercase hover:text-chalk">Tous →</Link>
        </div>
        <div className="mt-5">
          <ConseilGrid conseils={getConseils().slice(0, 3)} />
        </div>
      </section>
    </div>
  );
}
