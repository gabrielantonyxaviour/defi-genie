"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Icons } from "@/components/ui/icons";
import { useAccount } from "wagmi";
import ConnectButton from "@/components/ui/connect-button";
export default function Page() {
  const { status } = useAccount();
  return (
    <div className="w-full h-full space-y-4">
      {status == "connected" ? (
        <div className="h-[480px] flex flex-col justify-center items-center">
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
      )}
      <div className="flex w-[75%] mx-auto">
        <Input
          type="text"
          disabled={true}
          placeholder="Enter your prompt"
          className="sticky top-0 z-50  border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        />
        <Button className="ml-2">
          <Icons.rightArrow className="h-3 w-3 fill-current" />
        </Button>
      </div>
    </div>
  );
}
