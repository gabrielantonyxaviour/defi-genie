import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowBigRightIcon, ArrowUpRightFromSquare } from "lucide-react";
import { buttonVariants } from "./button";
import Link from "next/link";

export function RecentActions() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">Create position</p>
          <p className="text-xs text-muted-foreground">7 days ago</p>
        </div>
        <div className="ml-auto space-y-1 text-right">
          <Link
            href={"https://app.uniswap.org/add"}
            target="_blank"
            className={`${buttonVariants({
              variant: "secondary",
            })} h-8 px-3 text-xs flex items-center `}
          >
            Explorer <ArrowUpRightFromSquare className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
      <div className="flex items-center">
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">Claim Fees</p>
          <p className="text-xs text-muted-foreground">7 days ago</p>
        </div>
        <div className="ml-auto space-y-1 text-right">
          <Link
            href={"https://app.uniswap.org/add"}
            target="_blank"
            className={`${buttonVariants({
              variant: "secondary",
            })} h-8 px-3 text-xs flex items-center `}
          >
            Explorer <ArrowUpRightFromSquare className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
      <div className="flex items-center">
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">Add liquidity</p>
          <p className="text-xs text-muted-foreground">7 days ago</p>
        </div>
        <div className="ml-auto space-y-1 text-right">
          <Link
            href={"https://app.uniswap.org/add"}
            target="_blank"
            className={`${buttonVariants({
              variant: "secondary",
            })} h-8 px-3 text-xs flex items-center `}
          >
            Explorer <ArrowUpRightFromSquare className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
