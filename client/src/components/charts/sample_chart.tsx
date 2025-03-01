"use client"
import { useState } from "react"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis } from "recharts"

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
} from "@/components/charts/base_chart"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export const description = "A multiple bar chart"

const monthlyData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const annualData = [
  { month: "2020", desktop: 1800, mobile: 1000 },
  { month: "2021", desktop: 2200, mobile: 1200 },
  { month: "2022", desktop: 2500, mobile: 1400 },
  { month: "2023", desktop: 2700, mobile: 1600 },
  { month: "2024", desktop: 2900, mobile: 1800 },
]

const chartConfig = {
  desktop: {
    label: "Work in office",
    
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Work from home",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function Component() {
  const [isAnnualView, setIsAnnualView] = useState(false)

  return (
    <Card>
      <CardHeader className="flex justify-between ">
        <div className="flex flex-col items-start">
          <CardTitle>Employer Satisfaction</CardTitle>
          <CardDescription>Track How Your Employer Feels Based On Survey</CardDescription>
        </div>
        
        {/* Toggle Switch */}
        <div className="flex items-center gap-2 ml-auto">
          <Label htmlFor="toggle-view" className="text-sm">Monthly</Label>
          <Switch
            id="toggle-view"
            checked={isAnnualView}
            onCheckedChange={setIsAnnualView}
          />
          <Label htmlFor="toggle-view" className="text-sm">Annual</Label>
        </div>
      </CardHeader>
      
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart accessibilityLayer data={isAnnualView ? annualData : monthlyData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value: any) => {
                  // Ensure value is a string before slicing
                  return typeof value === "string" ? value.slice(0, 3) : value;
                }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  )
}
