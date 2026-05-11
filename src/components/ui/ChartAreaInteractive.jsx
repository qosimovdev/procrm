import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartData = [
  { date: "2026-04-01", completed: 10, inProgress: 5 },
  { date: "2026-04-02", completed: 15, inProgress: 7 },
  { date: "2026-04-03", completed: 18, inProgress: 6 },
  { date: "2026-04-04", completed: 22, inProgress: 8 },
  { date: "2026-04-19", completed: 28, inProgress: 10 },
  { date: "2026-04-20", completed: 30, inProgress: 12 },
  { date: "2026-04-21", completed: 35, inProgress: 9 },
  { date: "2026-04-22", completed: 40, inProgress: 11 },
  { date: "2026-05-08", completed: 48, inProgress: 14 },
];

const chartConfig = {
  completed: {
    label: "Completed Tasks",
    color: "var(--green)",
  },
  inProgress: {
    label: "In Progress Tasks",
    color: "var(--purple-light)",
  },
};

export function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date();

    let daysToSubtract = 90;
    if (timeRange === "30d") daysToSubtract = 30;
    if (timeRange === "7d") daysToSubtract = 7;

    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);

    return date >= startDate;
  });

  return (
    <Card className="pt-0 glass shadow-purple rounded-xl">
      {/* HEADER */}
      <CardHeader className="flex items-center justify-between border-b py-5 sm:flex-row">
        <div className="grid gap-1">
          <CardTitle className="text-2xl text-text-primary">
            Project Progress
          </CardTitle>
          <CardDescription className="text-sm">
            Task completion vs in-progress overview
          </CardDescription>
        </div>

        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="hidden w-50 glass text-text-primary sm:flex">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>

          <SelectContent className="glass-strong text-text-primary">
            <SelectItem value="90d">Last 3 months</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      {/* CHART */}
      <CardContent className="h-72 w-full">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1} />
              </linearGradient>

              <linearGradient id="fillProgress" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />

            <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />

            {/* IN PROGRESS */}
            <Area
              dataKey="inProgress"
              type="natural"
              fill="url(#fillProgress)"
              stroke="#a855f7"
              stackId="a"
            />

            {/* COMPLETED */}
            <Area
              dataKey="completed"
              type="natural"
              fill="url(#fillCompleted)"
              stroke="#22c55e"
              stackId="a"
            />

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
