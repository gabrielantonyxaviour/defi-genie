import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PieChartComponent as PieChart } from "@/components/ui/pie-chart";

export default function PieChartCard() {
  return (
    <Card>
      <CardHeader></CardHeader>
      <CardContent>
        <PieChart />
      </CardContent>
    </Card>
  );
}
