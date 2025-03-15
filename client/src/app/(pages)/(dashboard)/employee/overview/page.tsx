"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Briefcase, Bookmark, Star } from "lucide-react";

// Dummy User Data
const userData = {
  name: "John Doe",
  jobTitle: "Frontend Developer",
  profileCompletion: 80,
  jobApplications: {
    inProgress: 2,
    accepted: 1,
    rejected: 3,
  },
  savedJobs: [
    { title: "React Developer", company: "Tech Corp", location: "Remote" },
    { title: "UI/UX Designer", company: "Design Hub", location: "New York" },
    { title: "Backend Developer", company: "CodeWorks", location: "San Francisco" },
    { title: "Data Analyst", company: "DataCorp", location: "Chicago" },
  ],
  totalSoftwareJobs: 120,
  skills: [
    { skill: "React", endorsements: 5 },
    { skill: "JavaScript", endorsements: 8 },
    { skill: "CSS", endorsements: 4 },
  ],
  recentActivity: [
    "Applied for React Developer at Tech Corp",
    "Saved UI/UX Designer job at Design Hub",
    "Viewed Backend Developer job at CodeWorks",
  ],
  upcomingInterviews: [
    { jobTitle: "React Developer", company: "Tech Corp", date: "2025-03-20" },
  ],
  careerTips: [
    "Customize your resume for each job application",
    "Network with professionals in your field",
    "Keep learning new skills and certifications",
  ],
  jobAlerts: [
    "New job posted: Frontend Developer at Web Solutions",
    "React Developer role available at Tech Studio",
  ],
};

function Page() {
  const [showAllSavedJobs, setShowAllSavedJobs] = useState(false);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Profile Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {userData.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted">{userData.jobTitle}</p>
          <p className="text-sm text-muted mt-2">Profile Completion: {userData.profileCompletion}%</p>
        </CardContent>
      </Card>

      {/* Job Applications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="text-blue-500" /> Job Applications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-muted">
            <li>In Progress: {userData.jobApplications.inProgress}</li>
            <li>Accepted: {userData.jobApplications.accepted}</li>
            <li>Rejected: {userData.jobApplications.rejected}</li>
          </ul>
        </CardContent>
      </Card>

      {/* Saved Jobs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bookmark className="text-green-500" /> Saved Jobs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-muted">
            {userData.savedJobs.slice(0, showAllSavedJobs ? userData.savedJobs.length : 2).map((job, index) => (
              <li key={index} className="mb-2">{job.title} - {job.company} ({job.location})</li>
            ))}
          </ul>
          <Button className="mt-4 w-full" onClick={() => setShowAllSavedJobs(!showAllSavedJobs)}>
            {showAllSavedJobs ? "Show Less" : "View All Saved Jobs"}
          </Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="text-yellow-500" /> Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted">Total jobs in Software Engineering: {userData.totalSoftwareJobs}</p>
        </CardContent>
      </Card>

      {/* Skills & Endorsements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="text-purple-500" /> Skills & Endorsements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-muted">
            {userData.skills.map((skill, index) => (
              <li key={index} className="mb-2">{skill.skill} - {skill.endorsements} endorsements</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-muted">
            {userData.recentActivity.map((activity, index) => (
              <li key={index} className="mb-2">{activity}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Upcoming Interviews */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Interviews</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-muted">
            {userData.upcomingInterviews.map((interview, index) => (
              <li key={index} className="mb-2">{interview.jobTitle} at {interview.company} on {interview.date}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Career Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Career Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-muted">
            {userData.careerTips.map((tip, index) => (
              <li key={index} className="mb-2">{tip}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Job Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Job Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-muted">
            {userData.jobAlerts.map((alert, index) => (
              <li key={index} className="mb-2">{alert}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;
