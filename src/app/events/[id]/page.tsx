"use client";

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
import Loader from "@/components/added-components/loader";
import useFetchEventDetails from "@/utils/useFetchEventDetails"; // Import the custom hook
import Image from "next/image";
import { Icons } from "@/components/ui/icons";
import useEventRegister from "@/utils/useEventRegister";

export default function EventPage() {
  const params = useParams();
  const { event, loading, error } = useFetchEventDetails(params.id);
  const { handleEventRegistration, registrationLoading, registrationError } = useEventRegister();
  
  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        {/* Event Image */}
        <div className="relative h-60 w-full overflow-hidden">
          <Image
            src={
              `https://amuroboclub.pockethost.io/api/files/events/${event?.id}/${event?.image}` ||
              "/image.JPG"
            } // Replace with dynamic image URL
            alt={event?.name}
            width={1920}
            height={1080}
            className="object-cover w-full h-full rounded-t-xl object-top"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-3xl mt-4">{event?.name}</CardTitle>
          <CardDescription>{event?.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2 text-sm">
            <CalendarIcon className="h-4 w-4" />
            <span>
              {new Date(event?.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <ClockIcon className="h-4 w-4" />
            <span>
              {new Date(event?.time).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
                timeZone: "UTC", // Forces UTC interpretation
              })}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <UsersIcon className="h-4 w-4" />
            <span>Team Size: {event?.teamSize} members</span>
          </div>
          <div className="text-sm">
            <strong>Location:</strong> {event?.location}
          </div>
        </CardContent>
        {registrationError && <div className="text-center text-red-500 text-sm mb-2">{registrationError}</div>}
        <CardFooter>
          <Button
            className="w-full"
            onClick={() => handleEventRegistration(event?.id)}
            >
            {registrationLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Register for Event
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
