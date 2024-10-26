import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const hero = () => {
  return (
    <div className='flex align-top items-start' >
    <div className="hero min-h-screen flex flex-col justify-evenly items-center">
      <div className="hero-content flex flex-col items-center justify-center lg:flex-row-reverse min-h-screen w-screen">
      
      
        <div className=' w-full h-full flex justify-start  '>
          <div className='flex items-center justify-start'>
          <Image
               src="/hero_new.png"
               alt="Hero"
               width={800}
               height={800}
             
             />
          </div>
        
        </div>
        
       
        <div className="flex flex-col  items-center justify-center gap-3  lg:p-0 w-full ">
          <div className=' flex  flex-col items-end  '>
            <h1 className="text-4xl lg:text-[70px] font-poppins font-semibold leading-none tracking-tight lg:tracking-[-1.4px]">
               Signup & Discover your next <span className="text-green-600">job</span>
            </h1>
          </div>
          <div className="backdrop-blur-[2px] bg-green-200 w-full lg:w-[492px] h-auto lg:h-[184px] flex flex-col items-center justify-center rounded-sm gap-2 p-4 lg:p-0">
         <div className='flex flex-col justify-evenly'>
        <div className='flex justify-start space-x-2'>
        <Image 
  src="/searchIcon.png" 
  alt="searchIcon" 
  width={20} 
  height={20} 
/>
            <input
            
              type="text"
              placeholder="Type here"
              className="input w-full lg:w-[492px] max-w-xs bg-green-200 align-middle text-[#000] font-light font-poppins text-lg lg:text-[20px] leading-normal border-none pb-3"
            />
        </div>
        <div className='flex justify-start space-x-2'>
        <Image 
  src="/location.png" 
  alt="locatioIcon" 
  width={24} 
  height={32} 
/>
            <input
            
              type="text"
              placeholder="Country/City"
              className="input w-full lg:w-[492px] max-w-xs bg-green-200 align-middle text-[#000] font-light font-poppins text-lg lg:text-[20px] leading-normal border-none pb-3"
            />
        </div>
            
         </div>
            <Button variant={'default'}  className=" w-full lg:w-[436px] h-10 lg:h-[42px] flex-shrink-0">
              Search
            </Button>
          </div>
        </div>
      </div>
    
      <div className='flex flex-col items-start  lg:flex-row justify-evenly w-full px-4 lg:px-0 gap-4 lg:gap-8  lg:items-start mt-0 pb-20 ]'>
        {[
          { count: '97,354', label: 'Live Jobs' },
          { count: '97,354', label: 'Companies' },
          { count: '97,354', label: 'New Jobs' },
        ].map((item, index) => (
          <div key={index} className='card p-5 items-center gap-5 rounded-lg bg-gray-50 shadow-[0_12px_48px_0_rgba(0,44,109,0.1)] flex flex-row  sm:flex justify-center w-full sm:w-auto'>
        <Image
          src='/address.png'
          alt={`icon${index + 1}`}
          width={40}
          height={40}
          className="card-icon w-[40px] h-[40px] flex items-center justify-center bg-green-400 rounded-lg"
        />
        <div className='card-content flex flex-col '>
          <div className='top-text w-[180px] text-gray-900 font-sans text-2xl font-bold leading-8'>
            {item.count}
          </div>
          <div className='bottom-text w-[180px] text-gray-500 font-sans text-base font-normal leading-6'>
            {item.label}
          </div>
        </div>
          </div>
        ))}
      </div>
    </div>
   

    </div>
  );
};

export default hero;