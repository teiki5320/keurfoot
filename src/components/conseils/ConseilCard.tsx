/* eslint-disable @next/next/no-img-element -- site statique : images non optimisées par Next.js */
import Link from "next/link";
import { withBase } from "@/lib/config";
import type { Conseil } from "@/lib/conseils/article";
import { CONSEIL_CATEGORIES } from "@/lib/conseils/categories";

export function ConseilCard({ conseil }: { conseil: Conseil }) {
  return (
    <Link
      href={`/conseils/${conseil.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition hover:-translate-y-0.5 hover:border-gold"
    >
      {conseil.image ? (
        <img src={withBase(conseil.image)} alt="" loading="lazy" className="aspect-[3/2] w-full object-cover" />
      ) : (
        <div aria-hidden className="aspect-[3/2] w-full bg-[radial-gradient(ellipse_at_bottom_left,var(--color-pitch-soft),var(--color-surface-2))]" />
      )}
      <div className="flex flex-1 flex-col p-4">
        <p className="eyebrow">{CONSEIL_CATEGORIES[conseil.theme]}</p>
        <h3 className="mt-1.5 text-lg leading-snug font-bold group-hover:text-gold">{conseil.title}</h3>
        <p className="mt-1.5 line-clamp-3 text-sm text-muted">{conseil.resume}</p>
      </div>
    </Link>
  );
}

export function ConseilGrid({ conseils }: { conseils: Conseil[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {conseils.map((c) => (
        <ConseilCard key={c.slug} conseil={c} />
      ))}
    </div>
  );
}
