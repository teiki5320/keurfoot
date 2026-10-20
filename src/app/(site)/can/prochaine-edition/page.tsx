import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CanCountdown } from "@/components/ui/CanCountdown";
import { todayInParis } from "@/lib/conseils/article";
import { SourcesList } from "@/components/ui/SourcesList";
import { getCountry } from "@/lib/countries";
import { CAN_EDITIONS, NEXT_CAN } from "@/lib/data/can";
import { formatDate } from "@/lib/format";
import { clip, pageMetadata } from "@/lib/metadata";

const hosts = NEXT_CAN.hosts.map((h) => getCountry(h)?.name ?? h);
const hostsText = hosts.length > 1 ? `${hosts.slice(0, -1).join(", ")} et ${hosts.at(-1)}` : hosts[0];
const last = CAN_EDITIONS.at(-1)!;

export const metadata: Metadata = pageMetadata({
  title: `CAN ${NEXT_CAN.year} : pays hôte, dates et format`,
  description: clip(`La prochaine Coupe d'Afrique des nations, la CAN ${NEXT_CAN.year} : ${hostsText}. ${NEXT_CAN.text[0]}`),
  path: "/can/prochaine-edition",
});

export default function NextCanPage() {
  const winner = getCountry(last.winner)?.name;
  return (
    <>
      <Breadcrumb
        items={[
          { name: "CAN", href: "/can" },
          { name: `CAN ${NEXT_CAN.year}`, href: "/can/prochaine-edition" },
        ]}
      />
      <div className="container-page kf-rise pt-6">
        <p className="eyebrow">Coupe d&apos;Afrique des nations</p>
        <h1 className="mt-1.5 font-display text-[80px] leading-[0.85] uppercase sm:text-[120px] lg:text-[160px]">CAN {NEXT_CAN.year}</h1>
        <dl className="mt-6 grid gap-3.5 sm:grid-cols-3">
          {NEXT_CAN.start && (
            <div className="panel p-5">
              <dd className="font-display text-[64px] leading-none text-gold">
                <CanCountdown start={NEXT_CAN.start} built={todayInParis()} />
              </dd>
              <dt className="mt-1.5 text-xs font-medium tracking-[0.1em] text-muted uppercase">Avant le coup d&apos;envoi</dt>
            </div>
          )}
          <div className="panel p-5">
            <dd className="font-display text-[28px] leading-tight uppercase">{hostsText}</dd>
            <dt className="mt-1.5 text-xs font-medium tracking-[0.1em] text-muted uppercase">{hosts.length > 1 ? "Pays hôtes" : "Pays hôte"}</dt>
          </div>
          <div className="panel p-5">
            <dd className="font-display text-[28px] leading-tight uppercase">{NEXT_CAN.dates ?? "À confirmer"}</dd>
            <dt className="mt-1.5 text-xs font-medium tracking-[0.1em] text-muted uppercase">Dates</dt>
          </div>
        </dl>
      </div>

      <div className="container-page mt-10">
        <div className="prose-text">
          {NEXT_CAN.text.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <p>
            Tenant du titre : <strong>{winner}</strong>, vainqueur de la CAN {last.year}
            {last.disputed ? " selon la CAF, un titre contesté devant le Tribunal arbitral du sport" : ""}. Retrouvez{" "}
            <Link href="/can">toutes les éditions et le palmarès complet</Link>.
          </p>
          <p className="text-sm text-muted">Informations vérifiées le {formatDate(NEXT_CAN.checkedOn)} : elles peuvent évoluer d&apos;ici le tournoi.</p>
        </div>
        <SourcesList sources={NEXT_CAN.sources} updatedAt={NEXT_CAN.checkedOn} />
      </div>
    </>
  );
}
