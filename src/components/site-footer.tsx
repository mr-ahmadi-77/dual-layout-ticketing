import { Link } from "@tanstack/react-router";
import { Ticket } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-4 md:px-6">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Ticket className="size-4" aria-hidden />
            </span>
            {t("brand.name")}
          </div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">{t("brand.tagline")}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium">{t("footer.discover")}</h3>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">{t("footer.browse")}</Link></li>
            <li><Link to="/buyer" className="hover:text-foreground">{t("footer.myTickets")}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-medium">{t("footer.account")}</h3>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
            <li><Link to="/auth" className="hover:text-foreground">{t("footer.signIn")}</Link></li>
            <li><Link to="/organizer" className="hover:text-foreground">{t("footer.forOrganizers")}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-xs text-muted-foreground md:px-6">
          <p>{t("footer.copyright")}</p>
          <p className="font-mono">{t("footer.status")}</p>
        </div>
      </div>
    </footer>
  );
}
