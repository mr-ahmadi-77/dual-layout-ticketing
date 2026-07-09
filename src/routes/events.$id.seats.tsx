import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Timer, AlertCircle } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { getEvent } from "@/lib/events-data";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/events/$id/seats")({
  loader: ({ params }) => {
    const event = getEvent(params.id);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `Choose seats — ${loaderData.event.title}` : "Choose seats — Summit" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SeatsPage,
});

type SeatState = "available" | "selected" | "locked" | "booked";

interface Seat {
  id: string;         // e.g. "A-1-4"
  sector: string;
  row: number;
  col: number;
  state: SeatState;
  price: number;
}

const SECTORS = [
  { id: "A", label: "A · Front", rows: 4, cols: 12, price: 120 },
  { id: "B", label: "B · Middle", rows: 5, cols: 14, price: 85 },
  { id: "C", label: "C · Balcony", rows: 4, cols: 16, price: 55 },
];

const HOLD_SECONDS = 10 * 60;

// Deterministic pseudo-random from seed so SSR/CSR agree
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function buildLayout(eventId: string): Seat[] {
  const rand = seeded(eventId.split("").reduce((a, c) => a + c.charCodeAt(0), 0));
  const seats: Seat[] = [];
  for (const sec of SECTORS) {
    for (let r = 1; r <= sec.rows; r++) {
      for (let c = 1; c <= sec.cols; c++) {
        const roll = rand();
        let state: SeatState = "available";
        if (roll < 0.22) state = "booked";
        else if (roll < 0.3) state = "locked";
        seats.push({ id: `${sec.id}-${r}-${c}`, sector: sec.id, row: r, col: c, state, price: sec.price });
      }
    }
  }
  return seats;
}

