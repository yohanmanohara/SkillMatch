"use client";

import React, { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash } from "lucide-react";
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

function Page() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [savedNotes, setSavedNotes] = useState<{ id: number; date: Date | undefined; text: string }[]>([]);
  const [events, setEvents] = useState<{ id: number; date: Date | undefined; time: string; title: string }[]>([]);
  const [showAnalytics, setShowAnalytics] = useState(false);

  // User Analytics State
  const [userCounts, setUserCounts] = useState<{
    employers: number;
    employees: number;
    totalUsers: number;
    newUserTrend: { month: string; count: number }[];
    userDistribution: { type: string; count: number }[];
    topCompanies: { name: string; users: number }[];
  }>({
    employers: 0,
    employees: 0,
    totalUsers: 0,
    newUserTrend: [],
    userDistribution: [],
    topCompanies: []
  });

  // Filters State
  const [filters, setFilters] = useState({
    timeInterval: "monthly",
    startDate: "",
    endDate: "",
  });

  // Fetch user data and process into analytics
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/getusers`, 
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              role: "admin",
            }),
          }
        );

        if (!res.ok) {
          throw new Error('Failed to fetch users');
        }

        const users = await res.json();
        
        // Process user data into analytics format
        const employers = users.filter((u: any) => u.role === 'employer').length;
        const employees = users.length - employers;
        
        // Group by month for trend analysis
        const newUserTrend = users.reduce((acc: any[], user: any) => {
          const date = new Date(user.createdAt);
          const month = date.toLocaleString('default', { month: 'short', year: 'numeric' });
          
          const existing = acc.find(item => item.month === month);
          if (existing) {
            existing.count += 1;
          } else {
            acc.push({ month, count: 1 });
          }
          return acc;
        }, []);

        // Top companies by user count
        const companyMap = users.reduce((acc: any, user: any) => {
          if (user.company) {
            acc[user.company] = (acc[user.company] || 0) + 1;
          }
          return acc;
        }, {});

        const topCompanies = Object.entries(companyMap)
          .map(([name, users]) => ({ name, users: users as number }))
          .sort((a, b) => b.users - a.users)
          .slice(0, 5);

        // Distribution by role
        const userDistribution = [
          { type: 'Employers', count: employers },
          { type: 'Employees', count: employees }
        ];

        setUserCounts({
          employers,
          employees,
          totalUsers: users.length,
          newUserTrend,
          userDistribution,
          topCompanies
        });

      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  // CSV Download Handler
  const handleDownloadCSV = (type: string) => {
    let dataToDownload: any[] = [];
    let fileName = "";
    let headers: string[] = [];

    switch(type) {
      case "users":
        dataToDownload = userCounts.userDistribution;
        headers = ["User Type", "Count"];
        fileName = "user_distribution.csv";
        break;
      case "trends":
        dataToDownload = userCounts.newUserTrend;
        headers = ["Month", "New Users"];
        fileName = "user_trends.csv";
        break;
      case "companies":
        dataToDownload = userCounts.topCompanies.slice(0, 5);
        headers = ["Company", "Users"];
        fileName = "top_companies.csv";
        break;
    }

    if (!dataToDownload.length) return;

    const csvRows = [
      headers.join(","),
      ...dataToDownload.map(item => 
        Object.values(item).map(v => `"${v}"`).join(",")
      )
    ];

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // Event handlers
  const handleSaveNote = () => {
    if (notes.trim() === "") return;
    setSavedNotes([...savedNotes, { id: Date.now(), date, text: notes }]);
    setNotes("");
  };

  const handleDeleteNote = (id: number) => {
    setSavedNotes(savedNotes.filter((note) => note.id !== id));
  };

  const handleAddEvent = () => {
    if (eventTitle.trim() === "" || time.trim() === "") return;
    const newEvent = { id: Date.now(), date, time, title: eventTitle };
    setEvents([...events, newEvent]);
    setEventTitle("");
    setTime("");
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen px-6 pb-20">
      {/* Toggle Button */}
      <div className="my-4">
        <Button 
          variant="outline" 
          onClick={() => setShowAnalytics(!showAnalytics)}
          className="mb-4"
        >
          {showAnalytics ? "Overview" : "Analytics"}
        </Button>
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
      </div>

      {!showAnalytics ? (
        // Overview Mode - Calendar, Events, Notes
        <>
          {/* Calendar + Events Section */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="rounded-md border w-fit p-4">
              <Calendar mode="single" selected={date} onSelect={setDate} />
            </div>

            <div className="rounded-md border p-4 flex-1 min-w-[300px]">
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
                  {events.map((event) => (
                    <Card key={event.id} className="mb-2 flex justify-between items-center p-3">
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
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Notes Section */}
          <div className="flex flex-col border rounded-md p-4 mt-6">
            <h2 className="text-lg font-semibold mb-2">Take Notes</h2>
            <Textarea
              placeholder="Write notes here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="h-32"
            />
            <Button className="mt-2" onClick={handleSaveNote}>
              Save Note
            </Button>

            {savedNotes.length > 0 && (
              <div className="mt-4">
                <h3 className="text-md font-semibold mb-2">Saved Notes</h3>
                {savedNotes.map((note) => (
                  <Card key={note.id} className="mb-2 flex justify-between items-center p-3">
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
                      onClick={() => handleDeleteNote(note.id)}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        // Analytics Section
        <div className="border p-4 rounded-md mt-6">
          <h2 className="text-xl font-bold mb-4">Platform Analytics</h2>
          
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <select
              value={filters.timeInterval}
              onChange={(e) => setFilters({ ...filters, timeInterval: e.target.value })}
              className="border p-2 rounded"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
              className="border p-2 rounded"
            />
            <Button
              variant="outline"
              onClick={() => setFilters({ timeInterval: "monthly", startDate: "", endDate: "" })}
            >
              Reset Filters
            </Button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card className="p-6 bg-black text-white">
              <CardContent>
                <div className="text-3xl font-bold">{userCounts.totalUsers}</div>
                <p className="text-muted-foreground">Total Users</p>
              </CardContent>
            </Card>
            <Card className="p-6 bg-black text-white">
              <CardContent>
                <div className="text-3xl font-bold">{userCounts.employers}</div>
                <p className="text-muted-foreground">Employers</p>
              </CardContent>
            </Card>
            <Card className="p-6 bg-black text-white">
              <CardContent>
                <div className="text-3xl font-bold">{userCounts.employees}</div>
                <p className="text-muted-foreground">Employees</p>
              </CardContent>
            </Card>
            <Card className="p-6 bg-black text-white">
              <CardContent>
                <div className="text-3xl font-bold">
                  {userCounts.newUserTrend.reduce((acc, curr) => acc + curr.count, 0)}
                </div>
                <p className="text-muted-foreground">New Users (Selected Period)</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart 1: User Distribution */}
            <Card className="p-4 bg-black text-white">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white">User Distribution</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDownloadCSV("users")}
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
                        data={userCounts.userDistribution}
                        dataKey="count"
                        nameKey="type"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#22c55e"
                        label
                      >
                        {userCounts.userDistribution.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={['#22c55e', '#15803d', '#4ade80', '#86efac', '#16a34a'][index % 5]} 
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Chart 2: Top Companies */}
            <Card className="p-4 bg-black text-white">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white">Top Companies</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDownloadCSV("companies")}
                  >
                    Download CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={userCounts.topCompanies.slice(0, 5)}
                      layout="vertical"
                      margin={{ left: 70 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#333" />
                      <XAxis type="number" stroke="#fff" />
                      <YAxis 
                        type="category" 
                        dataKey="name" 
                        stroke="#fff" 
                        width={60}
                        tickFormatter={(value) => value.length > 15 ? `${value.substring(0, 15)}...` : value}
                      />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#222', borderColor: '#333' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Bar dataKey="users" fill="#22c55e" radius={[0, 4, 4, 0]} />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Chart 3: User Trends */}
            <Card className="p-4 bg-black text-white">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white">User Growth Trends</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDownloadCSV("trends")}
                  >
                    Download CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={userCounts.newUserTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis 
                        dataKey="month" 
                        stroke="#fff"
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

            {/* Chart 4: User Engagement */}
            <Card className="p-4 bg-black text-white">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white">User Engagement</CardTitle>
                  <Button variant="outline" size="sm">
                    Download CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex justify-center items-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold">{Math.floor(Math.random() * 20 + 75)}%</div>
                    <div className="text-xs mt-2">Average Daily Active Users</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Toggle Button at Bottom */}
      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50">
        <Button variant="default" onClick={() => setShowAnalytics(!showAnalytics)}>
          {showAnalytics ? "Hide Analytics" : "Show Analytics"}
        </Button>
      </div>
    </div>
  );
}

export default Page;