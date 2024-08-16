"use client";

import DefaultLanding from "@/components/sections/default-landing";
import PositionsCard from "@/components/sections/positions-card";
import RecentActionsCard from "@/components/sections/recent-actions-card";
import BoxCard from "@/components/ui/box-card";
import { SAMPLE_GRAPH_RESPONSE } from "@/lib/constants";
import { getTotalClaimed, getTotalDeposited } from "@/lib/utils";
import {
  BaggageClaim,
  CircleDollarSign,
  LineChart,
  Notebook,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function Page() {
  const { address, status } = useAccount();
  const [positions, setPositions] = useState<any[] | null>([]);
  const [totalDeposited, setTotalDeposited] = useState<string | null>(null);
  const [totalClaimed, setTotalClaimed] = useState<string | null>(null);
  // Get Net Spent
  useEffect(() => {
    (async function () {
      let total = 0;
      for (let i = 0; i < SAMPLE_GRAPH_RESPONSE.data.positions.length; i++) {
        let pos = SAMPLE_GRAPH_RESPONSE.data.positions[i];
        const res = await getTotalDeposited({
          token0: pos.token0.symbol,
          token1: pos.token1.symbol,
          depositedToken0: pos.depositedToken0,
          depositedToken1: pos.depositedToken1,
        });
        console.log("res");
        console.log(res);
        total += parseFloat(res);
      }

      console.log("total");
      console.log(total);

      setTotalDeposited(total.toString());
    })();
  }, [positions]);
  useEffect(() => {
    (async function () {
      let total = 0;
      for (let i = 0; i < SAMPLE_GRAPH_RESPONSE.data.positions.length; i++) {
        let pos = SAMPLE_GRAPH_RESPONSE.data.positions[i];
        const res = await getTotalClaimed({
          token0: pos.token0.symbol,
          token1: pos.token1.symbol,
          claimedToken0: pos.collectedFeesToken0,
          claimedToken1: pos.collectedFeesToken1,
        });
        console.log("res");
        console.log(res);
        total += parseFloat(res);
      }

      console.log("total");
      console.log(total);

      setTotalClaimed(total.toString());
    })();
  }, [positions]);

  // Get Claimmables

  if (status == "disconnected") return <DefaultLanding />;
  if (totalDeposited == null || positions == null) return <div>Loading...</div>;

  return (
    <div className="flex-1 flex flex-col space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <BoxCard
          title="Positions"
          value={SAMPLE_GRAPH_RESPONSE.data.positions.length.toString()}
          icon={<Notebook className="h-6 w-6 text-yellow-500 " />}
        />
        <BoxCard
          title="Net Spent"
          value={totalDeposited}
          icon={<CircleDollarSign className="h-6 w-6 text-yellow-500 " />}
        />

        <BoxCard
          title="Claimed Fees"
          value={totalClaimed != "0" ? "+" + totalClaimed : totalClaimed}
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
            depositedToken0: position.depositedToken0,
            depositedToken1: position.depositedToken1,
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
