import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "@/lib/react-shim";
import { ArrowLeft, Lock, CreditCard, CalendarDays, MapPin } from "lucide-react";
import { z } from "zod";
import { SiteFooter } from "@/components/site-footer";
import { getEvent } from "@/lib/events-data";
import { useI18n } from "@/lib/i18n";

const searchSchema = z.object({
  eventId: z.string(),
  seats: z.string().default(""),
  total: z.coerce.number().default(0),
});

export const Route = createFileRoute("/payment")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Payment — Summit" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PaymentPage,
});

function PaymentPage() {
  const { eventId, seats, total } = Route.useSearch();
  const { t } = useI18n();
  const navigate = useNavigate();
  const event = getEvent(eventId);
  const seatList = seats ? seats.split(",").filter(Boolean) : [];

  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [email, setEmail] = useState("");
  const [processing, setProcessing] = useState(false);

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

  const canSubmit = name.trim() && card.replace(/\s/g, "").length >= 12 && expiry.length >= 4 && cvc.length >= 3 && email.includes("@");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit || processing) return;
    setProcessing(true);
    window.setTimeout(() => {
      navigate({ to: "/checkout", search: { eventId, seats, total } });
    }, 900);
  };

  const formatCard = (v: string) =>
    v.replace(/\D/g, "").slice(0, 19).replace(/(\d{4})(?=\d)/g, "$1 ");
  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  return (
    <>
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-5xl px-4 py-6 md:px-6 md:py-8">
          <Link
            to="/events/$id/seats"
            params={{ id: event.id }}
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden /> {t("payment.back")}
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{t("payment.title")}</h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{t("payment.subtitle")}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <form onSubmit={onSubmit} className="rounded-lg border border-border bg-card p-6">
            <div className="mb-5 flex items-center gap-2 text-sm font-medium">
              <CreditCard className="size-4 text-primary" aria-hidden />
              <span>{t("payment.cardNumber")}</span>
            </div>
            <div className="flex flex-col gap-4">
              <Field label={t("payment.cardholder")}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("payment.cardholderPh")}
                  autoComplete="cc-name"
                  className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </Field>
              <Field label={t("payment.cardNumber")}>
                <input
                  type="text"
                  inputMode="numeric"
                  value={card}
                  onChange={(e) => setCard(formatCard(e.target.value))}
                  placeholder={t("payment.cardNumberPh")}
                  autoComplete="cc-number"
                  className="h-11 w-full rounded-md border border-input bg-background px-3 font-mono text-sm tracking-wider outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label={t("payment.expiry")}>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    placeholder={t("payment.expiryPh")}
                    autoComplete="cc-exp"
                    className="h-11 w-full rounded-md border border-input bg-background px-3 font-mono text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </Field>
                <Field label={t("payment.cvc")}>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    placeholder={t("payment.cvcPh")}
                    autoComplete="cc-csc"
                    className="h-11 w-full rounded-md border border-input bg-background px-3 font-mono text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </Field>
              </div>
              <Field label={t("payment.email")}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("payment.emailPh")}
                  autoComplete="email"
                  className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </Field>
            </div>

            <button
              type="submit"
              disabled={!canSubmit || processing}
              className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-md bg-primary text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Lock className="size-4" aria-hidden />
              {processing ? t("payment.processing") : `${t("payment.pay")} $${total}`}
            </button>
            <p className="mt-3 text-center text-xs text-muted-foreground">{t("payment.secured")}</p>
          </form>

          <aside className="h-fit rounded-lg border border-border bg-card p-5 lg:sticky lg:top-20">
            <h3 className="text-sm font-semibold">{t("payment.summary")}</h3>
            <div className="mt-4 flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-primary">{t(`cat.${event.category}`)}</p>
              <p className="text-base font-semibold leading-snug">{event.title}</p>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CalendarDays className="size-3.5" aria-hidden />{event.date} · {event.time}
              </p>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="size-3.5" aria-hidden />{event.venue}, {event.city}
              </p>
            </div>
            <div className="mt-4 border-t border-border pt-4">
              <p className="text-xs font-medium text-muted-foreground">{t("payment.seats")}</p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {seatList.map((id) => (
                  <li key={id} className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-[11px]">{id}</li>
                ))}
              </ul>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="text-sm text-muted-foreground">{t("payment.total")}</span>
              <span className="text-xl font-semibold tabular-nums">${total}</span>
            </div>
          </aside>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}