"use client";
import ApyTvl from "@/components/sections/stake/apy-tvl";
import SwitchChainHeader from "@/components/sections/stake/header";
import Receive from "@/components/sections/stake/receive";
import Stake from "@/components/sections/stake/stake";
import StakeTransaction from "@/components/sections/stake/transaction";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import { useAccount, useBalance } from "wagmi";

export default function StakePage() {
  const [stakeAmount, setStakeAmount] = useState("0");
  const { address } = useAccount();
  const { data } = useBalance({ address });
  const [open, setOpen] = useState(false);
  return (
    <div className="flex justify-center items-center h-full">
      <Card className="border-none w-[500px] ">
        <SwitchChainHeader />
        <CardContent>
          <ApyTvl />
          <Stake
            stakeAmount={stakeAmount}
            setStakeAmount={setStakeAmount}
            balance={data?.formatted || "0"}
          />

          <Receive stakeAmount={stakeAmount} />
          <div className="px-4">
            <Button
              className="w-full mt-3 font-bold text-sm"
              disabled={
                parseFloat(stakeAmount) > parseFloat(data?.formatted || "0")
              }
              onClick={() => {
                setOpen(true);
              }}
            >
              {parseFloat(stakeAmount) > parseFloat(data?.formatted || "0")
                ? "Insufficient Balance"
                : "Stake"}
            </Button>
          </div>
          <div className="flex justify-end pt-2 text-muted-foreground space-x-1 px-4">
            <p className="font-semibold text-xs">Powered By </p>
            <Image
              src="/coins/stakestone.jpg"
              width={18}
              height={20}
              alt=""
              className="rounded-full bg-white"
            />
            <p className="font-semibold text-xs">StakeStone </p>
          </div>
        </CardContent>
      </Card>
      <StakeTransaction
        stakeAmount={stakeAmount}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}
