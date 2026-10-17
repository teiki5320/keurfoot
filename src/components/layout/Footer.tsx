import Link from "next/link";
import { CookieSettingsLink } from "@/components/ads/CookieSettingsLink";
import { AMAZON_DISCLOSURE } from "@/lib/amazon";
import { siteConfig, withBase } from "@/lib/config";
import { NAV } from "./nav";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-black/30">
      <div className="container-page grid gap-10 py-12 text-sm sm:grid-cols-3">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={withBase("/brand/keurfoot-logo.webp")}
            alt={`${siteConfig.name}, le football africain`}
            width={480}
            height={384}
            loading="lazy"
            className="w-44"
          />
          <p className="mt-3 max-w-xs text-muted">{siteConfig.tagline}.</p>
        </div>
        <nav aria-label="Rubriques" className="flex flex-col gap-2.5">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="font-display text-xl tracking-wide uppercase hover:text-gold">
              {n.label}
            </Link>
          ))}
        </nav>
        <nav aria-label="Informations légales" className="flex flex-col gap-2 text-muted">
          <Link href="/mentions-legales" className="hover:text-chalk">Mentions légales</Link>
          <Link href="/confidentialite" className="hover:text-chalk">Confidentialité</Link>
          <Link href="/conditions" className="hover:text-chalk">Conditions d&apos;utilisation</Link>
          <CookieSettingsLink className="hover:text-chalk" />
          <a href={`mailto:${siteConfig.contactEmail}`} className="hover:text-chalk">{siteConfig.contactEmail}</a>
        </nav>
      </div>
      <div className="container-page space-y-2 border-t border-line py-5 text-[11px] leading-relaxed text-faint">
        <p>{AMAZON_DISCLOSURE}</p>
        <p>
          Keur Foot n&apos;est lié à aucune fédération, ni à la CAF, ni à la FIFA. Les noms des sélections et des compétitions sont
          cités à titre d&apos;information.
        </p>
        <p>
          Un site{" "}
          <a href="https://toakeur.com" className="font-semibold text-muted hover:text-chalk">TOA KEUR</a>
        </p>
      </div>
    </footer>
  );
}
