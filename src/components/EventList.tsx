"use client";

import useFetchEvents from "@/utils/useFetchEvents";
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
import Loader from "./added-components/loader";
import ErrorCard from "./added-components/error";
import Image from "next/image";

export default function EventList() {
  const { events, loading, error } = useFetchEvents();

  if (loading) return <Loader />;
  if (error) return <ErrorCard />;

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
            <Image
              src={`https://amuroboclub.pockethost.io/api/files/events/${event.id}/${event.image}`}
              width={1920}
              height={1080}
              alt={event.name}
              className="w-full h-48 object-cover object-top rounded-t-md"
            />
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
