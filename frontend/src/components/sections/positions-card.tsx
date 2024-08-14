import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TokenBalance } from "@/components/ui/token-balance";

export default function PositionsCard() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Your Positions</CardTitle>
        <CardDescription>
          Track your portoflio in Binance Smart Chain.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TokenBalance />
      </CardContent>
    </Card>
  );
}
