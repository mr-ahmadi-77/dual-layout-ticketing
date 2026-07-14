import { createFileRoute, Link } from "@tanstack/react-router";
import { Armchair, DollarSign, Plus, Ticket, TrendingUp } from "lucide-react";
import { RoleGate } from "@/components/role-gate";
import { SiteFooter } from "@/components/site-footer";
import { recentOrders } from "@/lib/events-data";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/organizer")({
  head: () => ({ meta: [{ title: "Organizer Dashboard — Summit" }] }),
  component: OrganizerPage,
});

const statusStyles: Record<string, string> = {
  Paid: "bg-accent text-accent-foreground",
  Pending: "bg-secondary text-secondary-foreground",
  Expired: "bg-muted text-muted-foreground",
};

function OrganizerPage() {
  const { t } = useI18n();
  const stats = [
    { key: "sold", value: "4,547", icon: Ticket },
    { key: "revenue", value: "$395,200", icon: DollarSign },
    { key: "rate", value: "76%", icon: TrendingUp },
    { key: "remaining", value: "1,372", icon: Armchair },
  ];
  return (
    <RoleGate allow={["organizer"]}>
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{t("org.title")}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{t("org.subtitle")}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex w-fit items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground">
              <span className="size-2 rounded-full bg-primary animate-pulse" aria-hidden />
              {t("org.live")}
            </span>
            <Link
              to="/create-event"
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Plus className="size-3.5" aria-hidden />
              {t("org.createEvent")}
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.key} className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{t(`org.stat.${stat.key}`)}</p>
                <stat.icon className="size-4 text-primary" aria-hidden />
              </div>
              <p className="mt-2 text-2xl font-semibold tracking-tight">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{t(`org.stat.${stat.key}.delta`)}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-lg border border-border bg-card">
          <div className="border-b border-border px-5 py-4">
            <h2 className="font-semibold">{t("org.orders.title")}</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">{t("org.orders.subtitle")}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-border text-start text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-5 py-3 font-medium text-start">{t("org.col.order")}</th>
                  <th className="px-5 py-3 font-medium text-start">{t("org.col.buyer")}</th>
                  <th className="px-5 py-3 font-medium text-start">{t("org.col.seats")}</th>
                  <th className="px-5 py-3 font-medium text-start">{t("org.col.total")}</th>
                  <th className="px-5 py-3 font-medium text-start">{t("org.col.status")}</th>
                  <th className="px-5 py-3 font-medium text-start">{t("org.col.time")}</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border last:border-0">
                    <td className="px-5 py-3 font-mono text-xs">{order.id}</td>
                    <td className="px-5 py-3">{order.buyer}</td>
                    <td className="px-5 py-3 text-muted-foreground">{order.seats}</td>
                    <td className="px-5 py-3 font-medium">${order.total}</td>
                    <td className="px-5 py-3">
                      <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", statusStyles[order.status])}>
                        {t(`status.${order.status}`)}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{order.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <SiteFooter />
    </RoleGate>
  );
}
