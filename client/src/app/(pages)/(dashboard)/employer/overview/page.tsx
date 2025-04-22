"use client";

import React, { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from "recharts";

function Page() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [showAnalytics, setShowAnalytics] = useState(false);

  const [savedNotes, setSavedNotes] = useState<
    { id?: number; date: Date | undefined; text: string }[]
  >([]);
  const [events, setEvents] = useState<
    { date: Date | undefined; time: string; title: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const userId = sessionStorage.getItem("poop");

  // Analytics State
  const [analyticsData, setAnalyticsData] = useState({
    statusDistribution: [],
    applicationTrends: [],
    topJobs: [],
    totalApplications: 0
  });

  const [filters, setFilters] = useState({
    timeInterval: 'daily',
    startDate: '',
    endDate: ''
  });

  const [trends, setTrends] = useState([]);

  // Fetch analytics Data
  const fetchAnalytics = async () => {
    try {
      const queryParams = new URLSearchParams({
        timeInterval: filters.timeInterval,
        userId: userId || ''
      }).toString();
      
      // Only add date filters if both are provided
      if (filters.startDate && filters.endDate) {
        queryParams.append('startDate', filters.startDate);
        queryParams.append('endDate', filters.endDate);
      }
      
      console.log("Fetching analytics with params:", queryParams);
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/analytics/applications?${queryParams}`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch analytics data");
      }
      
      const data = await response.json();
      console.log("Analytics data received:", data);
      
      // Ensure proper data structure even if some properties are missing
      setAnalyticsData({
        statusDistribution: data.statusDistribution || [],
        applicationTrends: data.applicationTrends || [],
        topJobs: data.topJobs || [],
        totalApplications: data.totalApplications || 0
      });
      
      setTrends(data.applicationTrends || []); // Keep compatibility with existing chart
    } catch (error) {
      console.error("Error fetching analytics:", error);
      toast({
        title: "Error",
        description: "Failed to load application analytics.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [filters, userId]);

  const handleSaveNote = async () => {
    if (notes.trim() === "") return;
    if (!userId) {
      toast({
        title: "Error",
        description: "You must be logged in to save notes.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const token = sessionStorage.getItem("token");

      const noteData = {
        notes: notes,
        date: date?.toISOString(),
        userId: userId,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/savenotes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(noteData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save note");
      }

      const savedNote = await response.json();

      setSavedNotes([...savedNotes, { id: savedNote.id, date, text: notes }]);

      setNotes("");
      toast({
        title: "Success",
        description: "Note saved successfully.",
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error saving note:", error.message);
        toast({
          title: "Error",
          description: error.message || "Failed to save note.",
          variant: "destructive",
        });
      } else {
        console.error("Unexpected error:", error);
        toast({
          title: "Error",
          description:
            "An unknown error occurred while saving the note.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteNote = async (index: number) => {
    const noteToDelete = savedNotes[index];

    try {
      const token = sessionStorage.getItem("token");

      console.log("Attempting to delete note:", noteToDelete);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/savenotes/${noteToDelete.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseBody = await response.text();
      console.log("Delete response status:", response.status);
      console.log("Delete response body:", responseBody);

      if (!response.ok) {
        throw new Error(`Failed to delete note: ${responseBody}`);
      }

      setSavedNotes(savedNotes.filter((_, i) => i !== index));

      toast({
        title: "Success",
        description: "Note deleted successfully.",
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error deleting note:", error.message);
        toast({
          title: "Error",
          description: error.message || "Failed to delete note.",
          variant: "destructive",
        });
      } else {
        console.error("Unexpected error:", error);
        toast({
          title: "Error",
          description:
            "An unknown error occurred while deleting the note.",
          variant: "destructive",
        });
      }
    }
  };

  const handleAddEvent = () => {
    if (eventTitle.trim() === "" || time.trim() === "") return;
    setEvents([...events, { date, time, title: eventTitle }]);
    setEventTitle("");
    setTime("");
  };

  const handleDeleteEvent = (index: number) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  return (
    <>
      {/* Existing Calendar, Notes, and Events Section */}
      <div className="flex gap-6 mt-4 mb-10">
        <div className="rounded-md border w-fit p-4">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </div>

        <div className="rounded-md border w-fit p-4 flex-1">
          <h2 className="text-lg font-semibold mb-2">Add Event</h2>
          <Input
            placeholder="Event Title"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
          />
          <Input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-2"
          />
          <Button className="mt-2" onClick={handleAddEvent}>
            Add Event
          </Button>

          {events.length > 0 && (
            <div className="mt-4">
              <h3 className="text-md font-semibold mb-2">Scheduled Events</h3>
              {events.map((event, index) => (
                <Card
                  key={index}
                  className="mb-2 flex justify-between items-center p-3"
                >
                  <CardContent className="flex-1">
                    <p className="text-sm text-gray-600">
                      <strong>Date:</strong> {event.date?.toDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Time:</strong> {event.time}
                    </p>
                    <p>{event.title}</p>
                  </CardContent>
                  <Button
                    variant="outline"
                    size="icon"
                    className="ml-2 text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteEvent(index)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col border rounded-md p-4 w-full">
        <h2 className="text-lg font-semibold mb-2">Employer Notes</h2>
        <Textarea
          placeholder="Write notes here..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="h-32"
        />
        <Button
          className="mt-2"
          onClick={handleSaveNote}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Note"}
        </Button>

        {savedNotes.length > 0 && (
          <div className="mt-4">
            <h3 className="text-md font-semibold mb-2">Saved Notes</h3>
            {savedNotes.map((note, index) => (
              <Card
                key={index}
                className="mb-2 flex justify-between items-center p-3"
              >
                <CardContent className="flex-1">
                  <p className="text-sm text-gray-600">
                    <strong>Date:</strong> {note.date?.toDateString()}
                  </p>
                  <p>{note.text}</p>
                </CardContent>
                <Button
                  variant="outline"
                  size="icon"
                  className="ml-2 text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteNote(index)}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Analytics Section Toggle Button */}
      <div className="mt-10 flex justify-between items-center">
        <h2 className="text-xl font-bold">Application Analytics</h2>
        <Button 
          variant="outline"
          onClick={() => setShowAnalytics(!showAnalytics)}
        >
          {showAnalytics ? "Hide Analytics" : "Show Analytics"}
        </Button>
      </div>

      {/* Analytics Section */}
      {showAnalytics && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-4">Application Analytics</h2>
          
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <select
              value={filters.timeInterval}
              onChange={(e) =>
                setFilters({ ...filters, timeInterval: e.target.value })
              }
              className="border p-2 rounded"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) =>
                setFilters({ ...filters, startDate: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) =>
                setFilters({ ...filters, endDate: e.target.value })
              }
              className="border p-2 rounded"
            />
            <Button 
              variant="outline" 
              onClick={() => setFilters({timeInterval: 'daily', startDate: '', endDate: ''})}
            >
              Reset Filters
            </Button>
          </div>
          
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 mb-8">
            <Card className="bg-card dark:border-gray-700">
              <CardContent className="p-6">
                <div className="text-3xl font-bold">{analyticsData.totalApplications}</div>
                <p className="text-muted-foreground mt-1">Total Applications</p>
              </CardContent>
            </Card>
            
            {analyticsData.statusDistribution.slice(0, 2).map((status, i) => (
              <Card key={status.status} className="bg-card dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold">{status.count}</div>
                  <p className="text-muted-foreground mt-1">
                    {status.status.charAt(0).toUpperCase() + status.status.slice(1)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Application Trend Chart */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-4">Application Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/* Status Distribution Chart */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-4">Application Status Distribution</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pie Chart */}
              <Card className="p-4">
                <CardContent>
                  <h4 className="font-medium mb-4">Status Distribution</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={analyticsData.statusDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                        nameKey="status"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {analyticsData.statusDistribution.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={`hsl(var(--chart-${(index % 5) + 1}))`} 
                          />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name) => [value, name]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Bar Chart */}
              <Card className="p-4">
                <CardContent>
                  <h4 className="font-medium mb-4">Top Positions</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={analyticsData.topJobs.slice(0, 5)}
                      layout="vertical"
                      margin={{
                        top: 5,
                        right: 30,
                        left: 80,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" />
                      <YAxis 
                        type="category" 
                        dataKey="title" 
                        width={80}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip />
                      <Bar dataKey="count" fill="hsl(var(--chart-2))">
                        {analyticsData.topJobs.slice(0, 5).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={`hsl(var(--chart-${(index % 5) + 1}))`} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Top Jobs */}
          {analyticsData.topJobs.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Top Positions</h3>
              <div className="space-y-2">
                {analyticsData.topJobs.map(job => (
                  <Card key={job.jobId}>
                    <CardContent className="p-4 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{job.title}</p>
                        <p className="text-sm text-muted-foreground">{job.company}</p>
                      </div>
                      <Badge>{job.count} applications</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Page;