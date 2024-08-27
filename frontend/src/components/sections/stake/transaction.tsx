"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { supportedchains, supportedcoins } from "@/lib/constants";
import { roundUpToFiveDecimals } from "@/lib/utils";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount, useWriteContract } from "wagmi";

export default function StakeTransaction({
  stakeAmount,
  open,
  setOpen,
}: {
  stakeAmount: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [actionTx, setActionTx] = useState("");
  const { toast } = useToast();
  const { chainId, address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [txStarted, setTxStarted] = useState(false);

  useEffect(() => {
    if (actionTx != "") {
      toast({
        title: `Stake Confirmed`,
        description: "Transaction Sent Successfully",
        action: (
          <ToastAction altText="Goto schedule to undo">
            <Link
              target="_blank"
              href={
                supportedchains[(chainId || 11155111).toString()].explorer +
                "tx/" +
                actionTx
              }
            >
              View
            </Link>
          </ToastAction>
        ),
      });
    }
  }, [actionTx]);
  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Stake</DialogTitle>
          <DialogDescription>
            <p>Check the summary of the transaction</p>
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-around w-full text-center items-center text-sm">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <p>From</p>
            <Image
              src={"/coins/ethereum.png"}
              width={50}
              height={50}
              alt="coin"
              className="mx-auto rounded-full"
            />
            <p>{roundUpToFiveDecimals(stakeAmount)} ETH</p>
          </div>
          <div className="flex flex-col justify-center">
            <ArrowBigRight size={30} />
            <ArrowBigLeft size={30} />
          </div>
          <div className="flex flex-col space-y-3">
            <p>To</p>
            <Image
              src={"/coins/stakestone.jpg"}
              width={50}
              height={50}
              alt="coin"
              className="mx-auto rounded-full"
            />
            <p>{roundUpToFiveDecimals(stakeAmount)} STONE</p>
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={txStarted}
            onClick={async () => {
              //   setTxStarted(2);
              //   try {
              //     const tx = await writeContractAsync({
              //       abi: swapRouterAbi,
              //       address:
              //         supportedchains[(chainId || 11155111).toString()]
              //           .swapHelper,
              //       functionName: "swap",
              //       args: [
              //         fromToken == "nativeEth" || fromToken == "nativeBnb"
              //           ? zeroAddress
              //           : supportedcoins[fromToken].token[chainId || 11155111],
              //         toToken == "nativeEth"
              //           ? zeroAddress
              //           : supportedcoins[toToken].token[chainId || 11155111],
              //         BigInt(parseEther(fromAmount)),
              //       ],
              //       value:
              //         fromToken == "nativeEth"
              //           ? BigInt(parseEther(fromAmount))
              //           : BigInt(0),
              //     });
              //     setActionTx(tx);
              //     setCompletedTxs(completedTxs + 1);
              //   } catch (e) {
              //     setTxStarted(1);
              //     console.log(e);
              //   }
            }}
          >
            Deposit Stake
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
