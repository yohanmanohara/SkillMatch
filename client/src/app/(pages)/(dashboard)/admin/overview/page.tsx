"use client";

import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash } from "lucide-react";

function Page() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [savedNotes, setSavedNotes] = useState<{ id: number; date: Date | undefined; text: string }[]>([]);
  const [events, setEvents] = useState<{ id: number; date: Date | undefined; time: string; title: string }[]>([]);

  
 

  const handleSaveNote = () => {
    if (notes.trim() === "") return;
    setSavedNotes([...savedNotes, { id: Date.now(), date, text: notes }]);
    setNotes("");
  };

  const handleDeleteNote = (id: number) => {
    setSavedNotes(savedNotes.filter((note) => note.id !== id));
  };

  const handleAddEvent = async () => {
    if (eventTitle.trim() === "" || time.trim() === "") return;

    const newEvent = { id: Date.now(), date, time, title: eventTitle };
    setEvents([...events, newEvent]);
    setEventTitle("");
    setTime("");

    try {
      const response = await fetch("/api/sendReminder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventTitle: newEvent.title,
          eventDate: newEvent.date?.toDateString(),
          eventTime: newEvent.time,
        }),
      });

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error sending reminder:", error);
    }
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <>
      <div className="flex gap-6 mt-4 mb-10">
        {/* Calendar Section */}
        <div className="rounded-md border w-fit p-4">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </div>

        {/* Add Events Section */}
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

          {/* Display Events */}
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
      <div className="flex flex-col border rounded-md p-4 w-full">
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

        {/* Display Saved Notes */}
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
  );
}

export default Page;