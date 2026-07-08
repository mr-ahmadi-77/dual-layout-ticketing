import { createFileRoute } from "@tanstack/react-router";
import { RoleGate } from "@/components/role-gate";

export const Route = createFileRoute("/organizer")({
  head: () => ({ meta: [{ title: "Organizer Dashboard — Stagepass" }] }),
  component: OrganizerPage,
});

function OrganizerPage() {
  return (
    <RoleGate allow={["organizer"]}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-semibold">Organizer dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Real-time sales, remaining capacity, revenue, and the event creation wizard.
        </p>
      </div>
    </RoleGate>
  );
}
