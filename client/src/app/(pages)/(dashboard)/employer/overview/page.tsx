"use client";
import React, { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash, TrendingUp, BarChart, PieChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";

type Note = {
  id?: number;
  date: Date | undefined;
  text: string;
};

type Event = {
  id: number;
  date: Date | undefined;
  time: string;
  title: string;
};

type StatusDistribution = {
  status: string;
  count: number;
};

type TopJob = {
  jobId: string;
  title: string;
  company: string;
  count: number;
};

type AnalyticsData = {
  statusDistribution: StatusDistribution[];
  applicationTrends: { date: string; count: number }[];
  topJobs: TopJob[];
  totalApplications: number;
};

function Page() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [savedNotes, setSavedNotes] = useState<Note[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const userId = sessionStorage.getItem("poop");

  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    statusDistribution: [],
    applicationTrends: [],
    topJobs: [],
    totalApplications: 0,
  });

  const [filters, setFilters] = useState({
    timeInterval: "daily",
    startDate: "",
    endDate: "",
  });

  // Fetch analytics data
  const fetchAnalytics = async () => {
    try {
      const params = new URLSearchParams();
      params.set("timeInterval", filters.timeInterval);
      if (userId) params.set("userId", userId);
      if (filters.startDate && filters.endDate) {
        params.set("startDate", filters.startDate);
        params.set("endDate", filters.endDate);
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/analytics/applications?${params.toString()}`
      );
      if (!response.ok) throw new Error("Failed to fetch analytics");
      const data = await response.json();
      setAnalyticsData({
        statusDistribution: data.statusDistribution || [],
        applicationTrends: data.applicationTrends || [],
        topJobs: data.topJobs || [],
        totalApplications: data.totalApplications || 0,
      });
    } catch (error) {
      console.error("Fetch analytics error:", error);
      toast({
        title: "Error",
        description: "Failed to load application analytics.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (userId) fetchAnalytics();
  }, [filters, userId]);

  // Fetch saved notes
  useEffect(() => {
    const fetchNotes = async () => {
      if (!userId) return;
      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/savenotes?userId=${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch notes");
        const data = await response.json();
        const formattedNotes = data.map((note: any) => ({
          id: note.id,
          date: note.date ? new Date(note.date) : undefined,
          text: note.text,
        }));
        setSavedNotes(formattedNotes);
      } catch (error) {
        console.error("Error fetching notes:", error);
        toast({
          title: "Error",
          description: "Failed to load saved notes.",
          variant: "destructive",
        });
      }
    };
    fetchNotes();
  }, [userId]);

  // Save a new note
  const handleSaveNote = async () => {
    if (!notes.trim()) return;
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
        notes,
        date: date?.toISOString(),
        userId,
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
      if (!response.ok) throw new Error("Failed to save note");
      const savedNote = await response.json();
      setSavedNotes([...savedNotes, { id: savedNote.id, date, text: notes }]);
      setNotes("");
      toast({
        title: "Success",
        description: "Note saved successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message ?? "Failed to save note.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a note
  const handleDeleteNote = async (index: number) => {
    const noteToDelete = savedNotes[index];
    try {
      const token = sessionStorage.getItem("token");
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
      if (!response.ok) {
        const responseBody = await response.text();
        throw new Error(`Failed to delete note: ${responseBody}`);
      }
      setSavedNotes(savedNotes.filter((_, i) => i !== index));
      toast({
        title: "Success",
        description: "Note deleted successfully.",
      });
    } catch (error) {
      const err = error as Error;
      console.error("Error deleting note:", err);
      toast({
        title: "Error",
        description: `Failed to delete note: ${err.message}`,
        variant: "destructive",
      });
    }
  };

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      if (!userId) return;
      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/addevent?userId=${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();
        const formattedEvents = data.map((event: any) => ({
          id: event.id,
          date: event.date ? new Date(event.date) : undefined,
          time: event.time,
          title: event.title,
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
        toast({
          title: "Error",
          description: "Failed to load events.",
          variant: "destructive",
        });
      }
    };
    fetchEvents();
  }, [userId]);

  // Add a new event
  const handleAddEvent = async () => {
    if (!eventTitle.trim() || !time.trim() || !date || !userId) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    const eventData = {
      title: eventTitle,
      time,
      date: date.toISOString(),
      userId,
    };
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/addevent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(eventData),
        }
      );
      if (!response.ok) throw new Error("Failed to add event");
      const savedEvent = await response.json();
      setEvents([...events, { ...savedEvent }]);
      setEventTitle("");
      setTime("");
      toast({
        title: "Success",
        description: "Event added successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message ?? "Failed to add event.",
        variant: "destructive",
      });
    }
  };

  // Delete an event
  const handleDeleteEvent = async (eventId: number) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/addevent/${eventId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const responseBody = await response.text();
        throw new Error(`Failed to delete event: ${responseBody}`);
      }
      setEvents(events.filter((event) => event.id !== eventId));
      toast({
        title: "Success",
        description: "Event deleted successfully.",
      });
    } catch (error) {
      const err = error as Error;
      console.error("Error deleting event:", err);
      toast({
        title: "Error",
        description: `Failed to delete event: ${err.message}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6 space-y-10">
      {/* Toggle Button at the top */}
      <div>
        <Button
          variant="outline"
          onClick={() => setShowAnalytics(!showAnalytics)}
          className="mb-4"
        >
          {showAnalytics ? "Overview" : "Analytics"}
        </Button>
        
        <h2 className="text-xl font-bold">Employer Dashboard</h2>
      </div>

      {!showAnalytics ? (
        // Overview Mode - Calendar, Events, Notes
        <>
          {/* Calendar + Events */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Calendar */}
            <div
              className="rounded-md border p-4 w-fit"
              style={{ height: "350px", overflowY: "auto" }}
            >
              <Calendar mode="single" selected={date} onSelect={setDate} />
            </div>
      
            {/* Add Event Section */}
            <div className="flex-1 border rounded-md p-4">
              <h2 className="font-semibold text-lg mb-2">Add Event</h2>
              <Input
                placeholder="Event Title"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
              />
              <Input
                type="time"
                className="mt-2"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
              <Button className="mt-2" onClick={handleAddEvent}>
                Add Event
              </Button>
              {events.length > 0 && (
                <div className="mt-4" style={{ maxHeight: "142px", overflowY: "auto" }}>
                  <h3 className="font-semibold mb-2">Scheduled Events</h3>
                  {events.map((event, index) => (
                    <Card key={index} className="flex justify-between items-center p-3 mb-2">
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
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        <Trash className="w-4 h-4 text-red-500" />
                      </Button>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Notes Section */}
          <div className="border p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Employer Notes</h2>
            <Textarea
              className="h-32"
              placeholder="Write notes here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <Button className="mt-2" onClick={handleSaveNote} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Note"}
            </Button>
            {savedNotes.length > 0 && (
              <div className="mt-4">
                <h3 className="text-md font-semibold mb-2">Saved Notes</h3>
                {savedNotes.map((note, index) => (
                  <Card key={index} className="flex justify-between items-center p-3 mb-2">
                    <CardContent className="flex-1">
                      <p className="text-sm text-gray-600">
                        <strong>Date:</strong> {note.date?.toDateString()}
                      </p>
                      <p>{note.text}</p>
                    </CardContent>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDeleteNote(index)}
                    >
                      <Trash className="w-4 h-4 text-red-500" />
                    </Button>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        // Analytics Section
        <div className="border p-4 rounded-md">
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
              onClick={() =>
                setFilters({ timeInterval: "daily", startDate: "", endDate: "" })
              }
            >
              Reset Filters
            </Button>
          </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="p-6">
            <CardContent>
              <div className="text-3xl font-bold">
                {analyticsData.totalApplications}
              </div>
              <p className="text-muted-foreground">Total Applications</p>
            </CardContent>
          </Card>
          {analyticsData.statusDistribution.slice(0, 2).map((s, i) => (
            <Card key={i} className="p-6">
              <CardContent>
                <div className="text-3xl font-bold">{s.count}</div>
                <p className="text-muted-foreground">{s.status}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Chart Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart 1: Application Status Distribution */}
          <Card className="p-4 bg-black text-white">
          <CardHeader>
          <div className="flex justify-between items-center">
          <CardTitle className="text-white">Application Status Distribution</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
            if (analyticsData.statusDistribution.length === 0) {
              toast({ title: "No Data", description: "There is no data to download." });
            return;
            }
            const headers = ["Status", "Count"];
            const rows = analyticsData.statusDistribution.map(entry => 
            `${entry.status},${entry.count}`
            );
            const csv = [headers.join(',')].concat(rows).join('\n');
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'application_status_distribution.csv';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            }}
            >
              Download CSV
          </Button>
            </div>
          </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={analyticsData.statusDistribution}
                      dataKey="count"
                      nameKey="status"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#22c55e"
                      label
                    >
                      {analyticsData.statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#22c55e', '#15803d', '#4ade80', '#86efac', '#16a34a'][index % 5]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Chart 2: Top Jobs with Applications */}
          <Card className="p-4 bg-black text-white">
          <CardHeader>
  <div className="flex justify-between items-center">
    <CardTitle className="text-white">Top Jobs with Applications</CardTitle>
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        const data = analyticsData.topJobs.slice(0, 5);
        if (data.length === 0) {
          toast({ title: "No Data", description: "There is no data to download." });
          return;
        }
        const headers = ["Job Title", "Company", "Applications"];
        const rows = data.map(job => 
          `${job.title},${job.company},${job.count}`
        );
        const csv = [headers.join(',')].concat(rows).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'top_jobs_applications.csv';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }}
    >
      Download CSV
    </Button>
  </div>
</CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={analyticsData.topJobs.slice(0, 5)}
                    layout="vertical"
                    margin={{ left: 70 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#333" />
                    <XAxis type="number" stroke="#fff" />
                    <YAxis 
                      type="category" 
                      dataKey="title" 
                      stroke="#fff" 
                      width={60}
                      tickFormatter={(value) => value.length > 15 ? `${value.substring(0, 15)}...` : value}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#222', borderColor: '#333' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="count" fill="#22c55e" radius={[0, 4, 4, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Chart 3: Application Trends Over Time */}
          <Card className="p-4 bg-black text-white">
          <CardHeader>
  <div className="flex justify-between items-center">
    <CardTitle className="text-white">Application Trends</CardTitle>
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        if (analyticsData.applicationTrends.length === 0) {
          toast({ title: "No Data", description: "There is no data to download." });
          return;
        }
        const headers = ["Date", "Applications"];
        const rows = analyticsData.applicationTrends.map(trend => 
          `${trend.date},${trend.count}`
        );
        const csv = [headers.join(',')].concat(rows).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'application_trends.csv';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }}
    >
      Download CSV
    </Button>
  </div>
</CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analyticsData.applicationTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#fff"
                      tickFormatter={(value) => {
                        if (value.includes('-')) {
                          const parts = value.split('-');
                          return parts.length > 2 ? `${parts[1]}/${parts[2]}` : value;
                        }
                        return value;
                      }}
                    />
                    <YAxis stroke="#fff" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#222', borderColor: '#333' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="count" 
                      stroke="#22c55e" 
                      strokeWidth={2} 
                      dot={{ fill: '#22c55e', r: 4 }}
                      activeDot={{ r: 6, fill: '#4ade80' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Chart 4: Hiring Companies */}
          <Card className="p-4 bg-black text-white">
          <CardHeader>
  <div className="flex justify-between items-center">
    <CardTitle className="text-white">Top Hiring Companies</CardTitle>
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        const data = analyticsData.topJobs.slice(0, 5);
        if (data.length === 0) {
          toast({ title: "No Data", description: "There is no data to download." });
          return;
        }
        const headers = ["Company", "Applications"];
        const rows = data.map(job => 
          `${job.company},${job.count}`
        );
        const csv = [headers.join(',')].concat(rows).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'hiring_companies.csv';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }}
    >
      Download CSV
    </Button>
  </div>
</CardHeader>
            <CardContent className="flex justify-center items-center">
              <div className="h-[300px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={analyticsData.topJobs.slice(0, 5).map(job => ({
                        name: job.company,
                        value: job.count
                      }))}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#22c55e"
                    >
                      {analyticsData.topJobs.slice(0, 5).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#22c55e', '#15803d', '#4ade80', '#86efac', '#16a34a'][index % 5]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#222', borderColor: '#333' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-4xl font-bold">{analyticsData.topJobs.slice(0, 5).length}</div>
                  <div className="text-xs">Top Hiring Companies</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Chart 5: Application Rate by Status */}
          <Card className="p-4 bg-black text-white col-span-1 lg:col-span-2">
          <CardHeader>
  <div className="flex justify-between items-center">
    <CardTitle className="text-white">Application Success Rate</CardTitle>
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        if (analyticsData.statusDistribution.length === 0) {
          toast({ title: "No Data", description: "There is no data to download." });
          return;
        }
        const headers = ["Status", "Applications"];
        const rows = analyticsData.statusDistribution.map(entry => 
          `${entry.status},${entry.count}`
        );
        const csv = [headers.join(',')].concat(rows).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'application_success_rate.csv';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }}
    >
      Download CSV
    </Button>
  </div>
</CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={analyticsData.statusDistribution}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="status" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#222', borderColor: '#333' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="count" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                <span>Application trends are improving</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      )}
    </div>
  );
}

export default Page;