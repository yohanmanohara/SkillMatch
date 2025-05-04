"use client";

import { useEffect, useState } from "react";
import { BarChartCard } from "@/components/charts/bar-chart";
import TopCompaniesPieChart from "@/components/common/TopCompanies";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type Job = {
  id: string;
  title: string;
  location: string;
  openings: number;
  salaryMin: number;
  salaryMax: number;
  companyname: string;
  expiredate: Date | string;
};

type HighestPayingJob = Job & {
  averageSalary: number;
};

type AggregatedJob = {
  title: string;
  totalOpenings: number;
  averageSalary: number;
};

const extractOpeningsFromTitle = (title: string): number => {
  const match = title.match(/(\d+)\s*(openings?|positions?)/i);
  return match ? parseInt(match[1]) : 1;
};

const normalizeTitle = (title: string): string => {
  return title.replace(/\(\s*\d+\s*(openings?|positions?)\s*\)/gi, "").trim();
};

const downloadCSV = (filename: string, rows: string[]) => {
  const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function AnalyticsPage() {
  const [topJobs, setTopJobs] = useState<AggregatedJob[]>([]);
  const [highestPayingJobs, setHighestPayingJobs] = useState<HighestPayingJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        );

        const result = await res.json();

        const data: Job[] = Array.isArray(result)
          ? result
          : Array.isArray(result.jobs)
          ? result.jobs
          : [];

        if (!Array.isArray(data)) {
          throw new Error("Invalid data format: expected an array of jobs.");
        }

        const jobMap: Record<
          string,
          { totalOpenings: number; totalSalary: number; count: number }
        > = {};

        data.forEach((job) => {
          const baseTitle = normalizeTitle(job.title);
          const openings = extractOpeningsFromTitle(job.title);
          const avgSalary = (job.salaryMin + job.salaryMax) / 2;

          if (!jobMap[baseTitle]) {
            jobMap[baseTitle] = {
              totalOpenings: 0,
              totalSalary: 0,
              count: 0,
            };
          }

          jobMap[baseTitle].totalOpenings += openings;
          jobMap[baseTitle].totalSalary += avgSalary;
          jobMap[baseTitle].count += 1;
        });

        const aggregatedJobs: AggregatedJob[] = Object.entries(jobMap)
          .map(([title, { totalOpenings, totalSalary, count }]) => ({
            title,
            totalOpenings,
            averageSalary: totalSalary / count,
          }))
          .sort((a, b) => b.totalOpenings - a.totalOpenings)
          .slice(0, 5);

        const highestPaying: HighestPayingJob[] = [...data]
          .map((job) => ({
            ...job,
            averageSalary: (job.salaryMin + job.salaryMax) / 2,
          }))
          .sort((a, b) => b.averageSalary - a.averageSalary)
          .slice(0, 5);

        setTopJobs(aggregatedJobs);
        setHighestPayingJobs(highestPaying);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Failed to load jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const chartData = topJobs.map((job) => ({
    title: job.title,
    openings: job.totalOpenings,
    fill: "#22c55e",
  }));

  const chartConfig = {
    title: { label: "Job Title" },
    openings: { label: "Total Openings" },
  };

  const handleDownloadTopJobs = () => {
    const rows = [
      "Job Title,Total Openings",
      ...topJobs.map((j) => `${j.title},${j.totalOpenings}`),
    ];
    downloadCSV("top_demand_jobs.csv", rows);
  };

  const handleDownloadHighestPaying = () => {
    const rows = [
      "Title,Company,Location,Avg. Salary",
      ...highestPayingJobs.map(
        (j) => `${j.title},${j.companyname},${j.location},${j.averageSalary}`
      ),
    ];
    downloadCSV("highest_paying_jobs.csv", rows);
  };

  const handleDownloadNearExpiry = () => {
    const rows = [
      "Title,Company,Expires On",
      ...[...highestPayingJobs]
        .sort(
          (a, b) =>
            new Date(a.expiredate).getTime() - new Date(b.expiredate).getTime()
        )
        .slice(0, 5)
        .map(
          (j) =>
            `${j.title},${j.companyname},${new Date(j.expiredate).toLocaleDateString("en-IN")}`
        ),
    ];
    downloadCSV("near_expiry_jobs.csv", rows);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">SkillMatch Analytics</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <BarChartCard
            title="Top 5 High Demand Jobs"
            description="Jobs with the highest number of openings"
            data={chartData}
            config={chartConfig}
            dataKey="openings"
            categoryKey="title"
            trendInfo="Trending up"
            subtext="Based on job listings"
           footer={<Button variant="outline" onClick={handleDownloadTopJobs} className="text-sm text-green-600 hover:underline">Download CSV</Button>}
          />
        </div>

        <TopCompaniesPieChart />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Highest Paying Jobs</h2>
            <Button
              variant="outline"
              onClick={handleDownloadHighestPaying}
              className="text-sm text-green-600 hover:underline"
            >
              Download CSV
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Avg. Salary (Rs)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {highestPayingJobs.map((job) => (
                <TableRow
                  key={job.id ?? `${job.title}-${job.companyname}-${job.location}`}
                >
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{job.companyname}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>{job.averageSalary.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="rounded-2xl border shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Jobs Near Expiry</h2>
            <Button
              variant="outline"
              onClick={handleDownloadNearExpiry}
              className="text-sm text-green-600 hover:underline"
            >
              Download CSV
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Expires On</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...highestPayingJobs]
                .sort(
                  (a, b) =>
                    new Date(a.expiredate).getTime() - new Date(b.expiredate).getTime()
                )
                .slice(0, 5)
                .map((job) => (
                  <TableRow
                    key={
                      job.id
                        ? `${job.id}-expiry`
                        : `${job.title}-${job.companyname}-${job.expiredate}`
                    }
                  >
                    <TableCell>{job.title}</TableCell>
                    <TableCell>{job.companyname}</TableCell>
                    <TableCell>
                      {new Date(job.expiredate).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
