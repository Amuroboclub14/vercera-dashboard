"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarIcon, ClockIcon, UsersIcon } from "lucide-react";

type EventDetail = {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  teamSize: number;
  location: string;
};

export default function EventPage() {
  const params = useParams();
  const [event, setEvent] = useState<EventDetail | null>(null);

  useEffect(() => {
    fetchEventDetails();
  }, [params.id]);

  const fetchEventDetails = async () => {
    try {
      // Replace this with your Pocketbase query
      // const record = await pb.collection('events').getOne(params.id as string)
      // setEvent(record)

      // Placeholder data
      setEvent({
        id: params.id as string,
        name: "Robotics Challenge",
        description:
          "Build and program a robot to complete a series of tasks in this exciting competition.",
        date: "2024-02-15",
        time: "10:00 AM",
        teamSize: 4,
        location: "Main Auditorium",
      });
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{event.name}</CardTitle>
          <CardDescription>{event.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
          <div className="flex items-center space-x-2 text-sm">
            <ClockIcon className="h-4 w-4" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <UsersIcon className="h-4 w-4" />
            <span>Team Size: {event.teamSize} members</span>
          </div>
          <div className="text-sm">
            <strong>Location:</strong> {event.location}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Register for Event</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
