"use client"

import { useEffect, useState } from "react"
import { InteractivePieChartCard } from "@/components/charts/pie-chart"

export default function TopCompaniesPieChart() {
  const [data, setData] = useState<
    { name: string; value: number; fill: string }[]
  >([])

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/fetchjobs`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            cache: "no-store",
          }
        )
        const jobs = await res.json()

        // Count vacancies per company
        const companyCounts: Record<string, number> = {}
        jobs.forEach((job: any) => {
          const name = job.companyname ?? "Unknown"
          const openings = extractOpeningsFromTitle(job.companyname)
          companyCounts[name] = (companyCounts[name] || 0) + openings
        })

        // Get top 5 companies
        const sorted = Object.entries(companyCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)

        // Assign colors
        const colors = [
  "#22c55e", // emerald-500
                "#16a34a", // green-600
                "#4ade80", // green-400
                "#15803d", // green-700
                "#86efac", // green-300

        ]

        const chartData = sorted.map(([name, value], i) => ({
          name,
          value,
          fill: colors[i % colors.length],
        }))

        setData(chartData)
      } catch (error) {
        console.error("Error fetching top companies:", error)
      }
    }

    fetchJobs()
  }, [])

  if (data.length === 0) return null

  const colorMap = Object.fromEntries(data.map((d) => [d.name, d.fill]))

  return (
    <InteractivePieChartCard
      id="top-companies"
      title="Top Hiring Companies"
      description="Based on number of vacancies posted"
      data={data}
      labelKey="name"
      
      valueKey="value"
      colorMap={colorMap}
     
    />
  )
}

// Extract openings from title (e.g., "Frontend Dev (4 openings)")
function extractOpeningsFromTitle(title: string): number {
  const match = title.match(/\((\d+)\s*(openings?|positions?)\)/i)
  return match ? parseInt(match[1]) : 1
}
