import { Link } from "@tanstack/react-router";
import { ShieldAlert } from "lucide-react";
import type { ReactNode } from "react";
import { useRbac, type Role } from "@/lib/rbac";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export function RoleGate({ allow, children }: { allow: Role[]; children: ReactNode }) {
  const { role, isAuthenticated } = useRbac();
  const { t } = useI18n();
  if (allow.includes(role)) return <>{children}</>;

  return (
    <div className="mx-auto max-w-md text-center py-24 px-6">
      <div className="mx-auto w-12 h-12 rounded-full bg-destructive/15 grid place-items-center mb-4">
        <ShieldAlert className="h-5 w-5 text-destructive" />
      </div>
      <h1 className="text-xl font-semibold">{t("gate.title")}</h1>
      <p className="text-sm text-muted-foreground mt-2">
        {t("gate.body")} {t("gate.currentAs")} <b>{t(`role.${role}`) !== `role.${role}` ? t(`role.${role}`) : role}</b>.
      </p>
      <Button asChild className="mt-6">
        <Link to={isAuthenticated ? "/" : "/auth"}>
          {isAuthenticated ? t("gate.back") : t("gate.signin")}
        </Link>
      </Button>
    </div>
  );
}
