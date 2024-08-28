"use client";
import Order from "@/components/sections/pool/order";
import Swap from "@/components/sections/pool/swap";
import Transaction from "@/components/sections/pool/transaction";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import ConnectButton from "@/components/ui/connect-button";
import {
  Menubar,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
} from "@/components/ui/menubar";
import { supportedchains, supportedcoins } from "@/lib/constants";

import axios from "axios";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { useAccount, useBalance, useSwitchChain } from "wagmi";
import { readContract } from "@wagmi/core";
import { config } from "@/lib/config";
import { erc20Abi, formatEther } from "viem";
import { roundUpToFiveDecimals } from "@/lib/utils";
interface ClassifyResponse {
  response: string;
  action: string;
  params: string;
}

export default function PoolPage() {
  const { status, address, chainId } = useAccount();
  const { switchChainAsync, switchChain } = useSwitchChain();
  const [selectedAction, setSelectedAction] = useState(false);
  const [fromAmount, setFromAmount] = useState("0");
  const [fromToken, setFromToken] = useState("usdt");
  const [fromBalance, setFromBalance] = useState("0");
  const [toLoading, setToLoading] = useState(false);
  const [toToken, setToToken] = useState("link");
  const [toAmount, setToAmount] = useState("0");
  const [conversionValue, setConversionValue] = useState("0");
  const [fromCoversionValue, setFromConversionValue] = useState("0");
  const [toCoversionValue, setToConversionValue] = useState("0");
  const [sellingPriceLoading, setSellingPriceLoading] = useState(false);
  const [openTransaction, setOpenTransaction] = useState(false);
  const [slippage, setSlippage] = useState("0.1");
  const [sellingPrice, setSellingPrice] = useState("0");
  const [classifyResponse, setClassifyResponse] = useState<ClassifyResponse>({
    response: "",
    action: "",
    params: "",
  });
  const { data: nativeBalance } = useBalance({
    address,
  });
  const [chainChevron, setChainChevron] = useState(true);
  const [readyForTrigger, setReadyForTrigger] = useState(false);
  useEffect(() => {
    console.log("Classify Response");
    console.log(classifyResponse);
    if (classifyResponse.action.length > 0) {
      setSelectedAction(classifyResponse.action == "swap" ? false : true);
      const p = classifyResponse.params.split("_");
      console.log(p);
      if (classifyResponse.params.length > 0 && p.length > 0) {
        const chain = p[0];

        const selectedChainId =
          chain.toLocaleLowerCase() == "bnb"
            ? 56
            : chain.toLocaleLowerCase() == "sepolia"
            ? 11155111
            : 1;
        if (selectedChainId != chainId)
          switchChain({
            chainId: selectedChainId,
          });
        if (
          readyForTrigger &&
          p[1].toLocaleLowerCase() == fromToken &&
          p[2].toLocaleLowerCase() == toToken &&
          ((classifyResponse.action == "swap" && p[3] == slippage) ||
            (classifyResponse.action == "limit order" &&
              p[3] == sellingPrice)) &&
          p[4] == fromAmount
        ) {
          setOpenTransaction(true);
          setReadyForTrigger(false);
        } else {
          setFromToken(p[1].toLocaleLowerCase());
          setToToken(p[2].toLocaleLowerCase());
          if (classifyResponse.action == "swap") setSlippage(p[3]);
          else {
            setSellingPrice((parseFloat(p[3]) / parseFloat(p[4])).toString());
          }
          setFromAmount(p[4]);
          setReadyForTrigger(true);
        }
      } else setReadyForTrigger(false);
    }
  }, [classifyResponse]);

  useEffect(() => {
    (async function () {
      setToLoading(true);
      setSellingPriceLoading(true);
      const response = await axios.get(
        `/api/coinmarketcap/convert?from=${fromToken}&to=${toToken}`
      );

      console.log(response.data);
      setFromConversionValue(response.data.amount.from);
      setToConversionValue(response.data.amount.to);

      if (selectedAction) {
        const cValue = response.data.amount.from / response.data.amount.to;
        setSellingPrice(response.data.amount.from);
        setConversionValue(cValue.toString());
        const f = fromAmount == "" ? "0" : fromAmount;
        setToAmount((parseFloat(f) * cValue).toString());
      } else {
        const cValue = response.data.amount.from / response.data.amount.to;
        console.log(cValue);
        const f = fromAmount == "" ? "0" : fromAmount;
        const s = slippage == "" ? "0" : slippage;
        const cValueWithSlippage = cValue * (1 - parseFloat(s) / 100);

        setConversionValue(cValue.toString());
        setToAmount((parseFloat(f) * cValueWithSlippage).toString());
      }
      setSellingPriceLoading(false);
      setToLoading(false);
    })();
  }, [fromToken, toToken]);

  useEffect(() => {
    if (selectedAction) {
      if (sellingPrice == "0") setSellingPrice(fromCoversionValue);
      const f = fromAmount == "" ? "0" : fromAmount;
      const s = sellingPrice == "" ? "0" : sellingPrice;
      const cValue = parseFloat(s) / parseFloat(toCoversionValue);
      setConversionValue(cValue.toString());
      setToAmount((parseFloat(f) * cValue).toString());
    } else {
      console.log(fromAmount);
      console.log(conversionValue);
      console.log(slippage);
      const f = fromAmount == "" ? "0" : fromAmount;
      const s = slippage == "" ? "0" : slippage;
      setToAmount(
        (
          parseFloat(f) *
          parseFloat(conversionValue) *
          (1 - parseFloat(s) / 100)
        ).toString()
      );
    }
  }, [fromAmount, slippage, sellingPrice]);

  useEffect(() => {
    if (selectedAction) {
      const f = fromAmount == "" ? "0" : fromAmount;
      const s = sellingPrice == "" ? "0" : sellingPrice;
      const cValue = parseFloat(s) / parseFloat(toCoversionValue);
      setConversionValue(cValue.toString());
      setToAmount((parseFloat(f) * cValue).toString());
    } else {
      const cValue =
        parseFloat(fromCoversionValue) / parseFloat(toCoversionValue);
      console.log(cValue);
      const f = fromAmount == "" ? "0" : fromAmount;
      const s = slippage == "" ? "0" : slippage;
      const cValueWithSlippage = cValue * (1 - parseFloat(s) / 100);

      setConversionValue(cValue.toString());
      setToAmount((parseFloat(f) * cValueWithSlippage).toString());
    }
  }, [selectedAction]);

  useEffect(() => {
    if (fromToken == "nativeEth" || fromToken == "nativeBnb") {
      console.log("BALANCE");
      console.log(nativeBalance?.formatted || "0");
      setFromBalance(nativeBalance?.formatted || "0");
    } else {
      const tokenAddress = supportedcoins[fromToken].token[chainId || 11155111];
      (async function () {
        const result = await readContract(config, {
          abi: erc20Abi,
          address: tokenAddress,
          functionName: "balanceOf",
          args: [address as `0x${string}`],
        });
        console.log("TOKEN BALANCE");
        console.log(roundUpToFiveDecimals(formatEther(result)));
        setFromBalance(roundUpToFiveDecimals(formatEther(result)));
      })();
    }
  }, [fromToken]);

  useEffect(() => {
    try {
      if (chainId == 97) {
        switchChain({ chainId: 56 });
      }
      setFromToken("usdt");
      setToToken("link");
    } catch (e) {
      console.log(e);
    }
  }, [chainId]);
  if (chainId == 97)
    return (
      <div className="flex flex-col space-y-4 justify-center items-center my-auto">
        <p className="text-lg font-semibold">
          Please switch your chain to <span className="text-primary">Swap</span>
        </p>
        <div className="flex flex-col items-center">
          <ConnectButton />
        </div>
      </div>
    );
  return (
    <div className="flex justify-center items-center h-full">
      <Card className="border-none w-[500px] ">
        <CardTitle>
          <div className="flex justify-between items-center px-3 py-1">
            <div className="flex ">
              <Button
                variant={"ghost"}
                className={`hover:bg-transparent  ${
                  !selectedAction
                    ? "text-primary"
                    : "text-muted-foreground font-semibold"
                }`}
                onClick={async () => {
                  setSelectedAction(false);
                }}
              >
                Swap
              </Button>
              <Button
                variant={"ghost"}
                className={`hover:bg-transparent  ${
                  selectedAction
                    ? "text-primary"
                    : "text-muted-foreground font-semibold"
                }`}
                onClick={() => setSelectedAction(true)}
              >
                Limit
              </Button>
            </div>
            <Menubar
              onClick={() => {
                setChainChevron(!chainChevron);
              }}
              className="border-none text-sm"
            >
              <MenubarMenu>
                <MenubarTrigger
                  onClick={() => {
                    setChainChevron(!chainChevron);
                  }}
                >
                  <div className="flex space-x-2 items-center ">
                    <Image
                      src={
                        supportedchains[(chainId || 11155111).toString()].image
                      }
                      width={20}
                      height={20}
                      alt=""
                      className="rounded-full"
                    />
                    <p>
                      {supportedchains[(chainId || 11155111).toString()].name}
                    </p>
                    {!chainChevron ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </div>
                </MenubarTrigger>
                <MenubarContent>
                  {Object.values(supportedchains)
                    .sort((a, b) => a.id - b.id)
                    .map((coin) => (
                      <MenubarItem
                        disabled={coin.poolDisabled}
                        className=" cursor-pointer w-full"
                        onClick={async () => {
                          await switchChainAsync({
                            chainId: coin.chainId,
                          });
                          setChainChevron(true);
                        }}
                      >
                        <div className="flex space-x-2">
                          <Image
                            src={coin.image}
                            width={20}
                            height={20}
                            alt=""
                            className="rounded-full"
                          />
                          <p>{coin.name}</p>
                        </div>
                      </MenubarItem>
                    ))}
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </CardTitle>
        {selectedAction ? (
          <Order
            {...{
              fromAmount,
              setFromAmount,
              fromToken,
              setFromToken,
              toToken,
              setToToken,
              toAmount,
              sellingPrice,
              setSellingPrice,
              sellingPriceLoading,
              triggerAction: () => {
                setOpenTransaction(true);
              },
              isTestnet:
                supportedchains[(chainId || 11155111).toString()].isTestnet,
            }}
          />
        ) : (
          <Swap
            {...{
              fromAmount,
              setFromAmount,
              fromToken,
              setFromToken,
              toToken,
              setToToken,
              toAmount,
              setSlippage,
              slippage,
              fromBalance,
              toLoading,
              triggerAction: () => {
                setOpenTransaction(true);
              },
              openTransaction,
              isTestnet:
                supportedchains[(chainId || 11155111).toString()].isTestnet,
            }}
          />
        )}
      </Card>
      <Transaction
        open={openTransaction}
        setOpen={setOpenTransaction}
        action={"swap"}
        fromAmount={fromAmount}
        fromToken={fromToken}
        toToken={toToken}
        toAmount={toAmount}
      />
    </div>
  );
}
