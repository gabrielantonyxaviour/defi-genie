import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowBigRightIcon,
  ArrowUpRightFromSquare,
  TicketX,
} from "lucide-react";
import { buttonVariants } from "./button";
import Link from "next/link";
import { Action } from "@/lib/constants";
import { timeAgo } from "@/lib/utils";

export function RecentActions({ actions }: { actions: Action[] }) {
  return (
    <div className="space-y-8">
      {actions.map((action, index) => (
        <div key={index} className="flex items-center">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              {action.actionId == "1" ? "Create Position" : "Add Liquidity"}
            </p>
            <p className="text-xs text-muted-foreground">
              {timeAgo(action.timeStamp)}
            </p>
          </div>
          <div className="ml-auto space-y-1 text-right">
            <Link
              href={"https://bscscan.com/tx/" + action.txId}
              target="_blank"
              className={`${buttonVariants({
                variant: "secondary",
              })} h-8 px-3 text-xs flex items-center `}
            >
              Explorer <ArrowUpRightFromSquare className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
