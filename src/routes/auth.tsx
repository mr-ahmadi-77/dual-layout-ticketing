import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Ticket } from "lucide-react";
import { useRbac, type Role } from "@/lib/rbac";
import { useI18n } from "@/lib/i18n";
import { SiteFooter } from "@/components/site-footer";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in — Eventra" }] }),
  component: AuthPage,
});

const ROLES: Exclude<Role, "guest">[] = ["buyer", "organizer", "admin"];

function AuthPage() {
  const { signIn } = useRbac();
  const { t } = useI18n();
  const navigate = useNavigate();
  const [role, setRole] = useState<Exclude<Role, "guest">>("buyer");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn(role, email || undefined);
    navigate({ to: role === "buyer" ? "/buyer" : role === "organizer" ? "/organizer" : "/admin" });
  };

  return (
    <>
      <div className="mx-auto flex max-w-md flex-col gap-8 px-4 py-16 md:py-24">
        <div className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Ticket className="size-4" aria-hidden />
          </span>
          {t("brand.name")}
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{t("auth.title")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("auth.subtitle")}</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-lg border border-border bg-card p-6">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium">{t("auth.email")}</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("auth.emailPlaceholder")}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium">{t("auth.password")}</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">{t("auth.continueAs")}</span>
            <div className="grid grid-cols-3 gap-2">
              {ROLES.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={cn(
                    "rounded-md border px-3 py-2 text-sm transition-colors",
                    role === r
                      ? "border-primary bg-accent text-foreground"
                      : "border-border text-muted-foreground hover:text-foreground",
                  )}
                >
                  {t(`role.${r}`)}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="mt-2 h-10 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
            {t("auth.submit")}
          </button>
        </form>
      </div>
      <SiteFooter />
    </>
  );
}
