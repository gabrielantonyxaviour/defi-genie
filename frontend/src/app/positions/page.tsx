"use client";

import PositionsCard from "@/components/sections/positions-card";
import BoxCard from "@/components/ui/box-card";
import { CircleDollarSign, LineChart } from "lucide-react";

export default function Page() {
  return (
    <div className="flex-1 flex flex-col space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <BoxCard
          title="Net Spent"
          value={"1234.67"}
          icon={<CircleDollarSign className="h-6 w-6 text-yellow-500 " />}
        />
        <BoxCard
          title="Profit / Loss"
          value={"1234.67"}
          icon={<LineChart className="h-6 w-6 text-yellow-500" />}
        />
      </div>
      <PositionsCard />
    </div>
  );
}
