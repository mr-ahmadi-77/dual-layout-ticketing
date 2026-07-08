import { createFileRoute } from "@tanstack/react-router";
import { RoleGate } from "@/components/role-gate";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard — Stagepass" }] }),
  component: AdminPage,
});

function AdminPage() {
  return (
    <RoleGate allow={["admin"]}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-semibold">Admin console</h1>
        <p className="text-muted-foreground mt-2">
          Platform health, user & role management, and the venue layout builder.
        </p>
      </div>
    </RoleGate>
  );
}