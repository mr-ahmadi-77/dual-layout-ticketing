import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Timer, Users } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { EventBrowser } from "@/components/event-browser";
import { events } from "@/lib/events-data";
import { useI18n } from "@/lib/i18n";

const featured = events.find((e) => e.featured) ?? events[0];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Summit — Event Ticketing Platform" },
      { name: "description", content: "Discover events, pick your seat in real time, and check out securely." },
      { property: "og:title", content: "Summit — Event Ticketing Platform" },
      { property: "og:description", content: "Live seat availability. Fair queueing. Instant QR tickets." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { t } = useI18n();
  const trust = [
    { icon: Timer, title: t("home.trust.hold.title"), body: t("home.trust.hold.body") },
    { icon: ShieldCheck, title: t("home.trust.secure.title"), body: t("home.trust.secure.body") },
    { icon: Users, title: t("home.trust.queue.title"), body: t("home.trust.queue.body") },
  ];

  return (
    <>
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:px-6 md:py-20">
          <div className="flex flex-col gap-5">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">{t("home.eyebrow")}</p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl text-balance">
              {t("home.title")}
            </h1>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground text-pretty">
              {t("home.subtitle")}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a href="#events" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
                {t("home.cta.find")}
                <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
              </a>
              <Link to="/organizer" className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted">
                {t("home.cta.organizers")}
              </Link>
            </div>
          </div>

          <Link to="/events/$id" params={{ id: featured.id }} className="group relative block overflow-hidden rounded-lg border border-border">
            <div className="relative aspect-[4/3]">
              <img src={featured.image} alt={featured.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-foreground/80 to-transparent p-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-secondary">{t("home.featured")}</p>
                <p className="text-lg font-semibold text-background">{featured.title}</p>
                <p className="text-sm text-background/80">{featured.date} · {featured.venue}</p>
              </div>
              <span className="hidden shrink-0 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground sm:block">
                {t("home.sellingFast")}
              </span>
            </div>
          </Link>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-3 md:px-6">
          {trust.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-accent text-primary">
                <Icon className="size-4" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-medium">{title}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <EventBrowser />
      <SiteFooter />
    </>
  );
}
