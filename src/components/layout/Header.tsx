import Link from "next/link";
import { siteConfig, withBase } from "@/lib/config";
import { NAV } from "./nav";

/**
 * En-tête collant : logo, puis rubriques en ligne sur grand écran.
 * Sur mobile, les rubriques forment une rangée de puces qu'on fait défiler au doigt, sous le logo.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-night/90 backdrop-blur">
      <div className="container-page flex h-14 items-center gap-6 md:h-16">
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label={`${siteConfig.name}, accueil`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={withBase("/brand/keurfoot-embleme.webp")} alt="" width={40} height={40} className="size-9 md:size-10" />
          <span className="font-display text-2xl tracking-wide uppercase md:text-[28px]">
            Keur<span className="text-gold">Foot</span>
          </span>
        </Link>
        <nav aria-label="Menu principal" className="ml-auto hidden gap-6 text-sm font-semibold tracking-wide uppercase md:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="text-chalk/85 hover:text-gold">
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
      <nav aria-label="Menu mobile" className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-2.5 md:hidden">
        {NAV.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className="shrink-0 rounded-full border border-line bg-white/5 px-3.5 py-1.5 text-[13px] font-semibold text-chalk/90 hover:border-gold hover:text-gold"
          >
            {n.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
