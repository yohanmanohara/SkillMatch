"use client"

import { useEffect, useState } from "react"

type Job = {
  _id: string
  title: string
  location: string
}

type AggregatedJob = {
  title: string
  totalOpenings: number
}

const extractOpeningsFromTitle = (title: string): number => {
  const match = title.match(/(\d+)\s*(openings?|positions?)/i)
  return match ? parseInt(match[1]) : 1 // Default to 1 if not specified
}

const normalizeTitle = (title: string): string => {
  // Strip anything like "(3 openings)" or "(2 positions)"
  return title.replace(/\(\s*\d+\s*(openings?|positions?)\s*\)/gi, "").trim()
}

export default function TopHighDemandJobs() {
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

          if (!jobMap[baseTitle]) jobMap[baseTitle] = 0
          jobMap[baseTitle] += openings
        })

        const aggregatedJobs = Object.entries(jobMap)
          .map(([title, totalOpenings]) => ({ title, totalOpenings }))
          .sort((a, b) => b.totalOpenings - a.totalOpenings)
          .slice(0, 5) // Top 5

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

  if (loading) return <div>Loading top high demand jobs...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="grid gap-4">
      <h2 className="text-xl font-semibold">🔥 Top 5 High Demand Job Titles</h2>
      {topJobs.map((job, index) => (
        <div
          key={index}
          className="p-4 rounded-lg border shadow-sm flex flex-col gap-1"
        >
          <h3 className="font-medium">{job.title}</h3>
          <span className="text-sm text-muted-foreground">
            {job.totalOpenings} total openings
          </span>
        </div>
      ))}
    </div>
  )
}
