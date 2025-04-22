"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type BarChartCardProps = {
  title: string
  description?: string
  data: { [key: string]: any }[]
  config: ChartConfig
  dataKey: string
  categoryKey: string
  trendInfo?: string
  subtext?: string
}

export function BarChartCard({
  title,
  description,
  data,
  config,
  dataKey,
  categoryKey,
  trendInfo = "Trending up",
  subtext = "Showing data overview",
}: BarChartCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{ left:60 }}
          >
            <YAxis
              dataKey={categoryKey}
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                config[value as keyof typeof config]?.label ?? value
              }
            />
            <XAxis dataKey={dataKey} type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey={dataKey} layout="vertical" barSize={60} radius={3} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {trendInfo} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">{subtext}</div>
      </CardFooter>
    </Card>
  )
}
