"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface JobCardProps {
  job: {
    id: number;
    title: string;
    company: string;
    salary: string;
    location: string;
    posted: string;
    experience: string;
    education: string;
    expire: string;
    level: string;
    requirements: string;
    benefits: string;
    desirable: string;
    description: string[];
    tags: string[];
    logo: string;
  };
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="bg-green-100 rounded-lg shadow-lg p-6 flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-6" style={{ width: '100%', height: 'auto' }}>
      <div className="flex flex-col lg:w-1/4 items-center">
        <div className="bg-blue-500 rounded-full p-3">
          <Image src={job.logo} alt="Company Logo" width={48} height={48} />
        </div>

        <div className="text-center mt-4">
          <div
            className="text-xl font-bold text-black cursor-pointer"
            onClick={toggleExpand}
          >
            {job.title}
          </div>
          <p className="text-black">{job.company}</p>
          <p className="text-gray-500">{job.salary}</p>
        </div>
        <div className="flex space-x-2 justify-center mt-4">
              {job.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="text-sm font-semibold bg-green-200 text-green-800 py-1 px-2 rounded-full"
                >
                  {tag}
                </span>
              ))}
              
            </div>

        <div className="mt-6 flex space-x-4 justify-center">
          <Button variant="default">Apply Now</Button>
          <Button variant="secondary" className="border-black">
            Share
          </Button>
        </div>
      </div>

      {/* Job Details */}
      <div className="lg:w-3/4 flex flex-col justify-between items-center text-center">
        {!expanded ? (
          <p className="text-gray-700 mb-4">{job.description[0]}</p>
        ) : (
          <div className="text-gray-700 text-left space-y-4">
            {job.description.map((para, index) => (
              <p key={index}>{para}</p>
            ))}
             

            <div>
              <div className="font-semibold">Requirements:</div>
              <ul className="list-disc list-inside">
                {job.requirements.split(",").map((req, index) => (
                  <li key={index}>{req.trim()}</li>
                ))}
              </ul>
            </div>

            <div>
              <div className="font-semibold">Benefits:</div>
              <ul className="list-disc list-inside">
                {job.benefits.split(",").map((benefit, index) => (
                  <li key={index}>{benefit.trim()}</li>
                ))}
              </ul>
            </div>

            <div>
              <div className="font-semibold">Desirable Skills:</div>
              <ul className="list-disc list-inside">
                {job.desirable.split(",").map((des, index) => (
                  <li key={index}>{des.trim()}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Expand/Collapse Button */}
        <div className="self-end">
          <Button
            variant="ghost"
            onClick={toggleExpand}
            className="border-black text-gray-800"
          >
            {expanded ? "Show Less" : "Read More..."}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
