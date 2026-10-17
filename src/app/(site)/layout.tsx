import type { Metadata } from "next";
import { MaintenanceScreen } from "@/components/layout/MaintenanceScreen";
import { SiteShell } from "@/components/layout/SiteShell";
import { siteConfig } from "@/lib/config";
import { getMaintenance } from "@/lib/data/settings";

/** Pendant la maintenance, les pages affichent toutes le même écran : on demande aux moteurs de ne pas les indexer. */
export function generateMetadata(): Metadata {
  return getMaintenance().enabled ? { robots: { index: false, follow: false } } : {};
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const maintenance = getMaintenance();
  if (maintenance.enabled) return <MaintenanceScreen message={maintenance.message} contactEmail={siteConfig.contactEmail} />;
  return <SiteShell>{children}</SiteShell>;
}
