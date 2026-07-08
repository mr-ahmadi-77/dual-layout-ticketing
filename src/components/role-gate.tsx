import { Link } from "@tanstack/react-router";
import { ShieldAlert } from "lucide-react";
import type { ReactNode } from "react";
import { useRbac, type Role } from "@/lib/rbac";
import { Button } from "@/components/ui/button";

export function RoleGate({ allow, children }: { allow: Role[]; children: ReactNode }) {
  const { role, isAuthenticated } = useRbac();
  if (allow.includes(role)) return <>{children}</>;

  return (
    <div className="mx-auto max-w-md text-center py-24 px-6">
      <div className="mx-auto w-12 h-12 rounded-full bg-destructive/15 grid place-items-center mb-4">
        <ShieldAlert className="h-5 w-5 text-destructive" />
      </div>
      <h1 className="text-xl font-semibold">Access restricted</h1>
      <p className="text-sm text-muted-foreground mt-2">
        This area is limited to: {allow.join(", ")}. You are signed in as <b>{role}</b>.
      </p>
      <Button asChild className="mt-6">
        <Link to={isAuthenticated ? "/" : "/auth"}>
          {isAuthenticated ? "Back to Discover" : "Sign in"}
        </Link>
      </Button>
    </div>
  );
}
