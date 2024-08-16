import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TokenBalance } from "@/components/ui/token-balance";

export default function TokenBalanceCard({
  balances,
  usdBalances,
}: {
  balances: Record<string, string>;
  usdBalances: Record<string, string>;
}) {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Assets Owned</CardTitle>
        <CardDescription>
          Track your portoflio in Binance Smart Chain.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TokenBalance balances={balances} usdBalances={usdBalances} />
      </CardContent>
    </Card>
  );
}
