import { cn } from "@/lib/utils";

type Props = { className?: string; title?: string };

/**
 * Eventra brand mark.
 * A rounded gradient tile combining a ticket notch (events/tickets) with
 * a connective spark (experiences/connectivity).
 */
export function BrandMark({ className, title = "Eventra" }: Props) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-lg",
        "bg-[linear-gradient(135deg,hsl(var(--primary))_0%,hsl(var(--primary)/0.75)_100%)]",
        "text-primary-foreground shadow-sm ring-1 ring-primary/20",
        className,
      )}
      aria-hidden
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-[62%]"
        role="img"
        aria-label={title}
      >
        {/* Ticket silhouette with a center notch */}
        <path d="M4 8.5a1.5 1.5 0 0 1 1.5 -1.5h13a1.5 1.5 0 0 1 1.5 1.5v2a2 2 0 0 0 0 4v2a1.5 1.5 0 0 1 -1.5 1.5h-13A1.5 1.5 0 0 1 4 16.5v-2a2 2 0 0 0 0 -4v-2z" />
        {/* Spark: connectivity / experience */}
        <path d="M12 9.25v5.5" />
        <path d="M10.25 12h3.5" />
      </svg>
    </span>
  );
}