import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

interface Job {
  id: number;
  title: string;
  location: string;
  companyname: string;
  salaryMin: string;
  posted: string;
  pictureurl: string;
}

interface CardsProps {
  jobs: Job[];
}

const Cards = ({ jobs }: CardsProps) => {
  return (
    <div className="flex flex-col gap-4">
      {jobs.map((job, index) => (
        <Card key={job.id || index} className="shadow-lg bg-green-100 text-black p-4 flex flex-col space-y-3 md:flex-row items-center gap-4">
          <div className="w-16 h-16 flex-shrink-0 md:w-24 md:h-24">
            <Avatar className="rounded-full h-full w-full overflow-hidden">
              <AvatarImage src={job.pictureurl} alt="Company Logo" className="w-full h-full" />
            </Avatar>
          </div>

            <CardContent className="flex-1 ">
            <CardHeader className="p-0 flex flex-col items-center md:items-start">
              <CardTitle className="text-xl font-bold text-black ">{job.title}</CardTitle>
              <div className="flex mt-2 space-x-1">
                <p className="text-black">{job.companyname}</p>,
                <p className="text-black">{job.location}</p>
              </div>
            </CardHeader>
            <CardFooter className="flex flex-col items-center md:items-end">
              <div>
                <p className="text-gray-600 font-medium">Job created successfully!</p>
              </div>
            </CardFooter>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Cards;
