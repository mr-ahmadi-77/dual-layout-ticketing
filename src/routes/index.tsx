import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CalendarDays, MapPin, Search, SlidersHorizontal, Sparkles, Ticket, TrendingUp } from "lucide-react";
import { useI18n, type Locale } from "@/lib/i18n";
import { MOCK_EVENTS, type EventAvailability, type EventItem } from "@/lib/events-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Discover Events — Stagepass" },
      {
        name: "description",
        content:
          "Search concerts, sports, theatre and festivals. Live seat availability with fair queueing under flash traffic.",
      },
      { property: "og:title", content: "Discover Events — Stagepass" },
      {
        property: "og:description",
        content: "Live seat availability, fair queueing, instant QR tickets.",
      },
    ],
  }),
  component: DiscoverPage,
});

type Genre = EventItem["genre"] | "all";
type Avail = EventAvailability | "any";

const GENRES: Genre[] = ["all", "concert", "sports", "theater", "festival", "comedy"];
const GENRE_LABEL: Record<Genre, { en: string; fa: string }> = {
  all: { en: "All genres", fa: "همه ژانرها" },
  concert: { en: "Concerts", fa: "کنسرت" },
  sports: { en: "Sports", fa: "ورزشی" },
  theater: { en: "Theatre", fa: "تئاتر" },
  festival: { en: "Festivals", fa: "فستیوال" },
  comedy: { en: "Comedy", fa: "کمدی" },
};

