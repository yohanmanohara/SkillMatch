'use client';
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "../../../components/landing/navbar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";
import { SlidersHorizontal, Search, Loader2, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import LatestJobs from "@/components/LatestJobs/LatestJobs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Job {
  _id: string;
  title: string;
  companyname: string;
  salaryMin: string;
  salaryMax?: string;  // Add this optional field
  location: string;
  posted: string;
  expirienceduration: string;
  expiredate: string;
  educationlevel: string;
  requirements: string | string[];
  benefits: string | string[];
  desirable: string | string[];
  description: string | string[];
  employmentTypes: string[];
  pictureurl: string;
}

const normalizeJobForLatestJobs = (job: Job) => {
  return {
    ...job,
    salaryMax: job.salaryMax || undefined, // Ensure salaryMax is a value, not a function
    requirements: Array.isArray(job.requirements) ? job.requirements : [job.requirements],
    benefits: Array.isArray(job.benefits) ? job.benefits : [job.benefits],
    desirable: Array.isArray(job.desirable) ? job.desirable : [job.desirable],
    description: Array.isArray(job.description) ? job.description : [job.description]
  };
};
const JobListingPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5);
  const [employmentTypes, setEmploymentTypes] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 100000]);
  const [experienceLevels, setExperienceLevels] = useState<string[]>([]);
  const router = useRouter();

  // Get all unique employment types from jobs
  const allEmploymentTypes = Array.from(new Set(jobs.flatMap(job => job.employmentTypes)));
  const allExperienceLevels = Array.from(new Set(jobs.map(job => job.expirienceduration)));

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
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Failed to load jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on all filters
  const filterJobs = () => {
    const filtered = jobs.filter((job) => {
      const matchesSearch = search === "" || 
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.companyname.toLowerCase().includes(search.toLowerCase());
      
      const matchesLocation = location === "" || 
        job.location.toLowerCase().includes(location.toLowerCase());
      
      const matchesEmployment = employmentTypes.length === 0 || 
        job.employmentTypes.some(type => employmentTypes.includes(type));
      
      const matchesExperience = experienceLevels.length === 0 || 
        experienceLevels.includes(job.expirienceduration);
      
      const salary = parseInt(job.salaryMin) || 0;
      const matchesSalary = salary >= salaryRange[0] && salary <= salaryRange[1];

      return matchesSearch && matchesLocation && matchesEmployment && 
             matchesExperience && matchesSalary;
    });
    
    setFilteredJobs(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  useEffect(() => {
    filterJobs();
  }, [search, location, employmentTypes, salaryRange, experienceLevels, jobs]);

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePrevious = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  const clearAllFilters = () => {
    setEmploymentTypes([]);
    setExperienceLevels([]);
    setSalaryRange([0, 100000]);
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-screen">
      <Card className="p-6 text-center">
        <p className="text-red-500 text-lg">{error}</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </Card>
    </div>
  );

  return (
    <>
      <Navbar />  
      <div className="flex flex-col md:flex-row pt-20 md:pt-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
        {/* Mobile Search Header */}
        <div className="md:hidden mb-4">
          <Card className="flex flex-col gap-3 p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Job title or company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-11"
              />
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 h-11"
              />
            </div>
            <Button className="h-11">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </Card>
        </div>

        {/* Desktop Sidebar - Left */}
        <div className="hidden md:block w-64 lg:w-72 xl:w-80 pr-6  lg:pr-8 shrink-0">
          
          <div className="sticky top-28 space-y-6">
            <Card className="p-6 h-full flex flex-col gap-7">
            <div className="flex gap-4 justify-between items-center">
              <h3 className="text-lg lg:text-xl font-bold">Filters</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearAllFilters}
                className="text-primary hover:text-primary"
              >
                Clear all
              </Button>
            </div>
            
            <FilterSection 
              title="Employment Type"
              options={allEmploymentTypes}
              selected={employmentTypes}
              onChange={setEmploymentTypes}
            />
            
            <FilterSection 
              title="Experience Level"
              options={allExperienceLevels}
              selected={experienceLevels}
              onChange={setExperienceLevels}
            />
            
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Salary Range (per year)</h4>
              <div className="flex items-center gap-3">
                <Input 
                  type="number" 
                  placeholder="Min" 
                  value={salaryRange[0]}
                  onChange={(e) => setSalaryRange([parseInt(e.target.value) || 0, salaryRange[1]])}
                  className="h-10"
                />
                <span className="text-muted-foreground">to</span>
                <Input 
                  type="number" 
                  placeholder="Max" 
                  value={salaryRange[1]}
                  onChange={(e) => setSalaryRange([salaryRange[0], parseInt(e.target.value) || 100000])}
                  className="h-10"
                />
              </div>
            </div>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Desktop Search Bar */}
          <div className="hidden md:block mb-6">
            <Card className="flex flex-row gap-3 p-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Job title or company..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 h-11"
                />
              </div>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Location..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 h-11"
                />
              </div>
              <Button className="h-11 px-6">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </Card>
          </div>

          {/* Mobile Filter Button */}

          <div className="md:hidden flex justify-between items-center mb-4">
        
            <h2 className="text-xl font-bold">Job Listings</h2>
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="outline" 
                  className="gap-2"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              
              <SheetContent side="right" className="w-full sm:w-96">
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Filters</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearAllFilters}
                      className="text-primary hover:text-primary"
                    >
                      Clear all
                    </Button>
                  </div>
                  <ScrollArea className="flex-1 pr-4">
                    <div className="space-y-6 pb-4">
                      <FilterSection 
                        title="Employment Type"
                        options={allEmploymentTypes}
                        selected={employmentTypes}
                        onChange={setEmploymentTypes}
                      />
                      <FilterSection 
                        title="Experience Level"
                        options={allExperienceLevels}
                        selected={experienceLevels}
                        onChange={setExperienceLevels}
                      />
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium">Salary Range (per year)</h4>
                        <div className="flex items-center gap-3">
                          <Input 
                            type="number" 
                            placeholder="Min" 
                            value={salaryRange[0]}
                            onChange={(e) => setSalaryRange([parseInt(e.target.value) || 0, salaryRange[1]])}
                            className="h-10"
                          />
                          <span className="text-muted-foreground">to</span>
                          <Input 
                            type="number" 
                            placeholder="Max" 
                            value={salaryRange[1]}
                            onChange={(e) => setSalaryRange([salaryRange[0], parseInt(e.target.value) || 100000])}
                            className="h-10"
                          />
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                  <div className="pt-4 border-t">
                    <SheetTrigger asChild>
                      <Button className="w-full">Show results</Button>
                    </SheetTrigger>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            
          </div>

          

          {/* Job Listings */}
          <div className="space-y-4 mb-8">
  {currentJobs.length > 0 ? (
    <LatestJobs jobs={currentJobs.map(normalizeJobForLatestJobs)} />
  ) : (
    <Card className="p-6 sm:p-8 text-center">
      <h3 className="text-lg font-medium mb-2">No jobs found</h3>
      <p className="text-muted-foreground">Try adjusting your search filters</p>
    </Card>
  )}
</div>

          {/* Pagination */}
          {filteredJobs.length > jobsPerPage && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={handlePrevious}
                    className={cn(currentPage === 1 && "opacity-50 cursor-not-allowed")}
                    aria-disabled={currentPage === 1}
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = currentPage <= 3 
                    ? i + 1 
                    : currentPage >= totalPages - 2 
                      ? totalPages - 4 + i 
                      : currentPage - 2 + i;
                  return page > 0 && page <= totalPages ? (
                    <PaginationItem key={i}>
                      <PaginationLink
                        isActive={currentPage === page}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ) : null;
                })}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={handleNext}
                    className={cn(currentPage === totalPages && "opacity-50 cursor-not-allowed")}
                    aria-disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </>
  );
};

const FilterSection = ({
  title,
  options,
  selected,
  onChange
}: {
  title: string;
  options: string[];
  selected: string[];
  onChange: (value: string[]) => void;
}) => {
  const handleCheckboxChange = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter(item => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium">{title}</h4>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox
              id={`filter-${option}`}
              checked={selected.includes(option)}
              onCheckedChange={() => handleCheckboxChange(option)}
            />
            <label 
              htmlFor={`filter-${option}`} 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListingPage;