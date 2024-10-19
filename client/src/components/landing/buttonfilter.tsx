import React from 'react';

function buttonfilter() {
  return (
    <div className="flex flex-col items-center text-black p-6 rounded-lg ">
      <h2 className="text-2xl font-semibold mb-6">People also searched</h2>

      <div className="flex flex-wrap justify-center gap-3 w-full">
        <button className="bg-gray-200 text-black px-4 py-2 rounded-md whitespace-nowrap hover:bg-green-500 transition-colors duration-300">
          Software Developer
        </button>
        <button className="bg-gray-200 text-black px-4 py-2 rounded-md whitespace-nowrap hover:bg-green-500 transition-colors duration-300">
          HR Manager
        </button>
        <button className="bg-gray-200 text-black px-4 py-2 rounded-md whitespace-nowrap hover:bg-green-500 transition-colors duration-300">
          FrontEnd Developer
        </button>
        <button className="bg-gray-200 text-black px-4 py-2 rounded-md whitespace-nowrap hover:bg-green-500 transition-colors duration-300">
          UI/UX Developer
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-3 w-full mt-4">
        <button className="bg-gray-200 text-black px-4 py-2 rounded-md whitespace-nowrap hover:bg-green-500 transition-colors duration-300">
          Sales Representative
        </button>
        <button className="bg-gray-200 text-black px-4 py-2 rounded-md whitespace-nowrap hover:bg-green-500 transition-colors duration-300">
          BackEnd Developer
        </button>
        <button className="bg-gray-200 text-black px-4 py-2 rounded-md whitespace-nowrap hover:bg-green-500 transition-colors duration-300">
          Fullstack Developer
        </button>
      </div>
    </div>
  );
}

export default buttonfilter;
