import { SiteShell } from "@/components/layout/SiteShell";

/** Pages légales : toujours accessibles, y compris pendant la maintenance (obligation légale). */
export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
