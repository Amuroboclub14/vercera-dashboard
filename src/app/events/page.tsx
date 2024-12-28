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
import useFetchEvents from "@/utils/useFetchEvents"; // Adjust path to your hook
import Loader from "@/components/added-components/loader";
import ErrorCard from "@/components/added-components/error";

export default function EventsPage() {
  const { events, loading, error } = useFetchEvents();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Events</h1>
        <p className="text-muted-foreground">
          Explore and register for Vercera 4.0 events.
        </p>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorCard />
      ) : (
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
                  <Button className="w-full">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
