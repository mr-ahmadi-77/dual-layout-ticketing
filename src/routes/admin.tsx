import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Activity,
  Building2,
  Download,
  MapPin,
  Plus,
  Search,
  Settings2,
  Ticket,
  TrendingUp,
  Users,
} from "lucide-react";
import { RoleGate } from "@/components/role-gate";
import { SiteFooter } from "@/components/site-footer";
import { venues } from "@/lib/events-data";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Eventra" }] }),
  component: AdminPage,
});

const statusStyles: Record<string, string> = {
  Active:
    "bg-primary/10 text-primary ring-1 ring-inset ring-primary/20",
  Draft:
    "bg-muted text-muted-foreground ring-1 ring-inset ring-border",
};

type View = "all" | "active" | "draft";

function AdminPage() {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [view, setView] = useState<View>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return venues.filter((v) => {
      if (view === "active" && v.status !== "Active") return false;
      if (view === "draft" && v.status !== "Draft") return false;
      if (!q) return true;
      return (
        v.name.toLowerCase().includes(q) || v.city.toLowerCase().includes(q)
      );
    });
  }, [query, view]);

  const totalCapacity = venues.reduce((s, v) => s + v.capacity, 0);
  const totalEvents = venues.reduce((s, v) => s + v.events, 0);
  const activeCount = venues.filter((v) => v.status === "Active").length;
  const stats = [
    {
      key: "venues",
      value: venues.length.toString(),
      hint: `${activeCount} ${t("vstatus.Active").toLowerCase()}`,
      icon: Building2,
    },
    {
      key: "capacity",
      value: totalCapacity.toLocaleString(),
      hint: "seats",
      icon: Users,
    },
    {
      key: "events",
      value: totalEvents.toString(),
      hint: "scheduled",
      icon: Ticket,
    },
    {
      key: "occupancy",
      value: "76%",
      hint: "+4.2%",
      icon: TrendingUp,
    },
  ];

  return (
    <RoleGate allow={["admin"]}>
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-accent/40 via-background to-background">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-12">
          {/* Hero header */}
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 md:p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute -end-24 -top-24 size-64 rounded-full bg-primary/10 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-16 -start-16 size-48 rounded-full bg-secondary/40 blur-3xl"
            />
            <div className="relative grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
              <div className="flex min-w-0 items-start gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                  <Building2 className="size-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-primary">
                    {t("nav.admin")}
                  </p>
                  <h1 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">
                    {t("admin.title")}
                  </h1>
                  <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                    {t("admin.subtitle")}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Download className="size-3.5" aria-hidden />
                  {t("admin.export")}
                </Button>
                <Button size="sm" className="gap-1.5">
                  <Plus className="size-3.5" aria-hidden />
                  {t("admin.addVenue")}
                </Button>
              </div>
            </div>
          </div>

          {/* KPI stats */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.key}
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {t(`admin.stat.${s.key}`)}
                  </p>
                  <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
                    <s.icon className="size-4" aria-hidden />
                  </span>
                </div>
                <p className="mt-3 text-2xl font-semibold tracking-tight tabular-nums">
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{s.hint}</p>
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-start scale-x-0 bg-gradient-to-r from-primary to-primary/40 transition-transform group-hover:scale-x-100"
                />
              </div>
            ))}
          </div>

          {/* Toolbar + Table/Card list */}
          <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
            <div className="grid gap-3 border-b border-border p-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
              <div className="relative min-w-0">
                <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("admin.search")}
                  className="ps-9"
                />
              </div>
              <div className="inline-flex rounded-lg border border-border bg-muted/40 p-1 text-xs">
                {([
                  ["all", t("admin.viewAll")],
                  ["active", t("admin.viewActive")],
                  ["draft", t("admin.viewDraft")],
                ] as const).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setView(key)}
                    className={cn(
                      "rounded-md px-3 py-1.5 font-medium transition-colors",
                      view === key
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop table */}
            <div className="hidden md:block">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30 text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="px-5 py-3 font-medium text-start">{t("admin.col.venue")}</th>
                    <th className="px-5 py-3 font-medium text-start">{t("admin.col.city")}</th>
                    <th className="px-5 py-3 font-medium text-start">{t("admin.col.sectors")}</th>
                    <th className="px-5 py-3 font-medium text-start">{t("admin.col.capacity")}</th>
                    <th className="px-5 py-3 font-medium text-start">{t("admin.col.events")}</th>
                    <th className="px-5 py-3 font-medium text-start">{t("admin.col.status")}</th>
                    <th className="px-5 py-3 font-medium text-end sr-only">actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((v) => (
                    <tr
                      key={v.id}
                      className="border-b border-border/70 transition-colors last:border-0 hover:bg-accent/30"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                            <Building2 className="size-4" aria-hidden />
                          </span>
                          <div className="min-w-0">
                            <div className="truncate font-medium">{v.name}</div>
                            <div className="text-xs text-muted-foreground">#{v.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                          <MapPin className="size-3.5" aria-hidden />
                          {v.city}
                        </span>
                      </td>
                      <td className="px-5 py-4 tabular-nums">{v.sectors}</td>
                      <td className="px-5 py-4 tabular-nums">{v.capacity.toLocaleString()}</td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 tabular-nums">
                          <Activity className="size-3.5 text-primary" aria-hidden />
                          {v.events}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
                            statusStyles[v.status],
                          )}
                        >
                          <span
                            className={cn(
                              "size-1.5 rounded-full",
                              v.status === "Active" ? "bg-primary" : "bg-muted-foreground/60",
                            )}
                          />
                          {t(`vstatus.${v.status}`)}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-end">
                        <Button variant="ghost" size="sm" className="gap-1.5">
                          <Settings2 className="size-3.5" aria-hidden />
                          {t("admin.manage")}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="grid gap-3 p-4 md:hidden">
              {filtered.map((v) => (
                <div
                  key={v.id}
                  className="rounded-xl border border-border bg-background p-4 transition-colors hover:border-primary/40"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                        <Building2 className="size-4" aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <div className="truncate font-medium">{v.name}</div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="size-3" aria-hidden />
                          {v.city}
                        </div>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium",
                        statusStyles[v.status],
                      )}
                    >
                      {t(`vstatus.${v.status}`)}
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-3 text-center text-xs">
                    <div>
                      <div className="text-muted-foreground">{t("admin.col.sectors")}</div>
                      <div className="mt-0.5 font-semibold tabular-nums">{v.sectors}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">{t("admin.col.capacity")}</div>
                      <div className="mt-0.5 font-semibold tabular-nums">{v.capacity.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">{t("admin.col.events")}</div>
                      <div className="mt-0.5 font-semibold tabular-nums">{v.events}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="px-5 py-16 text-center text-sm text-muted-foreground">
                {t("admin.empty")}
              </div>
            )}
          </div>
        </div>
      </div>
      <SiteFooter />
    </RoleGate>
  );
}
