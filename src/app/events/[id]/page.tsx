"use client";

import { useParams, useRouter } from "next/navigation";
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
import useFetchEventDetails from "@/utils/useFetchEventDetails";
import Image from "next/image";

export default function EventPage() {
  const params = useParams();
  const router = useRouter();
  const { event, loading, error } = useFetchEventDetails(params.id);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  const handleAction = () => {
    if (event?.eventCategory === "gaming") {
      // router.push(`/events/${event.id}/payment`);
      router.push("/coming-soon");
    } else if (event?.eventCategory === "bundle") {
      // router.push(`/events/${event.id}/payment`);
      // router.push(`/events/${event.id}/bundle-payment`);
      router.push("/coming-soon");
    } else {
      // router.push(`/events/${event.id}/register`);
      router.push("/coming-soon");
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <div className="relative h-60 w-full overflow-hidden">
          <Image
            src={
              `https://amuroboclub.pockethost.io/api/files/events/${event?.id}/${event?.image}` ||
              "/image.JPG"
            }
            alt={event?.name}
            width={1920}
            height={1080}
            className="object-cover w-full h-full rounded-t-xl object-top"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-3xl mt-4">{event?.name}</CardTitle>
          <CardDescription>
            <pre className="whitespace-pre-wrap font-sans">
              {event?.description}
            </pre>
          </CardDescription>
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
                timeZone: "UTC",
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
        <CardFooter className="space-x-4">
          <Button onClick={handleAction} className="w-full">
            {event?.eventCategory === "gaming"
              ? `Pay Rs. ${event.singleGamePrice} for this game`
              : event?.eventCategory === "bundle"
              ? "Pay Rs. 90 for bundle"
              : "Register for Event"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
