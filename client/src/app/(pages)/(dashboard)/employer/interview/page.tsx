import React from 'react';
import InterviewCard from '@/components/landing/InterviewCard';

const candidates = [
  {
    name: 'John Doe',
    job: 'Cloud Solutions Architect',
    company: 'Facebook',
    tags: ['On Site', 'Full Time'],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg',
  },
  {
    name: 'Jane Smith',
    job: 'Product Manager',
    company: 'Google',
    tags: ['Remote', 'Part Time'],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
  },
  // Add more candidate data here
];

const Page = () => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='text-2xl font-bold '>Interviews</div>
      {candidates.map((candidate, index) => (
        <InterviewCard key={index} candidate={candidate} />
      ))}
    </div>
  );
};

export default Page;