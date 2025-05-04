"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
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
        const result = await res.json()
        const jobs: any[] = Array.isArray(result) ? result : result.jobs

        if (!Array.isArray(jobs)) {
          throw new Error("Invalid jobs data format")
        }

        // Count vacancies per company
        const companyCounts: Record<string, number> = {}
        jobs.forEach((job) => {
          const name = job.companyname ?? "Unknown"
          const openings = extractOpeningsFromTitle(job.title)
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

  const downloadCSV = () => {
    const csvHeader = "Company,Vacancies\n"
    const csvRows = data.map((d) => `${d.name},${d.value}`).join("\n")
    const csvContent = csvHeader + csvRows
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "top_hiring_companies.csv")
    link.style.display = "none"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <InteractivePieChartCard
      id="top-companies"
      title="Top Hiring Companies"
      description="Based on number of vacancies posted"
      data={data}
      labelKey="name"
      valueKey="value"
      colorMap={colorMap}
      footer={
        <Button
          variant="outline"
          onClick={downloadCSV}
          className="text-sm text-green-600 hover:underline"
        >
          Download CSV
        </Button>
      }
    />
  )
}

// Extract openings from job title (e.g., "Frontend Developer (4 openings)")
function extractOpeningsFromTitle(title: string): number {
  const match = title.match(/\((\d+)\s*(openings?|positions?)\)/i)
  return match ? parseInt(match[1]) : 1
}
