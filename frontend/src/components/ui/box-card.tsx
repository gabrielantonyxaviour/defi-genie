import { LineChart, LineChartIcon, LucideGanttChartSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

export default function BoxCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: any;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div
          className={`text-2xl font-bold ${
            title != "Net Spent"
              ? value[0] != "-"
                ? "text-green-500"
                : "text-red-500"
              : ""
          }`}
        >
          <span className={` `}>$</span> {value}
        </div>
        <p className="text-xs text-muted-foreground">+180.1% from last month</p>
      </CardContent>
    </Card>
  );
}
