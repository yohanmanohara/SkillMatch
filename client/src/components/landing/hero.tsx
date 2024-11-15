import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {Input} from "@/components/ui/input";

const hero = () => {
  return (
    <div className='flex align-top items-start justify-center' >
    <div className="hero min-h-screen flex flex-col justify-evenly items-center">
      <div className='flex flex-col-reverse p-10 sm:flex-row md:flex-row'>
        <div className='flex flex-col justify-around'>
          <div className='font-poppins text-[50px] font-semibold leading-normal tracking-[-1.4px]  h-full w-full  flex  justify-end items-end pl-10 sm:text-[70px]'>
            <div className='flex flex-col'><div>Signup & Discover</div> 
              <div>your next <span className='text-[#21c452] font-semibold text-[50px] leading-[normal] sm:text-[70px] '>job  </span></div></div>
          
          </div>
          <div className='flex justify-center items-start h-full'>
              <div className='w-full h-auto flex-shrink-0 bg-[#E9FBEF] backdrop-blur-sm p-10 rounded-md justify-between sm:w-auto mt-5'>
                <div>
                  <div className='flex font-poppins'>
                    <div className='flex items-center'><Image src="/searchIcon.png"  alt="searchIcon"   width={25} height={25} /></div>
                    <div className='w-full'> <Input type='text' placeholder='Type here' className='w-full border-none'/></div>
                  </div>
                  <div className='flex  font-poppins'>
                    <div className='flex items-center'><Image src="/location.png"  alt="searchIcon"   width={20} height={15} /></div>
                    <div className='w-full'> <Input type='text' placeholder='Country/City' className='w-full border-none'/></div>
                  </div>
                  <div>
                    <Button variant={'default'}  className=" w-full lg:w-[436px] h-10 lg:h-[42px] flex-shrink-0">
                      Search
                    </Button>
                  </div>
                </div>
                

              

              </div>
          </div>
          

        </div>
        <div className='flex justify-end '>
        <Image
               src="/hero_new.png"
               alt="Hero"
               
               width={800}
               height={800}
               className=' '
             
             />


        </div>



        
      </div>
      
    
      <div className='flex flex-col items-start md:flex-row  lg:flex-row justify-evenly w-full px-4 lg:px-0 gap-4 lg:gap-8  lg:items-start mt-0 pb-20 ]'>
        {[
          { count: '97,354', label: 'Live Jobs' },
          { count: '97,354', label: 'Companies' },
          { count: '97,354', label: 'New Jobs' },
        ].map((item, index) => (
          <div key={index} className='card p-5 items-center gap-5 rounded-lg bg-gray-50 shadow-[0_12px_48px_0_rgba(0,44,109,0.1)] flex flex-row  sm:flex justify-center w-full sm:w-auto '>
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