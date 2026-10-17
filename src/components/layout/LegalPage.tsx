export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <div className="container-page py-10">
      <h1 className="font-display text-4xl tracking-wide uppercase sm:text-5xl">{title}</h1>
      <p className="mt-2 text-sm text-muted">Dernière mise à jour : {updated}</p>
      <div className="prose-text mt-8">{children}</div>
    </div>
  );
}
