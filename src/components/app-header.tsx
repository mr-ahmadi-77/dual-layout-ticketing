import { Link, useRouter } from "@tanstack/react-router";
import { Globe, LogOut, Ticket } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useRbac, type Role } from "@/lib/rbac";
import { cn } from "@/lib/utils";

type NavItem = { to: string; labelKey: string; roles: (Role | "guest")[] };

const NAV: NavItem[] = [
  { to: "/", labelKey: "nav.discover", roles: ["guest", "buyer", "organizer", "admin"] },
  { to: "/buyer", labelKey: "nav.myTickets", roles: ["buyer"] },
  { to: "/organizer", labelKey: "nav.dashboard", roles: ["organizer"] },
  { to: "/admin", labelKey: "nav.admin", roles: ["admin"] },
];

export function AppHeader() {
  const { locale, toggle, t } = useI18n();
  const { user, role, isAuthenticated, signOut } = useRbac();
  const router = useRouter();

  // Strict RBAC visibility: hide protected paths from users who cannot access them.
  const visible = NAV.filter((item) => item.roles.includes(role));

  const handleLogout = () => {
    signOut();
    router.navigate({ to: "/" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Ticket className="size-4" aria-hidden />
          </span>
          {t("brand.name")}
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {visible.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className={cn(
                "text-sm text-muted-foreground transition-colors hover:text-foreground",
                "data-[status=active]:font-medium data-[status=active]:text-foreground",
              )}
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            className="flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            aria-label={t("nav.toggleLang")}
          >
            <Globe className="size-4" aria-hidden />
            <span className="font-medium">{locale === "en" ? "EN" : "FA"}</span>
          </button>

          {isAuthenticated ? (
            <div className="hidden items-center gap-3 md:flex">
              <span className="flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                <span className="size-1.5 rounded-full bg-primary" aria-hidden />
                {user?.name}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <LogOut className="size-4" aria-hidden />
                {t("nav.logout")}
              </button>
            </div>
          ) : (
            <div className="hidden items-center gap-3 md:flex">
              <Link to="/auth" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {t("nav.login")}
              </Link>
              <Link
                to="/auth"
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                {t("nav.signup")}
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
