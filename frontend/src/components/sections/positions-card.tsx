import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Positions } from "@/components/ui/positions";
import { buttonVariants } from "../ui/button";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import PositionsHeader from "../ui/positions-header";

export default function PositionsCard() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>
          <PositionsHeader />
        </CardTitle>
        <CardDescription>
          Monitor your positions created in UniswapV3.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Positions />
      </CardContent>
    </Card>
  );
}
