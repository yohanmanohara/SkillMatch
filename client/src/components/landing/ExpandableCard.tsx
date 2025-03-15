"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";

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
    requirements: string | string[];
    benefits: string | string[];
    desirable: string | string[];
    description: string[] | string;
    employmentTypes: string[];
    pictureurl: string;
  };
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [expanded, setExpanded] = useState(false);
  const previewUrl = "/avatadefault.jpg";
  const picture = job.pictureurl || previewUrl;

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const getShortDescription = (text: string) => {
    const words = text.split(" ");
    return words.length > 100 ? words.slice(0, 100).join(" ") + "..." : text;
  };

  const fullDescription = Array.isArray(job.description)
    ? job.description.join(" ")
    : job.description;

  return (
    <div className="bg-green-100 rounded-lg shadow-lg p-2 flex flex-col lg:flex-row lg:space-x-6 relative w-min-content">
      <div className="flex flex-col items-center lg:w-1/4">
        <div className="bg-blue-500 rounded-full p-2">
          <Avatar className="rounded-full h-[120px] w-[120px] overflow-hidden">
            <AvatarImage src={picture} alt="Company Logo" className="w-[75px] h-[75px]" />
          </Avatar>
        </div>

        <div className="text-center mt-3">
          <div className="text-xl font-bold text-black cursor-pointer" onClick={toggleExpand}>
            {job.title}
          </div>

          <div className="flex justify-center items-center mt-2 space-x-2">
            <p className="text-black">{job.companyname}</p>
            <p className="text-black">{job.location}</p>
          </div>

          <p className="text-gray-500">Salary: {job.salaryMin}</p>
        </div>

        <div className="mt-4">
          <Button variant="default" className="text-sm px-3 py-1">
            Apply Now
          </Button>
        </div>
      </div>

      <div className="lg:w-3/4 flex flex-col text-center lg:text-left relative">
        {!expanded ? (
          <p className="text-gray-700 mb-4 text-center">{getShortDescription(fullDescription)}</p>
        ) : (
          <div className="text-gray-700 text-sm space-y-3">
            <p>{fullDescription}</p>

            <div className="grid grid-cols-2 gap-2">
              <p><strong>Posted:</strong> {job.posted}</p>
              <p><strong>Expires:</strong> {job.expiredate}</p>
              <p><strong>Level:</strong> {job.educationlevel}</p>
              <p><strong>Education:</strong> {job.educationlevel}</p>
              <p><strong>Experience Duration:</strong> {job.expirienceduration}</p>
            </div>

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

        <div className="absolute bottom-2 right-2">
            <Button variant='outline' onClick={toggleExpand} className=" flex items-center hover:bg-green-200 border-none">
            {/* {expanded ? "Show Less" : "Read More..."} */}
            <span className="ml-1">{expanded ? (
                            <Image src="/upload.png" alt="icon" width={20} height={20} style={{ marginRight: "8px" }} />
                            ) : (
                            <Image src="/arrow.png" alt="icon" width={20} height={20} style={{ marginRight: "8px" }} />
                            )}</span>
            </Button>
        </div>
      </div>

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
