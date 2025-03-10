"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

interface JobCardProps {
  job: {
    id: number;
    title: string;
    companyname: string;
    salaryMin: string;
    location: string;
    posted: string;
    expirienceduration: string;
    expiredate: string;
    educationlevel: string;
    requirements: string | string[];  // Allow both array or string
    benefits: string | string[];  // Allow both array or string
    desirable: string | string[];  // Allow both array or string
    description: string[] | string;  // Allow both array or string
    employmentTypes: string[];
    pictureurl: string;
  };
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const previewUrl = "/avatadefault.jpg";
  const picture = job.pictureurl || previewUrl;  // Fallback to previewUrl if pictureurl is undefined

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  

  return (
    <div className="bg-green-100 rounded-lg shadow-lg p-2 flex flex-col lg:flex-row lg:space-x-6 relative  w-min-content">
      <div className="flex flex-col items-center lg:w-1/4">
        <div className="bg-blue-500 rounded-full p-2">
          <Avatar className="rounded-full h-[120px] w-[120px] overflow-hidden">
            <AvatarImage src={picture} alt="Company Logo" className="w-[75px] h-[75px]"  />
          </Avatar>
        </div>

        <div className="text-center mt-3">
          <div className="text-lg font-bold text-black cursor-pointer" onClick={toggleExpand}>
            {job.title}
          </div>
          
          {/* Company name and location next to each other */}
          <div className="flex justify-center gap-4 mt-2">
            <p className="text-black text-sm">{job.companyname}</p>
            <p className="text-gray-500 text-sm">{job.location}</p>
          </div>
        </div>

        <div className="mt-4 flex ">
          <Button variant="default" className="text-sm px-3 py-1">
            Apply Now
          </Button>
         
        </div>
      </div>

      {/* Right Section */}
      <div className="lg:w-3/4 flex flex-col text-center lg:text-left">
        {!expanded ? (
          <p className="text-gray-700 text-sm mb-4">
            {Array.isArray(job.description) ? job.description[0] : job.description}
          </p>
        ) : (
          <div className="text-gray-700 text-sm space-y-3">
            {Array.isArray(job.description)
              ? job.description.map((para, index) => <p key={index}>{para}</p>)
              : <p>{job.description}</p>}

            {/* Job Details */}
            <div className="grid grid-cols-2 gap-2">
              <p><strong>Posted:</strong> {job.posted}</p>
              <p><strong>Expires:</strong> {job.expiredate}</p>
              <p><strong>Level:</strong> {job.educationlevel}</p>
              <p><strong>Education:</strong> {job.educationlevel}</p>
              {/* Move salaryMin to the expanded section */}
              <p><strong>Salary:</strong> {job.salaryMin}</p>
            </div>

            {/* Requirements */}
            <div>
              <div className="font-semibold">Requirements:</div>
              <ul className="list-disc list-inside">
                {Array.isArray(job.requirements)
                  ? job.requirements.map((req, index) => <li key={index}>{req.trim()}</li>)
                  : job.requirements.split(",").map((req, index) => (
                      <li key={index}>{req.trim()}</li>
                    ))}
              </ul>
            </div>

            {/* Benefits */}
            <div>
              <div className="font-semibold">Benefits:</div>
              <ul className="list-disc list-inside">
                {Array.isArray(job.benefits)
                  ? job.benefits.map((benefit, index) => <li key={index}>{benefit.trim()}</li>)
                  : job.benefits.split(",").map((benefit, index) => (
                      <li key={index}>{benefit.trim()}</li>
                    ))}
              </ul>
            </div>

            {/* Desirable Skills */}
            <div>
              <div className="font-semibold">Desirable Skills:</div>
              <ul className="list-disc list-inside">
                {Array.isArray(job.desirable)
                  ? job.desirable.map((des, index) => <li key={index}>{des.trim()}</li>)
                  : job.desirable.split(",").map((des, index) => (
                      <li key={index}>{des.trim()}</li>
                    ))}
              </ul>
            </div>
          </div>
        )}

        {/* Expand/Collapse Button */}
        <div className="self-end">
          <Button variant="ghost" onClick={toggleExpand} className="text-gray-800 text-sm">
            {expanded ? "Show Less" : "Read More..."}
          </Button>
        </div>
      </div>

      {/* Tags at the Bottom Center */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {job.employmentTypes.map((tag, tagIndex) => (
          <span key={tagIndex} className="text-xs font-semibold bg-green-200 text-green-800 py-1 px-2 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default JobCard;
