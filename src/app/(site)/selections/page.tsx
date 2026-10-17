import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Card } from "@/components/ui/Card";
import { FlagBand } from "@/components/ui/FlagBand";
import { Jersey } from "@/components/ui/Jersey";
import { PageHero } from "@/components/ui/PageHero";
import { siteConfig } from "@/lib/config";
import { getCountry } from "@/lib/countries";
import { SELECTIONS } from "@/lib/data/selections";
import { plural } from "@/lib/format";
import { itemListLd, jsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Les sélections africaines : palmarès et histoire",
  description: "Sénégal, Côte d'Ivoire, Cameroun, Maroc, Algérie, Mali : l'histoire, le palmarès en CAN et en Coupe du monde et les légendes de chaque sélection.",
  path: "/selections",
});

export default function SelectionsPage() {
  const list = [...SELECTIONS].sort((a, b) => getCountry(a.country)!.name.localeCompare(getCountry(b.country)!.name, "fr"));
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(itemListLd("Sélections africaines", list.map((s) => ({ name: getCountry(s.country)!.name, url: `${siteConfig.url}/selection/${s.slug}` })))),
        }}
      />
      <Breadcrumb items={[{ name: "Sélections", href: "/selections" }]} />
      <PageHero
        eyebrow="Équipes nationales"
        title="Les sélections"
        intro="Lions, Éléphants, Fennecs, Aigles : l'histoire, le palmarès et les légendes des grandes sélections africaines, chiffres vérifiés et sources à l'appui."
      />
      <div className="container-page mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {list.map((s) => {
          const country = getCountry(s.country)!;
          return (
            <Card
              key={s.slug}
              href={`/selection/${s.slug}`}
              eyebrow={s.nickname ?? undefined}
              title={country.name}
              visual={
                <>
                  <Jersey colors={s.colors} label={`Maillot dessiné aux couleurs ${country.of}`} className="h-3/4 w-auto" />
                  <FlagBand colors={s.colors} className="absolute right-0 bottom-0 left-0 h-1.5 rounded-none" />
                </>
              }
              text={`${plural(s.canTitles.length, "CAN gagnée", "CAN gagnées", "Aucune CAN gagnée")} · ${plural(s.worldCups.length, "Coupe du monde", "Coupes du monde", "aucune Coupe du monde")}`}
            />
          );
        })}
      </div>
    </>
  );
}
