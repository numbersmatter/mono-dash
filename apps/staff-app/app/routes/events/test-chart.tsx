

import { TrendingUp } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { ChartConfig, ChartContainer } from "~/components/ui/chart"
const chartData = [
  { browser: "chrome", visitors: 6, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 2, fill: "var(--color-safari)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(60 80% 50% /0)",
  },
} satisfies ChartConfig

export function TestChart({
  totalReservations, approvedReservations, reservationsDelivered
}: {
  totalReservations: number,
  approvedReservations: number,
  reservationsDelivered: number
}) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{totalReservations}</CardTitle>
        <CardDescription>Total Requests</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={180}
            endAngle={0}
            innerRadius={80}
            outerRadius={110}
            barSize={60}
          >
            <RadialBar
              dataKey="visitors"
              data={[chartData[1]]}
              background
              stackId={"a"}
            />
            <RadialBar
              dataKey="visitors"
              data={[chartData[0]]}
              maxBarSize={1}
              stackId={"a"}
            />


            {/* <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 80]}
            /> */}
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {approvedReservations}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Approved Requests
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          This event had {totalReservations} requests for food boxes and {approvedReservations} were approved.
        </div>
        <div className="leading-none text-muted-foreground">
          {reservationsDelivered} were delivered.
        </div>
      </CardFooter>
    </Card>
  )
}