function DiscoverPage() {
  const { t, locale, dir } = useI18n();
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState<Genre>("all");
  const [avail, setAvail] = useState<Avail>("any");
  const [city, setCity] = useState<string>("any");

  const cities = useMemo(() => {
    const set = new Set(MOCK_EVENTS.map((e) => e.city.en));
    return ["any", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    return MOCK_EVENTS.filter((e) => {
      if (genre !== "all" && e.genre !== genre) return false;
      if (avail !== "any" && e.availability !== avail) return false;
      if (city !== "any" && e.city.en !== city) return false;
      if (query) {
        const q = query.toLowerCase();
        const hay =
          `${e.title.en} ${e.title.fa} ${e.artist.en} ${e.artist.fa} ${e.venue.en} ${e.venue.fa}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [query, genre, avail, city]);

  const trending = MOCK_EVENTS.filter((e) => e.trending);

  const resetFilters = () => {
    setQuery("");
    setGenre("all");
    setAvail("any");
    setCity("any");
  };

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero border-b border-border/60">
        <div className="absolute inset-0 opacity-40" aria-hidden>
          <div className="absolute -top-40 -left-20 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              {t("brand.tagline")}
            </div>
            <h1 className="mt-5 text-4xl sm:text-6xl font-bold tracking-tight text-foreground">
              {t("discover.title")}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl">
              {t("discover.subtitle")}
            </p>

            {/* Search bar */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-2xl">
              <div className="relative flex-1">
                <Search
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none",
                    dir === "rtl" ? "right-3" : "left-3",
                  )}
                />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("discover.search")}
                  className={cn(
                    "h-12 bg-card/80 border-border/60 backdrop-blur",
                    dir === "rtl" ? "pr-10 text-right" : "pl-10",
                  )}
                />
              </div>
              <Button size="lg" className="h-12 px-6 bg-amber-gradient text-primary-foreground hover:opacity-90 shadow-glow">
                <SlidersHorizontal className="h-4 w-4" />
                {t("discover.filters")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING STRIP */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {t("discover.trending")}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {trending.map((e) => (
            <TrendingCard key={e.id} event={e} locale={locale} />
          ))}
        </div>
      </section>

      {/* FILTERS + GRID */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">{t("discover.thisWeek")}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {filtered.length} {t("discover.results")}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Select value={genre} onValueChange={(v) => setGenre(v as Genre)}>
              <SelectTrigger className="w-[160px] bg-card">
                <SelectValue placeholder={t("discover.genre")} />
              </SelectTrigger>
              <SelectContent>
                {GENRES.map((g) => (
                  <SelectItem key={g} value={g}>
                    {GENRE_LABEL[g][locale]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className="w-[160px] bg-card">
                <SelectValue placeholder={t("discover.location")} />
              </SelectTrigger>
              <SelectContent>
                {cities.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c === "any" ? t("discover.any") : c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={avail} onValueChange={(v) => setAvail(v as Avail)}>
              <SelectTrigger className="w-[160px] bg-card">
                <SelectValue placeholder={t("discover.availability")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">{t("discover.any")}</SelectItem>
                <SelectItem value="available">{t("discover.available")}</SelectItem>
                <SelectItem value="few">{t("discover.fewLeft")}</SelectItem>
                <SelectItem value="sold_out">{t("discover.soldOut")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState onReset={resetFilters} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((e) => (
              <EventCard key={e.id} event={e} locale={locale} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function AvailabilityBadge({ status }: { status: EventAvailability }) {
  const { t } = useI18n();
  if (status === "available")
    return (
      <Badge className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20">
        ● {t("discover.available")}
      </Badge>
    );
  if (status === "few")
    return (
      <Badge className="bg-primary/15 text-primary border border-primary/30 hover:bg-primary/20">
        ● {t("discover.fewLeft")}
      </Badge>
    );
  return (
    <Badge variant="secondary" className="text-muted-foreground border border-border">
      ○ {t("discover.soldOut")}
    </Badge>
  );
}

function formatDate(iso: string, locale: Locale) {
  const d = new Date(iso);
  return d.toLocaleDateString(locale === "fa" ? "fa-IR" : "en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function TrendingCard({ event, locale }: { event: EventItem; locale: Locale }) {
  const { t } = useI18n();
  return (
    <Card className="group relative overflow-hidden border-border/60 bg-card hover:border-primary/40 transition-all cursor-pointer">
      <div className={cn("h-40 bg-gradient-to-br", event.image)} />
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
          <CalendarDays className="h-3.5 w-3.5" />
          {formatDate(event.date, locale)}
        </div>
        <h3 className="font-semibold text-lg leading-tight line-clamp-1">
          {event.title[locale]}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
          {event.artist[locale]}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <AvailabilityBadge status={event.availability} />
          <span className="text-sm font-medium">
            {t("discover.from")} ${event.priceFrom}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function EventCard({ event, locale }: { event: EventItem; locale: Locale }) {
  const { t } = useI18n();
  const soldOut = event.availability === "sold_out";
  return (
    <Card className="group overflow-hidden border-border/60 bg-card hover:border-primary/40 hover:shadow-elevated transition-all">
      <div className={cn("relative h-44 bg-gradient-to-br", event.image)}>
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        <div className="absolute top-3 end-3">
          <AvailabilityBadge status={event.availability} />
        </div>
      </div>
      <CardContent className="p-5 space-y-3">
        <div>
          <h3 className="font-semibold text-lg leading-tight">{event.title[locale]}</h3>
          <p className="text-sm text-muted-foreground mt-0.5">{event.artist[locale]}</p>
        </div>

        <div className="space-y-1.5 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-3.5 w-3.5" />
            <span>{formatDate(event.date, locale)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5" />
            <span>
              {event.venue[locale]} · {event.city[locale]}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/60">
          <div>
            <div className="text-xs text-muted-foreground">{t("discover.from")}</div>
            <div className="text-lg font-semibold">${event.priceFrom}</div>
          </div>
          <Button
            size="sm"
            disabled={soldOut}
            className="bg-amber-gradient text-primary-foreground hover:opacity-90 disabled:opacity-40"
          >
            <Ticket className="h-4 w-4" />
            {t("discover.viewEvent")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  const { t } = useI18n();
  return (
    <div className="rounded-xl border border-dashed border-border p-16 text-center">
      <div className="mx-auto w-12 h-12 rounded-full bg-muted grid place-items-center mb-4">
        <Search className="h-5 w-5 text-muted-foreground" />
      </div>
      <h3 className="font-semibold">{t("empty.title")}</h3>
      <p className="text-sm text-muted-foreground mt-1">{t("empty.subtitle")}</p>
      <Button onClick={onReset} variant="outline" className="mt-6">
        {t("empty.reset")}
      </Button>
    </div>
  );
}