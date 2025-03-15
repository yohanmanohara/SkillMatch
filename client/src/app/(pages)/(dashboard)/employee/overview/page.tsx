"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Briefcase, Bookmark } from "lucide-react";

// Define the User Data Type
interface UserData {
  name: string;
  jobTitle: string;
  profileCompletion: number;
  jobApplications: {
    applied: number;
    inProgress: number;
    accepted: number;
    rejected: number;
  };
  savedJobs: number;
  notifications: string[];
}

// Example of a mock function to simulate fetching data from an API
const fetchUserData = async (): Promise<UserData> => {
  return {
    name: "Yohan_Manohara",
    jobTitle: "Software Engineer",
    profileCompletion: 75,
    jobApplications: {
      applied: 5,
      inProgress: 3,
      accepted: 2,
      rejected: 1,
    },
    savedJobs: 10,
    notifications: [
      "New job match: Frontend Developer at ABC Corp",
      "Interview invite from XYZ Ltd",
    ]
  };
};

function Page() {
  const [userData, setUserData] = useState<UserData | null>(null);

  // Fetch the user data when the component mounts
  useEffect(() => {
    const loadUserData = async () => {
      const data = await fetchUserData();
      setUserData(data);
    };
    
    loadUserData();
  }, []);

  // Return loading state while user data is being fetched
  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Profile Summary */}
      <Card className="col-span-1 lg:col-span-3 p-6 shadow-lg">
        <h2 className="text-xl font-semibold">Welcome, {userData.name}</h2>
        <p className="text-gray-500">{userData.jobTitle}</p>
        <p className="text-sm text-gray-600 mt-2">Profile Completion: {userData.profileCompletion}%</p>
      </Card>

      {/* Job Applications */}
      <Card className="p-6 shadow-lg col-span-1 lg:col-span-2">
        <div className="flex items-center gap-4">
          <Briefcase className="text-blue-500" />
          <h3 className="text-lg font-semibold">Job Applications</h3>
        </div>
        <ul className="mt-4 text-gray-600">
          <li> Applied: {userData.jobApplications.applied}</li>
          <li> In Progress: {userData.jobApplications.inProgress}</li>
          <li> Accepted: {userData.jobApplications.accepted}</li>
          <li> Rejected: {userData.jobApplications.rejected}</li>
        </ul>
      </Card>

      {/* Saved Jobs */}
      <Card className="p-6 shadow-lg col-span-1 lg:col-span-2">
        <div className="flex items-center gap-4">
          <Bookmark className="text-green-500" />
          <h3 className="text-lg font-semibold">Saved Jobs</h3>
        </div>
        <Button className="mt-4 w-full">View Saved Jobs ({userData.savedJobs})</Button>
      </Card>

      {/* Notifications */}
      <Card className="p-6 shadow-lg col-span-1 lg:col-span-2">
        <div className="flex items-center gap-4">
          <Bell className="text-yellow-500" />
          <h3 className="text-lg font-semibold">Notifications</h3>
        </div>
        <ul className="mt-4 text-gray-600">
          {userData.notifications.map((notification, index) => (
            <li key={index}> {notification} </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

export default Page;