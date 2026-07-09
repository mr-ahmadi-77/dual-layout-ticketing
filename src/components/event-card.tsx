import { Link } from "@tanstack/react-router";
import { CalendarDays, MapPin } from "lucide-react";
import type { EventItem } from "@/lib/events-data";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const badgeStyles = {
  high: "bg-accent text-accent-foreground",
  limited: "bg-secondary text-secondary-foreground",
  "selling-fast": "bg-primary text-primary-foreground",
} as const;

export function EventCard({ event }: { event: EventItem }) {
  const { t } = useI18n();
  return (
    <Link
      to="/events/$id"
      params={{ id: event.id }}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[3/2] overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <span className={cn("absolute start-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium", badgeStyles[event.availability])}>
          {t(`avail.${event.availability}`)}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-primary">{t(`cat.${event.category}`)}</p>
        <h3 className="text-base font-semibold leading-snug text-card-foreground text-pretty">{event.title}</h3>
        <div className="flex flex-col gap-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-3.5" aria-hidden />
            {event.date} · {event.time}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="size-3.5" aria-hidden />
            {event.venue}, {event.city}
          </span>
        </div>
        <p className="mt-1 text-sm font-medium">
          {t("event.ticketsFrom")} <span className="text-foreground">${event.priceFrom}</span>
        </p>
      </div>
    </Link>
  );
}
