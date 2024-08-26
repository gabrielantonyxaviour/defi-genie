import Order from "@/components/sections/order";
import Swap from "@/components/sections/swap";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount, useSwitchChain } from "wagmi";

interface ClassifyResponse {
  response: string;
  action: string;
  params: string;
}

export default function PoolPage() {
  const { status, address, chainId } = useAccount();
  const { switchChain } = useSwitchChain();
  const [selectedAction, setSelectedAction] = useState(false);
  const [fromAmount, setFromAmount] = useState("0");
  const [fromToken, setFromToken] = useState("usdt");
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
          chain.toLocaleLowerCase() == "matic"
            ? 80002
            : chain.toLocaleLowerCase() == "arbitrum"
            ? 421614
            : 11155111;
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

  return (
    <>
      {" "}
      <Image src="/logo.png" width={100} height={100} alt="" />
      <Card className="border-none w-[500px] ">
        <CardTitle>
          <div className="flex items-center px-3 py-1">
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
              toLoading,
              triggerAction: () => {
                setOpenTransaction(true);
              },
            }}
          />
        )}
      </Card>
    </>
  );
}
