"use client"

import * as React from "react"
import { Pie, PieChart, Sector, Label } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type DataItem = {
  name: string
  value: number
  fill?: string
}

type InteractivePieChartCardProps = {
  id: string
  title: string
  description: string
  data: DataItem[]
  labelKey: string
  valueKey: string
  colorMap: Record<string, string>
  footer?: React.ReactNode
}

export function InteractivePieChartCard({
  id,
  title,
  description,
  data,
  labelKey,
  valueKey,
  colorMap,
  footer,
}: InteractivePieChartCardProps) {
  const [activeLabel, setActiveLabel] = React.useState(data[0][labelKey as keyof DataItem])

  const activeIndex = React.useMemo(
    () => data.findIndex((item) => item[labelKey as keyof DataItem] === activeLabel),
    [activeLabel, labelKey, data]
  )

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle
        id={id}
        config={Object.fromEntries(
          Object.entries(colorMap).map(([key, color]) => [
            key,
            { label: key, color },
          ])
        )}
      />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <Select value={String(activeLabel)} onValueChange={setActiveLabel}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select"
          >
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {data.map((item) => (
              <SelectItem
                key={String(item[labelKey as keyof DataItem])}
                value={String(item[labelKey as keyof DataItem])}
              >
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className="flex h-3 w-3 shrink-0 rounded-sm"
                    style={{
                      backgroundColor: colorMap[item[labelKey as keyof DataItem] ?? ""],
                    }}
                  />
                  {item[labelKey as keyof DataItem]}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="flex flex-1 justify-center pb-0 p-5">
        <ChartContainer
          id={id}
          config={Object.fromEntries(
            Object.entries(colorMap).map(([key, color]) => [
              key,
              { label: key, color },
            ])
          )}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={data}
              dataKey={valueKey}
              nameKey={labelKey}
              innerRadius={80}
              outerRadius={120}
              strokeWidth={2}
              activeIndex={activeIndex}
              activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
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
                          className="fill-foreground text-3xl font-bold"
                        >
                          {data[activeIndex]?.[valueKey as keyof DataItem]?.toLocaleString() ?? ""}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {title}
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>

      {footer && <div className="p-4 pt-2 border-t">{footer}</div>}
    </Card>
  )
}
