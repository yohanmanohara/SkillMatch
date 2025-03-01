"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import JobCard from "@/components/landing/JobCard2";

const jobListings = [
    { id: 1, title: "Frontend Developer", company: "Google", location: "Remote", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { id: 2, title: "Backend Developer", company: "Amazon", location: "London, UK", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { id: 3, title: "Full Stack Engineer", company: "Meta", location: "San Francisco, CA", logo: "/meta.jpeg" },
    { id: 4, title: "UI/UX Designer", company: "Apple", location: "New York, USA", logo: "/applelogo.png" },
];

export default function JobListingPage() {
  const [search, setSearch] = useState("");

  const filteredJobs = jobListings.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

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

      <div className="grid gap-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard 
              key={job.id} 
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
    </div>
  );
}
