import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from 'react';
import Image from 'next/image';

import pic from '@/../public/about us.png';

function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-10 space-y-10 bg-white">
      {/* Image and Mission Section */}
      <div className="flex flex-row items-center justify-center space-x-10">
        <div className="flex-1 flex justify-center items-center">
          <Image src={pic} alt="About us image" className="rounded-lg shadow-lg" />
        </div>

        <Card className="flex-1 bg-gray-100 shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-green-500 text-3xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure.
            </p>
            <button className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors">
              Contact Us
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Feedback Section */}
      <div className="flex justify-center mt-10 p-10 bg-white shadow-lg rounded-lg">
        <div className="flex justify-between text-center space-x-10">
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-gray-800">98.45%</h2>
            <p className="text-gray-700">Positive Feedbacks</p>
          </div>
          <div className="border-l border-gray-300 mx-6"></div>
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-gray-800">3000+</h2>
            <p className="text-gray-700">Questions & Answers</p>
          </div>
          <div className="border-l border-gray-300 mx-6"></div>
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-gray-800">2,500+</h2>
            <p className="text-gray-700">Experienced Professors</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
