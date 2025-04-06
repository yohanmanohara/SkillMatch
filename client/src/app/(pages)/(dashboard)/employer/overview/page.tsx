"use client";

import React, { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Trash, Plus, Loader2, Calendar as CalendarIcon, Clock } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Note = {
  id?: number;
  date: Date | undefined;
  text: string;
};

type Event = {
  date: Date | undefined;
  time: string;
  title: string;
};

function Page() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [savedNotes, setSavedNotes] = useState<Note[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchNotes = async () => {
      if (!userId) return;

      try {
        const token = sessionStorage.getItem("token");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/meeting_server/api/savenotes?userId=${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }

        const data = await response.json();
        const formattedNotes = data.map((note: any) => ({
          id: note.id,
          date: note.date ? new Date(note.date) : undefined,
          text: note.text,
        }));

        setSavedNotes(formattedNotes);
      } catch (error: unknown) {
        console.error("Error fetching notes:", error);
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to load saved notes.",
          variant: "destructive",
        });
      }
    };

    fetchNotes();
  }, [userId]);

  const handleSaveNote = async () => {
    if (notes.trim() === "") {
      toast({
        title: "Warning",
        description: "Note cannot be empty",
        variant: "default",
      });
      return;
    }

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
        `${process.env.NEXT_PUBLIC_SERVER_URL}/meeting_server/api/savenotes`,
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
      console.error("Error saving note:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save note.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteNote = async (noteId: number) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/meeting_server/api/savenotes/${noteId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete note: ${await response.text()}`);
      }

      setSavedNotes(savedNotes.filter(note => note.id !== noteId));
      toast({
        title: "Success",
        description: "Note deleted successfully.",
      });
    } catch (error: unknown) {
      console.error("Error deleting note:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete note.",
        variant: "destructive",
      });
    }
  };

  const handleAddEvent = () => {
    if (eventTitle.trim() === "") {
      toast({
        title: "Warning",
        description: "Event title cannot be empty",
        variant: "default",
      });
      return;
    }

    if (time.trim() === "") {
      toast({
        title: "Warning",
        description: "Please select a time for your event",
        variant: "default",
      });
      return;
    }

    setEvents([...events, { date, time, title: eventTitle }]);
    setEventTitle("");
    setTime("");
    
    toast({
      title: "Event Added",
      description: "Your event has been scheduled",
    });
  };

  const handleDeleteEvent = (index: number) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Schedule & Notes</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar Section */}
        <Card className="p-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar 
              mode="single" 
              selected={date} 
              onSelect={setDate} 
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Events Section */}
        <Card className="p-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Schedule Event
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input 
              placeholder="Event Title" 
              value={eventTitle} 
              onChange={(e) => setEventTitle(e.target.value)}
              className="w-full"
            />
            
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                  onClick={() => setShowCalendar(!showCalendar)}
                >
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
                {showCalendar && (
                  <div className="absolute z-10 mt-1 bg-white border rounded-md shadow-lg">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(selectedDate) => {
                        setDate(selectedDate);
                        setShowCalendar(false);
                      }}
                      initialFocus
                    />
                  </div>
                )}
              </div>

              <Select onValueChange={setTime} value={time}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }).map((_, i) => {
                    const hour = i % 12 || 12;
                    const ampm = i < 12 ? "AM" : "PM";
                    const timeValue = `${i.toString().padStart(2, '0')}:00`;
                    return (
                      <SelectItem key={i} value={timeValue}>
                        {`${hour}:00 ${ampm}`}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleAddEvent}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Event
            </Button>
          </CardContent>

          {events.length > 0 && (
            <CardFooter className="flex flex-col items-start gap-2 pt-6">
              <h3 className="text-lg font-semibold">Scheduled Events</h3>
              <div className="w-full space-y-2">
                {events.map((event, index) => (
                  <Card key={index} className="flex justify-between items-center p-3">
                    <CardContent className="p-3 flex-1">
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {event.date?.toDateString()} at {event.time}
                      </p>
                    </CardContent>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDeleteEvent(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </Card>
                ))}
              </div>
            </CardFooter>
          )}
        </Card>
      </div>

      {/* Notes Section */}
      <Card className="mt-8 p-6">
        <CardHeader>
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea 
            placeholder="Write your notes here..." 
            value={notes} 
            onChange={(e) => setNotes(e.target.value)} 
            className="min-h-[150px]"
          />
          <Button 
            onClick={handleSaveNote} 
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Note"
            )}
          </Button>
        </CardContent>

        {savedNotes.length > 0 && (
          <CardFooter className="flex flex-col items-start gap-2 pt-6">
            <h3 className="text-lg font-semibold">Saved Notes</h3>
            <div className="w-full space-y-2">
              {savedNotes.map((note, index) => (
                <Card key={note.id || index} className="flex justify-between items-center p-3">
                  <CardContent className="p-3 flex-1">
                    <p className="font-medium">{note.text}</p>
                    <p className="text-sm text-muted-foreground">
                      {note.date?.toDateString()}
                    </p>
                  </CardContent>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => note.id && handleDeleteNote(note.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </Card>
              ))}
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}

export default Page;