"use client";
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
import useFetchRegisteredEvents from "@/utils/useFetchRegisteredEvents";

type RegisteredEvent = {
  id: string;
  user: Array<string>;
  event: Array<string>;
  registration_id: string;
  created: Date;
  updated: Date;
  expand: {
    event: {
      id: string;
      name: string;
      description: string;
      date: string;
    };
  }[];
};

export default function RegisteredEventsPage() {
  const {
    events,
    loading,
    error,
  }: { events: RegisteredEvent[]; loading: boolean; error: any } =
    useFetchRegisteredEvents();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Registered Events</h1>
        <p className="text-muted-foreground">
          View and manage your registered events for Vercera 4.0.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((e) => (
          <Card key={e.id}>
            <CardHeader>
              <CardTitle className="text-xl">{e.expand.event.name}</CardTitle>
              <CardDescription className="font-semibold">
                {" "}
                Team ID: {e.registration_id}
              </CardDescription>
              <CardDescription>
                {e.expand.event.shortDescription}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 text-sm">
                <CalendarIcon className="h-4 w-4" />
                <span>
                  {new Date(e.expand.event.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              {/* <div className="flex items-center space-x-2 text-sm mt-2">
                <ClockIcon className="h-4 w-4" />
                <span>{e.expand.event.time}</span>
              </div> */}
            </CardContent>
            <CardFooter>
              <Link href={`/events/${e.expand.event.id}`} passHref>
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
