"use client";

import React, { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash } from "lucide-react";
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
} from "recharts";

export default function Page() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [eventTitle, setEventTitle] = useState("");

  const [savedNotes, setSavedNotes] = useState<
    { id?: number; date: Date | undefined; text: string }[]
  >([]);
  const [events, setEvents] = useState<
    { date: Date | undefined; time: string; title: string }[]
  >([]);

  const [isLoading, setIsLoading] = useState(false);
  const userId = sessionStorage.getItem("poop");

  // Analytics State
  const [trends, setTrends] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    timeInterval: "daily",
    startDate: "",
    endDate: "",
  });

  // Fetch Trends Data
  const fetchTrends = async () => {
    try {
      // Validate startDate and endDate
      if (!filters.startDate || !filters.endDate) {
        toast({
          title: "Error",
          description: "Please select both start and end dates.",
          variant: "destructive",
        });
        return;
      }
  
      // Build query parameters
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/analytics?${queryParams}`
      );
  
      // Handle non-OK responses
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch trends");
      }
  
      // Parse and set trends data
      const data = await response.json();
      setTrends(data);
    } catch (error) {
      // Type-check the error before accessing its properties
      let errorMessage = "Failed to load application trends.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
  
      console.error("Error fetching trends:", error);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchTrends();
  }, [filters]);

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

      {/* Analytics Section */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Application Trends</h2>
        <div className="flex gap-4 mb-4">
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
        </div>
        <ResponsiveContainer width="100%" height={400}>
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
    </>
  );
}