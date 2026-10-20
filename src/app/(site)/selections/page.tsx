import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Jersey } from "@/components/ui/Jersey";
import { siteConfig } from "@/lib/config";
import { getCountry } from "@/lib/countries";
import { CAN_EDITIONS, titlesBadge } from "@/lib/data/can";
import { SELECTIONS, selectionsByRegion } from "@/lib/data/selections";
import { itemListLd, jsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Les sélections africaines : palmarès et histoire",
  description: "Toutes les sélections africaines, région par région : l'histoire, le palmarès en CAN et en Coupe du monde et les légendes de chaque équipe.",
  path: "/selections",
});

export default function SelectionsPage() {
  const last = CAN_EDITIONS.at(-1)!;
  const groups = selectionsByRegion();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(itemListLd("Sélections africaines", SELECTIONS.map((s) => ({ name: getCountry(s.country)!.name, url: `${siteConfig.url}/selection/${s.slug}` })))),
        }}
      />
      <Breadcrumb items={[{ name: "Sélections", href: "/selections" }]} />
      <div className="container-page kf-rise pt-6">
        <h1 className="font-display text-[56px] leading-[0.9] uppercase sm:text-7xl">Les sélections</h1>
        <p className="mt-3 max-w-2xl text-soft">
          {SELECTIONS.length} sélections africaines, région par région : leur histoire, leur palmarès et leurs légendes, chiffres
          vérifiés et sources à l&apos;appui.
        </p>
        <nav aria-label="Régions" className="no-scrollbar -mx-4 mt-6 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          {groups.map((g) => (
            <a key={g.region} href={`#${g.region}`} className="tag shrink-0">
              {g.label} <span className="ml-1.5 text-muted">{g.selections.length}</span>
            </a>
          ))}
        </nav>
        {groups.map((g) => (
          <section key={g.region} id={g.region} aria-labelledby={`titre-${g.region}`} className="mt-10 scroll-mt-28">
            <h2 id={`titre-${g.region}`} className="section-title text-[28px] sm:text-4xl">{g.label}</h2>
            <div className="mt-5 grid gap-3.5 sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
              {g.selections.map((s, i) => {
                const country = getCountry(s.country)!;
                const n = s.canTitles.length;
                return (
                  <Link
                    key={s.slug}
                    href={`/selection/${s.slug}`}
                    className="kf-rise panel grid grid-cols-[96px_1fr] items-center gap-4 p-4 transition-colors hover:border-gold"
                    style={{ animationDelay: `${Math.min(i, 8) * 0.05}s` }}
                  >
                    <Jersey colors={s.colors} big={titlesBadge(s.canTitles)} label={`Maillot dessiné aux couleurs ${country.of}`} className="w-24 drop-shadow-[0_8px_8px_rgba(0,0,0,.5)]" />
                    <span>
                      <span className="block font-display text-[30px] leading-none uppercase">{country.name}</span>
                      {s.nickname && <span className="mt-1 block text-sm text-muted">{s.nickname}</span>}
                      <span className="mt-2 block text-xs font-bold tracking-[0.1em] text-gold uppercase">
                        {n ? `${n} CAN gagnée${n > 1 ? "s" : ""}` : "En quête d'une CAN"} · {s.worldCups.length ? `${s.worldCups.length} Coupe${s.worldCups.length > 1 ? "s" : ""} du monde` : "Jamais en Coupe du monde"}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
        {last.disputed && <p className="mt-4 text-xs text-muted">* Titre de la CAN {last.year} contesté devant le Tribunal arbitral du sport.</p>}
      </div>
    </>
  );
}
