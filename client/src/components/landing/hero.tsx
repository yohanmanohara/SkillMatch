import React from 'react';
import Image from 'next/image';


const hero = () => {
  return (
    
      <div className="hero min-h-screen flex flex-col justify-evenly space-x-19 ">
      <div className="hero-content flex flex-col  lg:flex-row-reverse min-h-screen w-screen">
      
      
        <div className=' w-full h-full flex justify-evenly gap-6  '>
          <div className=''>
            <img
            src="./hero_new.png"
            className="w-full h-full object-cover"
            alt="Hero"
          />
          </div>
        
        </div>
        
       
        <div className="flex flex-col gap-6 p-4 lg:p-0">
  <div className='flex justify-center lg:justify-start h-auto w-full lg:w-[641px]'>
    <h1 className="text-[40px] sm:text-[50px] lg:text-[70px] font-poppins font-semibold leading-tight sm:leading-none text-black tracking-tight lg:tracking-[-1.4px]">
      Signup & Discover
      your next <span className="text-green-600">job</span>
    </h1>
  </div>

  <div className="backdrop-blur-[2px] bg-green-200 w-full lg:w-[492px] h-auto lg:h-[184px] flex flex-col items-center justify-center rounded-sm gap-4 p-4 lg:p-6">
    <div className='flex justify-center w-full'>
      <input
        type="text"
        placeholder="Type here"
        className="input w-full lg:w-[492px] max-w-xs bg-green-200 text-[#000] font-light font-poppins text-base sm:text-lg lg:text-[20px] leading-normal border-none pb-3"
      />
    </div>
    <button className="btn bg-black text-white font-bold font-poppins w-full lg:w-[436px] h-10 lg:h-[42px] flex-shrink-0">
      Search
    </button>
  </div>
</div>
        
       
      </div>
      <div className='flex flex-col  lg:flex-row justify-evenly w-full px-4 lg:px-0 gap-4 lg:gap-8 items-center lg:items-start mt-0'>
        {[
          { count: '97,354', label: 'Live Jobs' },
          { count: '97,354', label: 'Companies' },
          { count: '97,354', label: 'New Jobs' },
        ].map((item, index) => (
          <div key={index} className='card p-5 items-center gap-5 rounded-lg bg-gray-50 shadow-[0_12px_48px_0_rgba(0,44,109,0.1)] flex flex-row  sm:flex justify-center w-full sm:w-auto'>
        <Image
          src='/OverviewIcon.png'
          alt={`icon${index + 1}`}
          width={40}
          height={40}
          className="card-icon w-[40px] h-[40px] flex items-center justify-center bg-green-400 rounded-lg"
        />
        <div className='card-content flex flex-col '>
          <div className='top-text w-[180px] text-gray-900 font-poppins text-2xl font-bold leading-8'>
            {item.count}
          </div>
          <div className='bottom-text w-[180px] text-gray-500 font-inter text-base font-normal leading-6'>
            {item.label}
          </div>
        </div>
          </div>
        ))}
      </div>
    </div>
    
  
    
  );
};

export default hero;