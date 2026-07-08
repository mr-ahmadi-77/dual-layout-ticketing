import { createFileRoute } from "@tanstack/react-router";
import { RoleGate } from "@/components/role-gate";

export const Route = createFileRoute("/buyer")({
  head: () => ({ meta: [{ title: "Buyer Dashboard — Stagepass" }] }),
  component: BuyerPage,
});

function BuyerPage() {
  return (
    <RoleGate allow={["buyer"]}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-semibold">Your orders</h1>
        <p className="text-muted-foreground mt-2">
          Live order status, transaction history, and QR tickets will appear here.
        </p>
      </div>
    </RoleGate>
  );
}
