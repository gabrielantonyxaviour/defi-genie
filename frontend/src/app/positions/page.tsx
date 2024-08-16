"use client";

import PositionsCard from "@/components/sections/positions-card";
import RecentActionsCard from "@/components/sections/recent-actions-card";
import BoxCard from "@/components/ui/box-card";
import { SAMPLE_GRAPH_RESPONSE } from "@/lib/constants";
import {
  BaggageClaim,
  CircleDollarSign,
  LineChart,
  Notebook,
} from "lucide-react";
import { useState } from "react";
import { useAccount } from "wagmi";

export default function Page() {
  const { address } = useAccount();
  const [positions, setPositions] = useState<any[]>([]);

  // TODO: get all positions

  return (
    <div className="flex-1 flex flex-col space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <BoxCard
          title="Positions"
          value={SAMPLE_GRAPH_RESPONSE.data.positions.length.toString()}
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
      <PositionsCard
        positions={SAMPLE_GRAPH_RESPONSE.data.positions.map((position) => {
          return {
            id: position.id,
            token0: position.token0.symbol,
            token1: position.token1.symbol,
            feeTier: (parseFloat(position.pool.feeTier) / 10000)
              .toFixed(2)
              .toString(),
            minThreshold: parseFloat(position.tickUpper.price1)
              .toFixed(2)
              .toString(),
            maxThreshold: parseFloat(position.tickLower.price1)
              .toFixed(2)
              .toString(),
            status: "In range",
          };
        })}
      />
      <RecentActionsCard
        actions={SAMPLE_GRAPH_RESPONSE.data.mints.map((mint) => {
          return {
            txId: mint.transaction.id,
            actionId:
              mint.transaction.id ==
              "0x9e8c3ecb775a144197619bed7a9f10ad8c8951a6e123c3925ab4ccec2aa0a916"
                ? "1"
                : "2",
            timeStamp: mint.timestamp,
          };
        })}
      />
    </div>
  );
}
