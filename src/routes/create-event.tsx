import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, CalendarPlus, CheckCircle2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { RoleGate } from "@/components/role-gate";
import { SiteFooter } from "@/components/site-footer";
import { categories, cities } from "@/lib/events-data";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/create-event")({
  head: () => ({ meta: [{ title: "Create event — Eventra" }] }),
  component: CreateEventPage,
});

function CreateEventPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setDone(true);
      setTimeout(() => router.navigate({ to: "/organizer" }), 1200);
    }, 900);
  };

  return (
    <RoleGate allow={["organizer"]}>
      <div className="mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-12">
        <Link to="/organizer" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" aria-hidden />
          {t("create.back")}
        </Link>

        <div className="mb-8 flex items-start gap-3">
          <span className="mt-1 flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
            <CalendarPlus className="size-5" aria-hidden />
          </span>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{t("create.title")}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{t("create.subtitle")}</p>
          </div>
        </div>

        {done ? (
          <div className="rounded-lg border border-border bg-card p-8 text-center">
            <CheckCircle2 className="mx-auto size-10 text-primary" aria-hidden />
            <h2 className="mt-3 text-lg font-semibold">{t("create.success.title")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t("create.success.body")}</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="grid gap-5 rounded-lg border border-border bg-card p-6">
            <Field label={t("create.name")}>
              <input required name="name" type="text" placeholder={t("create.namePh")} className={inputCls} />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={t("create.category")}>
                <select required name="category" className={inputCls} defaultValue="">
                  <option value="" disabled>{t("create.selectOne")}</option>
                  {categories.map((c) => (<option key={c} value={c}>{t(`cat.${c}`)}</option>))}
                </select>
              </Field>
              <Field label={t("create.city")}>
                <select required name="city" className={inputCls} defaultValue="">
                  <option value="" disabled>{t("create.selectOne")}</option>
                  {cities.map((c) => (<option key={c} value={c}>{c}</option>))}
                </select>
              </Field>
            </div>
            <Field label={t("create.venue")}>
              <input required name="venue" type="text" placeholder={t("create.venuePh")} className={inputCls} />
            </Field>
            <div className="grid gap-5 sm:grid-cols-3">
              <Field label={t("create.date")}>
                <input required name="date" type="date" className={inputCls} />
              </Field>
              <Field label={t("create.time")}>
                <input required name="time" type="time" className={inputCls} />
              </Field>
              <Field label={t("create.price")}>
                <input required name="price" type="number" min={0} step="1" placeholder="0" className={inputCls} />
              </Field>
            </div>
            <Field label={t("create.capacity")}>
              <input required name="capacity" type="number" min={1} step="1" placeholder="500" className={inputCls} />
            </Field>
            <Field label={t("create.description")}>
              <textarea required name="description" rows={4} placeholder={t("create.descriptionPh")} className={`${inputCls} resize-y`} />
            </Field>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Link to="/organizer" className="rounded-md border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground">
                {t("create.cancel")}
              </Link>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {submitting ? t("create.publishing") : t("create.publish")}
              </button>
            </div>
            <p className="text-xs text-muted-foreground">{t("create.demoNote")}</p>
          </form>
        )}
      </div>
      <SiteFooter />
    </RoleGate>
  );
}

const inputCls =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1.5 text-sm">
      <span className="font-medium">{label}</span>
      {children}
    </label>
  );
}