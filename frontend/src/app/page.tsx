"use client";

import { useAccount } from "wagmi";
import DefaultLanding from "@/components/sections/default-landing";
import { TokenBalance } from "@/components/ui/token-balance";
import TokenBalanceCard from "@/components/sections/token-balance-card";
import PieChartCard from "@/components/sections/pie-chart-card";
import Image from "next/image";
export default function Page() {
  const { status } = useAccount();

  if (status == "disconnected") return <DefaultLanding />;

  return (
    <div className="flex-1">
      <div className="flex flex-col items-center  py-6">
        <Image
          src={"/coins/bnb.png"}
          height={50}
          width={60}
          alt="Binance"
          className="rounded-full"
        />
        <p className="text-3xl mt-4 mb-2 font-bold">Binance Smart Chain</p>
        <p className="text-sm text-muted-foreground ">Net Worth</p>
        <p className="text-md font-semibold">
          <span className="text-muted-foreground mx-1">$</span>8.98
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <TokenBalanceCard />
        <PieChartCard />
      </div>
    </div>
  );
}
