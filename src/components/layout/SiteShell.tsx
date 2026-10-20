import Link from "next/link";
import { CanCountdown } from "@/components/ui/CanCountdown";
import { JerseyDefs } from "@/components/ui/Jersey";
import { todayInParis } from "@/lib/conseils/article";
import { siteConfig, withBase } from "@/lib/config";
import { getCountry } from "@/lib/countries";
import { NEXT_CAN } from "@/lib/data/can";
import { Footer } from "./Footer";
import { Lockers } from "./Lockers";

function Brand() {
  return (
    <Link href="/" className="flex items-center gap-2.5 px-1.5 py-1" aria-label={`${siteConfig.name}, accueil`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={withBase("/brand/keurfoot-embleme.webp")} alt="" width={34} height={34} className="size-[34px]" />
      <span className="font-display text-xl tracking-[0.06em] uppercase">Keur Foot</span>
    </Link>
  );
}

/**
 * Coquille « Vestiaire » : casiers à gauche sur grand écran (colonne fixe de 220 px),
 * barre du haut avec une rangée de casiers sur mobile ; pied de page sous le contenu.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  const hosts = NEXT_CAN.hosts.map((h) => getCountry(h)?.name).join(", ");
  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[220px_minmax(0,1fr)]">
      <JerseyDefs />
      <aside className="sticky top-0 hidden h-dvh flex-col gap-4 border-r border-[#24282d] bg-gradient-to-r from-[#15181c] to-[#101214] px-3.5 py-5 lg:flex">
        <Brand />
        <p className="px-1.5 text-[10px] font-semibold tracking-[0.2em] text-faint uppercase">Vestiaire · rangée A</p>
        <Lockers variant="colonne" />
        {NEXT_CAN.start && (
          <Link href="/can/prochaine-edition" className="mt-auto rounded-[3px] border border-dashed border-[#363c43] p-3 text-xs leading-relaxed text-muted hover:border-gold">
            <span aria-hidden className="kf-blink text-gold">●</span> CAN {NEXT_CAN.year} · <CanCountdown start={NEXT_CAN.start} built={todayInParis()} />
            <br />
            {hosts}
          </Link>
        )}
      </aside>
      <div className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-50 border-b border-line bg-[#101214]/95 backdrop-blur lg:hidden">
          <div className="container-page flex h-14 items-center justify-between">
            <Brand />
            {NEXT_CAN.start && (
              <Link href="/can/prochaine-edition" className="text-xs text-muted">
                <span aria-hidden className="kf-blink text-gold">●</span> CAN {NEXT_CAN.year} · <CanCountdown start={NEXT_CAN.start} built={todayInParis()} />
              </Link>
            )}
          </div>
          <div className="container-page">
            <Lockers variant="rangee" />
          </div>
        </header>
        <main id="contenu" className="flex-1 pb-10">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
