'use client'; // ✅ Mark this file as a Client Component
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import JobCard from "@/components/landing/ExpandableCard";
import { useRouter } from "next/navigation";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"; // Adjust the import path if necessary

const JobListingPage = () => {
  interface Job {
    id: number;
    title: string;
    location: string;
    companyname: string;
    salaryMin: string;
    posted: string;
    expirienceduration: string;
    expiredate: string;
    educationlevel: string;
    requirements: string;
    benefits: string;
    desirable: string;
    description: string[];
    employmentTypes: string[];
    pictureurl: string;
  }

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState(1);  // Current page
  const [jobsPerPage] = useState(5);  // Jobs per page
  const router = useRouter();


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
        const data = await res.json();
        setJobs(data);
        setFilteredJobs(data);
      } catch (err) {
        setError("Failed to fetch job listings");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Function to filter jobs based on search and location
  const filterJobs = () => {
    const filtered = jobs.filter(
      (job) =>
        (search === "" || job.title.toLowerCase().includes(search.toLowerCase())) &&
        (location === "" || job.location.toLowerCase().includes(location.toLowerCase()))
    );
    setFilteredJobs(filtered);
  };

  // Whenever search or location changes, trigger the filtering
  useEffect(() => {
    filterJobs();
  }, [search, location, jobs]);

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container w-min-content p-4">
      <Button onClick={() => router.push("/")} className="mb-4">
        Back to Home
      </Button>
      <h1 className="text-2xl font-bold mb-4 text-center">Job Listings</h1>
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
        <Button onClick={filterJobs}>Search</Button>
      </div>

      <div className="grid gap-4">
        {currentJobs.length > 0 ? (
          currentJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))
        ) : (
          <p className="text-gray-500 text-center">No jobs found.</p>
        )}
      </div>

      {/* Pagination Component */}
      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={handlePrevious} />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={currentPage === index + 1}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext onClick={handleNext} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default JobListingPage;
