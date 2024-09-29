import Image from 'next/image'
import React from 'react'
import profileIcon from "../../../../public/Guy 4.png"

const Testimonials = () => {
  return (
    <div className='flex flex-col items-center justify-center '>
        <div className='text-primary-800 font-bold text-xl'>support</div>
        <div>Client FeedBack</div>
        <div className='grid grid-cols-3 gap-4'>
          {[...Array(5)].map((_,index) => (
            <div key={index} className='flex flex-col items-center justify-center w-[350px] border-4 border-primary-800 p-4 gap-6 rounded-xl'>
              <div className='flex items-center justify-between w-full'>
                <div className='flex flex-col items-start justify-between font-bold'>
                  <div className=''>Mr.Anton Silva</div>
                  <div className=''>Head of HR</div>
                  <div className=''>Softlogic Holdings Pvt Ltd</div>
                </div>
                <Image src={profileIcon} alt='profile' width={50}></Image>
              </div>
              <div> Lorem, ipsum dolor sit amet consectetur adipisicing elit.  excepturi voluptatum, quidem quis minima debitis alias ipsam molestias nemo.</div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Testimonials
