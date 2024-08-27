import { CardContent } from "@/components/ui/card";

export default function Receive({ stakeAmount }: { stakeAmount: string }) {
  return (
    <>
      <div className="flex justify-between pt-4 w-[90%] mx-auto">
        <p className="font-medium text-sm text-muted-foreground">
          You will receive
        </p>
        <p className="font-medium text-sm text-whtie">{stakeAmount} STONE</p>
      </div>
      <div className="flex justify-between pt-1 w-[90%] mx-auto">
        <p className="font-medium text-sm text-muted-foreground">
          Exchange Rate
        </p>
        <p className="font-medium text-sm text-whtie">1 STONE = 1.0248 ETH</p>
      </div>
    </>
  );
}
