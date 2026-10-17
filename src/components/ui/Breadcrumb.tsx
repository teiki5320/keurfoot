import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { breadcrumbLd, jsonLd } from "@/lib/json-ld";

/** Fil d'Ariane visible (le dernier élément est la page courante) et sa version pour Google. */
export function Breadcrumb({ items }: { items: Array<{ name: string; href: string }> }) {
  const all = [{ name: "Accueil", href: "/" }, ...items];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(breadcrumbLd(all.map((i) => ({ name: i.name, url: `${siteConfig.url}${i.href === "/" ? "" : i.href}` })))),
        }}
      />
      <nav aria-label="Fil d'Ariane" className="container-page pt-5 text-[13px] text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          {all.map((i, n) => (
            <li key={i.href} className="flex items-center gap-1.5">
              {n > 0 && <span aria-hidden>›</span>}
              {n === all.length - 1 ? (
                <span aria-current="page" className="text-chalk/80">{i.name}</span>
              ) : (
                <Link href={i.href} className="hover:text-gold">{i.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
