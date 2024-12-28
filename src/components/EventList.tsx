"use client";

import useFetchEvents from "@/utils/useFetchEvents.js";
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

export default function EventList() {
  const { events, loading, error } = useFetchEvents();

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error loading events: {error}</p>;

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
