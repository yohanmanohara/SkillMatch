import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface Candidate {
  name: string;
  job: string;
  company: string;
  tags: string[];
  logo: string;
}

interface InterviewCardProps {
  candidate: Candidate;
}

const InterviewCard: React.FC<InterviewCardProps> = ({ candidate }) => {
  return (
    <div
      className="bg-green-100 rounded-lg shadow-lg p-6 flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-6"
      style={{ width: '100%', height: 'auto' }}
    >
      <div className="flex flex-col lg:flex-row lg:justify-between w-full items-center">
        <div className="flex items-center lg:w-3/4">
          <Image
            src={candidate.logo}
            alt="Company Logo"
            className="h-12 w-12 mr-4"
            width={48}
            height={48}
          />
          <div className="flex flex-col">
            <div className="text-xl font-bold text-black">{candidate.name}</div>
            <div>
              <div className="text-black">{candidate.company}</div>
              <div className="text-black">{candidate.job}</div>
            </div>
          </div>
        </div>
        <div className="flex items-center lg:w-1/4 justify-end mt-4 lg:mt-0">
          <Button variant='link' className=" text-black">Start meeting</Button>
          <Button variant='secondary' className="bg-red-800 hover:bg-transparent">Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;