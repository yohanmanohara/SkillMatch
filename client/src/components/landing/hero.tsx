import React from 'react';

const hero = () => {
  return (
    <div className="hero bg-white min-h-screen flex justify-evenly space-x-19">
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
        
       
        <div className="flex flex-col gap-9 p-4 lg:p-0">
          <div>
            <h1 className="text-4xl lg:text-[70px] font-poppins font-semibold leading-none text-black tracking-tight lg:tracking-[-1.4px]">
              Signup & Discover your next <span className="text-green-600">job</span>
            </h1>
          </div>
          <div className="backdrop-blur-[2px] bg-green-200 w-full lg:w-[492px] h-auto lg:h-[184px] flex flex-col items-center justify-center rounded-sm gap-2 p-4 lg:p-0">
         <div className='flex justify-start'>
         
            <input
            
              type="text"
              placeholder="Type here"
              className="input w-full lg:w-[492px] max-w-xs bg-green-200 align-middle text-[#000] font-light font-poppins text-lg lg:text-[20px] leading-normal border-none pb-3"
            />
         </div>
            <button className="btn bg-black text-white font-bold  font-poppins w-full lg:w-[436px] h-10 lg:h-[42px] flex-shrink-0">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default hero;