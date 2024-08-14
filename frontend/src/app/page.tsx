"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useAccount } from "wagmi";
import ConnectButton from "@/components/ui/connect-button";
export default function Page() {
  const { status } = useAccount();
  return status == "connected" ? (
    <div className="flex-1 flex flex-col justify-center items-center">
      <h1 className="font-bold text-2xl">Welcome to Defi Genie</h1>
      <p>An AI assistant for Liquidity Provision</p>
      <div className="py-4">
        <ConnectButton />
      </div>
      <p className="text-xs">Connect your wallet to get started</p>
    </div>
  ) : (
    <ScrollArea className="h-[480px]">
      <div className="my-auto">
        <p>Whst is tyou na</p>
      </div>
    </ScrollArea>
  );
}
