import { Link } from "@tanstack/react-router";
import { Languages, LogOut, Ticket, UserCircle2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useRbac, type Role } from "@/lib/rbac";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

type NavItem = { to: string; labelKey: string; roles: Role[] };

// RBAC: Each nav item declares which roles may see it. Guests only see Discover.
const NAV: NavItem[] = [
  { to: "/", labelKey: "nav.discover", roles: ["guest", "buyer", "organizer", "admin"] },
  { to: "/buyer", labelKey: "nav.orders", roles: ["buyer"] },
  { to: "/organizer", labelKey: "nav.events", roles: ["organizer"] },
  { to: "/admin", labelKey: "nav.dashboard", roles: ["admin"] },
];

export function AppHeader() {
  const { t, locale, toggle, dir } = useI18n();
  const { user, role, isAuthenticated, signOut } = useRbac();

  const visible = NAV.filter((item) => item.roles.includes(role));

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-amber-gradient shadow-glow transition-transform group-hover:scale-105">
            <Ticket className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
          </span>
          <span className="text-lg font-semibold tracking-tight">{t("brand.name")}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {visible.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground data-[status=active]:text-foreground data-[status=active]:bg-muted"
              activeOptions={{ exact: item.to === "/" }}
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </nav>

        <div className={dir === "rtl" ? "mr-auto flex items-center gap-2" : "ml-auto flex items-center gap-2"}>
          <Button variant="ghost" size="sm" onClick={toggle} className="gap-1.5">
            <Languages className="h-4 w-4" />
            <span className="text-xs font-medium uppercase">{locale === "en" ? "FA" : "EN"}</span>
          </Button>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <UserCircle2 className="h-5 w-5" />
                  <span className="hidden sm:inline">{user?.name}</span>
                  <Badge variant="secondary" className="uppercase text-[10px]">{role}</Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  {user?.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="gap-2">
                  <LogOut className="h-4 w-4" />
                  {t("nav.signOut")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild size="sm" variant="default">
              <Link to="/auth">{t("nav.signIn")}</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}