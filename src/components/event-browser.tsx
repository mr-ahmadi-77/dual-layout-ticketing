import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { events, categories, cities } from "@/lib/events-data";
import { EventCard } from "@/components/event-card";
import { cn } from "@/lib/utils";

export function EventBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [city, setCity] = useState<string>("All");

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const q = query.toLowerCase();
      const matchesQuery = q === "" || e.title.toLowerCase().includes(q) || e.venue.toLowerCase().includes(q) || e.city.toLowerCase().includes(q);
      const matchesCategory = category === "All" || e.category === category;
      const matchesCity = city === "All" || e.city === city;
      return matchesQuery && matchesCategory && matchesCity;
    });
  }, [query, category, city]);

  return (
    <section id="events" className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight text-balance">Browse events</h2>
          <p className="text-sm text-muted-foreground">Live availability, transparent pricing, no surprises at checkout.</p>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search events, venues, or cities"
              aria-label="Search events"
              className="h-10 w-full rounded-md border border-input bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            aria-label="Filter by city"
            className="h-10 rounded-md border border-input bg-card px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="All">All cities</option>
            {cities.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                category === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-secondary hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((e) => <EventCard key={e.id} event={e} />)}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-border bg-card px-6 py-16 text-center">
            <p className="font-medium">No events found</p>
            <p className="mt-1 text-sm text-muted-foreground">Try a different search or clear the filters.</p>
          </div>
        )}
      </div>
    </section>
  );
}
