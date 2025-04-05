import React from "react";
import JobCard from "@/components/landing/ExpandableCard"; // Assuming JobCard is in the same directory

interface TopJobsProps {
  jobs: {
    _id: string;
    title: string;
    companyname: string;
    salaryMin: string;
    location: string;
    posted: string;
    expirienceduration: string;
    expiredate: string;
    educationlevel: string;
    requirements: string | string[];
    benefits: string | string[];
    desirable: string | string[];
    description: string[] | string;
    employmentTypes: string[];
    pictureurl: string;
  }[];
}

const TopJobs: React.FC<TopJobsProps> = ({ jobs }) => {
  const topJobs = jobs.slice(0, 5); // Get the top 5 jobs

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center mb-4">Top 5 Job Listings</h2>
      <div className="grid gap-4">
        {topJobs.map((job, index) => (
          <JobCard key={job._id || index} job={job} /> // fallback to job.title if id is undefined
        ))}
      </div>
    </div>
  );
};

export default TopJobs;
