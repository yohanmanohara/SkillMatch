'use client';

import React, { useEffect, useState } from 'react';
import Container from '../common/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Hero = () => {
  const [jobCount, setJobCount] = useState(1000);
  const [companyCount, setCompanyCount] = useState(400);
  const [newJobCount, setNewJobCount] = useState(1500);

  // Update the counts with random fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setJobCount(prevCount => prevCount + Math.floor(Math.random() * 20) - 10); // Randomly increase or decrease
      setCompanyCount(prevCount => prevCount + Math.floor(Math.random() * 20) - 10);
      setNewJobCount(prevCount => prevCount + Math.floor(Math.random() * 20) - 10);
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <Container>
      <div className='flex align-top items-start justify-center'>
        <div className='hero min-h-screen flex flex-col justify-evenly items-center'>
          <div className='flex flex-col-reverse p-10 sm:flex-row md:flex-row'>
            <div className='flex flex-col justify-around'>
              <div className='font-poppins text-[50px] font-semibold leading-normal tracking-[-1.4px] h-full w-full flex justify-start items-start pl-10 sm:text-[70px]'>
                <div className='flex flex-col'>
                  <div>Signup & Discover</div>
                  <div>
                    your next <span className='text-[#21c452] font-semibold text-[50px] leading-[normal] sm:text-[70px]'>job</span>
                  </div>
                </div>
              </div>
              <div className='flex justify-center items-start h-full'>
                <div className='w-full h-auto flex-shrink-0 bg-[#E9FBEF] backdrop-blur-sm p-10 rounded-md justify-between sm:w-[900px] mt-5'>
                  <div className='flex flex-col gap-5'>
                    <div className='flex font-poppins'>
                      <div className='w-full'>
                        <Input type='text' placeholder='Type here' className='w-full border-none text-black bg-transparent focus:bg-gray-300' />
                      </div>
                    </div>
                    <div className='flex font-poppins'>
                      <div className='w-full'>
                        <Input type='text' placeholder='Country/City' className='w-full border-none text-black bg-transparent focus:bg-gray-300' />
                      </div>
                    </div>
                    <div className='flex justify-center'>
                      <Button className='w-full lg:w-[900px] h-10 lg:h-[42px] flex-shrink-0 bg-[#3BDE6C]'>
                        Search
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col items-start md:flex-row lg:flex-row justify-evenly w-full px-4 lg:px-0 gap-4 lg:gap-8 lg:items-start mt-0 pb-20'>
            {[{ count: jobCount, label: 'Live Jobs' }, { count: companyCount, label: 'Companies' }, { count: newJobCount, label: 'New Jobs' }].map(
              (item, index) => (
                <div key={index} className='card p-5 items-center gap-5 rounded-lg bg-gray-50 shadow-[0_12px_48px_0_rgba(0,44,109,0.1)] flex flex-row sm:flex justify-center w-full sm:w-auto'>
                  <div className='card-content flex flex-col'>
                    <div className='top-text w-[180px] text-gray-900 font-sans text-2xl font-bold leading-8'>{item.count}</div>
                    <div className='bottom-text w-[180px] text-gray-500 font-sans text-base font-normal leading-6'>{item.label}</div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Hero;