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
    <div className="bg-green-100 rounded-lg shadow-lg p-4 flex flex-col lg:flex-row lg:space-x-6 relative">
      {/* Left Section */}
      <div className="flex flex-col items-center lg:w-1/4">
        <div className="bg-blue-500 rounded-full p-2">
          <Image src={job.logo} alt="Company Logo" width={48} height={48} />
        </div>

        <div className="text-center mt-3">
          <div
            className="text-lg font-bold text-black cursor-pointer"
            onClick={toggleExpand}
          >
            {job.title}
          </div>
          <p className="text-black text-sm">{job.company}</p>
          <p className="text-gray-500 text-sm">{job.salary}</p>
        </div>

        <div className="mt-4 flex space-x-2">
          <Button variant="default" className="text-sm px-3 py-1">
            Apply Now
          </Button>
          <Button variant="secondary" className="border-black text-sm px-3 py-1">
            Share
          </Button>
        </div>
      </div>

      {/* Right Section */}
      <div className="lg:w-3/4 flex flex-col text-center lg:text-left">
        {!expanded ? (
          <p className="text-gray-700 text-sm mb-4">{job.description[0]}</p>
        ) : (
          <div className="text-gray-700 text-sm space-y-3">
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
            className="text-gray-800 text-sm"
          >
            {expanded ? "Show Less" : "Read More..."}
          </Button>
        </div>
      </div>

      {/* Tags at the Bottom Center */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {job.tags.map((tag, tagIndex) => (
          <span
            key={tagIndex}
            className="text-xs font-semibold bg-green-200 text-green-800 py-1 px-2 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default JobCard;
