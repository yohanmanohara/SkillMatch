import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from 'react';

function Page() {
  return (
    <div className="flex items-center justify-center h-screen p-10">
      <div className="flex-1 flex justify-center items-center">
        <img
          src="C:/Users/yashira de silva/Desktop/Project/SkillMatch/client/public/about us.png"
          alt="About Us"
          className="w-full max-w-md h-auto rounded-lg shadow-lg"
        />
      </div>

      <Card className="flex-1 ml-10 bg-gray-100 shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-green-500">Our Mission</CardTitle>
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
  );
}

export default Page;
