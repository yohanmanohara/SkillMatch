"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import JobCards from "@/components/landing/ExpandableCard";

export default function JobListingPage() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialLocation = searchParams.get("location") || "";

  const [search, setSearch] = useState(initialSearch);
  const [location, setLocation] = useState(initialLocation);
  const [filteredJobs, setFilteredJobs] = useState<typeof jobData>([]);

  const jobData = [
    {
      id: 1,
      title: "Cloud Solutions Architect",
      company: "Company Name",
      salary: "$200,000/yr",
      location: "Dhaka, Bangladesh",
      posted: "14 Jun, 2021",
      experience: "3 years",
      education: "Graduation",
      expire: "14 Aug, 2021",
      level: "Entry level",
      requirements:
        "3+ years of experience in a similar role, Experience with cloud-based technologies, Experience with AWS, Azure, and GCP",
      benefits:
        "Health insurance, Paid time off, Professional development assistance",
      desirable:
        "Experience with Kubernetes, Experience with Terraform, Experience with Docker",
      description: [
        "Velstar is a Shopify Plus agency, and we partner with brands to help them grow, we also do the same with our people!",
        "Here at Velstar, we don't just make websites, we create exceptional digital experiences that consumers love.",
        "Our team of designers, developers, strategists, and creators work together to push brands to the next level.",
      ],
      tags: ["On Site", "Full Time"],
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "Tech Innovators",
      salary: "$120,000/yr",
      location: "San Francisco, USA",
      posted: "20 Jul, 2021",
      experience: "2 years",
      education: "Bachelor's Degree",
      expire: "20 Sep, 2021",
      level: "Mid level",
      requirements:
        "2+ years of experience in frontend development, Proficiency in React, HTML, CSS, and JavaScript",
      benefits:
        "Health insurance, Stock options, Remote work flexibility",
      desirable:
        "Experience with TypeScript, Familiarity with Redux, Knowledge of modern frontend build pipelines",
      description: [
        "Tech Innovators is a leading tech company focused on developing cutting-edge web applications.",
        "We are looking for a talented Frontend Developer to join our team and help us build amazing user experiences.",
      ],
      tags: ["Remote", "Full Time"],
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
    },
  ];

  // Function to filter jobs based on search input & location
  const handleSearch = () => {
    const filtered = jobData.filter(
      (job) =>
        (search === "" || job.title.toLowerCase().includes(search.toLowerCase())) &&
        (location === "" || job.location.toLowerCase().includes(location.toLowerCase()))
    );
    setFilteredJobs(filtered);
  };

  // Run the search filter initially
  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-3xl font-bold mb-6 text-center">Find Your Dream Job</div>

      {/* Search Inputs */}
      <div className="flex gap-3 mb-6">
        <Input
          type="text"
          placeholder="Search job title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
        <Input
          type="text"
          placeholder="Enter location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      {/* Job Listings */}
      <div className="grid gap-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => <JobCards key={job.id} job={job} />)
        ) : (
          <div className="text-gray-500 text-center">No jobs found.</div>
        )}
      </div>
    </div>
  );
}
