import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Ticket } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useRbac, type Role } from "@/lib/rbac";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Stagepass" },
      { name: "description", content: "Sign in to Stagepass as a buyer, organizer, or admin." },
    ],
  }),
  component: AuthPage,
});

const ROLES: Exclude<Role, "guest">[] = ["buyer", "organizer", "admin"];

function AuthPage() {
  const { t, dir } = useI18n();
  const { signIn } = useRbac();
  const navigate = useNavigate();
  const [role, setRole] = useState<Exclude<Role, "guest">>("buyer");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn(role, email || undefined);
    const target = role === "buyer" ? "/buyer" : role === "organizer" ? "/organizer" : "/admin";
    navigate({ to: target });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-2">
      {/* Left: form */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <Card className="w-full max-w-md border-border/60 bg-card">
          <CardContent className="p-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-amber-gradient shadow-glow">
                <Ticket className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
              </span>
              <span className="text-lg font-semibold">{t("brand.name")}</span>
            </div>
            <h1 className="text-2xl font-semibold">{t("auth.title")}</h1>
            <p className="text-sm text-muted-foreground mt-1">{t("auth.subtitle")}</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">{t("auth.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@stagepass.com"
                  className={dir === "rtl" ? "text-right" : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t("auth.password")}</Label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>

              <div className="space-y-2">
                <Label>{t("auth.roleHint")}</Label>
                <div className="grid grid-cols-3 gap-2">
                  {ROLES.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={cn(
                        "rounded-md border px-3 py-2 text-sm capitalize transition-colors",
                        role === r
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {t(`auth.role.${r}`)}
                    </button>
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full bg-amber-gradient text-primary-foreground hover:opacity-90 shadow-glow">
                {t("auth.submit")}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Right: visual */}
      <div className="hidden lg:block relative bg-hero border-s border-border/60">
        <div className="absolute inset-0 opacity-40" aria-hidden>
          <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        </div>
        <div className="relative h-full flex items-end p-12">
          <blockquote className="max-w-md">
            <p className="text-2xl font-medium leading-snug">{t("discover.title")}</p>
            <p className="mt-3 text-sm text-muted-foreground">{t("discover.subtitle")}</p>
          </blockquote>
        </div>
      </div>
    </div>
  );
}