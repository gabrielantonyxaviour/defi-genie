import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import From from "./from";
import To from "./to";
import { useAccount, useSwitchChain } from "wagmi";
import Slippage from "./slippage";
import Spinner from "@/components/ui/loading";
interface SwapProps {
  fromAmount: string;
  setFromAmount: (fromAmount: string) => void;
  fromToken: string;
  setFromToken: (fromToken: string) => void;
  toToken: string;
  setToToken: (toToken: string) => void;
  toAmount: string;
  slippage: string;
  setSlippage: (slippage: string) => void;
  toLoading: boolean;
  isTestnet: boolean;
  triggerAction: () => void;
}

export default function Swap({
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
  triggerAction,
  isTestnet,
}: SwapProps) {
  const { chainId } = useAccount();
  if (chainId == undefined)
    return (
      <div className="w-[75%] flex flex-col justify-center items-center">
        <Spinner />
      </div>
    );
  return (
    <Card className="border-none w-[500px] ">
      <CardContent className="">
        <From
          toToken={toToken}
          fromAmount={fromAmount}
          setFromAmount={setFromAmount}
          fromToken={fromToken}
          setFromToken={setFromToken}
          isTestnet={isTestnet}
        />
        <To
          fromToken={fromToken}
          toAmount={toAmount}
          toToken={toToken}
          setToToken={setToToken}
          isTestnet={isTestnet}
          toLoading={toLoading}
        />
        <Slippage slippage={slippage} setSlippage={setSlippage} />
        <Button
          variant={"default"}
          className="w-full font-bold"
          onClick={() => {
            triggerAction();
          }}
        >
          Swap
        </Button>
      </CardContent>
    </Card>
  );
}
