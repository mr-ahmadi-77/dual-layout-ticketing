import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Clock, MapPin } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { getEvent, events } from "@/lib/events-data";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/events/$id")({
  loader: ({ params }) => {
    const event = getEvent(params.id);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.event.title} — Summit` },
          { name: "description", content: loaderData.event.description },
          { property: "og:title", content: loaderData.event.title },
          { property: "og:description", content: loaderData.event.description },
          { property: "og:image", content: loaderData.event.image },
        ]
      : [{ title: "Event — Summit" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: EventNotFound,
  errorComponent: ({ error, reset }) => (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="text-xl font-semibold">Something went wrong</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      <button onClick={reset} className="mt-6 rounded-md border border-border px-4 py-2 text-sm">Try again</button>
    </div>
  ),
  component: EventDetailPage,
});

function EventNotFound() {
  const { t } = useI18n();
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold">{t("event.notFound.title")}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{t("event.notFound.body")}</p>
      <Link to="/" className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
        {t("event.notFound.cta")}
      </Link>
    </div>
  );
}

function EventDetailPage() {
  const { event } = Route.useLoaderData();
  const { t } = useI18n();
  const related = events.filter((e) => e.id !== event.id && e.category === event.category).slice(0, 3);

  return (
    <>
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
          <Link to="/" className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden /> {t("event.back")}
          </Link>
          <div className="grid gap-6 md:grid-cols-[1fr_320px] md:items-center">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-medium uppercase tracking-wide text-primary">{t(`cat.${event.category}`)}</p>
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl text-balance">{event.title}</h1>
              <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><CalendarDays className="size-4" />{event.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="size-4" />{event.time}</span>
                <span className="flex items-center gap-1.5"><MapPin className="size-4" />{event.venue}, {event.city}</span>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-background p-5">
              <p className="text-sm text-muted-foreground">{t("event.ticketsFrom")}</p>
              <p className="mt-1 text-3xl font-semibold tracking-tight">${event.priceFrom}</p>
              <Link
                to="/events/$id/seats"
                params={{ id: event.id }}
                className="mt-4 flex w-full items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                {t("event.chooseSeat")}
              </Link>
              <p className="mt-3 text-xs text-muted-foreground">{t("event.holdNotice")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <div className="grid gap-10 md:grid-cols-[1fr_320px]">
          <div>
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-border">
              <img src={event.image} alt={event.title} className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <h2 className="mt-8 text-xl font-semibold">{t("event.about")}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{event.description}</p>
          </div>
          <aside className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{t("event.related")}</h3>
            {related.map((r) => (
              <Link key={r.id} to="/events/$id" params={{ id: r.id }} className="group flex gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/40">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-md">
                  <img src={r.image} alt={r.title} className="absolute inset-0 h-full w-full object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-sm font-medium leading-snug">{r.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{r.date} · {r.venue}</p>
                </div>
              </Link>
            ))}
          </aside>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
