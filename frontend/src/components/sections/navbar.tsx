import Link from "next/link";

import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Home
      </Link>
      <Link
        href="/pool"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Pool
      </Link>
      <Link
        href="/stake"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Stake
      </Link>
      <Link
        href="/positions"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Positions
      </Link>
      <Link
        href="/chat"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Ask AI
      </Link>
    </nav>
  );
}
