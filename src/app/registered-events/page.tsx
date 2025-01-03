"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ClockIcon } from "lucide-react";

type RegisteredEvent = {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
};

export default function RegisteredEventsPage() {
  const [events, setEvents] = useState<RegisteredEvent[]>([]);

  useEffect(() => {
    fetchRegisteredEvents();
  }, []);

  const fetchRegisteredEvents = async () => {
    try {
      // Replace this with your Pocketbase query
      // const records = await pb.collection('registrations').getFullList({
      //   filter: `user="${userId}"`,
      //   expand: 'event'
      // })
      // setEvents(records.map(r => r.expand.event))

      // Placeholder data
      setEvents([
        {
          id: "1",
          name: "Robotics Challenge",
          description: "Build and program a robot to complete tasks.",
          date: "2024-02-15",
          time: "10:00 AM",
        },
        {
          id: "2",
          name: "Hackathon",
          description:
            "24-hour coding competition to solve real-world problems.",
          date: "2024-02-16",
          time: "9:00 AM",
        },
      ]);
    } catch (error) {
      console.error("Error fetching registered events:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Registered Events</h1>
        <p className="text-muted-foreground">
          View and manage your registered events for Vercera 4.0.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <CardTitle>{event.name}</CardTitle>
              <CardDescription>{event.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 text-sm">
                <CalendarIcon className="h-4 w-4" />
                <span>
                  {new Date(event.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm mt-2">
                <ClockIcon className="h-4 w-4" />
                <span>{event.time}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/events/${event.id}`} passHref>
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
