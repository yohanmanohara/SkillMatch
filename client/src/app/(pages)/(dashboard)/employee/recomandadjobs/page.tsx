"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Define the Job interface
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string; // e.g., Full-Time, Part-Time
  salary: string;
  description: string;
}

export default function RecommendedJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ type: "", location: "" });
  const router = useRouter();

  // Simulate fetching recommended jobs from an API
  const fetchJobs = async () => {
    setLoading(true);
    try {
      /* Replace this with your actual API endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/main_server/api/jobs/recommended`);
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const data = await response.json();
      setJobs(data);*/
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast({
        title: "Error",
        description: "Failed to load recommended jobs. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Apply filters to the jobs list
  const filteredJobs = jobs.filter((job) => {
    return (
      (filters.type === "" || job.type.toLowerCase() === filters.type.toLowerCase()) &&
      (filters.location === "" || job.location.toLowerCase().includes(filters.location.toLowerCase()))
    );
  });

  // Handle applying for a job
  const handleApply = async (jobId: string) => {
    try {
      // Simulate applying for a job via an API call
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/main_server/api/jobs/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobId }),
      });

      if (!response.ok) {
        throw new Error("Failed to apply for the job");
      }

      toast({
        title: "Application Submitted",
        description: "Your application has been successfully submitted.",
      });
    } catch (error) {
      console.error("Error applying for job:", error);
      toast({
        title: "Error",
        description: "Failed to submit your application. Please try again.",
      });
    }
  };

  // Fetch jobs when the component mounts
  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-3xl font-bold">Recommended Jobs</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Job Type</Label>
          <Input
            id="type"
            placeholder="e.g., Full-Time"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="e.g., New York"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          />
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center text-gray-500">Loading recommended jobs...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <Card key={job.id}>
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription>{job.company}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    <strong>Location:</strong> {job.location}
                  </p>
                  <p>
                    <strong>Type:</strong> {job.type}
                  </p>
                  <p>
                    <strong>Salary:</strong> {job.salary}
                  </p>
                  <p className="text-sm text-gray-600">{job.description}</p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleApply(job.id)}>Apply Now</Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No jobs found matching your criteria.
            </div>
          )}
        </div>
      )}
    </div>
  );
}