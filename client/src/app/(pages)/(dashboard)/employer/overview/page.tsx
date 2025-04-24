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

      {/* Analytics Section */}
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Application Analytics</h2>
          <Button
            variant="outline"
            onClick={() => setShowAnalytics(!showAnalytics)}
          >
            {showAnalytics ? "Hide Analytics" : "Show Analytics"}
          </Button>
        </div>
        {showAnalytics && (
          <div className="mt-4">
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

            {/* Summary */}
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
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;