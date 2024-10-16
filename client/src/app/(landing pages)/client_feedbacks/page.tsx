import React from 'react'

function page() {
  return (
    <div>
        <div className="flex justify-center mt-10 p-10 bg-white shadow-lg rounded-lg">
        <div className="flex justify-between text-center space-x-10">

          <div className="flex flex-col">
            <h2 className="text-6xl font-bold text-gray-800 mb-3">98.45%</h2>
            <p className="text-gray-700 font-bold">Positive Feedbacks</p>
            <p className='text-gray-700 text-sm'>From our Doctors</p>
          </div>

          <div className="border-l border-gray-300 mx-6"></div>

          <div className="flex flex-col">
            <h2 className="text-6xl font-bold text-gray-800 mb-3">3000+</h2>
            <p className="text-gray-700 font-bold">Questions & Answers</p>
            <p className='text-gray-700 text-sm'>Your Questions</p>
          </div>

          <div className="border-l border-gray-300 mx-6"></div>
          
            <div className='flex flex-col'>
            <h2 className="text-6xl font-bold text-gray-800 mb-3">2,500+</h2>
            <p className="text-gray-700 font-bold">Experienced Professors</p>
            <p className='text-gray-700 text-sm'>High Qualified </p>
            </div>
            
          
        </div>
      </div>
    </div>
  )
}

export default page