/**
 * Rangée de cartes qu'on fait défiler au doigt (aimantation CSS, sans script).
 * Sur grand écran, la rangée reste défilable ; chaque enfant direct est une carte.
 */
export function Carousel({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div
      role="region"
      aria-label={label}
      tabIndex={0}
      className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-2 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:-mx-8 lg:scroll-px-8 lg:px-8 [&>*]:shrink-0 [&>*]:snap-start"
    >
      {children}
    </div>
  );
}
