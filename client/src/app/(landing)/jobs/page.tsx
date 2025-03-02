"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import JobCards from "@/components/landing/JobCard2";

export default function JobListingPage() {
  const [search, setSearch] = useState("");

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
        "The role will involve translating project specifications into clean, test-driven, easily maintainable code.",
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
        "You will work closely with our design and backend teams to create responsive and performant web applications.",
      ],
      tags: ["Remote", "Full Time"],
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
    },
    {
      id: 3,
      title: "Backend Developer",
      company: "Data Solutions",
      salary: "$150,000/yr",
      location: "New York, USA",
      posted: "10 Aug, 2021",
      experience: "4 years",
      education: "Master's Degree",
      expire: "10 Oct, 2021",
      level: "Senior level",
      requirements:
        "4+ years of experience in backend development, Proficiency in Node.js, Express, and MongoDB",
      benefits:
        "Health insurance, 401(k) matching, Paid time off",
      desirable:
        "Experience with microservices architecture, Familiarity with Docker and Kubernetes, Knowledge of cloud platforms",
      description: [
        "Data Solutions is a data-driven company that provides innovative solutions to our clients.",
        "We are seeking a skilled Backend Developer to join our team and help us build scalable and efficient backend systems.",
        "You will be responsible for designing, developing, and maintaining our backend services and APIs.",
      ],
      tags: ["On Site", "Full Time"],
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
    },
  ];

  const filteredJobs = jobData.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-3xl font-bold mb-6 text-center">Find Your Dream Job</div>

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
          filteredJobs.map((job) => <JobCards key={job.id} job={job} />)
        ) : (
          <div className="text-gray-500 text-center">No jobs found.</div>
        )}
      </div>
    </div>
  );
}
