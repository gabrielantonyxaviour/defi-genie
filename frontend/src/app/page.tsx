"use client";

import { useAccount, useBalance } from "wagmi";
import DefaultLanding from "@/components/sections/default-landing";
import { TokenBalance } from "@/components/ui/token-balance";
import TokenBalanceCard from "@/components/sections/token-balance-card";
import Image from "next/image";
import { PieChartComponent } from "@/components/ui/pie-chart";
import { useEffect, useState } from "react";
import { roundUpToFiveDecimals } from "@/lib/utils";
import { getBalance } from "@wagmi/core";
import { config } from "@/lib/config";
import { TOKEN_ADDRESSES } from "@/lib/constants";

export default function Page() {
  const { status, address } = useAccount();
  const { data: bnbBalance } = useBalance({
    address,
  });

  const [bnbBalanceInUSD, setBnbBalanceInUSD] = useState<string | null>(null);
  const [usdcBalance, setUsdcBalance] = useState<string | null>(null);
  const [usdtBalance, setUsdtBalance] = useState<string | null>(null);

  useEffect(() => {
    console.log(bnbBalance);
    if (
      bnbBalance != undefined &&
      bnbBalanceInUSD == null &&
      bnbBalance?.value > 0
    ) {
      fetch(
        `/api/coinmarketcap/bnb-to-usd?amount=${bnbBalance.value.toString()}`
      )
        .then((res) => res.json())
        .then((data) => {
          setBnbBalanceInUSD(data.amount);
        });
    }

    if (usdcBalance == null && usdtBalance == null) {
      (async function () {
        const { formatted: usdc } = await getBalance(config, {
          address: address || "0x0000000000000000000000000000000000000000",
          token: TOKEN_ADDRESSES.usdc,
          unit: "ether",
        });
        const { formatted: usdt } = await getBalance(config, {
          address: address || "0x0000000000000000000000000000000000000000",
          token: TOKEN_ADDRESSES.usdt,
          unit: "ether",
        });
        setUsdcBalance(usdc);
        setUsdtBalance(usdt);
      })();
    }
  }, [address, bnbBalance]);

  if (status == "disconnected") return <DefaultLanding />;
  if (
    bnbBalanceInUSD == null ||
    usdcBalance == undefined ||
    usdtBalance == undefined
  )
    return <div>Loading...</div>;
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
          {roundUpToFiveDecimals(
            (
              parseFloat(bnbBalanceInUSD) +
              parseFloat(usdcBalance) +
              parseFloat(usdtBalance)
            ).toString() || "0"
          )}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <TokenBalanceCard
          balances={{
            bnb: roundUpToFiveDecimals(bnbBalance?.formatted.toString() || "0"),
            usdc: roundUpToFiveDecimals(
              usdcBalance != undefined ? usdcBalance.toString() : "0"
            ),
            usdt: roundUpToFiveDecimals(
              usdtBalance != undefined ? usdtBalance.toString() : "0"
            ),
          }}
          usdBalances={{
            bnb: roundUpToFiveDecimals(bnbBalanceInUSD || "0"),
            usdc: roundUpToFiveDecimals(
              usdcBalance != undefined ? usdcBalance.toString() : "0"
            ),
            usdt: roundUpToFiveDecimals(
              usdtBalance != undefined ? usdtBalance.toString() : "0"
            ),
          }}
        />
        <PieChartComponent
          usdBalances={{
            bnb: roundUpToFiveDecimals(bnbBalanceInUSD || "0"),
            usdc: roundUpToFiveDecimals(
              usdcBalance != undefined ? usdcBalance.toString() : "0"
            ),
            usdt: roundUpToFiveDecimals(
              usdtBalance != undefined ? usdtBalance.toString() : "0"
            ),
          }}
        />
      </div>
    </div>
  );
}
