import Link from "next/link";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/"
        className={`text-sm font-medium ${
          pathname != "/" && " text-muted-foreground"
        } transition-colors hover:text-primary`}
      >
        Home
      </Link>
      <Link
        href="/pool"
        className={`text-sm font-medium ${
          pathname != "/pool" && " text-muted-foreground"
        } transition-colors hover:text-primary`}
      >
        Pool
      </Link>
      <Link
        href="/stake"
        className={`text-sm font-medium ${
          pathname != "/stake" && " text-muted-foreground"
        } transition-colors hover:text-primary`}
      >
        Stake
      </Link>
      <Link
        href="/positions"
        className={`text-sm font-medium ${
          pathname != "/positions" && " text-muted-foreground"
        } transition-colors hover:text-primary`}
      >
        Positions
      </Link>
    </nav>
  );
}
