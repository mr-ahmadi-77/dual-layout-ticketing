import { createFileRoute } from "@tanstack/react-router";
import { Building2 } from "lucide-react";
import { RoleGate } from "@/components/role-gate";
import { SiteFooter } from "@/components/site-footer";
import { venues } from "@/lib/events-data";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Eventra" }] }),
  component: AdminPage,
});

const statusStyles: Record<string, string> = {
  Active: "bg-accent text-accent-foreground",
  Draft: "bg-muted text-muted-foreground",
};

function AdminPage() {
  const { t } = useI18n();
  return (
    <RoleGate allow={["admin"]}>
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
        <div className="mb-8 flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-md bg-accent text-primary">
            <Building2 className="size-4" aria-hidden />
          </span>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{t("admin.title")}</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">{t("admin.subtitle")}</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-3 font-medium text-start">{t("admin.col.venue")}</th>
                <th className="px-5 py-3 font-medium text-start">{t("admin.col.city")}</th>
                <th className="px-5 py-3 font-medium text-start">{t("admin.col.sectors")}</th>
                <th className="px-5 py-3 font-medium text-start">{t("admin.col.capacity")}</th>
                <th className="px-5 py-3 font-medium text-start">{t("admin.col.events")}</th>
                <th className="px-5 py-3 font-medium text-start">{t("admin.col.status")}</th>
              </tr>
            </thead>
            <tbody>
              {venues.map((v) => (
                <tr key={v.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-3 font-medium">{v.name}</td>
                  <td className="px-5 py-3 text-muted-foreground">{v.city}</td>
                  <td className="px-5 py-3">{v.sectors}</td>
                  <td className="px-5 py-3">{v.capacity.toLocaleString()}</td>
                  <td className="px-5 py-3">{v.events}</td>
                  <td className="px-5 py-3">
                    <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", statusStyles[v.status])}>
                      {t(`vstatus.${v.status}`)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <SiteFooter />
    </RoleGate>
  );
}
