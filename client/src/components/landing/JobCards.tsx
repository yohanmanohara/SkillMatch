import React from 'react'

const JobCards = () => {
  return (
    <div className=''>
        
         <div className="card  text-primary-content w-[311px] h-[350px] flex-shrink-0 rounded-[20px] border-2 border-[#21C452] bg-white">
         
    <div className="card-body">
   <div className='card-top'>
    <img src='./jobCardIcon.png' alt='job' className="w-[42.668px] h-[42px] flex-shrink-0" />
   </div>
      <h2 className="card-title font-encode font-bold text-[20px]">Software Architect</h2>
      <p className='font-encode text-[10px] font-bold not-italic leading-normal text-[#656565] '>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure </p>
      <div className="card-actions justify-end">
        <button className="btn btn-ghostrounded-[15px] border-2 border-[#717174] bg-white text-[12px] font-semibold not-italic leading-[20px] tracking-[0.1px] font-encode">Apply now</button>
      </div>
    </div>
  </div>
    </div>
   
  )
}

export default JobCards
