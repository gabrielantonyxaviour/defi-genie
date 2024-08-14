import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Positions } from "@/components/ui/positions";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { useState } from "react";

export default function PositionsCard() {
  const [checked, SetChecked] = useState(false);
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between items-center">
            <p>UniswapV3 Positions</p>
            <div className="hidden md:flex items-center space-x-6">
              <div className="hidden lg:flex items-center space-x-2">
                <Switch
                  checked={checked}
                  onCheckedChange={() => {
                    SetChecked(!checked);
                  }}
                />
                <Label
                  htmlFor="airplane-mode"
                  className="text-xs font-semibold"
                >
                  View Closed
                </Label>
              </div>

              <Link
                href={"https://app.uniswap.org/add"}
                target="_blank"
                className={`${buttonVariants({
                  variant: "secondary",
                })} h-8 px-3 text-xs flex items-center `}
              >
                <Plus className="mr-2 h-4 w-4" /> New Position
              </Link>
            </div>
          </div>
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
