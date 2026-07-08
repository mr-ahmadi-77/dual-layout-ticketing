import { createFileRoute } from "@tanstack/react-router";
import { Armchair, DollarSign, Ticket, TrendingUp } from "lucide-react";
import { RoleGate } from "@/components/role-gate";
import { SiteFooter } from "@/components/site-footer";
import { recentOrders } from "@/lib/events-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/organizer")({
  head: () => ({ meta: [{ title: "Organizer Dashboard — Summit" }] }),
  component: OrganizerPage,
});

const stats = [
  { label: "Tickets sold", value: "4,547", change: "+18.2% this week", icon: Ticket },
  { label: "Gross revenue", value: "$395,200", change: "+12.4% this week", icon: DollarSign },
  { label: "Sell-through rate", value: "76%", change: "Front sector at 93%", icon: TrendingUp },
  { label: "Seats remaining", value: "1,372", change: "Across 4 sectors", icon: Armchair },
];

const statusStyles: Record<string, string> = {
  Paid: "bg-accent text-accent-foreground",
  Pending: "bg-secondary text-secondary-foreground",
  Expired: "bg-muted text-muted-foreground",
};

function OrganizerPage() {
  return (
    <RoleGate allow={["organizer"]}>
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Organizer dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">Northern Lights Tour · Mist Arena · Aug 14, 2026</p>
          </div>
          <span className="flex w-fit items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground">
            <span className="size-2 rounded-full bg-primary" aria-hidden />
            Live — updating in real time
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <stat.icon className="size-4 text-primary" aria-hidden />
              </div>
              <p className="mt-2 text-2xl font-semibold tracking-tight">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.change}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-lg border border-border bg-card">
          <div className="border-b border-border px-5 py-4">
            <h2 className="font-semibold">Recent orders</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">Live order stream. Expired holds release seats back automatically.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-5 py-3 font-medium">Order</th>
                  <th className="px-5 py-3 font-medium">Buyer</th>
                  <th className="px-5 py-3 font-medium">Seats</th>
                  <th className="px-5 py-3 font-medium">Total</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Time</th>
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
                        {order.status}
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
