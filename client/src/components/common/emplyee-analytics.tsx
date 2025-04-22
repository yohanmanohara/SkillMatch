"use client"

import { useEffect, useState } from "react"
import { BarChartCard } from "@/components/charts/bar-chart"
import TopCompaniesPieChart from "@/components/common/TopCompanies" // ✅ adjust the path if needed

type Job = {
  id: string
  title: string
  location: string
  openings: number
}

type AggregatedJob = {
  title: string
  totalOpenings: number
}

const extractOpeningsFromTitle = (title: string): number => {
  const match = title.match(/(\d+)\s*(openings?|positions?)/i)
  return match ? parseInt(match[1]) : 1
}

const normalizeTitle = (title: string): string => {
  return title.replace(/\(\s*\d+\s*(openings?|positions?)\s*\)/gi, "").trim()
}

export default function AnalyticsPage() {
  const [topJobs, setTopJobs] = useState<AggregatedJob[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

        const data = await res.json()
        const jobMap: Record<string, number> = {}

        data.forEach((job: Job) => {
          const baseTitle = normalizeTitle(job.title)
          const openings = extractOpeningsFromTitle(job.title)
          jobMap[baseTitle] = (jobMap[baseTitle] || 0) + openings
        })

        const aggregatedJobs = Object.entries(jobMap)
          .map(([title, totalOpenings]) => ({ title, totalOpenings }))
          .sort((a, b) => b.totalOpenings - a.totalOpenings)
          .slice(0, 5)

        setTopJobs(aggregatedJobs)
      } catch (error) {
        console.error("Error fetching jobs:", error)
        setError("Failed to load jobs.")
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  const chartData = topJobs.map((job) => ({
    title: job.title,
    openings: job.totalOpenings,
    fill: "#22c55e",
  }))

  const chartConfig = {
    title: {
      label: "Job Title",
    },
    openings: {
      label: "Total Openings",
    },
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">SkillMatch Analytics</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <BarChartCard
          title="Top 5 High Demand Jobs"
          description="Jobs with the highest number of openings"
          data={chartData}
          config={chartConfig}
          dataKey="openings"
          categoryKey="title"
          trendInfo="Trending up"
          subtext="Based on job listings"
        />

        <TopCompaniesPieChart />
      </div>
    </div>
  )
}