function SeatsPage() {
  const { event } = Route.useLoaderData();
  const { t, dir } = useI18n();
  const navigate = useNavigate();

  const [seats, setSeats] = useState<Seat[]>(() => buildLayout(event.id));
  const [holdRemaining, setHoldRemaining] = useState<number | null>(null);
  const [expired, setExpired] = useState(false);
  const holdRef = useRef<number | null>(null);

  const selected = useMemo(() => seats.filter((s) => s.state === "selected"), [seats]);
  const subtotal = selected.reduce((sum, s) => sum + s.price, 0);

  // Simulate other buyers locking/releasing seats live
  useEffect(() => {
    const timer = window.setInterval(() => {
      setSeats((prev) => {
        const next = [...prev];
        const rand = Math.random;
        for (let i = 0; i < 3; i++) {
          const idx = Math.floor(rand() * next.length);
          const s = next[idx];
          if (s.state === "available" && rand() < 0.35) {
            next[idx] = { ...s, state: "locked" };
          } else if (s.state === "locked" && rand() < 0.3) {
            next[idx] = { ...s, state: "available" };
          }
        }
        return next;
      });
    }, 3500);
    return () => window.clearInterval(timer);
  }, []);

  // Countdown when there is at least one selection
  useEffect(() => {
    if (selected.length === 0) {
      if (holdRef.current) window.clearInterval(holdRef.current);
      holdRef.current = null;
      setHoldRemaining(null);
      return;
    }
    if (holdRemaining === null) setHoldRemaining(HOLD_SECONDS);
    if (holdRef.current) return;
    holdRef.current = window.setInterval(() => {
      setHoldRemaining((prev) => {
        if (prev === null) return prev;
        if (prev <= 1) {
          setExpired(true);
          setSeats((s) => s.map((x) => (x.state === "selected" ? { ...x, state: "available" } : x)));
          if (holdRef.current) window.clearInterval(holdRef.current);
          holdRef.current = null;
          return null;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (holdRef.current) window.clearInterval(holdRef.current);
      holdRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected.length > 0]);

  const toggleSeat = (id: string) => {
    setExpired(false);
    setSeats((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        if (s.state === "available") return { ...s, state: "selected" };
        if (s.state === "selected") return { ...s, state: "available" };
        return s;
      }),
    );
  };

  const mm = holdRemaining !== null ? Math.floor(holdRemaining / 60) : 0;
  const ss = holdRemaining !== null ? holdRemaining % 60 : 0;

  return (
    <>
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8">
          <Link to="/events/$id" params={{ id: event.id }} className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="size-4 rtl:rotate-180" /> {event.title}
          </Link>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{t("seats.title")}</h1>
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{t("seats.subtitle")}</p>
            </div>
            {holdRemaining !== null && (
              <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-accent px-3 py-1.5 text-sm font-medium text-primary">
                <Timer className="size-4" />
                <span className="tabular-nums">
                  {t("seats.holdTimer")}: {mm}:{ss.toString().padStart(2, "0")}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
        {expired && (
          <div className="mb-6 flex items-start gap-3 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm">
            <AlertCircle className="mt-0.5 size-4 text-destructive" />
            <div>
              <p className="font-medium text-destructive">{t("seats.releasedTitle")}</p>
              <p className="mt-0.5 text-muted-foreground">{t("seats.releasedBody")}</p>
            </div>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="flex flex-col gap-8">
            {/* Legend */}
            <div className="flex flex-wrap gap-4 text-xs">
              <Legend cls="bg-emerald-500/90" label={t("seats.legend.available")} />
              <Legend cls="bg-primary" label={t("seats.legend.selected")} />
              <Legend cls="bg-amber-500/90" label={t("seats.legend.locked")} />
              <Legend cls="bg-muted-foreground/40" label={t("seats.legend.booked")} />
            </div>

            {/* Stage */}
            <div className="mx-auto w-2/3 rounded-md border border-dashed border-border bg-muted/60 py-2 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {t("seats.stage")}
            </div>

            {/* Sectors */}
            <div className="flex flex-col gap-8" dir={dir}>
              {SECTORS.map((sec) => (
                <div key={sec.id} className="rounded-lg border border-border bg-card p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-sm font-semibold">{t("seats.sector")} {sec.label}</h3>
                    <p className="text-xs text-muted-foreground">${sec.price}</p>
                  </div>
                  <div className="overflow-x-auto">
                    <div className="inline-block">
                      {Array.from({ length: sec.rows }, (_, r) => r + 1).map((row) => (
                        <div key={row} className="mb-1 flex items-center gap-1" dir="ltr">
                          <span className="me-1 w-5 text-end text-[10px] font-mono text-muted-foreground">{row}</span>
                          {Array.from({ length: sec.cols }, (_, c) => c + 1).map((col) => {
                            const seat = seats.find((s) => s.id === `${sec.id}-${row}-${col}`)!;
                            return <SeatButton key={seat.id} seat={seat} onClick={() => toggleSeat(seat.id)} />;
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary sidebar */}
          <aside className="h-fit rounded-lg border border-border bg-card p-5 lg:sticky lg:top-20">
            <h3 className="text-sm font-semibold">{t("seats.selected")}</h3>
            {selected.length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">{t("seats.emptyHint")}</p>
            ) : (
              <ul className="mt-3 flex flex-col gap-2">
                {selected.map((s) => (
                  <li key={s.id} className="flex items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-sm">
                    <span>
                      <span className="font-medium">{t("seats.sector")} {s.sector}</span>
                      <span className="text-muted-foreground"> · {t("seats.row")} {s.row} · {t("seats.seat")} {s.col}</span>
                    </span>
                    <span className="font-medium">${s.price}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-sm">
              <span className="text-muted-foreground">{t("seats.subtotal")}</span>
              <span className="text-lg font-semibold tabular-nums">${subtotal}</span>
            </div>
            <button
              type="button"
              disabled={selected.length === 0}
              onClick={() => navigate({ to: "/buyer" })}
              className="mt-4 h-11 w-full rounded-md bg-primary text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {t("seats.checkout")}
            </button>
          </aside>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}

function Legend({ cls, label }: { cls: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={cn("size-3 rounded-sm", cls)} />
      <span className="text-muted-foreground">{label}</span>
    </span>
  );
}

const stateStyles: Record<SeatState, string> = {
  available: "bg-emerald-500/90 hover:bg-emerald-500 text-transparent",
  selected: "bg-primary hover:bg-primary text-primary-foreground ring-2 ring-primary/40 scale-110",
  locked: "bg-amber-500/90 cursor-not-allowed text-transparent",
  booked: "bg-muted-foreground/40 cursor-not-allowed text-transparent",
};

function SeatButton({ seat, onClick }: { seat: Seat; onClick: () => void }) {
  const disabled = seat.state === "locked" || seat.state === "booked";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={`Sector ${seat.sector}, row ${seat.row}, seat ${seat.col} — ${seat.state}`}
      className={cn(
        "size-6 rounded-t-md text-[9px] font-medium transition-all",
        stateStyles[seat.state],
      )}
    >
      {seat.col}
    </button>
  );
}
