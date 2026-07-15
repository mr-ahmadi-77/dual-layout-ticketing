import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, MapPin, QrCode } from "lucide-react";
import { RoleGate } from "@/components/role-gate";
import { SiteFooter } from "@/components/site-footer";
import { QrTicket } from "@/components/qr-ticket";
import { events } from "@/lib/events-data";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/buyer")({
  head: () => ({ meta: [{ title: "My tickets — Eventra" }] }),
  component: BuyerPage,
});

function BuyerPage() {
  const { t } = useI18n();
  const owned = events.slice(0, 3);
  return (
    <RoleGate allow={["buyer"]}>
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">{t("buyer.title")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("buyer.subtitle")}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {owned.map((event) => (
            <div key={event.id} className="flex flex-col overflow-hidden rounded-lg border border-border bg-card">
              <div className="relative aspect-[3/2]">
                <img src={event.image} alt={event.title} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute bottom-3 right-3">
                  <QrTicket size={72} value={`summit:ticket:${event.id}`} />
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-primary">{t(`cat.${event.category}`)}</p>
                <h3 className="text-base font-semibold leading-snug">{event.title}</h3>
                <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><CalendarDays className="size-3.5" />{event.date} · {event.time}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="size-3.5" />{event.venue}, {event.city}</span>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                  <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">{t("buyer.paid")}</span>
                  <Link to="/events/$id" params={{ id: event.id }} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:opacity-80">
                    <QrCode className="size-4" /> {t("buyer.viewTicket")}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <SiteFooter />
    </RoleGate>
  );
}
