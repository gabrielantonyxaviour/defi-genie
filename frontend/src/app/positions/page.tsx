"use client";

import PositionsCard from "@/components/sections/positions-card";
import RecentActionsCard from "@/components/sections/recent-actions-card";
import BoxCard from "@/components/ui/box-card";
import {
  BaggageClaim,
  CircleDollarSign,
  LineChart,
  Notebook,
} from "lucide-react";

export default function Page() {
  return (
    <div className="flex-1 flex flex-col space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <BoxCard
          title="Positions"
          value={"5"}
          icon={<Notebook className="h-6 w-6 text-yellow-500 " />}
        />
        <BoxCard
          title="Net Spent"
          value={"1234.67"}
          icon={<CircleDollarSign className="h-6 w-6 text-yellow-500 " />}
        />
        <BoxCard
          title="Net Revenue"
          value={"+12.67"}
          icon={<LineChart className="h-6 w-6 text-yellow-500" />}
        />
        <BoxCard
          title="Claimmables"
          value={"+12.67"}
          icon={<BaggageClaim className="h-6 w-6 text-yellow-500" />}
        />
      </div>
      <PositionsCard />
      <RecentActionsCard />
    </div>
  );
}
