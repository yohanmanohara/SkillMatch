import React from "react";
import JobCard from "@/components/landing/ExpandableCard";

interface JobData {
  _id: string;
  title: string;
  companyname: string;
  salaryMin: string | number;
  salaryMax?: string | number;
  location: string;
  posted: string;
  expirienceduration: string | number;
  expiredate: string;
  educationlevel: string;
  requirements: string[];
  benefits: string[];
  desirable: string[];
  description: string;
  employmentTypes: string[];
  pictureurl: string;
}

interface TopJobsProps {
  jobs: {
    _id: string;
    title: string;
    companyname: string;
    salaryMin: string;
    salaryMax?: string | number;
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
  }[];
}

const normalizeJobData = (job: TopJobsProps['jobs'][0]): JobData => {
  return {
    ...job,
    salaryMin: Number(job.salaryMin),
    salaryMax: job.salaryMax ? Number(job.salaryMax) : undefined,
    expirienceduration: Number(job.expirienceduration),
    requirements: Array.isArray(job.requirements) ? job.requirements : [job.requirements],
    benefits: Array.isArray(job.benefits) ? job.benefits : [job.benefits],
    desirable: Array.isArray(job.desirable) ? job.desirable : [job.desirable],
    description: Array.isArray(job.description) ? job.description.join('\n') : job.description
  };
};

const TopJobs: React.FC<TopJobsProps> = ({ jobs }) => {
  const topJobs = jobs.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {topJobs.map((job, index) => (
          <JobCard key={job._id || index} job={normalizeJobData(job)} userType={"employer"} />
        ))}
      </div>
    </div>
  );
};

export default TopJobs;