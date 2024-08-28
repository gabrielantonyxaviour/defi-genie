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
import Spinner from "@/components/ui/loading";
import { supportedchains, supportedcoins } from "@/lib/constants";

export default function Page() {
  const { status, address } = useAccount();

  const [ethBalance, setEthBalance] = useState<any>(null);
  const [ethBalanceInUSD, setEthBalanceInUSD] = useState<any>(null);
  const [bnbBalance, setBnbBalance] = useState<any>(null);
  const [bnbBalanceInUSD, setBnbBalanceInUSD] = useState<any>(null);
  const [usdcBalance, setUsdcBalance] = useState<any>(null);
  const [usdtBalance, setUsdtBalance] = useState<any>(null);
  const [linkBalance, setLinkBalance] = useState<any>(null);
  const [linkBalanceInUSD, setLinkBalanceInUSD] = useState<any>(null);
  const [totalValue, setTotalValue] = useState<any>(null);
  const [balanceFetched, setBalanceFetched] = useState(false);
  useEffect(() => {
    if (
      address != null &&
      ethBalance == null &&
      bnbBalance == null &&
      usdcBalance == null &&
      usdtBalance == null &&
      linkBalance == null
    ) {
      try {
        (async function () {
          const chains = Object.values(supportedchains);
          const tempEthBalance: any = {};
          const tempBnbBalance: any = {};
          const tempUsdcBalance: any = {};
          const tempUsdtBalance: any = {};
          const tempLinkBalance: any = {};
          for (let i = 0; i < chains.length; i++) {
            const chain = chains[i];
            const { formatted: native } = await getBalance(config, {
              address: address,
              chainId: chain.chainId,
            });
            if (chain.chainId == 56 || chain.chainId == 97) {
              tempBnbBalance[chain.chainId] = native;
            } else {
              tempEthBalance[chain.chainId] = native;
            }
            const usdcAddress = supportedcoins.usdc.token[chain.chainId];
            if (usdcAddress.length > 0) {
              const { formatted: usdc } = await getBalance(config, {
                address: address,
                chainId: chain.chainId,
                token: usdcAddress,
              });
              tempUsdcBalance[chain.chainId] = usdc;
            }
            const usdtAddress = supportedcoins.usdt.token[chain.chainId];
            if (usdtAddress.length > 0) {
              const { formatted: usdt } = await getBalance(config, {
                address: address,
                chainId: chain.chainId,
                token: usdtAddress,
              });
              tempUsdtBalance[chain.chainId] = usdt;
            }

            const linkAddress = supportedcoins.link.token[chain.chainId];
            if (linkAddress.length > 0) {
              const { formatted: link } = await getBalance(config, {
                address: address,
                chainId: chain.chainId,
                token: linkAddress,
              });
              tempLinkBalance[chain.chainId] = link;
            }
          }
          setEthBalance(
            Object.values(tempEthBalance).reduce(
              (acc: any, balance: any) => parseFloat(acc) + parseFloat(balance),
              0
            )
          );
          setBnbBalance(
            Object.values(tempBnbBalance).reduce(
              (acc: any, balance: any) => parseFloat(acc) + parseFloat(balance),
              0
            )
          );
          setUsdcBalance(
            Object.values(tempUsdcBalance).reduce(
              (acc: any, balance: any) => parseFloat(acc) + parseFloat(balance),
              0
            )
          );
          setUsdtBalance(
            Object.values(tempUsdtBalance).reduce(
              (acc: any, balance: any) => parseFloat(acc) + parseFloat(balance),
              0
            )
          );
          setLinkBalance(
            Object.values(tempLinkBalance).reduce(
              (acc: any, balance: any) => parseFloat(acc) + parseFloat(balance),
              0
            )
          );
          console.log("USD BALANCE");
          console.log(tempUsdcBalance);
          setBalanceFetched(true);
        })();
      } catch (e) {
        console.log("FETCH BALANCE ERROR");
        console.log(e);
      }
    }
    if (balanceFetched) {
      console.log("ALL BALANCES FETCHED");
      console.log(ethBalance);
      console.log(bnbBalance);
      console.log(usdcBalance);
      console.log(usdtBalance);
      console.log(linkBalance);
      try {
        (async function () {
          const res = await fetch(
            `/api/coinmarketcap/convert?from=link&to=eth`
          );
          const data = await res.json();
          const linkUsdValue = data.amount.from;
          const ethUsdValue = data.amount.to;

          const nextRes = await fetch(
            `/api/coinmarketcap/convert?from=bnb&to=eth`
          );
          const nextData = await nextRes.json();
          const bnbUsdValue = nextData.amount.from;
          let tempTotalValue = 0;
          tempTotalValue += ethBalance * ethUsdValue;
          tempTotalValue += bnbBalance * bnbUsdValue;
          tempTotalValue += usdcBalance;
          tempTotalValue += usdtBalance;
          tempTotalValue += linkBalance * linkUsdValue;

          setTotalValue(tempTotalValue.toString());
          setEthBalanceInUSD((ethBalance * ethUsdValue).toString());
          setBnbBalanceInUSD((bnbBalance * bnbUsdValue).toString());
          setLinkBalanceInUSD((linkBalance * linkUsdValue).toString());
        })();
      } catch (e) {
        console.log(e);
      }
    }
  }, [address, balanceFetched]);

  if (status == "disconnected") return <DefaultLanding />;
  if (totalValue == null)
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <Spinner />
      </div>
    );
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
          {roundUpToFiveDecimals(totalValue)}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <TokenBalanceCard
          balances={{
            eth: roundUpToFiveDecimals(ethBalance),
            bnb: roundUpToFiveDecimals(bnbBalance),
            usdc: roundUpToFiveDecimals(usdcBalance),
            usdt: roundUpToFiveDecimals(usdtBalance),
            link: roundUpToFiveDecimals(linkBalance),
          }}
          usdBalances={{
            eth: roundUpToFiveDecimals(ethBalanceInUSD),
            bnb: roundUpToFiveDecimals(bnbBalanceInUSD),
            usdc: roundUpToFiveDecimals(usdcBalance),
            usdt: roundUpToFiveDecimals(usdtBalance),
            link: roundUpToFiveDecimals(linkBalanceInUSD),
          }}
        />
        <PieChartComponent
          usdBalances={{
            bnb: roundUpToFiveDecimals(bnbBalanceInUSD),
            usdc: roundUpToFiveDecimals(usdcBalance),
            usdt: roundUpToFiveDecimals(usdtBalance),
            link: roundUpToFiveDecimals(linkBalanceInUSD),
            eth: roundUpToFiveDecimals(ethBalanceInUSD),
          }}
        />
      </div>
    </div>
  );
}
