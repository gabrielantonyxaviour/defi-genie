"use client";

import { useAccount, useBalance } from "wagmi";
import DefaultLanding from "@/components/sections/default-landing";
import { TokenBalance } from "@/components/ui/token-balance";
import TokenBalanceCard from "@/components/sections/token-balance-card";
import Image from "next/image";
import { PieChartComponent } from "@/components/ui/pie-chart";
import { useEffect } from "react";
export default function Page() {
  const { status, address } = useAccount();
  const { data } = useBalance({
    address: "0x5A6B842891032d702517a4E52ec38eE561063539",
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (status == "disconnected") return <DefaultLanding />;

  return (
    <div className="flex-1">
      <div className="flex flex-col items-center py-6">
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
          <span className="text-muted-foreground mx-1">$</span>
          {data?.value}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <TokenBalanceCard />
        <PieChartComponent />
      </div>
    </div>
  );
}
