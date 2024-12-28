"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type Event = {
  id: string;
  name: string;
  description: string;
  date: string;
  type: string;
};

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      // Replace this with your Pocketbase query
      // const records = await pb.collection('events').getFullList()
      // setEvents(records)

      // Placeholder data
      setEvents([
        {
          id: "1",
          name: "Robotics Challenge",
          description: "Build and program a robot to complete tasks.",
          date: "2024-02-15",
          type: "Competition",
        },
        {
          id: "2",
          name: "Hackathon",
          description:
            "24-hour coding competition to solve real-world problems.",
          date: "2024-02-16",
          type: "Competition",
        },
        {
          id: "3",
          name: "Tech Quiz",
          description: "Test your knowledge of the latest in technology.",
          date: "2024-02-17",
          type: "Quiz",
        },
      ]);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">Events</h2>
        <p className="text-muted-foreground">
          Explore and register for various technical events.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id} className="flex flex-col">
            <CardHeader>
              <div className="space-y-1">
                <CardTitle className="text-xl">{event.name}</CardTitle>
                <CardDescription>{event.type}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {event.description}
                </p>
                <div className="text-sm text-muted-foreground">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>
            </CardContent>
            <div className="p-6 pt-0">
              <Link href={`/events/${event.id}`}>
                <Button variant="outline" className="w-full">
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
