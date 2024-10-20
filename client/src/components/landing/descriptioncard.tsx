import React from 'react';

function DescriptionCard() {
  return (
    <div className="max-w-xl h-112 mx-auto bg-white border border-gray-200 rounded-lg shadow-md p-6 relative">
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <div>
          <p className="text-gray-500">Salary (USD)</p>
          <p className="text-2xl font-semibold text-green-600">$100,000 - $120,000</p>
          <p className="text-sm text-gray-500">Yearly salary</p>
        </div>
        <div>
          <p className="text-gray-500">Job Location</p>
          <p className="text-lg font-semibold text-gray-700">Dhaka, Bangladesh</p>
        </div>
      </div>

      <div className="mt-6"> 
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Job Overview</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">Job Posted:</span>
            <span className="font-medium text-gray-700">14 Jun, 2021</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">Job Expire In:</span>
            <span className="font-medium text-gray-700">14 Aug, 2021</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">Job Level:</span>
            <span className="font-medium text-gray-700">Entry Level</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">Experience:</span>
            <span className="font-medium text-gray-700">$50k-80k/month</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">Education:</span>
            <span className="font-medium text-gray-700">Graduation</span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-gray-700 font-semibold mb-2">Share this job:</h3>
        <div className="flex space-x-3">
          <button className="bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm">Copy Link</button>
          <button className="bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm">LinkedIn</button>
          <button className="bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm">Facebook</button>
          <button className="bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm">Twitter</button>
          <button className="bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm">Email</button>
        </div>
      </div>
    </div>
  );
}

export default DescriptionCard;
