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
import { useTokenBalance } from "@/components/sections/context";

export default function Page() {
  const { status, address } = useAccount();
  const {
    totalBalanceMainnet,
    setTotalBalanceMainnet,
    totalBalanceTestnet,
    setTotalBalanceTestnet,
    balanceObject,
    setBalanceObject,
    balanceObjectInUSD,
    setBalanceObjectInUSD,
  } = useTokenBalance();
  const [balanceFetched, setBalanceFetched] = useState(false);
  const [hideTestnet, setHideTestnet] = useState(false);
  useEffect(() => {
    if (address != null && balanceObject == null) {
      try {
        (async function () {
          const chains = Object.values(supportedchains);
          const tempBalanceObject: any = {};
          const tempEthBalance: any = {};
          const tempBnbBalance: any = {};
          const tempUsdcBalance: any = {};
          const tempUsdtBalance: any = {};
          const tempLinkBalance: any = {};
          for (let i = 0; i < chains.length; i++) {
            const chain = chains[i];
            tempBalanceObject[chain.chainId] = {};
            const { formatted: native } = await getBalance(config, {
              address: address,
              chainId: chain.chainId,
            });
            if (chain.chainId == 56 || chain.chainId == 97) {
              tempBnbBalance[chain.chainId] = native;
            } else {
              tempEthBalance[chain.chainId] = native;
            }
            tempBalanceObject[chain.chainId].native = native;

            const usdcAddress = supportedcoins.usdc.token[chain.chainId];
            if (usdcAddress.length > 0) {
              const { formatted: usdc } = await getBalance(config, {
                address: address,
                chainId: chain.chainId,
                token: usdcAddress,
              });
              tempUsdcBalance[chain.chainId] = usdc;
              tempBalanceObject[chain.chainId].usdc = usdc;
            } else tempBalanceObject[chain.chainId].usdc = 0;
            const usdtAddress = supportedcoins.usdt.token[chain.chainId];
            if (usdtAddress.length > 0) {
              const { formatted: usdt } = await getBalance(config, {
                address: address,
                chainId: chain.chainId,
                token: usdtAddress,
              });
              tempUsdtBalance[chain.chainId] = usdt;
              tempBalanceObject[chain.chainId].usdt = usdt;
            } else tempBalanceObject[chain.chainId].usdt = 0;

            const linkAddress = supportedcoins.link.token[chain.chainId];
            if (linkAddress.length > 0) {
              const { formatted: link } = await getBalance(config, {
                address: address,
                chainId: chain.chainId,
                token: linkAddress,
              });
              tempLinkBalance[chain.chainId] = link;
              tempBalanceObject[chain.chainId].link = link;
            } else tempBalanceObject[chain.chainId].link = 0;
          }
          console.log("TEMP BALANCE OBJECT");
          console.log(tempBalanceObject);
          setBalanceObject(tempBalanceObject);
          setBalanceFetched(true);
        })();
      } catch (e) {
        console.log("FETCH BALANCE ERROR");
        console.log(e);
      }
    }
    if (balanceFetched) {
      console.log("ALL BALANCES FETCHED");
      console.log(balanceObject);
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
          let tempTotalValueMainnet = 0;
          let tempTotalValueTestnet = 0;
          let tempBalanceObjectInUSD: any = {};
          for (const [chainId, balances] of Object.entries(balanceObject)) {
            console.log(`Network ID: ${chainId}`);
            tempBalanceObjectInUSD[chainId] = {};
            for (const [token, balance] of Object.entries(balances as any)) {
              tempBalanceObjectInUSD[chainId][token] =
                (balance as any) *
                (token == "usdc" || token == "usdt"
                  ? 1
                  : token == "link"
                  ? linkUsdValue
                  : chainId == "56" || chainId == "97"
                  ? bnbUsdValue
                  : ethUsdValue);
              if (chainId == "1" || chainId == "56")
                tempTotalValueMainnet += tempBalanceObjectInUSD[chainId][token];
              else
                tempTotalValueTestnet += tempBalanceObjectInUSD[chainId][token];
            }
          }
          console.log("TEMP BALANCE OBJECT IN USD");
          console.log(tempBalanceObjectInUSD);
          setBalanceObjectInUSD(tempBalanceObjectInUSD);
          setTotalBalanceMainnet(tempTotalValueMainnet);
          setTotalBalanceTestnet(tempTotalValueTestnet);
        })();
      } catch (e) {
        console.log(e);
      }
    }
  }, [address, balanceFetched]);

  if (status == "disconnected") return <DefaultLanding />;
  if (totalBalanceMainnet == null || totalBalanceTestnet == null)
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <Spinner />
      </div>
    );
  return (
    <div className="flex-1">
      <div className="flex flex-col items-center py-6">
        <Image
          src={"/avatar.jpg"}
          height={50}
          width={60}
          alt="Avatar"
          className="rounded-full"
        />
        <p className="text-3xl mt-4 mb-2 font-bold">Your Portfolio</p>
        <div className="flex space-x-4">
          <div>
            <p className="text-sm text-muted-foreground ">Mainnet Worth</p>
            <p className="text-md font-semibold">
              <span className="text-muted-foreground mx-1">$</span>
              {roundUpToFiveDecimals(totalBalanceMainnet.toString())}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground ">Testnet Worth</p>
            <p className="text-md font-semibold">
              <span className="text-muted-foreground mx-1">$</span>
              {roundUpToFiveDecimals(totalBalanceTestnet.toString())}
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <TokenBalanceCard
          balances={{
            eth: roundUpToFiveDecimals(balanceObject[1].native),
            bnb: roundUpToFiveDecimals(balanceObject[56].native),
            usdc: roundUpToFiveDecimals(
              balanceObject[1].usdc + balanceObject[56].usdc
            ),
            usdt: roundUpToFiveDecimals(
              balanceObject[1].usdt + balanceObject[56].usdt
            ),
            link: roundUpToFiveDecimals(
              balanceObject[1].link + balanceObject[56].link
            ),
            teth: roundUpToFiveDecimals(balanceObject[11155111].native),
            tbnb: roundUpToFiveDecimals(balanceObject[97].native),
            tusdc: roundUpToFiveDecimals(
              balanceObject[11155111].usdc + balanceObject[97].usdc
            ),
            tusdt: roundUpToFiveDecimals(
              balanceObject[11155111].usdt + balanceObject[97].usdt
            ),
            tlink: roundUpToFiveDecimals(
              balanceObject[11155111].link + balanceObject[97].link
            ),
          }}
          usdBalances={{
            eth: roundUpToFiveDecimals(balanceObjectInUSD[1].native),
            bnb: roundUpToFiveDecimals(balanceObjectInUSD[56].native),
            usdc: roundUpToFiveDecimals(
              balanceObjectInUSD[1].usdc + balanceObjectInUSD[56].usdc
            ),
            usdt: roundUpToFiveDecimals(
              balanceObjectInUSD[1].usdt + balanceObjectInUSD[56].usdt
            ),
            link: roundUpToFiveDecimals(
              balanceObjectInUSD[1].link + balanceObjectInUSD[56].link
            ),
            teth: roundUpToFiveDecimals(balanceObjectInUSD[11155111].native),
            tbnb: roundUpToFiveDecimals(balanceObjectInUSD[97].native),
            tusdc: roundUpToFiveDecimals(
              balanceObjectInUSD[11155111].usdc + balanceObjectInUSD[97].usdc
            ),
            tusdt: roundUpToFiveDecimals(
              balanceObjectInUSD[11155111].usdt + balanceObjectInUSD[97].usdt
            ),
            tlink: roundUpToFiveDecimals(
              balanceObjectInUSD[11155111].link + balanceObjectInUSD[97].link
            ),
          }}
        />
        <PieChartComponent
          usdBalances={{
            eth: roundUpToFiveDecimals(balanceObjectInUSD[1].native),
            bnb: roundUpToFiveDecimals(balanceObjectInUSD[56].native),
            usdc: roundUpToFiveDecimals(
              balanceObjectInUSD[1].usdc + balanceObjectInUSD[56].usdc
            ),
            usdt: roundUpToFiveDecimals(
              balanceObjectInUSD[1].usdt + balanceObjectInUSD[56].usdt
            ),
            link: roundUpToFiveDecimals(
              balanceObjectInUSD[1].link + balanceObjectInUSD[56].link
            ),
            teth: roundUpToFiveDecimals(balanceObjectInUSD[11155111].native),
            tbnb: roundUpToFiveDecimals(balanceObjectInUSD[97].native),
            tusdc: roundUpToFiveDecimals(
              balanceObjectInUSD[11155111].usdc + balanceObjectInUSD[97].usdc
            ),
            tusdt: roundUpToFiveDecimals(
              balanceObjectInUSD[11155111].usdt + balanceObjectInUSD[97].usdt
            ),
            tlink: roundUpToFiveDecimals(
              balanceObjectInUSD[11155111].link + balanceObjectInUSD[97].link
            ),
          }}
          hideTestnet={hideTestnet}
        />
      </div>
    </div>
  );
}
