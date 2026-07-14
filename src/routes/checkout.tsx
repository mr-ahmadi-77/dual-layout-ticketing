import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, CalendarDays, MapPin, Ticket } from "lucide-react";
import { z } from "zod";
import { SiteFooter } from "@/components/site-footer";
import { QrTicket } from "@/components/qr-ticket";
import { getEvent } from "@/lib/events-data";
import { useI18n } from "@/lib/i18n";

const searchSchema = z.object({
  eventId: z.string(),
  seats: z.string().default(""),
  total: z.coerce.number().default(0),
});

export const Route = createFileRoute("/checkout")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Order confirmed — Summit" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { eventId, seats, total } = Route.useSearch();
  const { t } = useI18n();
  const event = getEvent(eventId);
  const seatList = seats ? seats.split(",").filter(Boolean) : [];
  const orderId = `ORD-${eventId.slice(0, 4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

  if (!event) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold">{t("event.notFound.title")}</h1>
        <Link to="/" className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          {t("event.notFound.cta")}
        </Link>
      </div>
    );
  }

  return (
    <>
      <section className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-16">
        <div className="flex flex-col items-center text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-accent text-primary">
            <CheckCircle2 className="size-7" aria-hidden />
          </span>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">{t("checkout.title")}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t("checkout.subtitle")}</p>
          <p className="mt-4 rounded-full bg-muted px-3 py-1 font-mono text-xs text-muted-foreground">{orderId}</p>
        </div>

        <div className="mt-10 overflow-hidden rounded-lg border border-border bg-card">
          <div className="grid gap-4 p-6 md:grid-cols-[1fr_auto] md:items-center">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-primary">{t(`cat.${event.category}`)}</p>
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><CalendarDays className="size-4" />{event.date} · {event.time}</span>
                <span className="flex items-center gap-1.5"><MapPin className="size-4" />{event.venue}, {event.city}</span>
              </div>
            </div>
            <QrTicket
              size={128}
              value={JSON.stringify({ orderId, eventId, seats: seatList, total })}
            />
          </div>

          <div className="border-t border-border p-6">
            <h3 className="text-sm font-semibold">{t("checkout.seats")}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {seatList.length === 0 ? (
                <li className="text-sm text-muted-foreground">—</li>
              ) : (
                seatList.map((id: string) => (
                  <li key={id} className="rounded-md border border-border bg-background px-2.5 py-1 font-mono text-xs">{id}</li>
                ))
              )}
            </ul>
            <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
              <span className="text-sm text-muted-foreground">{t("checkout.total")}</span>
              <span className="text-xl font-semibold tabular-nums">${total}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/buyer"
            className="inline-flex items-center justify-center gap-1.5 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Ticket className="size-4" /> {t("checkout.viewTickets")}
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
          >
            {t("checkout.browseMore")}
          </Link>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}