"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import JobCard from "@/components/landing/JobCard2";

export default function JobListingPage() {
  const [search, setSearch] = useState("");
  const [jobListings, setJobListings] = useState<{ _id: string; title: string; company: string; location: string; logo: string; }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/jobs`, {
          method: "GET", // Use "GET" method explicitly
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response);  
        if (!response.ok) {
          throw new Error(`Failed to fetch jobs: ${response.status} ${response.statusText}`);
        }
  
        const data = await response.json();
        setJobListings(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchJobs();
  }, []);
  

  const filteredJobs = Array.isArray(jobListings)
  ? jobListings.filter((job) =>
      job.title.toLowerCase().includes(search.toLowerCase())
    )
  : [];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Find Your Dream Job</h1>

      <div className="flex gap-3 mb-6">
        <Input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
        <Button>Search</Button>
      </div>

      {loading ? (
        <p className="text-gray-500 text-center">Loading jobs...</p>
      ) : (
        <div className="grid gap-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard 
                key={job._id} 
                title={job.title} 
                company={job.company} 
                location={job.location} 
                logo={job.logo} 
              />
            ))
          ) : (
            <p className="text-gray-500 text-center">No jobs found.</p>
          )}
        </div>
      )}
    </div>
  );
}
